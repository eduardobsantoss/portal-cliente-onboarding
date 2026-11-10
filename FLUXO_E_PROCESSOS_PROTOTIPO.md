# Mapeamento Completo de Fluxos e Processos do Protótipo (GCI SCD / Ceres Agrofinance)

Este documento descreve detalhadamente a arquitetura de jornada, telas, regras de negócio, validações documentais e transições de estado do protótipo de abertura de conta digital e onboarding de crédito da **GCI SCD (Sociedade de Crédito Direto)** integrada ao ecossistema **Ceres Investimentos / Ceres Agrofinance**.

---

## 1. Visão Geral da Arquitetura da Aplicação

A aplicação está estruturada em dois macro-momentos sequenciais:

1. **Jornada de Onboarding & Abertura da Conta Digital** (Passos 1 a 6):
   - Desde a autenticação inicial até a liberação do número de agência e conta corrente digital GCI.
2. **Portal do Cliente & "Complete o seu Cadastro" (Middle Corporate e Simples/PME)**:
   - Acesso ao Dashboard com restrição preventiva de movimentação e operações até o envio e validação documental profunda (Checklist Oficial GCI).

---

## 2. Diagrama de Estados da Jornada

```
[Login] 
   │
   ▼
[Termos de Uso e Política de Privacidade]
   │
   ▼
[Dados Complementares para Abertura] (Pessoa Física ou Pessoa Jurídica)
   │ ├─ PJ: Razão Social, CNPJ, CNAE, Endereço, Faturamento, Quadro Societário (Sócios PF e PJ)
   │ └─ PF: Titular, Estado Civil Obrigatório (Cônjuge condicional), Endereço, Sócios vinculados
   ▼
[Envio de Documentos Iniciais de Abertura]
   │ ├─ Documentos da Empresa (Contrato/Estatuto, Ata de Eleição se S/A, Procuração opcional)
   │ └─ Documentos dos Sócios (Eduardo Santos pré-carregado; Marcos Damasceno e Cristiano Drigo limpos para upload)
   ▼
[Validação e Análise Documental em Tela]
   │ ├─ Simulação: Aprovar Documentos ──► [Sua Conta Digital GCI está aberta!]
   │ ├─ Simulação: Reprovar Documentos ──► [Aviso de Não Aprovação / Reprovação]
   │ └─ Análise Pendente ───────────────► [Aguardando Análise Cadastral]
   ▼
[Sua Conta Digital GCI está aberta!]
   │ ├─ Dados da conta (Banco 414 - GCI SCD, Agência 0001, Conta Corrente)
   │ ├─ Bloco discreto para download do app Ceres Agrofinance (sem tags chamativas)
   │ └─ CTA: "Continuar para completar meu cadastro"
   ▼
[Dashboard do Cliente / Portal GCI]
   ├─ Abas bloqueadas preventivamente (Home, Minhas Informações, Carteira, Operações) com aviso:
   │  "Conclua o preenchimento do seu cadastro para liberar o acesso ao portal."
   └─ Aba Ativa: "Compl. Cadastro" (Documentos e Checklist Oficial GCI)
        ├─ Seção 3: Documentos Cadastrais da Empresa
        ├─ Seção 4: Demonstrativos Financeiros & Contábeis (Regra Simples Nacional)
        ├─ Seção 5: Crédito & Relacionamento Bancário
        └─ Seção 6: Quadro Societário / Partes Relacionadas (Sócios PF com cônjuges e Sócios PJ)
```

---

## 3. Detalhamento Etapa por Etapa

### Etapa 1: Autenticação Inicial (`Login.tsx`)
- **Objetivo**: Entrada segura do usuário titular ou operador do cadastro.
- **Campos**: E-mail institucional e senha de acesso.
- **Dados Mockados Padrão**: 
  - Nome: **Eduardo Santos**
  - E-mail: `eduardo.santos@ceresinvestimentos.com`
  - Perfil de Titular / Representante Legal.
