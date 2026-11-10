// Simulação de "Validando dados cadastrais" desativada no protótipo original (código comentado,
// mantido como estava no ComplementaryDataForm). Os handlers dependiam de accountType, socios,
// pjCompanyData, setHasDataErrors, setDataErrorMessage e setPjStep do formulário. Não é importado
// por nenhum arquivo; preservado para não alterar o CSS gerado (classes como md:py-8 só existem aqui).

export {};

/* 
// Simulation 1: Approve data and advance to Document Upload
const handleApproveData = () => {
  setIsValidatingData(false);
  setHasDataErrors(false);
  onSubmit({
    accountType,
    socios,
    companyName: pjCompanyData.razaoSocial,
    cnpj: pjCompanyData.cnpj,
    tipoEmpresa: pjCompanyData.tipoEmpresa,
  });
};

// Simulation 2: Data has errors / need adjustments
const handleSimulateDataErrors = () => {
  setIsValidatingData(false);
  setHasDataErrors(true);
  setDataErrorMessage(
    accountType === 'pj'
      ? 'Identificamos divergência nos dados cadastrais informados. Por favor, revise as informações destacadas.'
      : 'Identificamos inconsistência nos dados declarados. Por favor, revise as informações antes de prosseguir.'
  );
  if (accountType === 'pj') {
    setPjStep(1);
  }
};

// Validation Loading Screen (Data verification) - Mantido comentado conforme solicitado
if (isValidatingData) {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Validação Cadastral
          </span>
        </div>
      </header>

      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center space-y-6"
        >
          <div className="text-center py-6 md:py-8 space-y-8">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#004A2F]/10 animate-ping opacity-75" />
              <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#004A2F] border-r-[#FF7300] animate-spin" />
              <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#004A2F] relative z-10">
                <ShieldCheck size={36} className="text-[#FF7300] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Validando dados cadastrais
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                Estamos conferindo a consistência das informações fornecidas para prosseguir com a abertura da sua conta.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Controles de Simulação (Dados Cadastrais)
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleApproveData}
                  className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/15 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 size={15} />
                  Aprovar Dados (Sucesso)
                </button>

                <button
                  type="button"
                  onClick={handleSimulateDataErrors}
                  className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <AlertTriangle size={15} />
                  Ajustar Dados (Divergência)
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>
    </div>
  );
}
*/
