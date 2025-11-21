document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  // 🔥 Se veio do Google, já temos o usuário criado
  const googleUser = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("user_id");
  const isNewUser = localStorage.getItem("is_new_user") === "true";

  // Preencher campos vindos do Google
  if (googleUser) {
    if (googleUser.name) form.nome.value = googleUser.name;
    if (googleUser.email) {
      form.email.value = googleUser.email;
      form.email.readOnly = true;
      form.email.style.background = "#eee";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // recaptcha
    const recaptcha_token = grecaptcha.getResponse();
    if (!recaptcha_token) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    // Dados do formulário
    const userData = {
      name: form.nome.value.trim(),
      email: form.email.value.trim(),
      cpf: form.cpf.value.trim(),
      password: form.senha.value.trim(),
      telephone: form.telefone.value.trim(),
      user_type: "resident",
      number_apartment: Number(form.apartamento.value.trim()),
      block_apartment: form.bloco.value.trim(),
      code_condominium: form.codigoCondominio.value.trim(),
      recaptcha_token: recaptcha_token
    };

    // Identifica se é fluxo Google
    const isGoogleFlow = googleUser && isNewUser;

    const url = isGoogleFlow
      ? `https://api.porttusmart.tech/api/v1/users/persons/${userId}/`
      : `https://api.porttusmart.tech/api/v1/users/persons/`;

    const method = isGoogleFlow ? "PUT" : "POST";

    // 🔥 PEGAR TOKEN (necessário para PUT)
    const token = localStorage.getItem("access_token");

    const headers = {
      "Content-Type": "application/json"
    };

    if (isGoogleFlow && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // =======================
    // 🔥 DEBUG COMPLETO 🔥
    // =======================
    console.log("============== DEBUG REQUEST ==============");
    console.log("URL:", url);
    console.log("METHOD:", method);
    console.log("HEADERS:", headers);
    console.log("BODY OBJ:", userData);
    console.log("BODY JSON:", JSON.stringify(userData, null, 2));
    console.log("===========================================");

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(userData)
      });

      console.log("============== DEBUG RESPONSE =============");
      console.log("STATUS:", response.status, response.statusText);

      let cloned = response.clone();

      try {
        const json = await cloned.json();
        console.log("JSON RESPONSE:", json);
      } catch (e) {
        const text = await cloned.text();
        console.log("TEXT RESPONSE:", text);
      }

      console.log("===========================================");

      // 🟢 SE OK
      if (response.ok) {
        alert("✅ Cadastro finalizado com sucesso!");

        localStorage.removeItem("user");
        localStorage.removeItem("is_new_user");

        grecaptcha.reset();
        form.reset();

        window.location.href = "../index.html";
        return;
      }

      // 🔥 --- TRATAMENTO ESPECIAL PARA USUÁRIO INATIVO ---
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }

      if (errorData.code === "user_inactive") {
        alert("🟡 Seu cadastro foi enviado!\nO síndico precisa ativar sua conta antes do primeiro acesso.");

        localStorage.removeItem("user");
        localStorage.removeItem("is_new_user");

        grecaptcha.reset();
        form.reset();

        window.location.href = "../index.html";
        return;
      }
      // ---------------------------------------------------

      // ❌ Caso não seja user_inactive → erro normal
      const errorText =
        errorData.message || JSON.stringify(errorData) || "Erro desconhecido";

      alert("❌ Erro ao cadastrar:\n" + errorText);

    } catch (error) {
      console.error("🚨 ERRO NO FETCH =====");
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  });
});
