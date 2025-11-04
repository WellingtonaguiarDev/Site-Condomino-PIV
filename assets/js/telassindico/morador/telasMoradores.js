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
          <label>Email</label>
          <input type="email" name="email" placeholder="exemplo@dominio.com">
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" name="telefone" placeholder="(00) 00000-0000" required>
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="bloco" placeholder="Bloco" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="number" name="apartamento" placeholder="Número do apartamento" required>
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
          <select name="bloco" id="filtroBloco">
            <option value="">Filtrar por bloco</option>
            <option value="A">Bloco A</option>
            <option value="B">Bloco B</option>
          </select>

          <select name="apartamento" id="filtroApartamento">
            <option value="">Filtrar por apartamento</option>
            <option value="101">101</option>
            <option value="102">102</option>
          </select>

          <input type="text" id="filtroPesquisa" placeholder="Pesquisar...">
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
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaMoradoresBody"></tbody>
          </table>
        </div>
        <div id="loadingHistorico" style="display:none;text-align:center;padding:20px;">
          Carregando moradores...
        </div>
      </div>
    </div>
  `
};
