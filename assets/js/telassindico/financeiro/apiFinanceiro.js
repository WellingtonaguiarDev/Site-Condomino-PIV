// ==========================================================
// apiFinanceiro.js
// ==========================================================
const API_URL_FINANCEIRO = "https://api.porttusmart.tech/api/v1/core/finances/";

// Criar lançamento com debug
async function criarLancamento(formData) {
  const token = localStorage.getItem("access_token");

  // ===== DEBUG =====
  console.log("===== DEBUG: Conteúdo do FormData =====");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }
  console.log("======================================");

  try {
    const res = await fetch(API_URL_FINANCEIRO, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // NÃO colocar Content-Type para FormData
      body: formData
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Lançamento cadastrado com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao cadastrar lançamento: " + err.message);
    console.error(err);
    throw err;
  }
}

// Listar lançamentos
async function listarLancamentos() {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  try {
    const res = await fetch(API_URL_FINANCEIRO, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar lançamentos");

    const data = await res.json();
    const lancamentos = data.results || data;

    if (condominio?.code_condominium) {
      return lancamentos.filter(l => l.condominium?.code_condominium === condominio.code_condominium);
    }

    return lancamentos;
  } catch (err) {
    console.error("Erro ao listar lançamentos:", err);
    return [];
  }
}

// Atualizar lançamento
async function atualizarLancamento(id, formData) {
  const token = localStorage.getItem("access_token");

  // ===== DEBUG =====
  console.log("===== DEBUG Atualizar: Conteúdo do FormData =====");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }
  console.log("======================================");

  try {
    const res = await fetch(`${API_URL_FINANCEIRO}${id}/`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }, // NÃO colocar Content-Type para FormData
      body: formData
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Lançamento atualizado com sucesso!");
  } catch (err) {
    alert("Erro ao atualizar lançamento: " + err.message);
    console.error(err);
    throw err;
  }
}

// Deletar lançamento
async function deletarLancamento(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_FINANCEIRO}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Lançamento excluído com sucesso!");
  } catch (err) {
    alert("Erro ao excluir lançamento: " + err.message);
    console.error(err);
  }
}
