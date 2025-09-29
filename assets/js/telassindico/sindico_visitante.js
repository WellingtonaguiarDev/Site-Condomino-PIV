const telasVisitantes = {
  "Cadastro de visitantes": `
    <div class="content-top">
      <h1>Cadastro de Visitantes</h1>
      <p class="lead">Preencha os dados abaixo para registrar um novo visitante.</p>

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
          <input type="tel" name="telefone" placeholder="(00) 00000-0000">
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="bloco" placeholder="Ex: A" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="text" name="apartamento" placeholder="Ex: 101" required>
        </div>

        <div class="form-group">
          <label>Data e Hora da Visita</label>
          <input type="datetime-local" name="data_visita" required>
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
      <h1>Histórico de Visitantes</h1>
      <p class="lead">Lista de visitantes registrados.</p>

      <div class="historico-container">
        <!-- Filtros -->
        <div class="historico-filtros">
          <select name="bloco">
            <option value="">Filtrar por bloco</option>
            <option value="A">Bloco A</option>
            <option value="B">Bloco B</option>
          </select>

          <select name="apartamento">
            <option value="">Filtrar por apartamento</option>
            <option value="101">101</option>
            <option value="102">102</option>
          </select>

          <input type="text" placeholder="Pesquisar...">
          <button class="btn-buscar"><i class="fa fa-search"></i> Buscar</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Data/Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carlos Souza</td>
                <td>123.456.789-00</td>
                <td>A</td>
                <td>101</td>
                <td>01/02/2025 14:30</td>
                <td>
                  <button class="btn-editar">Editar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>Ana Pereira</td>
                <td>MG-12.345.678</td>
                <td>B</td>
                <td>202</td>
                <td>03/02/2025 09:10</td>
                <td>
                  <button class="btn-editar">Editar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
