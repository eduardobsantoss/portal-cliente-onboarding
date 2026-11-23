# Mapeamento Completo de Fluxos e Processos do Protótipo (GCI SCD / Ceres Agrofinance)

Este documento descreve detalhadamente a arquitetura de jornada, telas, regras de negócio, validações documentais e transições de estado do protótipo de abertura de conta digital e onboarding de crédito da **GCI SCD (Sociedade de Crédito Direto)** integrada ao ecossistema **Ceres Investimentos / Ceres Agrofinance**.

---

## 1. Visão Geral da Arquitetura da Aplicação

A aplicação está estruturada em dois macro-momentos sequenciais:

1. **Jornada de Onboarding & Abertura da Conta Digital** (Passos 1 a 6):
   - Desde a autenticação inicial até a liberação do número de agência e conta corrente digital GCI.
2. **Portal do Cliente & "Compl. Cadastro" (Middle Corporate e Simples/PME)**:
   - Após a abertura da conta, o cliente entra na Home com o menu liberado e o limite de R$ 2.000.000,00 já disponível para antecipação. O checklist documental ("Compl. Cadastro") é feito dentro do portal, sem travar a operação.

---

## 2. Diagrama de Estados da Jornada

```
[Landing GCI] ──("Acesse sua conta")──► [Login]
   │ ("Conheça o Portal" / "Registre-se")
   ▼
[Formulário "Abra sua conta" (e-mail, CPF/CNPJ, telefone)] ──("X")──► [Landing GCI]
   │ ("Concluir Cadastro": tela de processamento e sucesso, estilo Nubank)
   ▼
[Login]
   │
   ▼
[Confirmação do celular (SMS)]
   │
   ▼
[Biometria facial (QR Code + prova de vida)]
   │
   ▼
[Boas-vindas — "Portal Grupo Ceres" (TermsAgreement)]
   │
   ▼
[Dados Complementares para Abertura] (Pessoa Física ou Pessoa Jurídica)
   │ ├─ PJ: Razão Social, CNPJ, CNAE, Endereço, Faturamento, Quadro Societário (Sócios PF e PJ)
   │ └─ PF: Titular, Estado Civil Obrigatório (Cônjuge condicional), Endereço, Sócios vinculados
   ▼
[Envio de Documentos Iniciais de Abertura]
   │ ├─ Documentos da Empresa (Contrato/Estatuto, Ata se S/A, Procuração, Alteração/Certidão, Organograma, Endividamento,
   │ │   Balanço e DRE 2023-2025 + balancete 2026 — ou DAS para ME —, Faturamento 2023-2025 + período corrente)
   │ └─ Documentos dos Sócios (identidade, estado civil, residência e IRPF + recibo para sócios PF)
   ▼
[Validação e Análise Documental em Tela]
   │ ├─ Simulação: Aprovar Documentos ──► [Sua Conta Digital GCI está aberta!]
   │ ├─ Simulação: Reprovar Documentos ──► [Aviso de Não Aprovação / Reprovação]
   │ └─ Análise Pendente ───────────────► [Aguardando Análise Cadastral]
   ▼
[Sua Conta Digital GCI está aberta!]
   │ ├─ Dados da conta (Banco 414 - GCI SCD, Agência 0001, Conta Corrente)
   │ ├─ Bloco discreto para download do app Ceres Agrofinance (sem tags chamativas)
   │ └─ CTA: "Acessar meu portal"
   ▼
[Dashboard do Cliente / Portal GCI — Home]
   ├─ Menu liberado (Home, Minhas Informações, Carteira, Operações, Compl. Cadastro)
   ├─ Limite de R$ 2.000.000,00 disponível, "Antecipar Agora" abre a Solicitação de Operação
   ├─ Primeiro acesso: tour guiado ("Fazer tutorial" ou "Pular")
   └─ Aba "Compl. Cadastro" (Checklist enxuto)
        ├─ 1. Confirmação do telefone por SMS (já concluída no início)
        ├─ 2. Reconhecimento & Biometria Facial (já concluída no início)
        └─ 3. Quadro Societário / Partes Relacionadas (documento do cônjuge e sócios PJ)
```

---

## 3. Detalhamento Etapa por Etapa

