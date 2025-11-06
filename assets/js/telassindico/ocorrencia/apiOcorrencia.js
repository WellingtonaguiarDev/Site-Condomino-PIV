// ==========================================================
// apiOcorrencias.js
// ==========================================================
const API_URL_OCORRENCIAS = "https://api.porttusmart.tech/api/v1/core/occurrences/";

// Criar ocorrência
async function criarOcorrencia(dados) {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  if (!condominio?.code_condominium) {
    alert("Selecione um condomínio antes de registrar uma ocorrência.");
    return;
  }

  const payload = {
    title: dados.titulo,
    description: dados.descricao,
    status: dados.status || "aberta",
    apartment_number: dados.apartamento ? Number(dados.apartamento) : null,
    apartment_block: dados.bloco || null,
    code_condominium: condominio.code_condominium
  };

  console.log("📦 Payload enviado ao backend (ocorrência):", payload);

  try {
    const res = await fetch(API_URL_OCORRENCIAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Ocorrência registrada com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao registrar ocorrência: " + err.message);
    console.error(err);
  }
}

// Listar ocorrências
async function listarOcorrencias() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_OCORRENCIAS, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Erro ao buscar ocorrências");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Atualizar ocorrência
async function atualizarOcorrencia(id, dados) {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  const payload = {
    title: dados.titulo,
    description: dados.descricao,
    status: dados.status || "aberta",
    apartment_number: dados.apartamento ? Number(dados.apartamento) : null,
    apartment_block: dados.bloco || null,
    code_condominium: condominio?.code_condominium
  };

  try {
    const res = await fetch(`${API_URL_OCORRENCIAS}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Ocorrência atualizada com sucesso!");
  } catch (err) {
    alert("Erro ao atualizar ocorrência: " + err.message);
    console.error(err);
  }
}

// Deletar ocorrência
async function deletarOcorrencia(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_OCORRENCIAS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert("Ocorrência excluída com sucesso!");
  } catch (err) {
    alert("Erro ao excluir ocorrência: " + err.message);
    console.error(err);
  }
}
