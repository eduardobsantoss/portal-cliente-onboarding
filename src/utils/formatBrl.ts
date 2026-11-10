/** Valor em reais para o tooltip dos gráficos (ex.: "R$ 1.500"). */
export const formatBrlValue = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;

/** Rótulo de eixo em milhares (ex.: "R$ 2k"). */
export const formatBrlThousands = (value: number) => `R$ ${value / 1000}k`;
