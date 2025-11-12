// ==========================================================
// mainOcorrencias.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let ocorrenciasTbodyListener = null;

  // ======== Tela de Cadastro ========
  async function carregarCadastro(ocorrencia = null) {
    content.innerHTML = telasOcorrencias["Registrar ocorrência"];
    const form = content.querySelector(".form-cadastro-ocorrencia");
    if (!form) return;

    if (ocorrencia) {
      const bloco =
        ocorrencia.apartment_block ||
        ocorrencia.reported_by?.apartment?.block ||
        "";
      const apto =
        ocorrencia.apartment_number ||
        ocorrencia.reported_by?.apartment?.number ||
        "";

      form.titulo.value = ocorrencia.title || "";
      form.descricao.value = ocorrencia.description || "";
      form.status.value = ocorrencia.status || "aberta";
      form.bloco.value = bloco;
      form.apartamento.value = apto;
      form.dataset.id = ocorrencia.id;
    } else {
      form.reset();
      form.removeAttribute("data-id");
    }
  }

  // ======== Tela de Histórico ========
  async function carregarHistorico() {
    content.innerHTML = telasOcorrencias["Histórico de ocorrências"];
    const tbody = content.querySelector("#tabelaOcorrenciasBody");
    if (!tbody) return;

    const ocorrencias = await listarOcorrencias();

    tbody.innerHTML = ocorrencias
      .map((o) => {
        const bloco =
          o.apartment_block || o.reported_by?.apartment?.block || "-";
        const apto =
          o.apartment_number || o.reported_by?.apartment?.number || "-";
        const data = o.date_reported
          ? new Date(o.date_reported).toLocaleDateString("pt-BR")
          : "-";

        return `
          <tr>
            <td>${o.title || "-"}</td>
            <td>${o.status || "-"}</td>
            <td>${bloco}</td>
            <td>${apto}</td>
            <td>${data}</td>
            <td>
              <button class="btn-editar-ocorrencia" data-id="${o.id}">Editar</button>
              <button class="btn-excluir-ocorrencia" data-id="${o.id}">Excluir</button>
            </td>
          </tr>
        `;
      })
      .join("");

    attachOcorrenciasTableListener();
  }

  // ======== Eventos da Tabela ========
  function attachOcorrenciasTableListener() {
    const tbody = content.querySelector("#tabelaOcorrenciasBody");
    if (!tbody) return;

    if (ocorrenciasTbodyListener) {
      try {
        tbody.removeEventListener("click", ocorrenciasTbodyListener);
      } catch {}
      ocorrenciasTbodyListener = null;
    }

    ocorrenciasTbodyListener = async function (e) {
      const btnEditar = e.target.closest(".btn-editar-ocorrencia");
      const btnExcluir = e.target.closest(".btn-excluir-ocorrencia");

      if (btnEditar) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const ocorrencias = await listarOcorrencias();
        const ocorrencia = ocorrencias.find((o) => o.id == id);
        if (ocorrencia) carregarCadastro(ocorrencia);
        return;
      }

      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir esta ocorrência?")) {
          await deletarOcorrencia(id);
          await carregarHistorico();
        }
        return;
      }
    };

    tbody.addEventListener("click", ocorrenciasTbodyListener);
  }

  // ======== Evento de Envio do Formulário ========
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-ocorrencia")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      titulo: form.titulo.value.trim(),
      descricao: form.descricao.value.trim(),
      status: form.status.value.trim(),
      bloco: form.bloco.value.trim(),
      apartamento: form.apartamento.value.trim()
    };

    try {
      if (form.dataset.id) {
        await atualizarOcorrencia(form.dataset.id, dados);
        alert("Ocorrência atualizada com sucesso!");
      } else {
        await criarOcorrencia(dados);
        alert("Ocorrência cadastrada com sucesso!");
      }

      // Só troca para histórico se deu certo
      await carregarHistorico();
    } catch (err) {
      console.error("Erro ao salvar ocorrência:", err);
      alert("Não foi possível salvar a ocorrência. Verifique e tente novamente.");
    }
  });

  // ======== Navegação do Menu ========
  const menu = document.querySelector("#menuOcorrencias");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Registrar ocorrência") carregarCadastro();
      if (item === "Histórico de ocorrências") carregarHistorico();
    });
  }
});
