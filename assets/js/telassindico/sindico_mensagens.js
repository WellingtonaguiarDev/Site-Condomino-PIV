const telasMensagens = {
  "Caixa de mensagens": `
    <div class="content-top">
      <h1>Caixa de Mensagens</h1>
      <p class="lead">Lista de mensagens enviadas e recebidas.</p>

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
                <th>Conteúdo</th>
                <th>Remetente</th>
                <th>Destinatário</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Problema no elevador</td>
                <td>O elevador está em manutenção</td>
                <td>Gestor</td>
                <td>Morador</td>
                <td>25/10/2025</td>
                <td>
                  <button class="btn-visualizar">Visualizar</button>
                  <button class="btn-responder">Responder</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
