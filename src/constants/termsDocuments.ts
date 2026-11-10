import type { TermsDocument, TermsDocumentType } from '@/types/terms';

export const TERMS_DOCUMENTS: Record<TermsDocumentType, TermsDocument> = {
  terms: {
    modalFileName: 'Termos_de_Uso_e_Condicoes_Gerais.pdf',
    pagesLabel: '8 páginas',
    footerLabel: 'Documento de Termos de Uso',
    downloadFileName: 'Termos_de_Uso_Grupo_Ceres.pdf',
    downloadTitle: 'TERMOS DE USO E CONDIÇÕES GERAIS DE ACESSO - GRUPO CERES INVESTIMENTOS',
    heading: 'Termos de Uso e Condições Gerais de Acesso à Plataforma Digital',
    subtitle: 'Grupo Ceres Investimentos • Versão 2026.1',
    blocks: [
      { kind: 'heading', text: '1. OBJETO E FINALIDADE' },
      { kind: 'paragraph', text: 'O presente instrumento estabelece as regras e condições gerais para acesso, credenciamento, envio de documentos e utilização das funcionalidades digitais do Grupo Ceres Investimentos destinadas a produtores rurais, revendas agrícolas e pessoas jurídicas.' },
      { kind: 'heading', text: '2. CADASTRO E VERACIDADE DAS INFORMAÇÕES' },
      { kind: 'paragraph', text: 'O usuário e os representantes legais outorgados declaram sob as penas da lei a exatidão, integralidade e autenticidade de todos os documentos (Contrato Social, Balanços, DRE, Extratos e Comprovantes) submetidos à esteira de aprovação.' },
      { kind: 'heading', text: '3. SEGURANÇA DAS CREDENCIAIS E ACESSO' },
      { kind: 'paragraph', text: 'As credenciais de acesso, assinaturas eletrônicas e validações biométricas faciais são de uso exclusivo e intransferível, sendo de responsabilidade do cliente a confidencialidade de seus acessos.' },
      { kind: 'heading', text: '4. ANÁLISE DE CRÉDITO E LIMITES' },
      { kind: 'paragraph', text: 'A submissão de cadastro não vincula a concessão compulsória de limites, ficando condicionada à avaliação técnica e aprovação dos comitês de risco e compliance do Grupo Ceres Investimentos.' },
    ],
  },
  privacy: {
    modalFileName: 'Politica_de_Privacidade_e_Protecao_de_Dados.pdf',
    pagesLabel: '6 páginas',
    footerLabel: 'Documento de Política de Privacidade',
    downloadFileName: 'Politica_de_Privacidade_Grupo_Ceres.pdf',
    downloadTitle: 'POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD) - GRUPO CERES INVESTIMENTOS',
    heading: 'Política de Privacidade e Proteção de Dados Pessoais (LGPD)',
    subtitle: 'Grupo Ceres Investimentos • Em Conformidade com a Lei nº 13.709/2018',
    blocks: [
      { kind: 'heading', text: '1. ESCOPO E COMPROMISSO COM A PRIVACIDADE' },
      { kind: 'paragraph', text: 'Esta Política de Privacidade esclarece como o Grupo Ceres Investimentos coleta, armazena, trata e protege os dados pessoais e sensíveis dos sócios, avalistas e representantes legais no âmbito de suas atividades financeiras e cadastrais.' },
      { kind: 'heading', text: '2. DADOS COLETADOS E FINALIDADES ESPECÍFICAS' },
      { kind: 'paragraph', text: 'Os dados cadastrais, documentos societários, demonstrativos fiscais e biometria facial são coletados para fins legítimos de:' },
      { kind: 'list', items: [
        'Identificação inequívoca e prevenção a fraudes (KYC / PLD-FT);',
        'Análise de risco de crédito e formalização de garantias e contratos;',
        'Cumprimento de exigências legais e regulatórias do Banco Central do Brasil e CVM.',
      ] },
      { kind: 'heading', text: '3. SEGURANÇA E RETENÇÃO DE DADOS' },
      { kind: 'paragraph', text: 'Todos os dados trafegam e permanecem armazenados em ambiente protegido com criptografia de ponta a ponta, com controles restritos de privilégios de acesso e retenção apenas pelo período estritamente necessário à execução dos serviços e obrigações legais.' },
      { kind: 'heading', text: '4. DIREITOS DOS TITULARES' },
      { kind: 'paragraph', text: 'Os titulares dos dados têm garantidos os direitos de confirmação de tratamento, acesso, correção de dados incompletos e revogação de consentimentos nos termos previstos na LGPD.' },
    ],
  },
};
