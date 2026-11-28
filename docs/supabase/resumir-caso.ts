// Edge Function: resumir-caso — resume o relato do visitante com Google Gemini.
// Este arquivo é a cópia de referência do código que precisa ser colado no painel
// do Supabase (Edge Functions > resumir-caso > Code > Deploy).
// Secret obrigatório: GEMINI_API_KEY. Opcional: ALLOWED_ORIGINS (lista separada por vírgula).
const MODEL = "gemini-2.5-flash";
const AREAS: Record<string, string> = { trabalhista: "Trabalhista", previdenciario: "Previdenciário", outros: "Outros" };

const SYSTEM = `Você organiza relatos de potenciais clientes do escritório Lucas Matias Advocacia (Porto Alegre/RS, Direito do Trabalho e Previdenciário).
REGRAS: NUNCA dê aconselhamento jurídico, opinião sobre chances, valores, prazos ou estratégias. Apenas resuma o que a pessoa escreveu, de forma neutra e em português.
Responda em Markdown exatamente com estas seções:
### Resumo do relato
(3 a 6 frases fiéis ao relato)
### Área provável
(Trabalhista, Previdenciário ou Outros, com uma frase de justificativa baseada no relato)
### Informações úteis para o atendimento
(lista com "- " de documentos ou dados que a pessoa pode separar, sem orientar juridicamente)
### Como falar com o escritório
- WhatsApp: +55 51 99249-1957
- Atendimento presencial: Rua Dr. Flores, 323, sala 51, Porto Alegre/RS — segunda a sexta, 8h às 20h
Finalize com: "Este resumo não é aconselhamento jurídico."`;

function cors(origin: string | null) {
  const allowed = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = !origin || allowed.length === 0 || allowed.includes(origin) ||
    /\.lovable\.app$|\.lovableproject\.com$|^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    ok,
    headers: {
      "Access-Control-Allow-Origin": ok && origin ? origin : "null",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
      "Content-Type": "application/json",
    },
  };
}

Deno.serve(async (req) => {
  const { ok, headers } = cors(req.headers.get("origin"));
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS") return new Response(null, { status: ok ? 204 : 403, headers });
  if (!ok) return reply({ ok: false, erro: "Origem não autorizada." }, 403);
  if (req.method !== "POST") return reply({ ok: false, erro: "Método não permitido." }, 405);

  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) return reply({ ok: false, erro: "Serviço indisponível no momento. Fale conosco pelo WhatsApp." }, 500);

  let area = "outros", relato = "";
  try {
    const b = await req.json();
    area = String(b?.area ?? "outros");
    relato = String(b?.relato ?? "").trim();
  } catch { return reply({ ok: false, erro: "Dados inválidos." }, 400); }
  if (!AREAS[area]) area = "outros";
  if (relato.length < 30) return reply({ ok: false, erro: "Descreva sua situação com pelo menos 30 caracteres." }, 400);
  if (relato.length > 3000) return reply({ ok: false, erro: "Relato muito longo (máximo 3000 caracteres)." }, 400);

  const falha = "Não foi possível organizar seu relato agora. Fale conosco pelo WhatsApp.";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: `Assunto escolhido: ${AREAS[area]}\n\nRelato:\n${relato}` }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1200, thinkingConfig: { thinkingBudget: 0 } },
      }),
    });
    if (r.status === 429) return reply({ ok: false, erro: "Muitas solicitações no momento. Tente novamente em instantes." }, 429);
    if (!r.ok) { console.error("Gemini", r.status, await r.text()); return reply({ ok: false, erro: falha }, 502); }
    const j = await r.json();
    const resumo = (j?.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("").trim();
    if (!resumo) return reply({ ok: false, erro: falha }, 502);
    return reply({ ok: true, resumo });
  } catch (e) {
    console.error(e);
    return reply({ ok: false, erro: falha }, 502);
  }
});
