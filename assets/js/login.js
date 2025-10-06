// 🟢 Captura o evento de envio do formulário de login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que a página recarregue

  // 🟢 Pega o email e a senha digitados pelo usuário
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 🟢 1. Envia a requisição de login para o backend (gera o token JWT)
    const response = await fetch("https://condomineo-production.up.railway.app/api/v1/auth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // envia o email e a senha em formato JSON
    });

    // 🔴 Caso o login falhe (email/senha errados)
    if (!response.ok) throw new Error("Falha no login");

    // 🟢 2. Lê a resposta e extrai os tokens de autenticação
    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    // 🟢 3. Usa o token para buscar as informações do usuário logado
    const meResponse = await fetch("https://condomineo-production.up.railway.app/api/v1/users/persons/me/", {
      headers: {
        Authorization: `Bearer ${data.access}`, // envia o token de acesso no cabeçalho
        "Content-Type": "application/json",
      },
    });

    // 🔴 Caso o backend não retorne corretamente os dados do usuário
    if (!meResponse.ok) throw new Error("Erro ao obter dados do usuário");

    // 🟢 4. Lê os dados retornados do usuário logado
    const userData = await meResponse.json();
    console.log("Resposta do /me/:", userData); // Mostra a resposta no console (para depuração)

    // 🟢 5. Se o backend retornar uma lista, pega o primeiro usuário
    const user = Array.isArray(userData) ? userData[0] : userData;

    // 🟢 6. Redireciona conforme o tipo de usuário
    if (user.user_type === "admin") {
      // Se for síndico/admin, vai para a tela do síndico
      window.location.href = "../pages/homesindico.html";
    } else if (user.user_type === "resident") {
      // Se for morador, vai para a tela do morador
      window.location.href = "../pages/homemorador.html";
    } else {
      // Caso o tipo de usuário não seja reconhecido
      alert("Tipo de usuário não reconhecido: " + user.user_type);
    }

  } catch (error) {
    // 🔴 7. Mostra erro caso algo dê errado em qualquer parte do processo
    console.error("Erro:", error);
    alert("Usuário ou senha inválidos");
  }
});
