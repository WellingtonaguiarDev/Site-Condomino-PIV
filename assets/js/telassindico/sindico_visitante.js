const telasVisitantes = {
  "Cadastro de visitantes": `
    <div class="content-top">
      <h1>Cadastro de Visitantes</h1>
      <p class="lead">Preencha os dados abaixo para cadastrar um novo visitante.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Nome completo</label>
          <input type="text" name="nome" placeholder="Nome completo" required>
        </div>

        <div class="form-group">
          <label>CPF</label>
          <input type="text" name="cpf" placeholder="000.000.000-00" required>
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" name="telefone" placeholder="(00) 00000-0000" required>
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="email@dominio.com" required>
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="bloco" placeholder="Bloco">
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="text" name="apartamento" placeholder="Número do apartamento">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Controle de entradas e saídas": `
    <div class="content-top">
      <h1>Controle de Entradas e Saídas</h1>
      <p class="lead">Lista de visitantes cadastrados e controle de acessos.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <select id="filtroBloco">
            <option value="">Filtrar por bloco</option>
            <option value="blocoA">Bloco A</option>
            <option value="blocoB">Bloco B</option>
          </select>

          <select id="filtroApartamento">
            <option value="">Filtrar por apartamento</option>
            <option value="101">101</option>
            <option value="102">102</option>
          </select>

          <input type="text" placeholder="Pesquisar..." id="searchInput">
          <button class="btn-buscar" id="btnBuscar">Buscar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="visitantesTableBody">
              <!-- Visitantes serão carregados aqui -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};


// Função para carregar qualquer tela de visitantes
function carregarTelaVisitantes(nomeTela) {
  const mainContent = document.querySelector("main.content");
  const tela = telasVisitantes[nomeTela];

  if (!tela) {
    mainContent.innerHTML = "<p>Tela não encontrada.</p>";
    return;
  }

  mainContent.innerHTML = tela;

  if (nomeTela === "Cadastro de visitantes") {
    const form = mainContent.querySelector(".form-cadastro");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("access_token");
      const condominium = localStorage.getItem("selectedCondominiumCode");

      const data = {
        name: form.nome.value.trim(),
        cpf: form.cpf.value.trim(),
        phone: form.telefone.value.trim(),
        email: form.email.value.trim(),
        condominium: condominium,
        apartment_number: parseInt(form.apartamento.value) || 0,
        apartment_block: form.bloco.value.trim()
      };

      try {
        const response = await fetch("https://api.porttusmart.tech/api/v1/core/visitors/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar visitante");

        alert("Visitante cadastrado com sucesso!");
        form.reset();
      } catch (error) {
        console.error(error);
        alert("Falha ao cadastrar visitante");
      }
    });
  }

  if (nomeTela === "Controle de entradas e saídas") {
    carregarVisitantes();
  }
}

// Função para carregar visitantes do back
async function carregarVisitantes() {
  const token = localStorage.getItem("access_token");
  const condominium = localStorage.getItem("selectedCondominiumCode");
  const tbody = document.getElementById("visitantesTableBody");

  if (!tbody) return;

  try {
    const response = await fetch(`https://api.porttusmart.tech/api/v1/core/visitors/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Erro ao buscar visitantes");

    const data = await response.json();
    const visitantes = data.results.filter(v => v.condominium === condominium);

    tbody.innerHTML = "";
    visitantes.forEach(v => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${v.name}</td>
        <td>${v.apartment_block}</td>
        <td>${v.apartment_number}</td>
        <td>${v.phone}</td>
        <td>
          <button class="btn-editar" data-id="${v.id}">Editar</button>
          <button class="btn-excluir" data-id="${v.id}">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Eventos para editar/excluir
    tbody.querySelectorAll(".btn-excluir").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (!confirm("Deseja realmente excluir este visitante?")) return;
        try {
          const resp = await fetch(`https://api.porttusmart.tech/api/v1/core/visitors/${id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (!resp.ok) throw new Error("Erro ao excluir visitante");
          alert("Visitante excluído");
          carregarVisitantes();
        } catch (err) {
          console.error(err);
          alert("Falha ao excluir visitante");
        }
      });
    });

  } catch (error) {
    console.error(error);
    tbody.innerHTML = `<tr><td colspan="5">Erro ao carregar visitantes</td></tr>`;
  }
}

// Configura menu
document.addEventListener("DOMContentLoaded", () => {
  const btnCadastro = document.querySelector("#visitantes-toggle + label + .submenu .subitem:nth-child(1)");
  const btnHistorico = document.querySelector("#visitantes-toggle + label + .submenu .subitem:nth-child(2)");

  if (btnCadastro) btnCadastro.addEventListener("click", () => carregarTelaVisitantes("Cadastro de visitantes"));
  if (btnHistorico) btnHistorico.addEventListener("click", () => carregarTelaVisitantes("Controle de entradas e saídas"));
});