### Etapa 0: Landing Page GCI (`LandingPage.vue`)
- **Objetivo**: Primeira tela da jornada. Apresenta o Portal do Cliente GCI (Hero, Soluções, Benefícios, Prova Social, Como Funciona, CTA final e Rodapé) antes de qualquer passo de cadastro. Origem: projeto `landing-page-gci`, portado para `src/flows/onboarding/landing/`.
- **Navegação**:
  - CTAs de cadastro ("Conheça o Portal", "Registre-se", "Registre-se agora", "Conheça nossas soluções") abrem o formulário **"Abra sua conta"** (`RegistrationModal.vue`, tela cheia): alternância PJ (CNPJ) / PF (CPF), e-mail, documento e telefone/WhatsApp, com máscaras e validação (e-mail válido, 11/14 dígitos, telefone com DDD). O "X" fecha e volta à landing. Ao **Concluir Cadastro**, o formulário trava e exibe uma tela de **processamento** (ícone girando e três passos: "Validando seus dados", "Criando seu acesso", "Preparando o seu portal") seguida de uma tela de **sucesso** animada ("Tudo certo, {nome}!"), que só avança pelo botão "Continuar" (não há avanço automático) (`RegistrationSubmitFeedback.vue`). Só então os dados são guardados em `registrationLead` e o fluxo segue para o **Login** (`login`), com o e-mail já preenchido.
  - "Acesse sua conta" / "Acesse o Portal do Cliente" levam ao **Login** (`login`).
- **Newsletter**: o modal de newsletter (`NewsletterModal.vue`) abre sozinho após 1,5 s para quem ainda não se inscreveu (controle via `localStorage`, chave `gci_newsletter_subscribed`) e simula o envio do lead (**mockado**: nenhuma requisição é feita nem dado sai do navegador, para evitar disparos acidentais).
- **Configuração**: `VITE_GA_MEASUREMENT_ID` (GA4). Veja `.env.example`.

---

### Etapa 1: Autenticação Inicial (`Login.vue`)
- **Objetivo**: Entrada segura do usuário titular ou operador do cadastro.
- **Campos**: E-mail institucional e senha de acesso.
- **Dados Mockados Padrão**: 
  - Nome: **Eduardo Santos**
  - E-mail: `eduardo.santos@ceresinvestimentos.com`
  - Perfil de Titular / Representante Legal.
- **Recursos Adicionais**: Recuperação de senha e modal de suporte rápido.
- **Navegação**: Depois de logar, o fluxo segue para a confirmação do celular.

---

### Etapa 1.1: Confirmação do Celular por SMS (`InitialPhoneVerification.vue`)
- **Objetivo**: Validar o telefone informado no cadastro (exibido mascarado) com um código de 6 dígitos (no protótipo, `123456`).
- **Navegação**: Ao confirmar, avança para a biometria facial. Permite voltar ao login.

### Etapa 1.2: Biometria Facial (`InitialFacialVerification.vue`)
- **Objetivo**: Reconhecimento facial com prova de vida, que antes ficava no "Compl. Cadastro" e agora é feito logo no início da jornada, depois do SMS.
- **Estrutura**: QR Code e link (copiar ou enviar por SMS) para abrir a captura no celular, com o botão discreto **"Simular Validação Facial"** (demo). Ao validar, mostra o cartão de sucesso (identificador, liveness score e status de auditoria) e avança sozinho para as boas-vindas.
- **Navegação**: Permite voltar ao login. No portal, o tópico "Reconhecimento & Biometria Facial" aparece já como **Concluído**, igual ao do telefone.

---

### Etapa 2: Boas-vindas (`TermsAgreement.vue`)
- **Objetivo**: Tela de boas-vindas, com o título **"Portal Grupo Ceres"** e um texto de acolhimento ("Que bom ter você por aqui! Seja bem-vindo...") que termina com *"Vamos iniciar a sua jornada de crédito?"*.
- **Estrutura**: O aceite formal dos termos (checkboxes de Termos Gerais e LGPD) está desativado por enquanto no protótipo; fica só o botão de continuar.
- **Navegação**: Permite retornar ao login ou avançar para o formulário complementar.

---

### Etapa 3: Dados Complementares para Abertura (`ComplementaryDataForm.vue`)
- **Objetivo**: Coleta cadastral aprofundada antes do upload documental.
- **Seleção de Modalidade**: Alternância entre **Pessoa Jurídica (PJ)** e **Pessoa Física (PF)**.

#### Fluxo Pessoa Jurídica (PJ):
1. **Dados da Empresa**:
   - Razão Social (ex: *Agro Industrial Soja & Milho Ltda*), CNPJ fictício validado, CNAE, Tipo Societário (Limitada, S/A, SLU, etc.), Data de Fundação, Faturamento Anual Estimado.
2. **Endereço da Sede**:
   - CEP com preenchimento automático, Logradouro, Número, Complemento, Bairro, Cidade e UF.
3. **Quadro Societário e Administradores (QSA)**:
   - Permite listar, editar e adicionar sócios (PF e PJ).
   - Mock padrão traz 3 sócios estratégicos:
     1. **Eduardo Santos** (Representante Legal / Titular)
     2. **Marcos Damasceno** (Sócio Diretor Comercial)
     3. **Cristiano Drigo** (Sócio Diretor Financeiro)
   - Para cada sócio: CPF/CNPJ, e-mail, telefone, cargo, endereço, data de nascimento, profissão, renda, estado civil e verificação de PEP (Pessoa Exposta Politicamente).

