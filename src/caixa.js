

// Custos fixos
const CUSTOS_FIXOS = {
  aluguel: 400,
  insumos: 180 // café, velas, incensos
};

// Função para calcular o saldo do caixa de cada mês
function calcularCaixa(mensalidades) {
  return mensalidades.map(mes => {
    // Cada irmão regular paga 120 reais de mensalidade
    const qtdPagos = Array.isArray(mes.pagos) ? mes.pagos.length : 0;
    const receitas = qtdPagos * 120;
  const custos = CUSTOS_FIXOS.aluguel + CUSTOS_FIXOS.insumos;
    const saldo = receitas - custos;
    return {
      mes: mes.mes,
      ano: mes.ano,
      receitas,
      custos,
      saldo,
      pagos: mes.pagos,
      iregulares: mes.iregulares
    };
  });
}

// Exemplo de uso:
// fetch('mensalidades.json')
//   .then(r => r.json())
//   .then(mensalidades => {
//     const caixa = calcularCaixa(mensalidades);
//     console.log(caixa);
//   });

// Exporta para uso em outros scripts
if (typeof module !== 'undefined') {
  module.exports = { calcularCaixa, CUSTOS_FIXOS };
}
