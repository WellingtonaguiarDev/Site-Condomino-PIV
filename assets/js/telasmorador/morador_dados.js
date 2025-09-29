const telasMeusDados = {
  "Atualizar cadastro": `
    <div class="content-top">
      <h1>Atualizar Cadastro</h1>
      <p class="lead">Atualize suas informações pessoais.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Nome completo</label>
          <input type="text" name="nome" placeholder="Seu nome completo" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="seuemail@exemplo.com" required>
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" name="telefone" placeholder="(00) 00000-0000" required>
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
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

"Meus veículos": `
  <div class="content-top">
    <h1>Meus Veículos</h1>
    <p class="lead">Gerencie seus veículos cadastrados.</p>

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

        <input type="text" placeholder="Pesquisar veículo...">

        <button class="btn-buscar"><i class="fa fa-search"></i> Buscar</button>
        <button class="btn-buscar" style="margin-left:5px;"><i class="fa fa-plus"></i> Adicionar</button>
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABC-1234</td>
              <td>Honda Civic</td>
              <td>Prata</td>
              <td>A101</td>
              <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
              </td>
            </tr>
            <tr>
              <td>XYZ-5678</td>
              <td>Ford Ka</td>
              <td>Preto</td>
              <td>B202</td>
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
