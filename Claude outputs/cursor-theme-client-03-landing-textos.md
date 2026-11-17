# Prompt 03 — landing copy (approved rewrite)

Run after Prompt 02. Text only: do not change layout, classes or logic.

## Goal

Replace the landing copy with the approved text below, which describes what the Portal do Cliente actually does. Copy the Portuguese strings **exactly**; do not paraphrase, shorten or translate.

## Rules

- Change only the strings listed. Anything not listed stays as it is.
- Do not add promises about speed or automation ("em poucas horas", "aprovação automatizada"). They were removed on purpose.
- In "Nossos números", "500+ clientes ativos" and "R$ 8,5B+" stay for now: marketing is confirming the figures.

## Replacements

| File | Current | New |
|---|---|---|
| `HeroSection.vue` — eyebrow | Grupo Ceres Investimentos | Portal do Cliente GCI |
| `HeroSection.vue` — title | Portal do Cliente / GCI | Line 1: `Antecipe seus recebíveis,` · Line 2: `100% digital.` |
| `HeroSection.vue` — paragraph | Capital de giro disponível em poucas horas, por meio de… | Envie suas notas em XML, acompanhe cada etapa da operação e assine digitalmente, tudo na sua Conta Digital GCI. |
| `HeroSection.vue` — check 1 | Upload das duplicatas em segundos | Envio das duplicatas por XML |
| `HeroSection.vue` — check 2 | Acompanhamento online da operação | Acompanhamento de cada etapa |
| `HeroSection.vue` — check 3 | Aprovação automatizada | Assinatura digital |
| `SolutionsSection.vue` — eyebrow | Nossas Soluções | Soluções |
| `SolutionsSection.vue` — title | Para cada necessidade, uma solução | Line 1: `O que você faz` · Line 2: `no portal` |
| `SolutionsSection.vue` — subtitle | Conhecemos o agro por dentro. Portfólio completo and integrado… | *(remove the subtitle)* |
| `SolutionsSection.vue` — card 1 | Funding para o Agro / Soluções de crédito customizadas… | **Desconto de Duplicata** / Envie o XML, confira o resumo e acompanhe até a liberação. |
| `SolutionsSection.vue` — card 2 | Conta e Investimentos / Gestão e rentabilização de caixa… | **Carteira** / Seus títulos, sacados e pendências em um só lugar. |
| `SolutionsSection.vue` — card 3 | Proteção Patrimonial / Estratégias inteligentes… | **Conta Digital GCI** / Aberta online, com seus dados sempre à mão. |
| `BenefitsSection.vue` — item 1 | Inovação Fintech / … | **Tudo online** / Do cadastro à assinatura, sem sair do portal. |
| `BenefitsSection.vue` — item 2 | Atendimento Personalizado / … | **Etapas visíveis** / Envio, análise, assinatura e liberação: você vê em que ponto está cada operação. |
| `BenefitsSection.vue` — item 3 | Resultados Comprovados / … | **Pendências resolvidas no portal** / Canhoto e reconhecimento do sacado são tratados ali mesmo. |
| `BenefitsSection.vue` — item 4 | Segurança e Transparência / … | **Limite à vista** / Seu limite e o quanto já foi usado, sempre na tela inicial. |
| `BenefitsSection.vue` — item 5 | Suporte Especializado / … | **Dados protegidos** / Tratados de acordo com as normas da LGPD. |
| `BenefitsSection.vue` — item 6 | Presença Nacional / … | **Atendimento** / Dúvidas frequentes e pedido de ligação direto no portal. |
| `HowItWorksSection.vue` — step 1 | Preencha seus dados / … | **Faça seu cadastro** / Informe e-mail, CPF ou CNPJ e telefone. Confirme por SMS e crie sua senha. |
| `HowItWorksSection.vue` — step 2 | Fale com um especialista / … | **Envie dados e documentos** / Da empresa e dos sócios, com assinatura digital da abertura. |
| `HowItWorksSection.vue` — step 3 | Comece a crescer / … | **Acompanhe a análise** / Com a conta aprovada, o portal é liberado para você operar. |
| `SocialProofSection.vue` — stat 1 | 10+ / ANOS DE MERCADO | **7+** / ANOS DE MERCADO |
| `SocialProofSection.vue` — stat 2 | R$ 2B+ / EM ATIVOS SOB GESTÃO | **R$ 8,5B+** / EM ATIVOS SOB GESTÃO |
| `SocialProofSection.vue` — paragraph | Desde 2013 construindo uma trajetória… | Desde 2019 construindo uma trajetória de sucesso impulsionada pela confiança de nossos parceiros. |
| `BenefitsSection.vue` — title | Tradição do Agro / com inovação de Fintech | Line 1: `Seu dia a dia` · Line 2: `sem planilha nem e-mail` |
| `HowItWorksSection.vue` — title | Simples, rápido e / sem burocracia | Line 1: `Três passos` · Line 2: `para abrir sua conta` |
| `CallToActionSection.vue` — paragraph | Junte-se a centenas de empresas… para potencializar seus investimentos e proteger seu patrimônio. | Junte-se a centenas de empresas e produtores que já antecipam seus recebíveis com o Grupo Ceres. |
| `CallToActionSection.vue` — title | Pronto para transformar seus resultados? | Line 1: `Pronto para antecipar` · Line 2: `seus recebíveis?` |

## Icons (`lucide-vue-next`)

The old icons no longer match the new titles. Use exactly these:

| Item | Icon |
|---|---|
| Desconto de Duplicata | `FileText` |
| Carteira | `Wallet` |
| Conta Digital GCI | `Landmark` |
| Tudo online | `MonitorSmartphone` |
| Etapas visíveis | `ListChecks` |
| Pendências resolvidas no portal | `CircleCheck` |
| Limite à vista | `Gauge` |
| Dados protegidos | `ShieldCheck` |
| Atendimento | `Headset` |

## Button labels (one name per action)

Every CTA that opens the registration form reads **Abra sua conta**. Every CTA that goes to login reads **Acesse sua conta**. This replaces: "Registre-se", "Conheça o Portal", "Conheça nossas soluções", "Abrir minha conta agora", "Registre-se agora" → `Abra sua conta`; "Acesse o Portal do Cliente" → `Acesse sua conta`.

## `RegistrationModal.vue` — content only (do not restyle it in this prompt)

| Part | Current | New |
|---|---|---|
| Left panel title | Soluções financeiras estruturadas com a Ceres. | Line 1: `Sua conta digital` · Line 2: `em poucos passos.` |
| Left panel paragraph | Faça seu cadastro de forma simples, rápida e 100% digital… | *(remove)* |
| Left panel items | Confirmação por celular · Senha do Portal do Cliente · Privacidade & Proteção | Keep only **Privacidade & Proteção** |
| Note above the submit button | Após clicar em Concluir Cadastro, enviaremos um código… | `* campo obrigatório` |
| Submit button | Concluir Cadastro / Enviando Cadastro... | `Concluir cadastro` / `Enviando cadastro...` |

The intro paragraph on the right ("Preencha os dados abaixo. Em seguida, vamos confirmar seu celular por SMS…") stays: it is now the only place that explains the next steps.

Unchanged on purpose: the footer links and the newsletter modal text.

## STOP and ask before implementing if

- The hero title wraps to more than two lines per line group at 1440px. Report it; do not shrink the font on your own.

## Done when

- `npm run lint` passes.
- Report the files changed and any icon mismatch.
