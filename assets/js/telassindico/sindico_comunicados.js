const telasComunicados = {
  "Novo comunicado": `
    <div class="content-top">
      <h1>Novo Comunicado</h1>
      <p class="lead">Crie um novo comunicado para o condomínio.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Título</label>
          <input type="text" name="titulo" placeholder="Título do comunicado" required>
        </div>

        <div class="form-group">
          <label>Mensagem</label>
          <textarea name="mensagem" placeholder="Digite a mensagem" rows="4" required></textarea>
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
          <button type="submit" class="btn-salvar">Enviar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de comunicados": `
    <div class="content-top">
      <h1>Histórico de Comunicados</h1>
      <p class="lead">Lista de comunicados enviados.</p>

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
                <th>Mensagem</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Assembleia Geral</td>
                <td>Convocação para reunião</td>
                <td>A</td>
                <td>101</td>
                <td>22/10/2025</td>
                <td>
                  <button class="btn-reimprimir">Reimprimir</button>
                </td>
              </tr>
              <tr>
                <td>Regras de uso</td>
                <td>Atualização de normas</td>
                <td>B</td>
                <td>202</td>
                <td>21/10/2025</td>
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

  "Documentos do condomínio": `
    <div class="content-top">
      <h1>Documentos do Condomínio</h1>
      <p class="lead">Lista de documentos disponíveis para consulta.</p>

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
                <th>Nome do Documento</th>
                <th>Arquivo</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Regimento Interno</td>
                <td><a href="#">regimento.pdf</a></td>
                <td>01/09/2025</td>
                <td>
                  <button class="btn-download">Baixar</button>
                  <button class="btn-excluir">Excluir</button>
                </td>
              </tr>
              <tr>
                <td>Prestação de Contas</td>
                <td><a href="#">prestacao.pdf</a></td>
                <td>15/09/2025</td>
                <td>
                  <button class="btn-download">Baixar</button>
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
