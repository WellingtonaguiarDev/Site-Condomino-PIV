const telasFinanceiroMorador = {
  "Boletos": `
    <div class="content-top">
      <h1>Boletos</h1>
      <p class="lead">Gerencie seus boletos e pagamentos.</p>

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

          <input type="text" placeholder="Pesquisar boleto...">

          <button class="btn-buscar"><i class="fa fa-search"></i> Buscar</button>
          <button class="btn-buscar" style="margin-left:5px;"><i class="fa fa-plus"></i> Novo Boleto</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Condomínio mensal</td>
                <td>R$ 350,00</td>
                <td>10/11/2025</td>
                <td>Pendente</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                  <button class="btn-pagar">Marcar como pago</button>
                </td>
              </tr>
              <tr>
                <td>Água</td>
                <td>R$ 75,00</td>
                <td>15/11/2025</td>
                <td>Pago</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,

  "Histórico de pagamentos": `
    <div class="content-top">
      <h1>Histórico de Pagamentos</h1>
      <p class="lead">Confira seus pagamentos já realizados.</p>

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

          <input type="text" placeholder="Pesquisar pagamento...">
          <button class="btn-buscar"><i class="fa fa-search"></i> Buscar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data de pagamento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Condomínio mensal</td>
                <td>R$ 350,00</td>
                <td>10/10/2025</td>
                <td>Pago</td>
              </tr>
              <tr>
                <td>Água</td>
                <td>R$ 75,00</td>
                <td>15/09/2025</td>
                <td>Pago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
