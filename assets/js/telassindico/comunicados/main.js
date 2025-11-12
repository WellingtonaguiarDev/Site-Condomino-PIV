// ==========================================================
// mainComunicados.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let comunicadosTbodyListener = null;
  let documentosTbodyListener = null;

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
        communication_type: "notice"
      };

      const result = await criarComunicado(dados);
      if (result) {
        await carregarHistoricoComunicados();
      }
    });
  }

  async function carregarHistoricoComunicados() {
    content.innerHTML = telasComunicados["Histórico de comunicados"];
    const tbody = content.querySelector("#tabelaComunicadosBody");
    const loading = content.querySelector("#loadingComunicados");
    if (!tbody) return;

    loading.style.display = "block";

    try {
      const comunicados = await listarComunicados();

      if (!Array.isArray(comunicados) || comunicados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum comunicado encontrado.</td></tr>`;
        return;
      }

      tbody.innerHTML = comunicados
        .map(c => {
          const bloco = c.recipients?.[0]?.apartment?.block || "-";
          const apartamento = c.recipients?.[0]?.apartment?.number || "-";
          return `
            <tr>
              <td>${c.title || "-"}</td>
              <td>${c.message || "-"}</td>
              <td>${bloco}</td>
              <td>${apartamento}</td>
              <td>
                <button class="btn-excluir-comunicados" data-id="${c.id || ""}">Excluir</button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:red;">Erro ao carregar comunicados.</td></tr>`;
    } finally {
      loading.style.display = "none";
      attachComunicadosTableListener();
    }
  }

  function attachComunicadosTableListener() {
    const tbody = content.querySelector("#tabelaComunicadosBody");
    if (!tbody) return;

    if (comunicadosTbodyListener) {
      try { tbody.removeEventListener("click", comunicadosTbodyListener); } catch {}
      comunicadosTbodyListener = null;
    }

    comunicadosTbodyListener = async (e) => {
      const btnExcluir = e.target.closest(".btn-excluir-comunicados");
      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este comunicado?")) {
          await deletarComunicado(id);
          await carregarHistoricoComunicados();
        }
      }
    };

    tbody.addEventListener("click", comunicadosTbodyListener);
  }

  async function carregarCadastroDocumentos() {
    content.innerHTML = telasComunicados["Cadastro de documentos"];
    const form = content.querySelector(".form-cadastro-documento-comunicados");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const result = await criarDocumento(formData);
      if (result) await carregarDocumentosCondominio();
    });
  }

  async function carregarDocumentosCondominio() {
    content.innerHTML = telasComunicados["Documentos do condomínio"];
    const tbody = content.querySelector("#tabelaDocumentosComunicadosBody");
    const loading = content.querySelector("#loadingDocumentosComunicados");
    if (!tbody) return;

    loading.style.display = "block";

    try {
      const documentos = await listarDocumentos();

      if (!Array.isArray(documentos) || documentos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum documento encontrado.</td></tr>`;
        return;
      }

      tbody.innerHTML = documentos
        .map(d => {
          const data = d.created_at ? new Date(d.created_at).toLocaleDateString() : "-";
          return `
            <tr>
              <td>${d.title || "-"}</td>
              <td>${d.content || "-"}</td>
              <td>${d.file_complement ? `<a href="${d.file_complement}" target="_blank">📎 Baixar</a>` : "-"}</td>
              <td>${data}</td>
              <td>
                <button class="btn-excluir-documento" data-id="${d.id || ""}">Excluir</button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:red;">Erro ao carregar documentos.</td></tr>`;
    } finally {
      loading.style.display = "none";
      attachDocumentosTableListener();
    }
  }

  function attachDocumentosTableListener() {
    const tbody = content.querySelector("#tabelaDocumentosComunicadosBody");
    if (!tbody) return;

    if (documentosTbodyListener) {
      try { tbody.removeEventListener("click", documentosTbodyListener); } catch {}
      documentosTbodyListener = null;
    }

    documentosTbodyListener = async (e) => {
      const btnExcluir = e.target.closest(".btn-excluir-documento");
      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este documento?")) {
          await deletarDocumento(id);
          await carregarDocumentosCondominio();
        }
      }
    };

    tbody.addEventListener("click", documentosTbodyListener);
  }

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
