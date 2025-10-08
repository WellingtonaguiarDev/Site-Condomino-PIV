document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
      apartment: parseInt(apartamento),
      condominium: codigoCondominio,
      block: bloco
    };

    try {
      const response = await fetch("https://condomineo-production.up.railway.app/api/v1/users/persons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        form.reset();
        window.location.href = "../index.html";
      } else {
        const errorData = await response.json();
        console.error("Erro no cadastro:", errorData);
        alert("Erro ao cadastrar: " + (errorData.message || "verifique os dados e tente novamente."));
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de conexão com o servidor. Tente novamente mais tarde.");
    }
  });
});
