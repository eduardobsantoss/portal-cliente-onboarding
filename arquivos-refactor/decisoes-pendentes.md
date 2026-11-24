# Decisões pendentes

Registro do que ficou em aberto durante o refactor para o theme-client, na ordem em que apareceu.
Cada item tem um **estado**: `Aberto` (precisa de decisão), `Aceito` (foi uma escolha consciente, só para ciência) ou `Resolvido`.

Legenda dos itens: **O que**, **Por que importa**, **Sugestão**.

---

## A. Antes do prompt 05 (ajustes no fluxo e na landing)

### A1. Texto de apoio do cadastro não bate mais com o fluxo — `Aberto`
- **O que:** o texto "Preencha os dados abaixo. Em seguida, vamos confirmar seu celular por SMS e você criará sua senha de acesso ao Portal do Cliente" foi mantido exatamente como pedido, mas a senha agora é criada no próprio formulário e o SMS vem depois do login.
- **Onde:** `RegistrationModal.vue` (constante `INTRO_TEXT`).
- **Sugestão:** trocar por algo como "Preencha os dados abaixo e crie sua senha. Depois, entre no portal e confirme seu celular por SMS."

### A2. Descrição do passo 01 de "Como funciona" foi reescrita — `Aberto`
- **O que:** troquei o texto para "Informe os dados da empresa e o seu contato e crie sua senha. Depois, entre no portal e confirme seu celular por SMS." para refletir a nova ordem.
- **Onde:** `HowItWorksSection.vue`. O arquivo `Claude outputs/cursor-theme-client-03-landing-textos.md` não foi atualizado.
- **Sugestão:** validar o texto com quem cuida do copy e, se mudar, atualizar também o arquivo de textos.

### A3. Senha do cadastro não é guardada nem validada depois — `Aceito`
- **O que:** a senha digitada no cadastro não segue no objeto `RegistrationLead` e o login não valida senha (é protótipo). O campo de login vem com o e-mail do cadastro e a senha em branco.
- **Sugestão:** quando houver back-end real, definir como o cadastro entrega a senha. Por ora, nada a fazer.

### A4. Todo login passa pelo SMS antes das boas-vindas — `Aberto`
- **O que:** hoje `login → SMS → boas-vindas` vale para qualquer login, inclusive de quem já concluiu o onboarding e volta pela tela de login (por exemplo, "Voltar ao login" da análise).
- **Sugestão:** se o SMS só deve aparecer na primeira entrada, é preciso um sinal de "primeiro acesso" no fluxo. Hoje não existe.

### A5. Cadastro sem campos obrigatórios, mas com checagem de formato — `Aberto`
- **O que:** campos vazios passam; o que é preenchido ainda é conferido (CNPJ e CPF válidos, e-mails iguais, telefone com DDD, senha forte, senhas iguais). O aceite dos termos no cadastro também é opcional.
- **Sugestão:** se a ideia é que nada bloqueie, remover também as checagens de formato. Se for voltar a exigir, a lista de itens está em `RegistrationModal.vue` (função `validate`).

### A6. Nome e CPF do cadastro ficam guardados, mas ninguém usa — `Aberto`
- **O que:** o cadastro coleta nome completo e CPF e os guarda em `registrationLead`, mas nenhuma tela seguinte os usa. Só o CNPJ é levado ao formulário de dados complementares.
- **Sugestão:** decidir se o nome e o CPF devem pré-preencher o primeiro sócio ou o representante legal.

### A7. Consulta de CNPJ roda sozinha ao abrir os dados complementares — `Aceito`
- **O que:** o CNPJ do cadastro dispara a consulta na ReceitaWS (limite de 3 consultas por minuto) a cada vez que o formulário é aberto. Há cache em memória, mas ele zera ao recarregar a página.
- **Sugestão:** nada por ora. Se houver recarregamentos frequentes nos testes, usar o botão de preencher com dados de exemplo.

