// ------------------------
// telaVisitante.js
// ------------------------
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
          <button class="btn-limpar" id="btnLimpar">Limpar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>CPF</th>
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