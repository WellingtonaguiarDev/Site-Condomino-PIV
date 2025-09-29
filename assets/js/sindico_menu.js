// 🔹 Área de conteúdo principal
const content = document.querySelector(".content");

// 🔹 Mapas de telas de cada módulo
const telas = {
  moradores: typeof telasMoradores !== "undefined" ? telasMoradores : {},
  visitantes: typeof telasVisitantes !== "undefined" ? telasVisitantes : {},
  veiculos: typeof telasVeiculos !== "undefined" ? telasVeiculos : {},
  areas: typeof telasAreas !== "undefined" ? telasAreas : {},
  financeiro: typeof telasFinanceiro !== "undefined" ? telasFinanceiro : {},
  ocorrencias: typeof telasOcorrencias !== "undefined" ? telasOcorrencias : {},
  comunicados: typeof telasComunicados !== "undefined" ? telasComunicados : {},
  relatorios: typeof telasRelatorios !== "undefined" ? telasRelatorios : {},
  mensagens: typeof telasMensagens !== "undefined" ? telasMensagens : {},
};

// 🔹 Função para renderizar a tela
function mostrarTela(nome) {
  for (let categoria in telas) {
    if (telas[categoria][nome]) {
      content.innerHTML = telas[categoria][nome];
      return;
    }
  }

  content.innerHTML = `
    <div class="content-top">
      <h1>Tela não encontrada</h1>
    </div>
  `;
}

// 🔹 Eventos de clique em todos os subitems
document.querySelectorAll(".subitem").forEach(item => {
  item.addEventListener("click", () => {
    const tela = item.textContent.trim();
    mostrarTela(tela);
  });
});