#### Fluxo Pessoa Física (PF):
- **Campos Obrigatórios**: Estado Civil é mandatório.
- **Regra Condicional de Cônjuge**:
  - Caso o estado civil seja selecionado como **Casado(a)** ou **União Estável**, os campos **Nome do Cônjuge** e **CPF do Cônjuge** tornam-se imediatamente visíveis e obrigatórios.
  - Para Solteiro(a), Divorciado(a) ou Viúvo(a), esses campos permanecem ocultos.
- **Sócios e Partes Vinculadas**: Mantém a possibilidade de cadastrar sócios vinculados (ex: Marcos Damasceno e Cristiano Drigo) para empresas familiares ou condomínios agrários.

---

### Etapa 4: Envio de Documentos Iniciais de Abertura (`OnboardingDocumentUpload.vue`)
- **Objetivo**: Recepção dos arquivos de identificação e societários para o processo de abertura de conta.
- **Especificações Técnicas de Arquivo**:
  - Formatos aceitos: **JPG, JPEG, PNG ou PDF (base64)** até **12MB** por arquivo.
- **Organização da tela**: os documentos ficam em um cartão por empresa e por sócio, **expansível/recolhível** como os tópicos do "Compl. Cadastro" (cabeçalho clicável com selo "x de y enviados" e chevron). Ao abrir a tela, só o cartão da empresa vem expandido; no ajuste de documentação, os cartões com documento recusado também abrem sozinhos.
- **Documentos da Empresa** (todos obrigatórios; cada item guarda o `typeId` do Pipefy para a integração futura):
  - *Contrato Social Consolidado* ou *Estatuto Social Vigente* (título e obrigatoriedade adaptados dinamicamente se o tipo de empresa for S/A ou Cooperativa).
  - *Ata de Eleição de Diretoria* (obrigatório condicionalmente se for S/A).
  - *Procuração* (opcional caso haja procurador constituído).
  - *Última Alteração Contratual / Certidão Simplificada* (com NIRE; alteração superior a 3 anos exige certidão simplificada).
  - *Organograma Societário* e *Demonstrativo de Endividamento Atualizado*.
  - *Balanço Patrimonial e DRE* de 2023, 2024 e 2025 + *Balancete do período corrente (2026)*, um upload por exercício.
  - *Declaração de Faturamento Mensal* de 2023, 2024 e 2025 + período corrente (2026), um upload por exercício.
  - **Empresa ME / Simples Nacional** (`simples.optante` da ReceitaWS): o Balanço/DRE/balancete é dispensado e os **DAS** (2023, 2024, 2025 e 2026 corrente) entram no lugar. Um botão discreto da demo ("Simular empresa ME / Simples") alterna os dois cenários.
  - Os itens por exercício aparecem agrupados sob um título comum ("Balanço Patrimonial e DRE", "Declaração de Faturamento Mensal", "DAS").
- **Documentos dos Sócios (Regra Estrita Implementada)**:
  - Sócios Pessoa Física também enviam *Comprovante de Residência* e *Declaração de IRPF + recibo de entrega*; a *Certidão de Casamento / União Estável* aparece conforme o estado civil.
  - **Eduardo Santos**: Já vem pré-carregado no protótipo com documento anexado para agilidade de demonstração.
  - **Marcos Damasceno**: Vem **em branco / não preenchido** (campo de número de documento vazio) e **sem arquivo enviado** (`uploaded: false`).
  - **Cristiano Drigo**: Vem **em branco / não preenchido** e **sem arquivo enviado** (`uploaded: false`).
  - Ambos apresentam campo para digitar o número do documento (CPF/RG/CNH) e botão direto de **Anexar Arquivo**.
- **Ações de Simulação para Testes**:
  - Menu de simulação rápida para aprovar, solicitar regularização ou reprovar documentos.

---

### Etapa 5: Validação e Análise Pendente (`AnalysisPending.vue` e `RejectionNotice.vue`)
- **Objetivo**: Tratar o tempo de resposta e compliance regulatório.
- **Tela de Análise Pendente (`AnalysisPending.vue`)**:
  - Informa que a análise de crédito e dados está em andamento.
  - Comunica envio de notificação por e-mail e SMS assim que concluído.
  - Permite fechar a aba com segurança sem perda do progresso.
- **Tela de Reprovação (`RejectionNotice.vue`)**:
  - Apresenta feedback formal dos motivos de inconformidade cadastral e orientações para reenvio ou contato com mesa de crédito.

