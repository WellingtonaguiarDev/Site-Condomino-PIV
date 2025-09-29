const telasOcorrencias = {
  "Registrar ocorrência": `
    <div class="content-top">
      <h1>Registrar Ocorrência</h1>
      <p class="lead">Preencha os dados para registrar uma nova ocorrência.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Título</label>
          <input type="text" name="titulo" placeholder="Título da ocorrência" required>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea name="descricao" placeholder="Descreva a ocorrência" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label>Status</label>
          <select name="status" required>
            <option value="aberta">Aberta</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div class="form-group endereco-group">
          <div>
            <label>Bloco</label>
            <input type="text" name="bloco" placeholder="Ex: A" required>
          </div>
          <div>
            <label>Apartamento</label>
            <input type="text" name="apartamento" placeholder="Ex: 101" required>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Registrar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de ocorrências": `
    <div class="content-top">
      <h1>Histórico de Ocorrências</h1>
      <p class="lead">Lista das ocorrências registradas.</p>

      <div class="historico-container">
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
          <button><i class="fa fa-search"></i> Buscar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Título</th>
                <th>Status</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Porta quebrada</td>
                <td>Aberta</td>
                <td>A</td>
                <td>101</td>
                <td>20/10/2025</td>
                <td>
                  <button class="btn-editar">Editar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>Ruído excessivo</td>
                <td>Concluída</td>
                <td>B</td>
                <td>202</td>
                <td>18/10/2025</td>
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
