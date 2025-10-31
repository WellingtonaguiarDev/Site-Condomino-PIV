// ------------------------
// telasReservas.js
// ------------------------
const telasReservas = {
  "Cadastro de reservas": `
    <div class="content-top">
      <h1>Cadastro de Reservas</h1>
      <p class="lead">Preencha os dados abaixo para reservar um espaço.</p>

      <form class="form-cadastro-reserva">
        <div class="form-group">
          <label>Espaço</label>
          <select name="space" required>
            <option value="">Selecione...</option>
            <option value="salão_de_festas">Salão de Festas</option>
            <option value="churrasqueira">Churrasqueira</option>
            <option value="piscina">Piscina</option>
            <option value="quadra">Quadra Poliesportiva</option>
            <option value="playground">Playground</option>
            <option value="academia">Academia</option>
          </select>
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="apartment_block" placeholder="Bloco" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="text" name="apartment_code" placeholder="Número do apartamento" required>
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

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de reservas": `
    <div class="content-top">
      <h1>Histórico de Reservas</h1>
      <p class="lead">Visualize todas as reservas registradas.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <input type="text" id="filtroEspaco" placeholder="Filtrar por espaço...">
          <button class="btn-buscar" id="btnBuscarReserva">Buscar</button>
          <button class="btn-limpar" id="btnLimparReserva">Limpar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Espaço</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaReservasBody"></tbody>
          </table>
        </div>
        <div id="loadingReservas" style="display:none;text-align:center;padding:20px;">
          Carregando reservas...
        </div>
      </div>
    </div>
  `
};
