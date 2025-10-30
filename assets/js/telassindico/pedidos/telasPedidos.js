const telasEntregas = {
  "Cadastro de entregas": `
    <div class="content-top">
      <h1>Cadastro de Entregas</h1>
      <p class="lead">Registre novas entregas recebidas na portaria.</p>

      <form class="form-cadastro-entrega">
        <div class="form-group">
          <label>Código da entrega</label>
          <input type="text" name="codigo" placeholder="Ex: PED12345" required>
        </div>

        <div class="form-group">
          <label>Bloco</label>
          <input type="text" name="bloco" placeholder="Ex: A" required>
        </div>

        <div class="form-group">
          <label>Apartamento</label>
          <input type="number" name="apartamento" placeholder="Ex: 101" required>
        </div>

        <div class="form-group">
          <label>Foto ou Assinatura</label>
          <input type="file" name="assinatura" accept="image/*">
          <small>Selecione uma imagem (assinatura ou comprovante)</small>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Histórico de entregas": `
    <div class="content-top">
      <h1>Histórico de Entregas</h1>
      <p class="lead">Acompanhe as entregas registradas no condomínio.</p>

      <div class="historico-container">
        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Código</th>
                <th>Status</th>
                <th>Bloco</th>
                <th>Apartamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabelaEntregasBody">
              <!-- Linhas preenchidas dinamicamente -->
            </tbody>
          </table>
        </div>

        <div id="loadingEntregas" style="display:none;text-align:center;padding:20px;">
          Carregando entregas...
        </div>
      </div>
    </div>
  `
};
