# Backend no Supabase — função `resumir-caso`

O formulário **"Conte seu caso"** (`src/components/Triagem.tsx`) envia o relato
para a Edge Function `resumir-caso` do Supabase e recebe de volta um resumo
organizado, sem aconselhamento jurídico.

Endereço usado pelo site:

```text
https://ririqcrrridviwcgdieb.supabase.co/functions/v1/resumir-caso
```

Corpo enviado: `{ "area": "trabalhista | previdenciario | outros", "relato": "..." }`
Resposta esperada: `{ "ok": true, "resumo": "..." }` ou `{ "ok": false, "erro": "..." }`

## Arquivo de referência

`docs/supabase/resumir-caso.ts` é a cópia do código que roda na função.
Ele **não** é publicado automaticamente: este projeto não cria Edge Functions
pelo repositório. O código precisa ser colado no painel do Supabase.

## Como publicar / atualizar a função

1. No painel do Supabase, abra **Edge Functions → resumir-caso → Code**.
2. Apague o conteúdo atual e cole o conteúdo de `docs/supabase/resumir-caso.ts`.
3. Clique em **Deploy**.
4. Em **Edge Functions → Secrets**, confira que existe um secret com o nome
   exatamente `GEMINI_API_KEY`.
5. Opcional: crie o secret `ALLOWED_ORIGINS` com o endereço do site, por
   exemplo `https://matiasadvocacia.lovable.app,https://seudominio.com.br`.
   Sem esse secret, qualquer origem é aceita.
6. Desligue **Verify JWT** na função: o site envia só a chave pública.

## Teste rápido

```bash
curl -s -X POST https://ririqcrrridviwcgdieb.supabase.co/functions/v1/resumir-caso \
  -H "Content-Type: application/json" \
  -H "apikey: SUA_CHAVE_PUBLICA" \
  -d '{"area":"trabalhista","relato":"Trabalhei dois anos sem registro em carteira e não recebi as verbas da demissão."}'
```

A resposta deve começar com `{"ok":true,"resumo":...`.

## Dependências

- Google Gemini (modelo `gemini-2.5-flash`) — exige `GEMINI_API_KEY`.
- Nenhum serviço da Lovable é usado nesse caminho, então o site pode ser
  hospedado na KingHost mantendo o Supabase como backend.
