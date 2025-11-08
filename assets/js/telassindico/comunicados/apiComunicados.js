// ==========================================================
// apiComunicados.js
// ==========================================================
const API_URL_COMUNICADOS = "https://api.porttusmart.tech/api/v1/core/communications/";
const API_URL_DOCUMENTOS = "https://api.porttusmart.tech/api/v1/core/notices/";

// Criar comunicado
async function criarComunicado(dados) {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  if (!condominio?.code_condominium) {
    alert("Selecione um condomínio antes de cadastrar o comunicado.");
    return;
  }

  const payload = {
    title: dados.titulo || "Sem título",
    message: dados.mensagem,
    apartment_number: dados.apartamento ? Number(dados.apartamento) : null,
    apartment_block: dados.bloco || null,
    code_condominium: condominio.code_condominium,
    communication_type: "notice" // ✅ Campo obrigatório para comunicados
  };

  console.log("📦 Payload enviado ao backend (comunicado):", payload);

  try {
    const res = await fetch(API_URL_COMUNICADOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Erro ao enviar comunicado.");
    }

    alert("Comunicado enviado com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao enviar comunicado: " + err.message);
    console.error("❌ Erro ao criar comunicado:", err);
    return null;
  }
}

// Listar comunicados (GET)
async function listarComunicados() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    return [];
  }

  try {
    const res = await fetch(API_URL_COMUNICADOS, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Erro ao buscar comunicados.");
    }

    const data = await res.json();
    const todos = data.results || data;

    // ✅ Filtra apenas os comunicados (type = "notice")
    const comunicadosFiltrados = todos.filter(
      (c) => c.communication_type === "notice"
    );

    console.log("📜 Comunicados recebidos (filtrados):", comunicadosFiltrados);
    return comunicadosFiltrados;
  } catch (err) {
    console.error("❌ Erro ao listar comunicados:", err);
    return [];
  }
}

// Deletar comunicado
async function deletarComunicado(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_COMUNICADOS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Comunicado excluído com sucesso!");
  } catch (err) {
    alert("Erro ao excluir comunicado: " + err.message);
    console.error(err);
  }
}

// ==========================================================
// 📄 Documentos do Condomínio
// ==========================================================

// Criar documento (com upload)
async function criarDocumento(formData) {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  if (!condominio?.code_condominium) {
    alert("Selecione um condomínio antes de enviar o documento.");
    return;
  }

  formData.append("code_condominium", condominio.code_condominium);

  try {
    const res = await fetch(API_URL_DOCUMENTOS, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Documento enviado com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao enviar documento: " + err.message);
    console.error(err);
  }
}

// Listar documentos (GET)
async function listarDocumentos() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_DOCUMENTOS, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar documentos");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error("Erro na listagem de documentos:", err);
    return [];
  }
}

// Deletar documento
async function deletarDocumento(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_DOCUMENTOS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Documento excluído com sucesso!");
  } catch (err) {
    alert("Erro ao excluir documento: " + err.message);
    console.error(err);
  }
}
