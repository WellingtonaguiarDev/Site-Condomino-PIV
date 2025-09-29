const telasMensagensMorador = {
  "Enviar mensagem ao síndico": `
    <div class="content-top">
      <h1>Enviar Mensagem ao Síndico</h1>
      <p class="lead">Envie uma mensagem diretamente ao síndico do condomínio.</p>

      <form class="form-cadastro">
        <div class="form-group">
          <label>Assunto</label>
          <input type="text" name="assunto" placeholder="Digite o assunto" required>
        </div>

        <div class="form-group">
          <label>Mensagem</label>
          <textarea name="mensagem" placeholder="Digite sua mensagem" rows="4" required></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar">Enviar</button>
          <button type="reset" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `,

  "Minhas mensagens": `
    <div class="content-top">
      <h1>Minhas Mensagens</h1>
      <p class="lead">Veja suas mensagens enviadas e recebidas.</p>

      <div class="historico-tabela">
        <table class="tabela-historico">
          <thead>
            <tr>
              <th>Assunto</th>
              <th>Mensagem</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reclamação sobre barulho</td>
              <td>O som da festa do prédio estava alto.</td>
              <td>24/09/2025</td>
              <td><button class="btn-ver">Ver detalhes</button></td>
            </tr>
            <tr>
              <td>Dúvida sobre boleto</td>
              <td>Gostaria de saber o vencimento do próximo boleto.</td>
              <td>23/09/2025</td>
              <td><button class="btn-ver">Ver detalhes</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};