### A8. Cadastro em telas pequenas ficou sem título visível — `Aberto`
- **O que:** com "Abra sua conta" comentado e o painel de foto escondido abaixo de 1024px, só o texto de apoio aparece no topo; o título da página (`aria-labelledby`) está no painel escondido.
- **Sugestão:** exibir um título curto em telas pequenas, ou aceitar a ausência.

### A9. Fechar o documento legal com Esc dentro do cadastro — `Aceito`
- **O que:** o documento (termos ou privacidade) abre dentro do diálogo do cadastro. O Esc fecha só o documento, e o cadastro continua aberto. Não foi testado em todos os navegadores.

### A10. Itens comentados que continuam no projeto — `Aceito`
- **O que:** ficaram comentados, sem apagar: newsletter (modal, timer, constantes e serviço), toggle PJ/PF do cadastro, título "Abra sua conta", criação de senha no router, aceite de termos e o visualizador de documentos na tela de boas-vindas.
- **Sugestão:** quando o fluxo estiver estável, uma limpeza separada pode remover o que não voltará (`TermsConsentCheckbox`, `TermsDocumentModal`, `useTermsAgreement`, `CreatePassword*`, `NewsletterModal`).

### A11. `Login.vue` ainda monta o `CreatePasswordModal` — `Aberto`
- **O que:** o modal é importado e montado, mas nunca é aberto (nada liga o estado). O prompt 08 manda mantê-lo "montado, sem mudanças".
- **Sugestão:** manter por enquanto e remover na limpeza de legado.

### A12. "Voltar ao login" na tela de SMS — `Aceito`
- **O que:** o botão do cabeçalho do SMS se chamava "Já possuo senha". Como o usuário já vem do login, troquei por "Voltar ao login". O prompt 09 deve decidir o rótulo final.

### A13. Arquivos fora do controle de versão — `Aberto`
- **O que:** `arquivos-refactor/` está sem commit. A pasta `Claude outputs/` está no `.gitignore`.
- **Sugestão:** decidir se `arquivos-refactor/` entra no repositório ou fica só local.

---

## B. Prompt 05 (componentes de layout) — feito

### B1. Valores do guia trocados por tokens — `Aceito`
O guia manda usar só tokens. Onde o valor do guia não tinha token, usei o mais próximo:

| Onde | Guia | Usado |
|---|---|---|
| `TcFloatingCard`, intervalo interno | 22px | 20px (`--space-5`) |
| `TcPageHero`, intervalo das ações do cabeçalho | 10px | 12px (`--space-3`) |
| `TcNotice`, título | 16px | 17px (`--text-md`) |
| `TcProgressBar`, altura da trilha | 6px | 6px, por cálculo (`--space-1` + metade) |
| `TcStepper`, intervalo entre etapas | 10px | 12px (`--space-3`) |

- **Sugestão:** se a diferença de 1 a 2px incomodar no visual, criar tokens `--space-2h` (10px) e `--text-md-sm` (16px) em `theme-client.css`.

### B2. Valores fixos que não têm token — `Aberto`
- **O que:** altura mínima do hero `compact` (360px), logo de 68px, `top: 120px` do toast e largura mínima do menu (280px).
- **Sugestão:** criar tokens (`--hero-min-compact`, `--logo-hero`, `--toast-top`, `--menu-min-width`) ou aceitar os valores fixos.

### B3. `scrim` do `TcPageHero` — `Aceito`
- **O que:** a prop `scrim` do `TcPhotoSection` substitui todo o véu, inclusive o da faixa superior. Em vez de mudar o `TcPhotoSection`, o `TcPageHero` junta `--scrim-photo-top` com o véu recebido. A landing não é afetada.

### B4. Dois conjuntos de etapas coexistem — `Aberto`
- **O que:** `ONBOARDING_PROGRESS_STEPS` (4 etapas, usado pelas telas antigas) e `ONBOARDING_JOURNEY_STEPS` (6 etapas, novo) vivem no mesmo arquivo.
- **Sugestão:** remover o antigo na limpeza de legado, depois do prompt 14.

### B5. Componentes ainda não vistos no navegador — `Aberto`
- **O que:** os componentes dos prompts 05 e 06 passaram em lint e build, mas nenhuma tela os usa, então ainda não foram renderizados de verdade.
- **Sugestão:** conferir cada um na primeira tela que usar (prompts 08 a 10 para os de hero, stepper e card flutuante).

