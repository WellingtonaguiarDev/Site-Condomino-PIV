const telasAreas = {
  "Reserva de espaços": `
    <div class="content-top">
      <h1>Reserva de Espaços</h1>
      <p class="lead">Preencha os dados abaixo para reservar um espaço comum.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Nome do espaço</label>
          <select name="nome_espaco" required>
            <option value="">Selecione</option>
            <option value="Salão de Festas">Salão de Festas</option>
            <option value="Churrasqueira">Churrasqueira</option>
            <option value="Campo de Futebol">Campo de Futebol</option>
          </select>
        </div>

        <div class="form-group">
          <label>Data da reserva</label>
          <input type="date" name="data_reserva" required>
        </div>

        <div class="form-group">
          <label>Hora de início</label>
          <input type="time" name="hora_inicio" required>
        </div>

        <div class="form-group">
          <label>Hora de término</label>
          <input type="time" name="hora_fim" required>
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
          <button type="submit" class="btn-salvar">Reservar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Agenda de uso": `
    <div class="content-top">
      <h1>Agenda de Uso das Áreas Comuns</h1>
      <p class="lead">Confira o histórico e status das reservas realizadas.</p>

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
          <button><i class="fa fa-search"></i> Buscar</button>
        </div>

        <!-- Tabela -->
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Nome do espaço</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Salão de Festas</td>
                <td>10/10/2025</td>
                <td>18:00 - 22:00</td>
                <td>A</td>
                <td>101</td>
                <td>Confirmado</td>
                <td>
                  <button class="btn-editar">Editar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>Churrasqueira</td>
                <td>12/10/2025</td>
                <td>14:00 - 17:00</td>
                <td>B</td>
                <td>202</td>
                <td>Pendente</td>
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
