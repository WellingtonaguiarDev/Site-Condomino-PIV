// ==========================================================
// mainComunicados.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let comunicadosTbodyListener = null;

  // ======== Tela de Cadastro ========
  async function carregarCadastroComunicados() {
    content.innerHTML = telasComunicados["Novo comunicado"];
    const form = content.querySelector(".form-cadastro-comunicados");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = {
        titulo: form.titulo.value.trim(),
        mensagem: form.mensagem.value.trim(),
        bloco: form.bloco.value.trim(),
        apartamento: form.apartamento.value.trim()
      };

      try {
        await criarComunicado(dados);
        await carregarHistoricoComunicados();
      } catch (err) {
        console.error("❌ Erro ao criar comunicado:", err);
      }
    });
  }

  // ======== Tela de Histórico ========
  async function carregarHistoricoComunicados() {
    content.innerHTML = telasComunicados["Histórico de comunicados"];
    const tbody = content.querySelector("#tabelaComunicadosBody");
    const loading = content.querySelector("#loadingComunicados");
    if (!tbody) return;

    loading.style.display = "block";

    try {
      const comunicados = await listarComunicados();

      if (!Array.isArray(comunicados) || comunicados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum comunicado encontrado.</td></tr>`;
        return;
      }

      tbody.innerHTML = comunicados
        .map((c) => {
          // Mostrando os dados corretos de bloco/apartamento
          const bloco = c.recipients?.[0]?.apartment?.block || "-";
          const apartamento = c.recipients?.[0]?.apartment?.number || "-";

          return `
            <tr>
              <td>${c.title || "-"}</td>
              <td>${c.message || "-"}</td>
              <td>${bloco}</td>
              <td>${apartamento}</td>
              <td>
                <button class="btn-excluir-comunicados" data-id="${c.id || ""}">
                  Excluir
                </button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch (err) {
      console.error("❌ Erro ao carregar comunicados:", err);
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:red;">Erro ao carregar comunicados.</td></tr>`;
    } finally {
      loading.style.display = "none";
      attachComunicadosTableListener();
    }
  }

  // ======== Eventos da Tabela ========
  function attachComunicadosTableListener() {
    const tbody = content.querySelector("#tabelaComunicadosBody");
    if (!tbody) return;

    if (comunicadosTbodyListener) {
      try {
        tbody.removeEventListener("click", comunicadosTbodyListener);
      } catch {}
      comunicadosTbodyListener = null;
    }

    comunicadosTbodyListener = async function (e) {
      const btnExcluir = e.target.closest(".btn-excluir-comunicado");
      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este comunicado?")) {
          try {
            await deletarComunicado(id);
            await carregarHistoricoComunicados();
          } catch (err) {
            console.error("❌ Erro ao excluir comunicado:", err);
          }
        }
      }
    };

    tbody.addEventListener("click", comunicadosTbodyListener);
  }

  // ======== Navegação do Menu ========
  const menu = document.querySelector("#menuComunicados");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Novo comunicado") carregarCadastroComunicados();
      if (item === "Histórico de comunicados") carregarHistoricoComunicados();
    });
  }
});