### B6. Acessibilidade acrescentada além do pedido — `Aceito`
- `TcStepper` anuncia "(concluída)" para leitores de tela nas etapas já feitas; `TcSubSteps` faz o mesmo.

---

## C. Prompt 06 (componentes de formulário, listas, dados e sobrepostos) — feito

### C1. `TcToast` e `TcToastRegion` — `Aceito`
- **O que:** o prompt pedia que o `TcToast` fosse para o `<body>` e se fixasse no canto, e que a região só empilhasse. Como empilhar exige um contêiner comum, o `TcToastRegion` é quem vai para o `<body>`; dentro dele o `TcToast` é só o card. Sozinho, o `TcToast` ainda se teleporta e se fixa.
- **Por que importa:** quem usar vários toasts precisa envolvê-los em um `TcToastRegion` (uma vez, no `Dashboard`).

### C2. Fundo transparente da região de toasts — `Aceito`
- **O que:** a regra global `.theme-client` pinta o fundo de branco e não é "layered". A região e o toast avulso usam `background: transparent` inline, como o `TcDialog` já fazia.

### C3. `TcDataTable` — decisões de comportamento — `Aberto`
- A linha só fica clicável (cursor, foco por teclado, Enter) se quem usa escutar `rowClick`. Isso é detectado pelas propriedades do vnode, o que funciona, mas é menos explícito que uma prop `clickable`.
- Com `selectable`, o checkbox e a primeira coluna de dados ficam fixos na rolagem horizontal. O `aria-label` do checkbox da linha usa o valor da primeira coluna.
- **Sugestão:** se preferir explícito, trocar a detecção por uma prop `clickableRows`.

### C4. `TcPillTabs` ativa a aba ao mover com as setas — `Aceito`
- **O que:** setas e Home/End já selecionam a aba (ativação automática). O prompt não definia se deveria só mover o foco.

### C5. `TcAccordion` — nível do título fixo — `Aberto`
- **O que:** o cabeçalho usa `<h3>`. Em telas onde a hierarquia for diferente, o nível pode ficar errado.
- **Sugestão:** adicionar uma prop `headingLevel` se algum prompt posterior precisar.

### C6. `TcMenu` fecha com Tab — `Aceito`
- **O que:** Tab fecha o menu sem devolver o foco ao botão, como em menus de navegação comuns. O guia não especificava.

### C7. Valores trocados por tokens (prompt 06) — `Aceito`
- Padding das abas do `TcPillTabs`: 20px em vez de 18px. Chevron do `TcSelectField`: 18px por cálculo de tokens.

---
## D. Prompt 07 (primitivos compartilhados) — feito

Estratégia: cada primitivo em `components/ui`, `components/forms` e `constants/formStyles.ts` manteve **todas** as classes, props, slots e eventos antigos e ganhou classes `tc:` por cima. Fora de `.theme-client` nada muda. Conferido no CSS gerado: as classes `tc:` saem **depois** das equivalentes antigas (inclusive `sm:`, `focus:` e `hover:`), então vencem.

### D1. `@custom-variant tc` ficou em `theme-client.css` — `Aceito`
- **O que:** o prompt pedia a regra logo depois do bloco `@theme inline`, mas esse bloco está em `src/index.css`. Coloquei no fim de `theme-client.css`, que é onde o resto do tema vive, e o build compila normalmente.
- **Decisão pendente:** mover para `index.css` se preferir seguir o prompt ao pé da letra.

### D2. Novo token `--scrim-dialog` — `Aceito`
- **O que:** véu dos diálogos (`rgba(4, 26, 32, 0.72)`), usado por `TcDialog`, `Modal` e `ModalFrame`. O guia não trazia token para isso.

### D3. Falta token de fonte de 20px e de 16px — `Aberto`
- **O que:** título de seção (20px) usa `var(--space-5)` como tamanho de fonte, em `SectionTitle` e no `TcFormSection` (que era 24px e passou para 20px conforme §7.3). Não existe `--text-*` de 20px.
- **Sugestão:** criar `--text-xl: 1.25rem` e trocar os usos.

