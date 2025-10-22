// ------------------------
// telasMoradores.js
// ------------------------
const telasMoradores = {
  "Cadastro de moradores": `
    <div class="content-top">
      <h1>Cadastro de Moradores</h1>
      <p class="lead">Preencha os dados abaixo para cadastrar um novo morador.</p>

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
          <input type="text" name="bloco" placeholder="Bloco" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="text" name="apartamento" placeholder="Número do apartamento" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de moradores": `
    <div class="content-top">
      <h1>Histórico de Moradores</h1>
      <p class="lead">Lista de moradores cadastrados e seu histórico.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <select name="bloco">
            <option value="">Filtrar por bloco</option>
            <option value="blocoA">Bloco A</option>
            <option value="blocoB">Bloco B</option>
          </select>

          <select name="apartamento">
            <option value="">Filtrar por apartamento</option>
            <option value="101">101</option>
            <option value="102">102</option>
          </select>

          <input type="text" placeholder="Pesquisar...">
          <button class="btn-buscar">Buscar</button>
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  `
};

// ------------------------
// script principal
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // 1️⃣ Obter condomínio selecionado
  function getCondominioSelecionado() {
    const cond = JSON.parse(localStorage.getItem("condominioSelecionado"));
    return cond ? cond.code_condominium : null;
  }

  // 2️⃣ CRUD Moradores
  async function criarMorador(dados) {
    const token = localStorage.getItem("access_token");
    const condominiumCode = getCondominioSelecionado();
    if (!condominiumCode) return alert("Selecione um condomínio antes de cadastrar.");

    const payload = {
      name: dados.nome,
      cpf: dados.cpf,
      phone: dados.telefone,
      email: dados.email,
      condominium: condominiumCode,
      apartment_number: dados.apartamento,
      apartment_block: dados.bloco
    };

    try {
      const res = await fetch("https://api.porttusmart.tech/api/v1/core/residents/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Morador cadastrado com sucesso!");
      carregarHistorico();
      return await res.json();
    } catch (err) { alert("Erro: " + err.message); console.error(err); }
  }

  async function listarMoradores() {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("https://api.porttusmart.tech/api/v1/core/residents/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Erro ao buscar moradores");
      const data = await res.json();
      return data.results;
    } catch (err) { console.error(err); return []; }
  }

  async function deletarMorador(id) {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`https://api.porttusmart.tech/api/v1/core/residents/${id}/`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Erro ao deletar morador");
      alert("Morador deletado!");
      carregarHistorico();
    } catch (err) { alert("Erro: " + err.message); console.error(err); }
  }

  async function atualizarMorador(id, dados) {
    const token = localStorage.getItem("access_token");
    const condominiumCode = getCondominioSelecionado();
    const payload = {
      name: dados.nome,
      cpf: dados.cpf,
      phone: dados.telefone,
      email: dados.email,
      condominium: condominiumCode,
      apartment_number: dados.apartamento,
      apartment_block: dados.bloco
    };

    try {
      const res = await fetch(`https://api.porttusmart.tech/api/v1/core/residents/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao atualizar morador");
      alert("Morador atualizado!");
      carregarHistorico();
    } catch (err) { alert("Erro: " + err.message); console.error(err); }
  }

  // 3️⃣ Renderização das telas
  function carregarCadastro() {
    content.innerHTML = telasMoradores["Cadastro de moradores"];
    const form = document.querySelector(".form-cadastro");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const dados = {
        nome: form.nome.value.trim(),
        cpf: form.cpf.value.trim(),
        telefone: form.telefone.value.trim(),
        email: form.email.value.trim(),
        bloco: form.bloco.value.trim(),
        apartamento: form.apartamento.value.trim()
      };
      await criarMorador(dados);
      form.reset();
    });
  }

  async function carregarHistorico() {
    content.innerHTML = telasMoradores["Histórico de moradores"];
    const tbody = content.querySelector(".tabela-historico tbody");
    const moradores = await listarMoradores();
    tbody.innerHTML = "";

    moradores.forEach(m => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${m.name}</td>
        <td>${m.apartment_block || ""}</td>
        <td>${m.apartment_number || ""}</td>
        <td>${m.phone || ""}</td>
        <td>
          <button class="btn-editar">Editar</button>
          <button class="btn-excluir">Excluir</button>
        </td>
      `;

      tr.querySelector(".btn-editar").addEventListener("click", () => {
        carregarCadastro();
        const form = document.querySelector(".form-cadastro");
        form.nome.value = m.name;
        form.cpf.value = m.cpf;
        form.telefone.value = m.phone;
        form.email.value = m.email;
        form.bloco.value = m.apartment_block;
        form.apartamento.value = m.apartment_number;

        form.addEventListener("submit", async e => {
          e.preventDefault();
          const dadosAtualizados = {
            nome: form.nome.value.trim(),
            cpf: form.cpf.value.trim(),
            telefone: form.telefone.value.trim(),
            email: form.email.value.trim(),
            bloco: form.bloco.value.trim(),
            apartamento: form.apartamento.value.trim()
          };
          await atualizarMorador(m.id, dadosAtualizados);
        }, { once: true });
      });

      tr.querySelector(".btn-excluir").addEventListener("click", () => {
        if (confirm(`Deseja excluir ${m.name}?`)) deletarMorador(m.id);
      });

      tbody.appendChild(tr);
    });
  }

  // 4️⃣ Navegação simples entre telas
  const btnCadastro = document.getElementById("nav-cadastro");
  const btnHistorico = document.getElementById("nav-historico");

  if (btnCadastro) btnCadastro.addEventListener("click", carregarCadastro);
  if (btnHistorico) btnHistorico.addEventListener("click", carregarHistorico);

  // NÃO inicializa nenhuma tela, mantém a tela inicial visível
});
