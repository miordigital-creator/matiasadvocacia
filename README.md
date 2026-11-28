# Lucasmatiasadvrs

## 14. SEO TÉCNICO, ESTRUTURA HTML E DESEMPENHO

Implemente as melhores práticas de SEO técnico, acessibilidade, desempenho e experiência do usuário para a landing page do escritório Lucas Matias Advocacia.

### 14.1. Título SEO e meta description

Crie um título SEO único, descritivo e coerente com os serviços oferecidos e com a intenção de busca do usuário.

Utilize como referência:

Title:
"Lucas Matias Advocacia | Advogado Trabalhista e Previdenciário em Porto Alegre"

Crie uma meta description exclusiva, natural e persuasiva, que resuma os serviços, a localização e a modalidade de atendimento.

Meta description sugerida:
"Orientação jurídica em Direito do Trabalho e Previdenciário, com atendimento presencial em Porto Alegre e online. Conheça o escritório Lucas Matias Advocacia."

Requisitos:
- Não duplicar títulos ou meta descriptions.
- Evitar excesso de palavras-chave.
- Priorizar clareza, relevância e correspondência com a intenção de busca.
- Configurar corretamente o título e a descrição no HTML.
- Garantir que os metadados sejam específicos desta página.

### 14.2. Estrutura HTML semântica

Organize todo o documento HTML de forma semântica e acessível, utilizando corretamente os elementos HTML5.

Utilize, conforme apropriado:
- `<header>` para o cabeçalho.
- `<nav>` para a navegação principal.
- `<main>` para o conteúdo principal.
- `<section>` para as seções temáticas.
- `<article>` para conteúdos independentes, quando aplicável.
- `<footer>` para o rodapé.

Hierarquia de títulos:

- H1: deve existir apenas um H1 principal em toda a página.
- H2: deve identificar as seções principais.
- H3: deve identificar subseções e títulos dos cards quando necessário.

Utilize como H1 principal:

"Direito trabalhista e previdenciário com orientação clara e acessível."

Organize os demais títulos respeitando a hierarquia semântica, sem escolher níveis de título apenas por razões estéticas.

Não utilize H1, H2 ou H3 somente para aumentar ou diminuir o tamanho da fonte. Utilize CSS para controlar a apresentação visual.

Garanta que a hierarquia dos títulos seja lógica, consistente e compreensível por mecanismos de busca, leitores de tela e usuários.

### 14.3. Dados estruturados

Implemente dados estruturados em formato JSON-LD, utilizando os tipos Schema.org adequados à atividade profissional e ao conteúdo da página.

Avalie a utilização de:
- `LegalService`, se apropriado à representação do escritório.
- `Organization`, quando aplicável.
- `Person`, caso exista uma seção com informações profissionais verificadas do advogado.
- `BreadcrumbList`, somente se houver uma estrutura de navegação por breadcrumbs relevante.

Inclua, quando aplicável e confirmado:
- Nome do escritório.
- URL oficial da página.
- Logotipo.
- Endereço físico.
- Telefone de contato.
- Horário de funcionamento.
- Área geográfica atendida.
- Perfis oficiais nas redes sociais.

Utilize os seguintes dados fornecidos:

Nome: Lucas Matias Advocacia.

Endereço: Rua Dr. Flores, 323, sala 51, Porto Alegre/RS.

WhatsApp: +55 51 99249-1957.

Horário: segunda a sexta-feira, das 8h às 20h.

Instagram: https://www.instagram.com/matiasadvocaciars/

Perfil do Google:
https://share.google/UQiVHLwbqKCf5Lgwa

Regras:
- Não inventar CNPJ, número da OAB, coordenadas geográficas, avaliações, classificações ou outras informações não confirmadas.
- Não inserir dados estruturados de avaliações ou notas sem fonte válida e sem verificar se a marcação é elegível pelas diretrizes dos mecanismos de busca.
- Não criar marcação `Review` ou `AggregateRating` para simular avaliações ou contornar as políticas aplicáveis.
- Utilizar apenas propriedades compatíveis com o tipo Schema.org escolhido.
- Não misturar tipos de dados estruturados sem uma justificativa semântica.
- Validar a sintaxe JSON-LD e corrigir erros antes da publicação.

### 14.4. SEO local

Otimize a página para pesquisas relacionadas aos serviços efetivamente oferecidos pelo escritório em Porto Alegre/RS.

Considere expressões como:
- Advogado trabalhista em Porto Alegre.
- Advogado previdenciário em Porto Alegre.
- Direito do Trabalho em Porto Alegre.
- Direito Previdenciário em Porto Alegre.
- Orientação sobre direitos trabalhistas.
- Orientação sobre benefícios previdenciários.

Utilize essas expressões naturalmente nos títulos, textos e metadados, quando fizer sentido.

Não repetir palavras-chave artificialmente nem criar páginas com conteúdo duplicado.

Configure:
- URL canônica quando houver domínio definitivo.
- Meta tags Open Graph.
- Metadados de compartilhamento social.
- Texto alternativo descritivo para imagens relevantes.
- Links internos funcionais.
- Links externos pertinentes.
- Sitemap e robots.txt quando aplicáveis à publicação.
- URLs consistentes e acessíveis aos mecanismos de busca.

Não inventar um domínio oficial. Configure a URL canônica definitiva somente depois que o domínio estiver definido.

### 14.5. Otimização de imagens

Otimize todas as imagens da página para reduzir o tempo de carregamento sem comprometer a qualidade visual.

Implemente:
- Formatos modernos, como WebP ou AVIF, quando suportados.
- Dimensões adequadas ao espaço em que cada imagem será exibida.
- Imagens responsivas com `srcset` e `sizes`, quando aplicável.
- Atributos `width` e `height` para reduzir deslocamentos de layout.
- Carregamento tardio (`loading="lazy"`) para imagens fora da área inicial.
- Prioridade de carregamento adequada para a imagem principal, quando necessário.
- Texto alternativo acessível e descritivo para imagens informativas.
- Texto alternativo vazio (`alt=""`) para imagens puramente decorativas.

Não utilizar carregamento tardio na imagem principal se isso prejudicar o carregamento do conteúdo visível inicialmente.

Preserve a qualidade, as proporções e a identidade visual do logotipo original.

### 14.6. Desempenho e Core Web Vitals

Otimize a página para carregamento

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lucasmatiasadvrs.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f533112f-8d6b-4d92-ba5c-e2704d8ba3be).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


---

## Backend no Supabase — "Conte seu caso"

O formulário "Conte seu caso" chama a Edge Function `resumir-caso` do Supabase:

```text
https://ririqcrrridviwcgdieb.supabase.co/functions/v1/resumir-caso
```

- O código que roda na função está em `docs/supabase/resumir-caso.ts`.
- O passo a passo de publicação, os secrets (`GEMINI_API_KEY`, `ALLOWED_ORIGINS`)
  e um teste com `curl` estão em `docs/supabase/README.md`.
- A função usa Google Gemini e não depende de nenhum serviço da Lovable, então o
  site pode ser hospedado na KingHost mantendo o Supabase como backend.