### D4. Valores fixos sem token — `Aberto`
- `26px` de padding lateral nos botões (já era assim no `TcButton`), borda de `1.5px`, chevron de `18px`, `leading-[1.55]` no texto do checkbox. Nenhum desses tem token.
- **Sugestão:** criar tokens (`--button-padding-x`, `--border-width-control`) ou aceitar como constantes do tema.

### D5. Rótulo de campo sem margem própria — `Aceito`
- **O que:** `FIELD_LABEL_CLASS` ganhou `tc:mb-0`; o espaço de 8px agora vem do `gap` do `FormField` (coluna). Telas que montam rótulo + input **sem** `FormField` não ganham esse espaço sozinhas.
- **Ação:** conferir nas telas dos prompts 08–19.

### D6. `FileUploadTrigger` perde a distinção de cores — `Aberto`
- **O que:** dentro do tema todo gatilho vira botão secundário. O âmbar de "Substituir arquivo/regularizar" e o azul de "Anexar" deixam de existir.
- **Decisão:** manter só um visual, ou diferenciar com ícone/texto nas telas de documentos (prompt 14).

### D7. `ValidationSpinner` não tem texto — `Aberto`
- **O que:** no tema vira só um `Loader2` de 32px em `--gci-base`. O guia fala em texto de apoio de 15px, mas o componente não tem slot para isso.
- **Sugestão:** quem usa passa o texto ao lado, ou adiciono um slot.

### D8. `Modal`/`ModalFrame` — véu por classe, não inline — `Aceito`
- **O que:** diferente do `TcDialog`, esses modais não são teleportados, então o véu usa `tc:bg-[var(--scrim-dialog)]`. Só funciona se a tela que os abre já estiver dentro de `.theme-client`.
- **Risco:** modal aberto fora de uma tela migrada continua com o visual antigo (esperado até o prompt da tela).

### D9. Padding do painel do `ModalFrame` — `Aberto`
- **O que:** o `ModalFrame` não impõe o padding de 36px do guia, porque cada modal que o usa já coloca cabeçalho e rodapé com padding próprio. `Modal` impõe 36px (24px em telas pequenas).
- **Ação:** conferir visualmente os modais de documentos e de assinatura.

### D10. Rodapé dos modais — `Aberto`
- **O que:** `ModalActionFooter` sempre pinta o botão de confirmar com o primário do tema, ignorando `confirm-class-name` (azul `bg-gci`, inclusive o `cn(...)` dinâmico do `CanhotoUploadModal`). O tema ignora também o `flex-1` do cancelar.
- **Risco:** se algum modal usar cor de alerta no confirmar (ex.: excluir), perde a diferença.

### D11. `CollapsibleSection` — padding do corpo — `Aberto`
- **O que:** o corpo ganhou um `div` com `tc:px/pb` de 28px. Quem já coloca padding no conteúdo passado pelo slot pode ficar com padding duplicado dentro do tema.
- **Ação:** conferir nas telas de dados complementares e de documentos.

### D12. `StatusFilterTabs` — acessibilidade e comportamento — `Aberto`
- **O que:** adicionei `role="tablist"`, `role="tab"` e `aria-selected`. As abas continuam só visuais (a primeira sempre ativa), como no original; um `tablist` que não troca de aba é enganoso para leitores de tela.
- **Sugestão:** ou ligar o filtro de verdade, ou tirar os papéis ARIA.

### D13. Classes passadas por quem usa podem brigar com o tema — `Aberto`
- **O que:** onde o pai passa classes de mesma propriedade (ex.: `button-class-name` do `CollapsibleSection`), o `tc:` vence só se a propriedade for a mesma e o `tc:` vier depois no CSS. Propriedades que o `tc:` não toca (ex.: cor de fundo no hover de um pai) podem vazar.
- **Ação:** verificar tela a tela.

