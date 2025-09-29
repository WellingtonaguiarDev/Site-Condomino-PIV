// 🔹 Área de conteúdo principal
const content = document.querySelector(".content");

// 🔹 Mapas de telas do morador
const telasMorador = {
  meusDados: typeof telasMeusDados !== "undefined" ? telasMeusDados : {},
  financeiro: typeof telasFinanceiroMorador !== "undefined" ? telasFinanceiroMorador : {},
  areas: typeof telasAreasMorador !== "undefined" ? telasAreasMorador : {},
  ocorrencias: typeof telasOcorrenciasMorador !== "undefined" ? telasOcorrenciasMorador : {},
  comunicados: typeof telasComunicadosMorador !== "undefined" ? telasComunicadosMorador : {},
  mensagens: typeof telasMensagensMorador !== "undefined" ? telasMensagensMorador : {}
};

// 🔹 Função para renderizar a tela correta
function mostrarTelaMorador(nome) {
  for (let categoria in telasMorador) {
    if (telasMorador[categoria] && telasMorador[categoria][nome]) {
      content.innerHTML = telasMorador[categoria][nome];
      return;
    }
  }

  content.innerHTML = `
    <div class="content-top">
      <h1>Tela não encontrada</h1>
      <p>Ops! Não conseguimos encontrar a tela solicitada.</p>
    </div>
  `;
}

// 🔹 Eventos de clique em todos os subitems do menu do morador
document.querySelectorAll(".subitem").forEach(item => {
  item.addEventListener("click", () => {
    const tela = item.textContent.trim();
    mostrarTelaMorador(tela);

    // ❗ Remover classe "active" de todos os itens
    document.querySelectorAll(".subitem").forEach(i => i.classList.remove("active"));
    // ❗ Adicionar classe "active" ao item clicado
    item.classList.add("active");
  });
});
