const telasMoradores = {
  "Cadastro de moradores": `
    <div class="content-top">
      <h1>Cadastro de Moradores</h1>
      <p class="lead">Preencha os dados abaixo para cadastrar um novo morador.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Nome completo</label>
          <input type="text" name="nome" placeholder="Nome completo" required>
        </div>

        <div class="form-group">
          <label>CPF</label>
          <input type="text" name="cpf" placeholder="000.000.000-00" required>
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" name="telefone" placeholder="(00) 00000-0000" required>
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="email@dominio.com" required>
        </div>

        <div class="form-group endereco-group">
          <label>Endereço</label>
          <input type="text" name="rua" placeholder="Rua" required>
          <input type="text" name="numero" placeholder="Número" required>
          <input type="text" name="complemento" placeholder="Complemento">
          <input type="text" name="bairro" placeholder="Bairro" required>
          <input type="text" name="cidade" placeholder="Cidade" required>
          <input type="text" name="estado" placeholder="Estado" required>
          <input type="text" name="cep" placeholder="CEP" required>
        </div>

        <div class="form-group">
          <label>Data de entrada</label>
          <input type="date" name="data_entrada" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de moradores": `
    <div class="content-top">
      <h1>Histórico de Moradores</h1>
      <p class="lead">Lista de moradores cadastrados e seu histórico.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <select name="bloco">
            <option value="">Filtrar por bloco</option>
            <option value="blocoA">Bloco A</option>
            <option value="blocoB">Bloco B</option>
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
                <th>Nome</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Contato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maria Silva</td>
                <td>Bloco A</td>
                <td>101</td>
                <td>(11) 91234-5678</td>
              </tr>
              <tr>
                <td>João Santos</td>
                <td>Bloco B</td>
                <td>102</td>
                <td>(21) 99876-5432</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};

// Seleciona a área de conteúdo
const content = document.querySelector(".content");

// Função para trocar a tela
function mostrarTela(nome) {
  if (telasMoradores[nome]) {
    content.innerHTML = telasMoradores[nome];
  } else {
    content.innerHTML = `
      <div class="content-top">
        <h1>Tela não encontrada</h1>
      </div>
    `;
  }
}

// Adiciona evento a cada subitem do menu
document.querySelectorAll(".subitem").forEach(item => {
  item.addEventListener("click", () => {
    const tela = item.textContent.trim();
    mostrarTela(tela);
  });
});
