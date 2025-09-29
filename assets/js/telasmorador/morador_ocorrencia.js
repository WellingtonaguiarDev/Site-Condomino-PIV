const telasOcorrenciasMorador = {
  "Registrar ocorrência": `
    <div class="content-top">
      <h1>Registrar Ocorrência</h1>
      <p class="lead">Informe os detalhes da ocorrência.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Título</label>
          <input type="text" name="titulo" placeholder="Título da ocorrência" required>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea name="descricao" placeholder="Descreva a ocorrência" rows="4" required></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Registrar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Acompanhar ocorrências": `
    <div class="content-top">
      <h1>Acompanhar Ocorrências</h1>
      <p class="lead">Acompanhe o status das ocorrências registradas.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <input type="text" placeholder="Pesquisar...">
          <button><i class="fa fa-search"></i> Buscar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Barulho excessivo</td>
                <td>Relato de som alto após às 22h</td>
                <td>Em andamento</td>
                <td>27/09/2025</td>
                <td>
                  <button class="btn-ver">Ver detalhes</button>
                </td>
              </tr>
              <tr>
                <td>Portão quebrado</td>
                <td>Portão social não está fechando corretamente</td>
                <td>Aberta</td>
                <td>25/09/2025</td>
                <td>
                  <button class="btn-ver">Ver detalhes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
