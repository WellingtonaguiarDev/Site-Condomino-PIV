// =============================
// ===== MAIN ENTREGAS =====
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let entregasTbodyListener = null;

  // ===== CADASTRO ENTREGA =====
  async function carregarCadastro(entrega = null) {
    content.innerHTML = telasEntregas["Cadastro de entregas"];

    const form = content.querySelector(".form-cadastro-entrega");
    if (!form) return;

    if (entrega) {
      form.codigo.value = entrega.order_code || "";
      form.bloco.value = entrega.apartment_block || "";
      form.apartamento.value = entrega.apartment_number || "";
      form.dataset.id = entrega.id;
    } else {
      form.removeAttribute("data-id");
    }
  }

  // ===== HISTÓRICO ENTREGA =====
  async function carregarHistorico() {
    content.innerHTML = telasEntregas["Histórico de entregas"];
    const tbody = content.querySelector("#tabelaEntregasBody");
    if (!tbody) return;

    const entregas = await listarEntregas();
    console.log("DEBUG: dados retornados do backend:", entregas);

    tbody.innerHTML = entregas
      .map((e) => {
        const bloco = e.owner?.apartment?.block ?? "-";
        const apartamento = e.owner?.apartment?.number ?? "-";

        return `
          <tr>
            <td>${e.order_code || "-"}</td>
            <td>${e.status || "-"}</td>
            <td>${bloco}</td>
            <td>${apartamento}</td>
            <td>
              <button class="btn-excluir-entrega" data-id="${e.id}">Excluir</button>
            </td>
          </tr>
        `;
      })
      .join("");

    attachEntregasTableListener();
  }

  // ===== LISTENER DA TABELA =====
  function attachEntregasTableListener() {
    const tbody = content.querySelector("#tabelaEntregasBody");
    if (!tbody) return;

    if (entregasTbodyListener) {
      try { tbody.removeEventListener("click", entregasTbodyListener); } catch (err) { }
      entregasTbodyListener = null;
    }

    entregasTbodyListener = async function (e) {
      const btnExcluir = e.target.closest(".btn-excluir-entrega");
      if (btnExcluir && tbody.contains(btnExcluir)) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (!id) return;

        if (confirm("Deseja excluir esta entrega?")) {
          try {
            await deletarEntrega(id);
          } catch (err) {
            console.error(err);
          } finally {
            await carregarHistorico();
          }
        }
      }
    };

    tbody.addEventListener("click", entregasTbodyListener);
  }

  // ===== SUBMISSÃO DO FORMULÁRIO =====
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-entrega")) return;
    e.preventDefault();

    const form = e.target;
    const file = form.assinatura?.files?.[0] || null;

    const dados = {
      codigo: form.codigo?.value.trim() || "",
      bloco: form.bloco?.value.trim() || "",
      apartamento: form.apartamento?.value.trim() || "",
      assinatura: file
    };

    try {
      if (form.dataset.id) {
        console.log("Editar entrega ID:", form.dataset.id, dados);
      } else {
        await criarEntrega(dados);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await carregarHistorico();
    }
  });

  // ===== NAVEGAÇÃO PELO MENU =====
  const menu = document.querySelector("#menuEntregas");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de entregas") carregarCadastro();
      if (item === "Histórico de entregas") carregarHistorico();
    });
  }
});
