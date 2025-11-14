// ==========================================================
// mainDocumentosCondominio.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  async function carregarTelaDocumentos() {
    content.innerHTML = telasMoradorDocumentos["Documentos do condomínio"];
    const tbody = content.querySelector(".documentos-tbody");
    const loading = content.querySelector(".loading-documentos");

    loading.style.display = "block";

    try {
      const docs = await listarDocumentos();

      tbody.innerHTML = docs.length
        ? docs.map((d, index) => `
            <tr>
              <td>${d.titulo}</td>
              <td>${d.descricao}</td>
              <td class="acoes-documentos">
                <button class="btn-baixar-doc" data-file="${d.arquivo}" data-id="${index}">
                  Baixar
                </button>

                <button class="btn-resumir-doc" data-content="${encodeURIComponent(d.descricao)}" data-id="${index}">
                  Resumir
                </button>
              </td>
            </tr>
          `).join("")
        : `<tr><td colspan="3">Nenhum documento encontrado.</td></tr>`;

      // Botões
      document.querySelectorAll(".btn-baixar-doc").forEach(btn => {
        btn.addEventListener("click", () => {
          const fileUrl = btn.getAttribute("data-file");
          if (!fileUrl) return;
          window.open(fileUrl, "_blank");
        });
      });

      document.querySelectorAll(".btn-resumir-doc").forEach(btn => {
        btn.addEventListener("click", () => {
          const content = decodeURIComponent(btn.getAttribute("data-content"));
          alert("RESUMO (implementaremos depois):\n\n" + content);
        });
      });

    } catch (err) {
      console.error("Erro ao carregar documentos:", err);
      tbody.innerHTML = `<tr><td colspan="3">Erro ao carregar documentos.</td></tr>`;
    } finally {
      loading.style.display = "none";
    }
  }

  // Navegação
  const menu = document.querySelector("#menuDocumentos");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;

      const item = e.target.textContent.trim();
      if (item === "Documentos do condomínio") carregarTelaDocumentos();
    });
  }
});
