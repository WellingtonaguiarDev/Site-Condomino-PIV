// ==========================================================
// mainComunicados.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let comunicadosTbodyListener = null;
  let documentosTbodyListener = null;

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
        apartamento: form.apartamento.value.trim(),
        communication_type: "notice" // 🔹 tipo fixo para comunicados
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

      // 🔹 Filtra apenas os comunicados do tipo "notice"
      const comunicadosFiltrados = (comunicados || []).filter(
        (c) => c.communication_type === "notice"
      );

      if (!Array.isArray(comunicadosFiltrados) || comunicadosFiltrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum comunicado encontrado.</td></tr>`;
        return;
      }

      tbody.innerHTML = comunicadosFiltrados
        .map((c) => {
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

  // ======== Eventos da Tabela de comunicados ========
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
      const btnExcluir = e.target.closest(".btn-excluir-comunicados");
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

  // ======== Tela: Cadastro de Documentos ========
  async function carregarCadastroDocumentos() {
    content.innerHTML = telasComunicados["Cadastro de documentos"];
    const form = content.querySelector(".form-cadastro-documento-comunicados");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        await criarDocumento(formData);
        await carregarDocumentosCondominio();
      } catch (err) {
        console.error("❌ Erro ao cadastrar documento:", err);
      }
    });
  }

  // ======== Tela: Documentos do Condomínio ========
  async function carregarDocumentosCondominio() {
    content.innerHTML = telasComunicados["Documentos do condomínio"];
    const tbody = content.querySelector("#tabelaDocumentosComunicadosBody");
    const loading = content.querySelector("#loadingDocumentosComunicados");
    if (!tbody) return;

    loading.style.display = "block";

    try {
      const documentos = await listarDocumentos();

      if (!Array.isArray(documentos) || documentos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum documento encontrado.</td></tr>`;
        return;
      }

      tbody.innerHTML = documentos
        .map((d) => {
          const data = d.created_at ? new Date(d.created_at).toLocaleDateString() : "-";
          return `
            <tr>
              <td>${d.title || "-"}</td>
              <td>${d.content || "-"}</td>
              <td>
                ${d.file_complement ? `<a href="${d.file_complement}" target="_blank">📎 Baixar</a>` : "-"}
              </td>
              <td>${data}</td>
              <td>
                <button class="btn-excluir-documento" data-id="${d.id || ""}">Excluir</button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch (err) {
      console.error("❌ Erro ao carregar documentos:", err);
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:red;">Erro ao carregar documentos.</td></tr>`;
    } finally {
      loading.style.display = "none";
      attachDocumentosTableListener();
    }
  }

  // ======== Eventos da Tabela de documentos ========
  function attachDocumentosTableListener() {
    const tbody = content.querySelector("#tabelaDocumentosComunicadosBody");
    if (!tbody) return;

    if (documentosTbodyListener) {
      try {
        tbody.removeEventListener("click", documentosTbodyListener);
      } catch {}
      documentosTbodyListener = null;
    }

    documentosTbodyListener = async function (e) {
      const btnExcluir = e.target.closest(".btn-excluir-documento");
      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este documento?")) {
          try {
            await deletarDocumento(id);
            await carregarDocumentosCondominio();
          } catch (err) {
            console.error("❌ Erro ao excluir documento:", err);
          }
        }
      }
    };

    tbody.addEventListener("click", documentosTbodyListener);
  }

  // ======== Navegação do Menu ========
  const menu = document.querySelector("#menuComunicados");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Novo comunicado") carregarCadastroComunicados();
      if (item === "Histórico de comunicados") carregarHistoricoComunicados();
      if (item === "Cadastro de documentos") carregarCadastroDocumentos();
      if (item === "Documentos do condomínio") carregarDocumentosCondominio();
    });
  }
});