- **Recursos Adicionais**: Recuperação de senha e modal de suporte rápido.

---

### Etapa 2: Termos de Uso e Política de Privacidade (`TermsAgreement.tsx`)
- **Objetivo**: Consentimento formal conforme diretrizes de SCD do Banco Central (Bacen) e LGPD.
- **Estrutura**:
  - Leitura dos Termos Gerais de Abertura de Conta de Pagamento / Crédito.
  - Checkboxes obrigatórios de ciência e aceite dos termos.
  - Bloqueio do botão de prosseguir até a concordância integral.
- **Navegação**: Permite retornar ao login ou avançar para o formulário complementar.

---

### Etapa 3: Dados Complementares para Abertura (`ComplementaryDataForm.tsx`)
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

### Etapa 4: Envio de Documentos Iniciais de Abertura (`OnboardingDocumentUpload.tsx`)
- **Objetivo**: Recepção dos arquivos de identificação e societários para o processo de abertura de conta.
- **Especificações Técnicas de Arquivo**:
  - Formatos aceitos: **JPG, JPEG, PNG ou PDF (base64)** até **12MB** por arquivo.
- **Documentos da Empresa**:
  - *Contrato Social Consolidado* ou *Estatuto Social Vigente* (título e obrigatoriedade adaptados dinamicamente se o tipo de empresa for S/A ou Cooperativa).
  - *Ata de Eleição de Diretoria* (obrigatório condicionalmente se for S/A).
  - *Procuração* (opcional caso haja procurador constituído).
- **Documentos dos Sócios (Regra Estrita Implementada)**:
  - **Eduardo Santos**: Já vem pré-carregado no protótipo com documento anexado para agilidade de demonstração.
  - **Marcos Damasceno**: Vem **em branco / não preenchido** (campo de número de documento vazio) e **sem arquivo enviado** (`uploaded: false`).
  - **Cristiano Drigo**: Vem **em branco / não preenchido** e **sem arquivo enviado** (`uploaded: false`).
  - Ambos apresentam campo para digitar o número do documento (CPF/RG/CNH) e botão direto de **Anexar Arquivo**.
- **Ações de Simulação para Testes**:
  - Menu de simulação rápida para aprovar, solicitar regularização ou reprovar documentos.

---

### Etapa 5: Validação e Análise Pendente (`AnalysisPending.tsx` e `RejectionNotice.tsx`)
- **Objetivo**: Tratar o tempo de resposta e compliance regulatório.
- **Tela de Análise Pendente (`AnalysisPending.tsx`)**:
  - Informa que a análise de crédito e dados está em andamento.
  - Comunica envio de notificação por e-mail e SMS assim que concluído.
  - Permite fechar a aba com segurança sem perda do progresso.
- **Tela de Reprovação (`RejectionNotice.tsx`)**:
  - Apresenta feedback formal dos motivos de inconformidade cadastral e orientações para reenvio ou contato com mesa de crédito.

---

### Etapa 6: Abertura da Conta Concluída (`AccountCreated.tsx`)
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
  - *"Continuar para completar meu cadastro"* (encaminha diretamente para o Dashboard).

---

### Etapa 7: Dashboard e Checklist Oficial "Complete o seu Cadastro" (`Dashboard.tsx` e `DocumentVerification.tsx`)

#### Comportamento das Abas do Dashboard:
- Ao ingressar no Dashboard pela primeira vez, o cliente entra com status cadastral **não verificado / preliminar**.
- **Abas Bloqueadas**:
  - *Home*, *Minhas Informações*, *Carteira*, *Operações*.
  - Ao clicar em qualquer aba bloqueada, é exibido um aviso elegante: *"Conclua o preenchimento do seu cadastro para liberar o acesso ao portal."*
- **Aba Destacada e Ativa**:
  - **"Compl. Cadastro"** (Documentos e Checklist Oficial GCI).

