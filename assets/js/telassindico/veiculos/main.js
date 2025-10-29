// ------------------------
// mainVeiculos.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // --- Renderização de telas ---
  async function carregarCadastro(veiculo = null) {
    content.innerHTML = telasVeiculos["Cadastro de veículos de moradores"];

    if (veiculo) {
      const form = content.querySelector(".form-cadastro");

      // Prioriza owner.apartment, se não existir usa apartment_details
      const bloco = veiculo.owner?.apartment?.block || veiculo.apartment_details?.block || "";
      const apartamento = veiculo.owner?.apartment?.number || veiculo.apartment_details?.number || "";

      form.placa.value = veiculo.plate || "";
      form.modelo.value = veiculo.model || "";
      form.cor.value = veiculo.color || "";
      form.bloco.value = bloco;
      form.apartamento.value = apartamento;
      form.dataset.id = veiculo.id;
    }
  }

async function carregarHistorico() {
  content.innerHTML = telasVeiculos["Histórico de veículos"];
  const tbody = content.querySelector("tbody");
  const veiculos = await listarVeiculos();

  tbody.innerHTML = veiculos
    .map((v) => {
      const bloco = v.owner?.apartment?.block || v.apartment_details?.block || "";
      const apartamento = v.owner?.apartment?.number || v.apartment_details?.number || "";

      return `
        <tr>
          <td>${v.plate}</td>
          <td>${v.model}</td>
          <td>${v.color}</td>
          <td>${bloco}</td>
          <td>${apartamento}</td>
          <td>
            <button class="btn-editar" data-id="${v.id}">Editar</button>
            <button class="btn-excluir" data-id="${v.id}">Excluir</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

  // --- Eventos de formulário ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      placa: form.placa?.value.trim() || "",
      modelo: form.modelo?.value.trim() || "",
      cor: form.cor?.value.trim() || "",
      bloco: form.bloco?.value.trim() || "",
      apartamento: form.apartamento?.value.trim() || "",
    };

    if (form.dataset.id) {
      await atualizarVeiculo(form.dataset.id, dados);
    } else {
      await criarVeiculo(dados);
    }

    carregarHistorico();
  });

  // --- Eventos de ação (editar/excluir) ---
  content.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.dataset.id;
      const veiculos = await listarVeiculos();
      const veiculo = veiculos.find((v) => v.id == id);
      if (veiculo) carregarCadastro(veiculo);
    }

    if (e.target.classList.contains("btn-excluir")) {
      const id = e.target.dataset.id;
      if (confirm("Deseja excluir este veículo?")) {
        await deletarVeiculo(id);
        carregarHistorico();
      }
    }
  });

  // --- Navegação pelo menu ---
  document.querySelector(".menu-scroll").addEventListener("click", (e) => {
    if (!e.target.classList.contains("subitem")) return;

    const item = e.target.textContent.trim();

    if (item === "Cadastro de veículos de moradores") carregarCadastro();
    if (item === "Histórico de veículos") carregarHistorico();
  });
});
