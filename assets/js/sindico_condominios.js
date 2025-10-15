document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("listaCondominios");
  const infoDiv = document.getElementById("infoCondominio");

  try {
    const token = localStorage.getItem("access_token");

    // 🔹 Faz o GET para buscar os condomínios cadastrados
    const response = await fetch("https://api.porttusmart.tech/api/v1/core/condominiums/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Erro ao buscar condomínios: ${msg}`);
    }

    const data = await response.json();
    const condominios = data.results;

    if (!condominios || condominios.length === 0) {
      lista.innerHTML = "<p>Nenhum condomínio encontrado.</p>";
      return;
    }

    lista.innerHTML = ""; // limpa o texto "Carregando..."

    // 🔹 Cria um item para cada condomínio retornado
    condominios.forEach((cond) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.textContent = cond.name;
      item.dataset.id = cond.id;

      // Ao clicar, exibe as informações do condomínio
      item.addEventListener("click", () => {
        // remove destaque anterior
        document.querySelectorAll(".menu-fixed .item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const endereco = cond.address;
        infoDiv.innerHTML = `
          <h2>${cond.name}</h2>
          <p><strong>Código:</strong> ${cond.code_condominium}</p>
          <p><strong>CNPJ:</strong> ${cond.cnpj}</p>
          <p><strong>Endereço:</strong> ${endereco.street}, ${endereco.number} ${endereco.complement ? '- ' + endereco.complement : ''}</p>
          <p><strong>Bairro:</strong> ${endereco.neighborhood}</p>
          <p><strong>Cidade:</strong> ${endereco.city} - ${endereco.state}</p>
          <p><strong>CEP:</strong> ${endereco.zip_code}</p>
          <p><strong>Criado em:</strong> ${new Date(cond.created_at).toLocaleDateString()}</p>
        `;
      });

      lista.appendChild(item);
    });

  } catch (error) {
    console.error("❌ Erro:", error);
    lista.innerHTML = "<p style='color:red;'>Erro ao carregar lista de condomínios.</p>";
  }
});
