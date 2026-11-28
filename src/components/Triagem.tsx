import { useState } from "react";
const SUPABASE_URL = import.meta.env["VITE_SUPABASE_URL"] as string;
const SUPABASE_ANON_KEY = (import.meta.env["VITE_SUPABASE_ANON_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"]) as string;

type Resposta = { ok: true; resumo: string } | { ok: false; erro: string };

async function resumirCaso(area: string, relato: string): Promise<Resposta> {
  const res = await fetch(`$https://ririqcrrridviwcgdieb.supabase.co/functions/v1/resumir-caso`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ area, relato }),
  });
  const json = (await res.json().catch(() => null)) as Resposta | null;
  if (!json) throw new Error("Resposta inválida");
  return json;
}

const WHATS = "https://wa.me/5551992491957";
const AREA_TXT = { trabalhista: "Trabalhista", previdenciario: "Previdenciário", outros: "Outros" } as const;

function mensagemWhats(area: keyof typeof AREA_TXT, resumo: string) {
  const limpo = resumo
    .replace(/^### (.+)$/gm, "*$1*")
    .replace(/\*\*(.+?)\*\*/g, "*$1*")
    .replace(/^\s*[-*] /gm, "• ")
    .split("\n")
    .filter((l) => !/aconselhamento jurídico|^\*Como falar|WhatsApp: \+55|Atendimento presencial:/i.test(l))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const txt = `Olá! Vim pelo site e gostaria de agendar um atendimento.\n\n*Assunto:* ${AREA_TXT[area]}\n\n${limpo}`;
  return `${WHATS}?text=${encodeURIComponent(txt.slice(0, 3500))}`;
}

function Markdown({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {text.split("\n").map((l, i) => {
        const clean = l.replace(/\*\*(.+?)\*\*/g, "$1");
        if (l.startsWith("### ")) return <h4 key={i} className="pt-3 font-display text-lg text-primary">{clean.slice(4)}</h4>;
        if (/^\s*[-*] /.test(l)) return <p key={i} className="pl-4 before:-ml-4 before:mr-2 before:text-accent before:content-['•']">{clean.replace(/^\s*[-*] /, "")}</p>;
        if (!l.trim()) return null;
        return <p key={i}>{clean}</p>;
      })}
    </div>
  );
}

export function Triagem() {
  const [area, setArea] = useState<"trabalhista" | "previdenciario" | "outros">("outros");
  const [relato, setRelato] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumo, setResumo] = useState("");
  const [erro, setErro] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setResumo("");
    if (relato.trim().length < 30) return setErro("Descreva sua situação com pelo menos 30 caracteres.");
    setLoading(true);
    try {
      const r = await resumirCaso(area, relato);
      if (r.ok) setResumo(r.resumo);
      else setErro(r.erro);
    } catch {
      setErro("Não foi possível enviar agora. Fale conosco pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={enviar} className="space-y-5 rounded-2xl border bg-card p-6 shadow-soft">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Seu assunto é</legend>
          <div className="flex flex-wrap gap-2">
            {([["trabalhista", "Trabalhista"], ["previdenciario", "Previdenciário"], ["outros", "Outros"]] as const).map(([v, l]) => (
              <label key={v} className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition ${area === v ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <input type="radio" name="area" value={v} checked={area === v} onChange={() => setArea(v)} className="sr-only" />
                {l}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="relato" className="mb-2 block text-sm font-semibold">Conte o que aconteceu</label>
          <textarea id="relato" value={relato} onChange={(e) => setRelato(e.target.value)} rows={8} maxLength={3000}
            placeholder="Ex.: Trabalhei 3 anos numa empresa, fui demitido e não recebi as verbas…"
            className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <p className="mt-1 text-xs text-muted-foreground">Não inclua CPF, senhas ou dados bancários. {relato.length}/3000</p>
        </div>
        <button disabled={loading} className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
          {loading ? "Organizando seu relato…" : "Organizar meu relato"}
        </button>
        <p className="text-xs text-muted-foreground">Ferramenta com IA que apenas resume o que você escreveu. Não é aconselhamento jurídico.</p>
      </form>
      <div aria-live="polite" className="rounded-2xl border border-dashed bg-muted/40 p-6">
        {erro && <p role="alert" className="text-sm text-destructive">{erro}</p>}
        {!resumo && !erro && !loading && <p className="text-sm text-muted-foreground">O resumo do seu relato e as formas de contato aparecerão aqui.</p>}
        {loading && <p className="animate-pulse text-sm text-muted-foreground">Lendo seu relato…</p>}
        {resumo && (
          <>
            <Markdown text={resumo} />
            <div className="mt-6 rounded-xl border border-gold/50 bg-card p-4">
              <p className="text-sm font-semibold">Confira o resumo acima. Se estiver correto, envie para o escritório:</p>
              <a href={mensagemWhats(area, resumo)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground">Enviar resumo pelo WhatsApp</a>
              <p className="mt-2 text-xs text-muted-foreground">O WhatsApp abrirá com a mensagem pronta. É só tocar em enviar.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