### D14. Ícone de cadeado em campos bloqueados — `Aberto`
- **O que:** campos somente leitura ganham o fundo `--surface-soft` e a borda suave, mas não o ícone de cadeado. Fica para o prompt 11.

### D15. Acessibilidade acrescentada além do pedido — `Aceito`
- `aria-label="Fechar"` e ícone com `aria-hidden` em `ModalHeader`/`ModalTitleBar`; `aria-label` no botão de remover do `PartnerCard`; `aria-expanded` no `CollapsibleSection`; `aria-hidden` nos ícones decorativos.

### D16. Cuidado com `tc:hover:` — `Aceito`
- **O que:** regras `:hover` antigas têm especificidade maior que uma classe simples, então cada `hover:` antigo precisou de um `tc:hover:` correspondente (feito nos botões, abas, cabeçalhos e itens). Se alguém acrescentar um `hover:` novo num primitivo, precisa acrescentar o par `tc:hover:`.

### D17. `ListSectionHeader`, `PartnerCard`, `PepField`, `CorrespondenceAddressSection` — só espaçamento e fundo — `Aceito`
- **O que:** conforme o prompt, só espaçamento, raio e fundo. Os botões internos do `PartnerCard` ficaram com estilo de ícone/texto sutil, sem seguir um componente `Tc*` específico (não existe um equivalente).

### D18. `FileUpload.vue` — `Aceito`
- Não mexi: o `<input>` é invisível, não há o que estilizar.

### D19. Ainda não visto no navegador — `Aberto`
- **O que:** lint e build passam, e a ordem do CSS foi conferida no arquivo gerado, mas nenhuma tela migrada usa esses primitivos ainda, então o visual `tc:` só dá para ver nos prompts 08 em diante. Telas atuais (fora a landing) não devem ter mudado.

---

## E. Prompt 08 (Login) — feito

### E1. `TcTextField` ganhou dois slots, não só um — `Aberto`
- **O que:** o prompt permitia só o slot `trailing` (botão de mostrar senha). Mas o link "Esqueci a senha" precisa ficar à direita do rótulo, e o `TcTextField` só tinha o texto `hint`. Acrescentei também o slot `label-aside`, que por padrão continua mostrando `hint` (nenhum uso existente muda).
- **Decisão:** aceitar os dois slots, ou montar a linha do rótulo da senha direto no `LoginForm`.

### E2. Parágrafo de apoio com 17px em vez de 16px — `Aberto`
- **O que:** não existe token de 16px (`--text-base` é 15px, `--text-md` é 17px). Usei `--text-md`. Mesmo caso do D3.

### E3. Medidas de layout sem token — `Aceito`
- Largura do formulário (440px), base das colunas (440px e 560px) e altura da logo (60px) ficaram como valores fixos, como já acontece nos outros componentes do tema. O padding lateral de 44px foi composto por tokens (`--space-9` + `--space-2`).

### E4. Padding lateral menor em telas pequenas — `Aceito`
- **O que:** o spec manda 44px dos lados, o que deixa só cerca de 250px de conteúdo num celular. Abaixo de 640px uso `--space-2`; a partir daí, os 44px do spec.

### E5. Véu da foto escrito com `color-mix` — `Aceito`
- **O que:** o spec traz `rgba(8,60,74,…)`. Escrevi `color-mix(in srgb, var(--gci-base) 50%, transparent)` para não ter cor fixa; o resultado é o mesmo.

### E6. Campo de e-mail virou `type="email"` com `novalidate` — `Aceito`
- **O que:** o spec pede `type="email"`. Para o navegador não passar a barrar o envio com e-mail fora do padrão (o protótipo nunca barrou), o `<form>` tem `novalidate`.

### E7. "Lembrar neste dispositivo" continua sem efeito — `Aceito`
- **O que:** agora tem estado local (`remember`), mas nada o usa. O mesmo vale para o link "Esqueci a senha" (`href="#"`).

### E8. Constante `LOGIN_HERO_IMAGE_URL` ficou sem uso — `Aberto`
- **O que:** mantida em `constants/login.ts`, como o prompt pediu, mas nenhum arquivo a importa mais.
- **Ação:** apagar na limpeza final.

