// ------------------------
// apiEntregas.js
// ------------------------
const API_URL_ENTREGAS = "https://api.porttusmart.tech/api/v1/core/orders/";

async function criarEntrega(dados) {
  const token = localStorage.getItem("access_token");
  const condominio = JSON.parse(localStorage.getItem("condominioSelecionado"));

  if (!condominio?.code_condominium) {
    alert("Selecione um condomínio antes de cadastrar a entrega.");
    return;
  }

  const formData = new FormData();
  formData.append("order_code", dados.codigo);
  formData.append("status", "recebido");
  formData.append("code_condominium", condominio.code_condominium);
  formData.append("apartment_number", Number(dados.apartamento));
  formData.append("apartment_block", dados.bloco);

  if (dados.assinatura) {
    formData.append("signature_image", dados.assinatura);
  }

  try {
    const res = await fetch(API_URL_ENTREGAS, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Entrega cadastrada com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao cadastrar entrega: " + err.message);
    console.error(err);
  }
}

async function listarEntregas() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_ENTREGAS, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar entregas");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function deletarEntrega(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_ENTREGAS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Entrega excluída com sucesso!");
  } catch (err) {
    alert("Erro ao excluir entrega: " + err.message);
    console.error(err);
  }
}
