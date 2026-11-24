Componentes do theme-client. Ver theme-client-guidelines.md §3 e §7.

Só funcionam dentro de um ancestral com `class="theme-client"` (os tokens vivem nessa classe).

| Componente | Onde é usado |
|---|---|
| `TcPhotoSection` | Base de heros e painéis de foto (landing, `TcPageHero`) |
| `TcSection`, `TcBrandSection`, `TcSoftCard`, `TcGlassCard` | Seções e cards da landing |
| `TcEyebrow`, `TcDisplayHeading`, `TcStatusLabel` | Títulos e rótulos em todas as telas |
| `TcButton` | Ações primárias, secundárias e inversas em todas as telas |
| `TcTextField`, `TcCheckbox`, `TcSegmentedRadio` | Formulários (landing; onboarding e portal a partir do Prompt 07) |
| `TcDialog` | Cadastro, newsletter e documentos legais (landing); modais do portal (Prompts 18–20) |
| `TcPageHero` | Hero das telas de onboarding (SMS, Biometria, Boas-vindas, Dados, Documentos, Assinatura, Análise, Recusa) e do portal (Home e abas) |
| `TcStepper` | Rodapé do hero nas telas de onboarding, com `ONBOARDING_JOURNEY_STEPS` |
| `TcFloatingCard` | Bloco interativo sobre o hero `full` (código SMS, biometria, boas-vindas) |
| `TcContentSection` | Conteúdo abaixo de um hero `compact` (Dados, Documentos, Assinatura, abas do portal) |
| `TcActionBar` | Final de cada etapa de formulário (Voltar + ação primária) |
| `TcPageFooter` | Rodapé de todas as páginas, com os botões de demonstração no slot `demo` |
| `TcNotice` | Avisos e banners (substitui os banners esmeralda/âmbar/rosa) |
| `TcStatusChip` | Status em tabelas, cards e linhas de documento |
| `TcProgressBar` | Progresso de envio de documentos e do Compl. Cadastro |
| `TcEmptyState` | Listas e abas vazias (Operações, Carteira, documentos) |
| `TcIconButton` | Ações só com ícone: fechar, notificações, perfil, excluir arquivo |
| `TcSelectField` | Selects nativos nos formulários de Dados (tipo de empresa, UF, estado civil) e filtros |
| `TcFormSection` | Blocos de campos nas telas de Dados (empresa, endereço, sócio, pessoa física) e modais de formulário |
| `TcSubSteps` | Indicador Empresa › Endereço › Sócios dentro do formulário de Dados PJ |
| `TcPillTabs` | Filtros de status (Operações, Carteira) e abas dentro de modais de detalhe |
| `TcAccordion` | Grupos de documentos no envio, quadro societário e checklist do Compl. Cadastro (controlado pelo pai) |
| `TcFileRow` | Linha de cada documento dentro do `TcAccordion` |
| `TcDropzone` | Envio de XML na solicitação de operação e de arquivos em modais |
| `TcKpiTile` | Indicadores das abas Minhas informações, Carteira e Operações |
| `TcDataTable` | Tabelas de Carteira, Operações, sacados e títulos |
| `TcPagination` | Rodapé das tabelas com mais de uma página |
| `TcMenu`, `TcMenuItem` | Menu de notificações e de perfil do portal; seletor de grupo econômico |
| `TcToast`, `TcToastRegion` | Avisos temporários do portal (substituem os toasts do Dashboard) |

`TcButton` ganhou `size="compact"` (52px, sem círculo de seta) para ações dentro de avisos, barras de ferramentas e toasts.
