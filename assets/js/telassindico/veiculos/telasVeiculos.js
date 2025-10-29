// ------------------------
// telasVeiculos.js
// ------------------------
const telasVeiculos = {
  "Cadastro de veículos de moradores": `
    <div class="content-top">
      <h1>Cadastro de Veículos</h1>
      <p class="lead">Preencha os dados abaixo para registrar um veículo.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Placa</label>
          <input type="text" name="placa" placeholder="ABC-1234" required>
        </div>

        <div class="form-group">
          <label>Modelo</label>
          <input type="text" name="modelo" placeholder="Ex: Corolla" required>
        </div>

        <div class="form-group">
          <label>Cor</label>
          <input type="text" name="cor" placeholder="Ex: Preto" required>
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="bloco" placeholder="Ex: A" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="number" name="apartamento" placeholder="Ex: 101" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de veículos": `
    <div class="content-top">
      <h1>Histórico de Veículos</h1>
      <p class="lead">Lista de veículos registrados no condomínio.</p>

      <div class="historico-container">
        <!-- Filtros -->
        <div class="historico-filtros">
          <input type="text" id="filtroPlaca" placeholder="Placa">
          <input type="text" id="filtroModelo" placeholder="Modelo">
          <input type="text" id="filtroCor" placeholder="Cor">
          <button class="btn-buscar" id="btnBuscarVeiculos"><i class="fa fa-search"></i> Buscar</button>
          <button class="btn-limpar" id="btnLimparVeiculos">Limpar</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaVeiculosBody">
              <!-- Linhas serão inseridas dinamicamente -->
            </tbody>
          </table>
        </div>

        <div id="loadingVeiculos" style="display:none;text-align:center;padding:20px;">
          Carregando veículos...
        </div>
      </div>
    </div>
  `
};
