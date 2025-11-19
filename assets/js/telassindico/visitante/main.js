// ------------------------
// mainVisitante.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let visitantesTbodyListener = null;

  // --- Renderizar formulário de cadastro ---
  async function carregarCadastro(visitante = null) {
    content.innerHTML = telasVisitantes["Cadastro de visitantes"];

    const form = content.querySelector(".form-cadastro-visitante");
    if (!form) return;

    if (visitante) {
      form.nome.value = visitante.visitor?.name || "";
      form.cpf.value = visitante.visitor?.cpf || "";
      form.bloco.value = visitante.apartment?.block || "";
      form.apartamento.value = visitante.apartment?.number || "";
      form.dataset.id = visitante.id;
    } else {
      form.reset();
      form.removeAttribute("data-id");
    }
  }

  // --- Renderizar histórico ---
  async function carregarHistorico() {
    content.innerHTML = telasVisitantes["Controle de entradas e saídas"];
    const tbody = content.querySelector("#visitantesTableBody");
    if (!tbody) return;

    try {
      const visitantes = await listarVisitantes();
      const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

      const visitantesFiltrados = (visitantes || []).filter((v) => {
        const code =
          v.visitor?.condominium?.code_condominium ||
          v.apartment?.condominium_detail?.code_condominium;
        return code === condominio?.code_condominium;
      });

      if (visitantesFiltrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Nenhum visitante encontrado para este condomínio.</td></tr>`;
        return;
      }

      tbody.innerHTML = visitantesFiltrados
        .map(
          (v) => `
          <tr>
            <td>${v.visitor?.name || "-"}</td>
            <td>${v.apartment?.block || "-"}</td>
            <td>${v.apartment?.number || "-"}</td>
            <td>${v.visitor?.cpf || "-"}</td>
            <td>
              <button class="btn-editar-visitante" data-id="${v.id}">Editar</button>
              <button class="btn-excluir-visitante" data-id="${v.id}">Excluir</button>
            </td>
          </tr>
        `
        )
        .join("");

      attachVisitantesTableListener();
    } catch (err) {
      console.error("Erro ao carregar histórico de visitantes:", err);
      alert("Erro ao carregar visitantes.");
    }
  }

  // --- Listener da tabela ---
  function attachVisitantesTableListener() {
    const tbody = content.querySelector("#visitantesTableBody");
    if (!tbody) return;

    if (visitantesTbodyListener) {
      try {
        tbody.removeEventListener("click", visitantesTbodyListener);
      } catch {}
      visitantesTbodyListener = null;
    }

    visitantesTbodyListener = async function (e) {
      const btnEditar = e.target.closest(".btn-editar-visitante");
      const btnExcluir = e.target.closest(".btn-excluir-visitante");

      if (btnEditar) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const visitantes = await listarVisitantes();
        const visitante = visitantes.find((v) => v.id == id);
        if (visitante) carregarCadastro(visitante);
        return;
      }

      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este visitante?")) {
          await deletarVisitante(id);
          await carregarHistorico();
        }
        return;
      }
    };

    tbody.addEventListener("click", visitantesTbodyListener);
  }

  // --- Envio do formulário ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-visitante")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      nome: form.nome.value.trim(),
      cpf: form.cpf.value.trim(),
      bloco: form.bloco.value.trim(),
      apartamento: form.apartamento.value.trim(),
    };

    try {
      let sucesso = false;
      if (form.dataset.id) {
        sucesso = await atualizarVisitante(form.dataset.id, dados);
      } else {
        const criado = await criarVisitante(dados);
        sucesso = !!criado;
      }

      //limpa o form
      form.reset();
      
    } catch (err) {
      console.error("Erro ao salvar visitante:", err);
      alert("Erro ao salvar visitante.");
    }
  });

  // --- Navegação pelo menu ---
  const menu = document.querySelector("#menuVisitantes");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de visitantes") carregarCadastro();
      if (item === "Controle de entradas e saídas") carregarHistorico();
    });
  }
});