### E9. Foto do painel é decorativa — `Aceito`
- **O que:** o painel tem `aria-hidden` e a foto não tem texto alternativo (antes era "Agro Business").

### E10. `CreatePasswordModal` continua montado — `Aberto`
- Mantido sem mudanças, como o prompt manda. Nada o abre hoje (ver A11). O modal continua com o visual antigo.

---
### E11. Ajuste pedido depois do prompt 08: proporção 35/65 e véu na foto — `Aceito`
- **O que:** a partir de 1024px, formulário e foto dividem a linha em 35% / 65% (antes, perto de 43% / 57%). Padding lateral da coluna do formulário caiu para `--space-6` nessa faixa, e o formulário passou a ter largura máxima de 560px (centralizado) para a foto ficar perto dos campos. O véu da foto agora é o `--scrim-photo` padrão do tema (azul forte no lado esquerdo, que encosta no formulário, e mais leve à direita), no lugar do véu fino de baixo para cima do spec.
- **Decisão:** se o lado direito da foto ainda parecer claro, dá para criar um token de véu próprio para o login (mais fechado e uniforme).

---

## F. Prompt 09 (SMS e Biometria) — feito

Antes do prompt, a pedido: foram **removidos** o texto "Ainda não tem acesso? Fale com a equipe de atendimento: (34) 3311-0140" do login e a logo foi trocada pela horizontal (texto maior), com 96px de altura (112px a partir de 768px). O comentário no `Login.vue` guarda o texto removido.

### F1. Peças compartilhadas com o portal ganharam `theme-client` na raiz — `Aberto`
- **O que:** `SmsVerification.vue` e `FacialVerification.vue` aparecem também no checklist "Compl. Cadastro" do portal, que ainda não foi migrado e não tem os tokens. Para não quebrar o portal até o prompt 20, as duas raízes têm a classe `theme-client` com fundo transparente. O prompt não pedia isso.
- **Ação:** remover as duas classes quando o portal for migrado (prompt 20).

### F2. Nova moldura `OnboardingHeroFrame.vue` — `Aceito`
- **O que:** as duas telas dividem a mesma moldura (hero, botão "Voltar ao login", passo, título, parágrafo, stepper e rodapé). Em vez de copiar, criei `src/components/layout/OnboardingHeroFrame.vue`. O `OnboardingPageShell.vue` continua no projeto, sem uso nessas telas.

### F3. `TcPageHero` ganhou a prop `asideBasis` — `Aceito`
- **O que:** o prompt pede 520px de base para o cartão da biometria; o componente tinha 440px fixos. A prop é opcional e o padrão continua 440px.

### F4. Véu horizontal igual ao padrão — `Aceito`
- **O que:** o guia manda passar o véu horizontal pela prop `scrim`. Os valores dele são os mesmos de `--scrim-photo` (0,94 / 0,70 / 0,20), que o hero já usa sozinho. Por isso a moldura não passa `scrim`; o resultado é o mesmo, sem cor fixa.

### F5. Valores sem token — `Aberto`
- Telefone mascarado com 24px (`--text-lg`) em vez de 26px; números do código com 28px usando `--space-7` como tamanho de fonte (mesmo caso do D3); QR code com 200px e ícone de alerta com 14px fixos.

### F6. Campos do código aparecem só depois do envio — `Aceito`
- **O que:** antes, os campos já surgiam enquanto o botão mostrava "Enviando código..." (cerca de meio segundo). Agora só aparecem com o código enviado, como o prompt descreve.

### F7. Textos que mudaram por pedido do prompt — `Aceito`
- Aviso "Ambiente Seguro GCI SCD" removido; sua frase virou o texto cinza embaixo do cartão. "Digite o código de 6 dígitos enviado por SMS" e "Enviamos o código para ..." viraram só "Código de 6 dígitos". "Reenviar código em 42s" virou "Reenviar em 0:42". "Não é o seu número? Fale com o suporte" virou "Não é o seu número?". Botões "Copiar link para celular" e "Enviar link por SMS" viraram "Copiar link" e "Enviar por SMS".
- A prop `maskedPhone` do `SmsOtpPanel` continua existindo, mas não é mais mostrada ali.

