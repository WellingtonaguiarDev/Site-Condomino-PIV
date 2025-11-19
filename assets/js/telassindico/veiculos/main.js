// ------------------------
// mainVeiculos.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let veiculoEditando = null;
  let veiculosTbodyListener = null;

  // --- Renderização das telas ---
  async function carregarCadastro(veiculo = null) {
    content.innerHTML = telasVeiculos["Cadastro de veículos de moradores"];

    const form = content.querySelector(".form-cadastro-veiculo");
    if (!form) return;

    if (veiculo) {
      const bloco = veiculo.owner?.apartment?.block || veiculo.apartment_details?.block || "";
      const apartamento = veiculo.owner?.apartment?.number || veiculo.apartment_details?.number || "";

      form.placa.value = veiculo.plate || "";
      form.modelo.value = veiculo.model || "";
      form.cor.value = veiculo.color || "";
      form.bloco.value = bloco;
      form.apartamento.value = apartamento;
      form.dataset.id = veiculo.id;

      const btnSalvar = form.querySelector(".btn-salvar-veiculo");
      if (btnSalvar) btnSalvar.textContent = "Atualizar";
    } else {
      const btnSalvar = form.querySelector(".btn-salvar-veiculo");
      if (btnSalvar) btnSalvar.textContent = "Salvar";
      delete form.dataset.id;
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasVeiculos["Histórico de veículos"];
    const tbody = content.querySelector(".tabela-historico-veiculo-body");
    if (!tbody) return;

    const veiculos = await listarVeiculos();

    tbody.innerHTML = veiculos.length
      ? veiculos.map((v) => {
          const bloco = v.owner?.apartment?.block || v.apartment_details?.block || "";
          const apartamento = v.owner?.apartment?.number || v.apartment_details?.number || "";

          return `
            <tr>
              <td>${v.plate || "-"}</td>
              <td>${v.model || "-"}</td>
              <td>${v.color || "-"}</td>
              <td>${bloco || "-"}</td>
              <td>${apartamento || "-"}</td>
              <td>
                <button class="btn-editar-veiculo" data-id="${v.id}">Editar</button>
                <button class="btn-excluir-veiculo" data-id="${v.id}">Excluir</button>
              </td>
            </tr>
          `;
        }).join("")
      : `<tr><td colspan="6">Nenhum veículo encontrado.</td></tr>`;

    attachVeiculosTableListener();
  }

  // --- Listener da tabela ---
  function attachVeiculosTableListener() {
    const tbody = content.querySelector(".tabela-historico-veiculo-body");
    if (!tbody) return;

    if (veiculosTbodyListener) {
      try { tbody.removeEventListener("click", veiculosTbodyListener); } catch {}
      veiculosTbodyListener = null;
    }

    veiculosTbodyListener = async function (e) {
      const btnExcluir = e.target.closest(".btn-excluir-veiculo");
      if (btnExcluir && tbody.contains(btnExcluir)) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (!id) return;
        if (confirm("Deseja excluir este veículo?")) {
          try {
            await deletarVeiculo(id);
          } catch (err) {
            console.error(err);
          } finally {
            await carregarHistorico();
          }
        }
        return;
      }

      const btnEditar = e.target.closest(".btn-editar-veiculo");
      if (btnEditar && tbody.contains(btnEditar)) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        if (!id) return;
        try {
          const veiculos = await listarVeiculos();
          const veiculo = veiculos.find((v) => String(v.id) === String(id));
          if (veiculo) {
            veiculoEditando = id;
            await carregarCadastro(veiculo);
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }
    };

    tbody.addEventListener("click", veiculosTbodyListener);
  }

  // --- Submissão do formulário ---
  content.addEventListener("submit", async (e) => {
    const form = e.target;

    if (
      !form.classList.contains("form-cadastro-veiculo") ||
      !form.placa || !form.modelo || !form.cor
    ) return;

    e.preventDefault();

    const dados = {
      placa: form.placa?.value.trim() || "",
      modelo: form.modelo?.value.trim() || "",
      cor: form.cor?.value.trim() || "",
      bloco: form.bloco?.value.trim() || "",
      apartamento: form.apartamento?.value.trim() || "",
    };

    let sucesso = false;
    try {
      if (veiculoEditando) {
        sucesso = await atualizarVeiculo(veiculoEditando, dados);
        veiculoEditando = null;
      } else {
        sucesso = await criarVeiculo(dados);
      }
    } catch (err) {
      console.error(err);
    }
      //limpa o form
      form.reset();
  });

  // --- Navegação do menu ---
  const menu = document.querySelector("#menuVeiculos");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de veículos de moradores") {
        veiculoEditando = null;
        carregarCadastro();
      }
      if (item === "Histórico de veículos") carregarHistorico();
    });
  }
});
