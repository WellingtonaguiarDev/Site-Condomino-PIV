// telas.js

// Objeto com todas as telas
const telas = {
  // Moradores
  "Cadastro de moradores": `
    <div class="content-top">
      <h1>Cadastro de Moradores</h1>
      <p class="lead">Formulário para cadastrar novos moradores.</p>
    </div>
  `,
  "Histórico de moradores": `
    <div class="content-top">
      <h1>Histórico de Moradores</h1>
      <p class="lead">Listagem e histórico dos moradores cadastrados.</p>
    </div>
  `,

  // Visitantes
  "Cadastro de visitantes": `
    <div class="content-top">
      <h1>Cadastro de Visitantes</h1>
      <p class="lead">Área para cadastrar visitantes autorizados.</p>
    </div>
  `,
  "Controle de entradas e saídas": `
    <div class="content-top">
      <h1>Controle de Entradas e Saídas</h1>
      <p class="lead">Monitore o acesso de visitantes e prestadores.</p>
    </div>
  `,

  // Veículos
  "Cadastro de veículos de moradores": `
    <div class="content-top">
      <h1>Cadastro de Veículos de Moradores</h1>
      <p class="lead">Área para cadastrar veículos dos moradores.</p>
    </div>
  `,
  "Cadastro de visitantes (veículos)": `
    <div class="content-top">
      <h1>Cadastro de Veículos de Visitantes</h1>
      <p class="lead">Cadastro e autorização de veículos de visitantes.</p>
    </div>
  `,
  "Controle de vagas": `
    <div class="content-top">
      <h1>Controle de Vagas</h1>
      <p class="lead">Gerencie a ocupação e liberação das vagas do condomínio.</p>
    </div>
  `,

  // Áreas Comuns
  "Reserva de espaços": `
    <div class="content-top">
      <h1>Reserva de Espaços</h1>
      <p class="lead">Agende e gerencie reservas de áreas comuns.</p>
    </div>
  `,
  "Agenda de uso": `
    <div class="content-top">
      <h1>Agenda de Uso</h1>
      <p class="lead">Visualize a agenda de utilização das áreas comuns.</p>
    </div>
  `,
  "Status de manutenção": `
    <div class="content-top">
      <h1>Status de Manutenção</h1>
      <p class="lead">Acompanhe o status das manutenções nas áreas comuns.</p>
    </div>
  `,

  // Financeiro
  "Cobranças": `
    <div class="content-top">
      <h1>Cobranças</h1>
      <p class="lead">Gestão das cobranças condominiais.</p>
    </div>
  `,
  "Boletos": `
    <div class="content-top">
      <h1>Boletos</h1>
      <p class="lead">Emissão e controle de boletos de pagamento.</p>
    </div>
  `,
  "Contas a pagar / receber": `
    <div class="content-top">
      <h1>Contas a Pagar / Receber</h1>
      <p class="lead">Controle financeiro de contas do condomínio.</p>
    </div>
  `,
  "Rateios / taxa de condomínio": `
    <div class="content-top">
      <h1>Rateios / Taxa de Condomínio</h1>
      <p class="lead">Gestão de rateios e cálculo das taxas condominiais.</p>
    </div>
  `,

  // Ocorrências
  "Registrar ocorrência": `
    <div class="content-top">
      <h1>Registrar Ocorrência</h1>
      <p class="lead">Formulário para registrar novas ocorrências.</p>
    </div>
  `,
  "Histórico de ocorrências": `
    <div class="content-top">
      <h1>Histórico de Ocorrências</h1>
      <p class="lead">Listagem de ocorrências registradas.</p>
    </div>
  `,
  "Chamados de manutenção": `
    <div class="content-top">
      <h1>Chamados de Manutenção</h1>
      <p class="lead">Acompanhe chamados técnicos e manutenções em andamento.</p>
    </div>
  `,

  // Comunicados
  "Novo comunicado": `
    <div class="content-top">
      <h1>Novo Comunicado</h1>
      <p class="lead">Crie e envie novos comunicados para os condôminos.</p>
    </div>
  `,
  "Histórico de comunicados": `
    <div class="content-top">
      <h1>Histórico de Comunicados</h1>
      <p class="lead">Veja todos os comunicados enviados anteriormente.</p>
    </div>
  `,
  "Documentos do condomínio": `
    <div class="content-top">
      <h1>Documentos do Condomínio</h1>
      <p class="lead">Área de armazenamento de documentos importantes.</p>
    </div>
  `,
  "Enviar notificações por e-mail/app": `
    <div class="content-top">
      <h1>Enviar Notificações</h1>
      <p class="lead">Envie notificações para moradores via e-mail ou app.</p>
    </div>
  `,

  // Relatórios
  "Relatórios financeiros": `
    <div class="content-top">
      <h1>Relatórios Financeiros</h1>
      <p class="lead">Visualize relatórios detalhados de finanças.</p>
    </div>
  `,
  "Relatórios de manutenção": `
    <div class="content-top">
      <h1>Relatórios de Manutenção</h1>
      <p class="lead">Relatórios de manutenção preventiva e corretiva.</p>
    </div>
  `,
  "Estatísticas gerais": `
    <div class="content-top">
      <h1>Estatísticas Gerais</h1>
      <p class="lead">Indicadores e estatísticas do condomínio.</p>
    </div>
  `,

  // Mensagens
  "Caixa de mensagens": `
    <div class="content-top">
      <h1>Caixa de Mensagens</h1>
      <p class="lead">Visualize e responda mensagens recebidas.</p>
    </div>
  `,
  "Reclamações": `
    <div class="content-top">
      <h1>Reclamações</h1>
      <p class="lead">Gerencie as reclamações feitas pelos moradores.</p>
    </div>
  `
};

// Seleciona a área de conteúdo
const content = document.querySelector(".content");

// Função para trocar a tela
function mostrarTela(nome) {
  if (telas[nome]) {
    content.innerHTML = telas[nome];
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

    // ajuste para nomes duplicados (ex: "Cadastro de visitantes" e veículos)
    if (tela === "Cadastro de visitantes" && item.closest(".menu-item").querySelector("label").textContent.includes("Veículos")) {
      mostrarTela("Cadastro de visitantes (veículos)");
    } else {
      mostrarTela(tela);
    }
  });
});
