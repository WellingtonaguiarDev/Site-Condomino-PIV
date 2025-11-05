// ==========================================================
// telasComunicados.js
// ==========================================================
const telasComunicados = {
  "Novo comunicado": `
    <div class="content-top-comunicados">
      <h1>Novo Comunicado</h1>
      <p class="lead-comunicados">Crie um novo comunicado para o condomínio.</p>

      <form class="form-cadastro-comunicados">
        <div class="form-group-comunicados">
          <label>Título</label>
          <input type="text" name="titulo" placeholder="Título do comunicado" required>
        </div>

        <div class="form-group-comunicados">
          <label>Mensagem</label>
          <textarea name="mensagem" placeholder="Digite a mensagem" rows="4" required></textarea>
        </div>

        <div class="form-group-comunicados endereco-group-comunicados">
          <div>
            <label>Bloco</label>
            <input type="text" name="bloco" placeholder="Ex: A" required>
          </div>
          <div>
            <label>Apartamento</label>
            <input type="text" name="apartamento" placeholder="Ex: 101" required>
          </div>
        </div>

        <div class="form-actions-comunicados">
          <button type="submit" class="btn-salvar-comunicados">Enviar</button>
          <button type="reset" class="btn-cancelar-comunicados">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de comunicados": `
    <div class="content-top-comunicados">
      <h1>Histórico de Comunicados</h1>
      <p class="lead-comunicados">Lista de comunicados enviados.</p>

      <div class="historico-container-comunicados">
        <div class="historico-filtros-comunicados">
          <input type="text" id="filtroPesquisaComunicados" placeholder="Pesquisar...">
          <button id="btnBuscarComunicados" class="btn-buscar-comunicados">Buscar</button>
          <button id="btnLimparComunicados" class="btn-limpar-comunicados">Limpar</button>
        </div>

        <div class="historico-tabela-comunicados">
          <table class="tabela-historico-comunicados">
            <thead>
              <tr>
                <th>Título</th>
                <th>Mensagem</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaComunicadosBody"></tbody>
          </table>
        </div>

        <div id="loadingComunicados" style="display:none;text-align:center;padding:20px;">
          Carregando comunicados...
        </div>
      </div>
    </div>
  `,

  "Documentos do condomínio": `
    <div class="content-top-comunicados">
      <h1>Documentos do Condomínio</h1>
      <p class="lead-comunicados">Lista de documentos disponíveis para consulta.</p>

      <div class="historico-container-comunicados">
        <div class="historico-filtros-comunicados">
          <input type="text" id="filtroPesquisaDocumentosComunicados" placeholder="Pesquisar...">
          <button id="btnBuscarDocumentosComunicados" class="btn-buscar-comunicados">Buscar</button>
          <button id="btnLimparDocumentosComunicados" class="btn-limpar-comunicados">Limpar</button>
        </div>

        <div class="historico-tabela-comunicados">
          <table class="tabela-historico-comunicados">
            <thead>
              <tr>
                <th>Nome do Documento</th>
                <th>Arquivo</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaDocumentosComunicadosBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
