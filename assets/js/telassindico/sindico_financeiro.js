const telasFinanceiro = {
  "Boletos": `
    <div class="content-top">
      <h1>Boletos</h1>
      <p class="lead">Gerencie os boletos gerados para moradores.</p>

      <div class="historico-container">
        <!-- Botão novo boleto -->
        <div class="acoes-superiores">
          <button class="btn-novo">➕ Novo boleto</button>
        </div>

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
          <button><i class="fa fa-search"></i> Buscar</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Morador</th>
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
                <td>Maria Silva</td>
                <td>Cobrança</td>
                <td>Condomínio Mensal</td>
                <td>R$ 500,00</td>
                <td>10/10/2025</td>
                <td>Pendente</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                  <button class="btn-enviar">Enviar</button>
                </td>
              </tr>
              <tr>
                <td>João Santos</td>
                <td>Cobrança</td>
                <td>Água</td>
                <td>R$ 80,00</td>
                <td>15/10/2025</td>
                <td>Pago</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                  <button class="btn-enviar">Enviar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
