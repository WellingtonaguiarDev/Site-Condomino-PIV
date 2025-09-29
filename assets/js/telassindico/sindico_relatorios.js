const telasRelatorios = {
  "Relatórios financeiros": `
    <div class="content-top">
      <h1>Relatórios Financeiros</h1>
      <p class="lead">Veja relatórios financeiros do condomínio.</p>

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
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cobrança</td>
                <td>Condomínio mensal</td>
                <td>R$ 350,00</td>
                <td>10/11/2025</td>
                <td>Pendente</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                  <button class="btn-pagar">Marcar como pago</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,

  "Relatórios de manutenção": `
    <div class="content-top">
      <h1>Relatórios de Manutenção</h1>
      <p class="lead">Confira o status das manutenções realizadas.</p>

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
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Troca de lâmpadas</td>
                <td>Substituição das lâmpadas do corredor</td>
                <td>Concluída</td>
                <td>10/10/2025</td>
                <td>
                  <button class="btn-visualizar">Visualizar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>Manutenção elevador</td>
                <td>Verificação geral do elevador</td>
                <td>Em andamento</td>
                <td>15/10/2025</td>
                <td>
                  <button class="btn-visualizar">Visualizar</button>
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