---

### Etapa 6: Abertura da Conta Concluída (`AccountCreated.vue`)
- **Status**: etapa **desativada por enquanto** (comentada em `OnboardingRouter.vue`). A aprovação na análise segue direto para o Dashboard. O componente foi mantido para reativação futura.
- **Objetivo**: Entrega das credenciais bancárias da Conta Digital GCI.
- **Identificadores Entregues**:
  - **Instituição Financeira**: Banco 414 - GCI SCD
  - **Agência**: 0001
  - **Conta Corrente Digital**: Número gerado com dígito verificador e botão de cópia com um clique.
  - **Titularidade**: Razão Social e CNPJ cadastrados.
- **Card Promocional do App Ceres Agrofinance**:
  - Design neutro, discreto e elegante (sem faixas gritantes ou cores saturadas).
  - Sem tags ou menções chamativas de iOS e Android.
  - Botão secundário: *"Baixar app Ceres Agrofinance"*, que abre modal explicativo com QR Code e links oficiais da App Store e Google Play.
- **CTA Principal**: Botão de destaque direcionando para:
  - *"Acessar meu portal"* (encaminha para a Home do Dashboard).

---

### Etapa 7: Dashboard e Checklist "Compl. Cadastro" (`Dashboard.vue` e `DocumentVerification.vue`)

#### Comportamento das Abas do Dashboard:
- Ao ingressar no Dashboard pela primeira vez, o cliente cai na **Home**, já com o limite disponível (R$ 2.000.000,00) e apto a operar.
- **Menu liberado** (nenhuma aba é bloqueada):
  - *Home*, *Minhas Informações*, *Carteira*, *Operações* e *Compl. Cadastro* abrem normalmente.
  - Na Home, "Antecipar Agora" e "Fazer Antecipação" abrem a **Solicitação de Operação**; em *Minhas Informações*, o serviço "Desconto de Duplicata" também.
- **Aba "Compl. Cadastro"**:
  - Documentos e Checklist Oficial GCI. É opcional para operar: ao concluí-lo, o cliente volta à Home com o aviso de cadastro concluído.

#### O Checklist de "Compl. Cadastro" (`DocumentVerification.vue`):
Os documentos da empresa, os demonstrativos financeiros e os documentos pessoais dos sócios PF foram **movidos para o Envio de Documentos** (Etapa 4), porque o Pipefy abre o card uma única vez. A *Declaração de Relacionamento Bancário de Crédito* foi **removida**. O checklist ficou com três tópicos:

1. **Confirmação do Telefone por SMS**: já concluída no início da jornada, exibida como *Concluído*.
2. **Reconhecimento & Biometria Facial**: também feita no início (Etapa 1.2) e exibida como *Concluído*, igual ao telefone.
3. **Quadro Societário / Partes Relacionadas**:
   - *Sócios Pessoa Física*: apenas o *Documento de Identidade do Cônjuge (RG ou CNH)*, exibido e exigido condicionalmente quando há vínculo conjugal. Sem cônjuge, a parte exibe o aviso de que os documentos pessoais seguem no Envio de Documentos.
   - *Sócios e Avalistas Pessoa Jurídica*: *Contrato Social ou Estatuto Social atualizado* e *Documentação dos beneficiários finais* (documento de identificação + CPF/CNH).
   - *Representantes não sócios*: documento de identidade e comprovante de residência.

#### Primeiro acesso ao portal: tour guiado
- Na primeira entrada no Dashboard após a aprovação, um modal pergunta **"Fazer tutorial"** ou **"Pular"**.
- O tutorial destaca, em popups passo a passo, Home, Minhas Informações, Carteira, Operações, Compl. Cadastro e o cabeçalho. Dá para navegar (Anterior/Próximo), pular a qualquer momento ou fechar com Esc.
- A flag de "tutorial já visto" fica em memória; recarregar a página reinicia o tour. O menu de ajuda do cabeçalho traz "Refazer tutorial".

---

## 4. Liberação do Portal e Próximos Passos Operacionais
Quando todos os documentos do "Compl. Cadastro" são submetidos e validados:
1. O status do cadastro muda para **Verificado** e o cliente volta à Home com o aviso de cadastro concluído.
2. O portal já estava liberado para operar e continua exibindo o limite:
   - **Home**: Resumo financeiro, R$ 2.000.000,00 disponíveis e os botões de antecipação.
   - **Carteira**: Gestão de títulos, confirmações de entrega, canhoto digital e cessões de recebíveis.
   - **Operações**: Histórico de esteira de crédito, contratações de CPR, Capital de Giro e Duplicatas.
   - **Minhas Informações**: Dados cadastrais da empresa e QSA atualizados.
