# Portal do Cliente GCI — Onboarding

Protótipo da jornada de abertura de conta digital e do portal do cliente do Grupo Ceres Investimentos (GCI SCD).
Stack: **Vue 3** (`<script setup lang="ts">`), **Vite**, **Tailwind CSS 4**, `motion-v` e `lucide-vue-next`.

O fluxo começa na **landing page GCI** e segue para a confirmação do celular. Detalhes das telas e regras em
[FLUXO_E_PROCESSOS_PROTOTIPO.md](FLUXO_E_PROCESSOS_PROTOTIPO.md).

## Rodar localmente

**Pré-requisito:** Node.js 22+

1. Instale as dependências:
   `npm install`
2. (Opcional) Copie `.env.example` para `.env.local` e ajuste as variáveis (GA4 e newsletter da landing).
3. Rode o app:
   `npm run dev`

## Scripts

- `npm run dev` — servidor de desenvolvimento (porta 3000)
- `npm run build` — build de produção
- `npm run lint` — checagem de tipos com `vue-tsc`

## Estrutura

- `src/app` — `App.vue` e `OnboardingRouter.vue` (roteamento do fluxo por estado)
- `src/hooks/useOnboardingFlow.ts` — composable com o estado e a navegação do fluxo
- `src/flows/onboarding/*` — telas da jornada (landing, SMS, senha, login, termos, dados complementares, documentos, assinatura, análise, conta criada)
- `src/flows/portal/*` — portal do cliente (dashboard, solicitação de operação, cadastro complementar, verificação facial)
- `src/components` — componentes compartilhados
