<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- AI calls live in src/lib/*.server.ts (gateway, Responses API) and are exposed via createServerFn in *.functions.ts — keeps the API key server-only.

- "Conte seu caso" calls the Supabase Edge Function resumir-caso via fetch (VITE_SUPABASE_URL + anon/publishable key) — must work on static KingHost hosting, no Lovable AI.
