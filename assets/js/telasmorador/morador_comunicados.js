const telasComunicadosMorador = {
  "Avisos do condomínio": `
    <div class="content-top">
      <h1>Avisos do Condomínio</h1>
      <p class="lead">Confira os comunicados enviados pelo síndico.</p>

      <div class="historico-container">
        <div class="historico-filtros">
          <input type="text" placeholder="Pesquisar...">
          <button><i class="fa fa-search"></i> Buscar</button>
        </div>

        <div class="historico-tabela">
          <table class="tabela-historico">
            <thead>
              <tr>
                <th>Título</th>
                <th>Mensagem</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Assembleia Geral</td>
                <td>Convocação para reunião geral</td>
                <td>20/09/2025</td>
              </tr>
              <tr>
                <td>Regras de uso da piscina</td>
                <td>Horário alterado para 08h às 22h</td>
                <td>22/09/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,

  "Documentos": `
    <div class="content-top">
      <h1>Documentos do Condomínio</h1>
      <p class="lead">Acesse documentos oficiais do condomínio.</p>

      <div class="historico-tabela">
        <table class="tabela-historico">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Arquivo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regimento Interno</td>
              <td>PDF</td>
              <td><button class="btn-baixar">Baixar</button></td>
            </tr>
            <tr>
              <td>Atas de reunião</td>
              <td>PDF</td>
              <td><button class="btn-baixar">Baixar</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botão do Chatbot IA -->
      <div id="chatbot-toggle" class="chatbot-toggle">💬</div>

      <!-- Janela do Chatbot IA -->
      <div id="chatbot-window" class="chatbot-window">
        <div class="chatbot-header">
          <span>Chatbot Resumo</span>
          <button id="chatbot-close">✖</button>
        </div>
        <div class="chatbot-body" id="chatbot-body">
          <div class="chatbot-message">Olá! Cole aqui seu documento para gerar um resumo.</div>
        </div>
        <div class="chatbot-input">
          <textarea id="chatbot-input-text" placeholder="Cole seu documento aqui..."></textarea>
          <button id="chatbot-send">Enviar</button>
        </div>
      </div>
    </div>
  `
};
