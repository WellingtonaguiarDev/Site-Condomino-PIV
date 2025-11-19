// ==========================================================
// mainMoradores.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let moradoresTbodyListener = null;

  // ======== Tela de Cadastro ========
  async function carregarCadastro(morador = null) {
    content.innerHTML = telasMoradores["Cadastro de moradores"];
    const form = content.querySelector(".form-cadastro-morador");
    if (!form) return;

    if (morador) {
      form.nome.value = morador.name || "";
      form.cpf.value = morador.cpf || "";
      form.telefone.value = morador.phone || "";
      form.bloco.value =
        morador.apartment?.block || morador.apartment_details?.block || "";
      form.apartamento.value =
        morador.apartment?.number || morador.apartment_details?.number || "";
      form.email.value = morador.email || "";
      form.dataset.id = morador.id;
    } else {
      form.reset();
      form.removeAttribute("data-id");
    }
  }

  // ======== Tela de Histórico ========
  async function carregarHistorico() {
    content.innerHTML = telasMoradores["Histórico de moradores"];
    const tbody = content.querySelector("#tabelaMoradoresBody");
    if (!tbody) return;

    try {
      const moradores = await listarMoradores();
      const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

      // 🔍 Filtra moradores pelo condomínio selecionado
      const moradoresFiltrados = (moradores || []).filter((m) => {
        const code =
          m.condominium?.code_condominium ||
          m.apartment_details?.condominium_detail?.code_condominium;

        return code === condominio?.code_condominium;
      });

      // 🆕 Caso não tenha moradores cadastrados para o condomínio
      if (moradoresFiltrados.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center; padding: 12px;">
              Nenhum morador encontrado para este condomínio.
            </td>
          </tr>
        `;
        return;
      }

      // Renderiza moradores normalmente
      tbody.innerHTML = moradoresFiltrados
        .map(
          (m) => `
          <tr>
            <td>${m.name || "-"}</td>
            <td>${m.apartment?.block || m.apartment_details?.block || "-"}</td>
            <td>${m.apartment?.number || m.apartment_details?.number || "-"}</td>
            <td>${m.phone || "-"}</td>
            <td>
              <button class="btn-editar-morador" data-id="${m.id}">Editar</button>
              <button class="btn-excluir-morador" data-id="${m.id}">Excluir</button>
            </td>
          </tr>
        `
        )
        .join("");

      attachMoradoresTableListener();
    } catch (err) {
      console.error("Erro ao carregar histórico de moradores:", err);
      alert("Erro ao carregar moradores.");
    }
  }

  // ======== Eventos da Tabela ========
  function attachMoradoresTableListener() {
    const tbody = content.querySelector("#tabelaMoradoresBody");
    if (!tbody) return;

    if (moradoresTbodyListener) {
      try { tbody.removeEventListener("click", moradoresTbodyListener); } catch {}
      moradoresTbodyListener = null;
    }

    moradoresTbodyListener = async function (e) {
      const btnEditar = e.target.closest(".btn-editar-morador");
      const btnExcluir = e.target.closest(".btn-excluir-morador");

      if (btnEditar) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const moradores = await listarMoradores();
        const morador = moradores.find((m) => m.id == id);
        if (morador) carregarCadastro(morador);
        return;
      }

      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este morador?")) {
          await deletarMorador(id);
          await carregarHistorico();
        }
        return;
      }
    };

    tbody.addEventListener("click", moradoresTbodyListener);
  }

  // ======== Evento de Envio do Formulário ========
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-morador")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      nome: form.nome.value.trim(),
      cpf: form.cpf.value.trim(),
      telefone: form.telefone.value.trim(),
      bloco: form.bloco.value.trim(),
      apartamento: form.apartamento.value.trim(),
      email: form.email?.value.trim() || ""
    };

    try {
      if (form.dataset.id) {
        await atualizarMorador(form.dataset.id, dados);
      } else {
        await criarMorador(dados);
      }

      //limpa o form
      form.reset();

    } catch (err) {
      console.error("Erro ao salvar morador:", err);
      alert("Não foi possível salvar o morador. Verifique os dados e tente novamente.");
    }
  });

  // ======== Navegação do Menu ========
  const menu = document.querySelector("#menuMoradores");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de moradores") carregarCadastro();
      if (item === "Histórico de moradores") carregarHistorico();
    });
  }
});
