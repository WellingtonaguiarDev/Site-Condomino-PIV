// ------------------------
// mainVeiculos.js (versão isolada - padrão reservas)
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let veiculoEditando = null;
  let veiculosTbodyListener = null;

  // --- Renderização das telas ---
  async function carregarCadastro(veiculo = null) {
    content.innerHTML = telasVeiculos["Cadastro de veículos de moradores"];

    if (veiculo) {
      const form = content.querySelector(".form-cadastro");

      const bloco = veiculo.owner?.apartment?.block || veiculo.apartment_details?.block || "";
      const apartamento = veiculo.owner?.apartment?.number || veiculo.apartment_details?.number || "";

      form.placa.value = veiculo.plate || "";
      form.modelo.value = veiculo.model || "";
      form.cor.value = veiculo.color || "";
      form.bloco.value = bloco;
      form.apartamento.value = apartamento;
      form.dataset.id = veiculo.id;

      const btnSalvar = form.querySelector(".btn-salvar");
      if (btnSalvar) btnSalvar.textContent = "Atualizar";
    } else {
      // garante texto padrão do botão quando não estiver editando
      const form = content.querySelector(".form-cadastro");
      if (form) {
        const btnSalvar = form.querySelector(".btn-salvar");
        if (btnSalvar) btnSalvar.textContent = "Salvar";
        delete form.dataset.id;
      }
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasVeiculos["Histórico de veículos"];
    const tbody = content.querySelector("tbody");
    if (!tbody) return;

    const veiculos = await listarVeiculos();

    tbody.innerHTML = veiculos
      .map((v) => {
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
              <button class="btn-editar" data-id="${v.id}">Editar</button>
              <button class="btn-excluir" data-id="${v.id}">Excluir</button>
            </td>
          </tr>
        `;
      })
      .join("");

    // associe o listener local ao tbody (remove o antigo antes)
    attachVeiculosTableListener();
  }

  // --- Listener local para tabela de veículos ---
  function attachVeiculosTableListener() {
    const tbody = content.querySelector("tbody");
    if (!tbody) return;

    // remove listener antigo se existir
    if (veiculosTbodyListener) {
      try { tbody.removeEventListener("click", veiculosTbodyListener); } catch (err) {}
      veiculosTbodyListener = null;
    }

    veiculosTbodyListener = async function (e) {
      // botão Excluir dentro da tabela?
      const btnExcluir = e.target.closest(".btn-excluir");
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

      // botão Editar dentro da tabela?
      const btnEditar = e.target.closest(".btn-editar");
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

  // --- Submissão do formulário (criar ou atualizar) ---
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

    try {
      if (veiculoEditando) {
        await atualizarVeiculo(veiculoEditando, dados);
        veiculoEditando = null;
      } else {
        await criarVeiculo(dados);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await carregarHistorico();
    }
  });

  // --- Navegação do menu (mantendo nomes existentes) ---
  const menu = document.querySelector(".menu-scroll");
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
