// sindico_notificacoes.js - compatível com o formato da sua API
const API_URL = "https://api.porttusmart.tech/api/v1/users/persons/";
const token = localStorage.getItem("token");

// Elementos
const bellBtn = document.getElementById("notification-bell");
const dropdown = document.getElementById("notification-dropdown");
const notificationCount = document.getElementById("notification-count");

// Função principal
async function carregarNotificacoes() {
  if (!token) {
    console.warn("Token não encontrado no localStorage (chave 'token').");
    dropdown.innerHTML = `<p class="no-notifications">Usuário não autenticado.</p>`;
    atualizarContador(0);
    return;
  }

  try {
    const resp = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      console.error("Erro ao buscar usuários:", resp.status);
      dropdown.innerHTML = `<p class="no-notifications">Erro ao carregar notificações (${resp.status}).</p>`;
      atualizarContador(0);
      return;
    }

    const data = await resp.json();
    console.debug("Resposta completa da API:", data);

    const usuarios = data.results || [];

    // FILTRO: apenas usuários pendentes (is_active = false)
    const pendentes = usuarios.filter(u => !u.is_active);

    atualizarLista(pendentes);
  } catch (error) {
    console.error("Erro na requisição:", error);
    dropdown.innerHTML = `<p class="no-notifications">Erro ao carregar notificações.</p>`;
    atualizarContador(0);
  }
}

// Atualiza o contador no sino
function atualizarContador(qtd) {
  notificationCount.textContent = qtd > 0 ? qtd : "";
  notificationCount.style.display = qtd > 0 ? "inline-block" : "none";
}

// Atualiza o dropdown com as notificações
function atualizarLista(usuarios) {
  dropdown.innerHTML = "";

  if (usuarios.length === 0) {
    dropdown.innerHTML = `<p class="no-notifications">Nenhuma nova solicitação.</p>`;
    atualizarContador(0);
    return;
  }

  atualizarContador(usuarios.length);

  usuarios.forEach(usuario => {
    const bloco = usuario.apartment?.block || "N/A";
    const numero = usuario.apartment?.number || "N/A";

    const item = document.createElement("div");
    item.className = "notification-item";
    item.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:5px; padding:5px 0;">
        <strong>${usuario.name}</strong>
        <span>Morador do bloco ${bloco} apartamento ${numero}</span>
        <div style="display:flex; gap:10px; margin-top:5px;">
          <button class="btn-approve" data-id="${usuario.id}">Aprovar</button>
          <button class="btn-reject" data-id="${usuario.id}">Rejeitar</button>
        </div>
      </div>
    `;

    // Eventos dos botões
    item.querySelector(".btn-approve").addEventListener("click", () => aprovarUsuario(usuario.id));
    item.querySelector(".btn-reject").addEventListener("click", () => rejeitarUsuario(usuario.id));

    dropdown.appendChild(item);
  });
}

// Aprovar usuário (PATCH para ativar)
async function aprovarUsuario(id) {
  if (!confirm("Deseja aprovar este usuário?")) return;

  try {
    const resp = await fetch(`${API_URL}${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_active: true }) // <- ativa o usuário
    });

    if (!resp.ok) throw new Error(`Status ${resp.status}`);

    alert("Usuário aprovado com sucesso!");
    carregarNotificacoes();
  } catch (err) {
    console.error("Erro ao aprovar:", err);
    alert("Erro ao aprovar usuário.");
  }
}

// Rejeitar usuário (DELETE)
async function rejeitarUsuario(id) {
  if (!confirm("Tem certeza que deseja rejeitar este usuário?")) return;

  try {
    const resp = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) throw new Error(`Status ${resp.status}`);

    alert("Usuário rejeitado e removido!");
    carregarNotificacoes();
  } catch (err) {
    console.error("Erro ao rejeitar:", err);
    alert("Erro ao rejeitar usuário.");
  }
}

// Toggle do dropdown
bellBtn.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!bellBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

// Inicialização
carregarNotificacoes();
setInterval(carregarNotificacoes, 30000);