### F8. "Código enviado" virou texto simples — `Aceito`
- **O que:** o selo verde ficou como linha de status pequena (`role="status"`), porque o prompt não define esse estado.

### F9. Texto do passo 1 da biometria diz "ao lado" — `Aberto`
- **O que:** "aponte para o QR Code ao lado" foi mantido, mas no layout empilhado o QR fica **acima**. O prompt manda manter os textos.
- **Sugestão:** trocar por "aponte para o QR Code" nos dois layouts.

### F10. Campos do código com erro ficam vermelhos — `Aceito`
- **O que:** o guia só pede `aria-invalid`; pintei a borda com `--danger-base` para o erro ser visível sem depender do texto.

### F11. Linha de varredura do QR code — `Aceito`
- **O que:** era laranja com brilho. Como o laranja só vale no centro do QR, ficou azul e some com "reduzir movimento".

### F12. Botão de simulação da biometria — `Aceito`
- **O que:** no onboarding ele sai do cartão e vai para o rodapé da página. O `FacialVerification` expõe `simulateScan` e `isSimulating` (`defineExpose`) e a tela chama pelo rodapé. No layout `row` (portal) a barra continua dentro do componente, só reestilizada.

### F13. Modal de suporte agora vai para o `<body>` — `Aceito`
- **O que:** o `SupportFaqModal` está dentro do hero, que cria um contexto de empilhamento; o rodapé podia aparecer por cima do fundo escuro. Coloquei um `Teleport`. O modal em si continua com o visual antigo.

### F14. Toast do SMS simulado — `Aceito`
- **O que:** agora é um `TcToast` no canto superior direito, com botão de fechar. O toast some sozinho em 12s, como antes. Em celular ele cobre o título enquanto aparece.

### F15. Portal: visual das peças compartilhadas — `Aberto`
- **O que:** o checklist "Compl. Cadastro" vai mostrar o SMS e a biometria já no visual novo, dentro de um cartão antigo (mistura de estilos até o prompt 20). Não consegui abrir o checklist no navegador; só o lint passou.
- **Ação:** conferir o checklist depois deste prompt.

---

## G. Prompt 10 (Boas-vindas) — feito

### G1. Sem rodapé de página — `Aceito`
- **O que:** o prompt manda o `TcPageFooter` abaixo do hero. Como o rodapé foi removido das telas de SMS e biometria a pedido, a mesma moldura (`OnboardingHeroFrame`) vale aqui: sem "Atendimento" e sem "© 2025–2026".

### G2. A moldura ganhou props — `Aceito`
- **O que:** `OnboardingHeroFrame` agora aceita `eyebrow` (padrão "Passo N de 6"), `doneUntil` (etapas concluídas do stepper) e `descriptionMeasure` (padrão 40ch; aqui 44ch). Nas telas de SMS e biometria nada muda.

### G3. Termos continuam desligados — `Aceito`
- **O que:** `TermsAgreement.vue` mantém comentados, como antes, os imports, o composable, o modal de documentos e o checkbox de aceite. `useTermsAgreement.ts`, `TermsConsentCheckbox.vue`, `TermsDocumentModal.vue` e `TermsDocumentBody.vue` seguem no projeto. O aceite está só na landing.

### G4. Stepper sem etapa atual — `Aceito`
- **O que:** `current = 0` e `doneUntil = 2`: Celular e Biometria concluídas, nenhuma em andamento, sem o ponto laranja.

### G5. Valores sem token — `Aberto`
- "Dados da empresa" com 24px (`--text-lg`) em vez de 26px, como no passo SMS (F5).

### G6. Nome do arquivo e da tela ainda dizem "termos" — `Aberto`
- **O que:** a pasta `flows/onboarding/termos/`, o componente `TermsAgreement` e a view `'terms'` do fluxo mantêm o nome antigo, embora a tela seja só de boas-vindas.
- **Sugestão:** renomear numa limpeza final, junto com os itens comentados (A10).

---
