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
          <label>Vaga</label>
          <input type="text" name="vaga" placeholder="Ex: V01">
        </div>

        <div class="form-group">
          <label>Associar a</label>
          <select name="tipo_vinculo" required>
            <option value="">Selecione...</option>
            <option value="morador">Morador</option>
            <option value="visitante">Visitante</option>
          </select>
        </div>

        <div class="form-group">
          <label>ID do Morador / Visitante</label>
          <input type="number" name="id_vinculo" placeholder="Digite o ID">
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
          <input type="text" placeholder="Placa">
          <input type="text" placeholder="Modelo">
          <input type="text" placeholder="Cor">
          <button class="btn-buscar"><i class="fa fa-search"></i> Buscar</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Vaga</th>
                <th>Vinculado a</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ABC-1234</td>
                <td>Corolla</td>
                <td>Preto</td>
                <td>V01</td>
                <td>Morador #1</td>
                <td>
                  <button class="btn-editar">Editar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>XYZ-9876</td>
                <td>Onix</td>
                <td>Branco</td>
                <td>V05</td>
                <td>Visitante #2</td>
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