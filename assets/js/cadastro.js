document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // PEGAR TOKEN DO RECAPTCHA
    const recaptcha_token = grecaptcha.getResponse();

    if (!recaptcha_token) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    // Coleta os dados do formulário
    const nome = form.nome.value.trim();
    const cpf = form.cpf.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();
    const codigoCondominio = form.codigoCondominio.value.trim();
    const apartamento = form.apartamento.value.trim();
    const bloco = form.bloco.value.trim();

    // Monta o JSON conforme o backend espera
    const userData = {
      name: nome,
      email: email,
      cpf: cpf,
      password: senha,
      telephone: telefone,
      user_type: "resident",
      apartment_number: apartamento,
      apartment_block: bloco,
      condominium: codigoCondominio,
      recaptcha_token: recaptcha_token   // <<--- AQUI FOI ADICIONADO
    };

    console.log("📤 Enviando JSON para o servidor:");
    console.log(JSON.stringify(userData, null, 2));

    let url = "https://api.porttusmart.tech/api/v1/users/persons/";
    console.log("🔍 URL original:", `"${url}"`);
    url = url.trim();
    console.log("✅ URL limpa:", `"${url}"`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      console.log("📡 Status da resposta:", response.status);

      if (response.ok) {
        alert("✅ Cadastro realizado com sucesso!");
        form.reset();
        grecaptcha.reset(); // reseta o recaptcha
        window.location.href = "../index.html";
      } else {
        let errorText;
        try {
          const errorData = await response.json();
          console.log("🧾 Resposta do servidor (JSON):", errorData);
          errorText = errorData.message || JSON.stringify(errorData);
        } catch {
          const textData = await response.text();
          console.warn("⚠️ Servidor retornou HTML ou texto:", textData);
          errorText = textData;
        }
        alert("❌ Erro ao cadastrar:\n" + errorText);
      }
    } catch (error) {
      console.error("🚨 Erro de rede ou fetch:", error);
      alert("Erro de conexão com o servidor. Tente novamente mais tarde.");
    }
  });
});