#### O Checklist Documental Oficial da GCI (`DocumentVerification.tsx`):
Construído rigorosamente sobre as especificações do documento oficial da instituição, dividido em:

##### Seção 3: Documentos Cadastrais da Empresa
1. **Contrato Social ou Estatuto Social Vigente**:
   - Registrado na Junta Comercial ou órgão competente.
2. **Cópia da Ata de Eleição da Diretoria Vigente (só S/A)**:
   - Obrigatório exclusivamente para Sociedades Anônimas (S/A).
3. **Última Alteração Contratual / Certidão Simplificada**:
   - Com indicação expressa do nº do NIRE; se a alteração for superior a 3 anos, obrigatoriedade de certidão simplificada atualizada.
4. **Procuração Vigente**:
   - Condicional caso haja procurador constituído.
5. **Organograma Societário**:
   - Estrutura completa de participação societária até a identificação do beneficiário final (exigido para Middle Corporate e Simples/PME).

##### Seção 4: Demonstrativos Financeiros & Contábeis
- **Middle Corporate**:
  1. *Balanço Patrimonial e DRE* (últimos 4 exercícios) + balancete do período corrente.
  2. *Declaração de Faturamento Mensal* (últimos 4 exercícios + corrente até o mês anterior, assinada pelo contador responsável com CRC).
  3. *Demonstrativo de Endividamento Atualizado* (instituição financeira, modalidade, saldo devedor, garantias, taxa de juros, prazo de vencimento — papel timbrado com CNPJ, emissão em até 90 dias; SCR não substitui).
- **Simples / PME**:
  - Exatamente os mesmos itens, com uma única exceção documentada:
  - O item **Balanço Patrimonial e DRE** é marcado com a observação explícita do checklist: *"Não será obrigatório para empresas cadastradas pelo Simples Nacional."*
  - A *Declaração de Faturamento* e o *Demonstrativo de Endividamento* continuam **obrigatórios**.

##### Seção 5: Crédito & Relacionamento Bancário
- Item único para ambas as modalidades:
  1. **Declaração de Relacionamento Bancário de Crédito**:
     - Em papel timbrado da instituição, indicando banco, agência, conta corrente e contato direto do gerente comercial; datada e assinada em até 90 dias.
     - *(Extratos bancários soltos de 90 dias foram completamente removidos conforme determinação do checklist oficial).*

##### Seção 6: Quadro Societário / Partes Relacionadas
Auditoria completa para sócios, representantes, avalistas e cônjuges:
- **Para Sócios Pessoa Física (PF)**:
  1. *Documento de Identidade* (RG ou CNH).
  2. *Comprovante de Residência* (emissão em até 90 dias).
  3. *Declaração de IRPF + Recibo de Entrega RFB*.
  4. *Certidão de Casamento / Contrato de União Estável / Averbação de Divórcio* (texto exato do checklist).
  5. *Documento de Identidade do Cônjuge (RG ou CNH)*: exibido e exigido condicionalmente quando há vínculo conjugal.
- **Para Sócios e Avalistas Pessoa Jurídica (PJ)**:
  1. *Contrato Social ou Estatuto Social atualizado*.
  2. *Documentação dos beneficiários finais* (documento de identificação + CPF/CNH).

---

## 4. Liberação do Portal e Próximos Passos Operacionais
Quando todos os documentos do "Complete o seu Cadastro" são submetidos e validados:
1. O status da empresa muda para **Verificado / Limite Liberado**.
2. Todas as abas do portal são desbloqueadas:
   - **Home**: Resumo financeiro, limites disponíveis e antecipação de duplicatas (sem bordas alaranjadas indesejadas no card).
   - **Carteira**: Gestão de títulos, confirmações de entrega, canhoto digital e cessões de recebíveis.
   - **Operações**: Histórico de esteira de crédito, contratações de CPR, Capital de Giro e Duplicatas.
   - **Minhas Informações**: Dados cadastrais da empresa e QSA atualizados.
