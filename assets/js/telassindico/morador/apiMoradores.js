// apiMoradores.js
const API_URL_MORADORES = "https://api.porttusmart.tech/api/v1/core/residents-admin/";

async function criarMorador(dados) {
  const token = localStorage.getItem("access_token");
  const payload = {
    name: dados.nome,
    cpf: dados.cpf,
    phone: dados.telefone,
    apartment_block: dados.bloco,
    apartment_number: Number(dados.apartamento)
  };

  try {
    const res = await fetch(API_URL_MORADORES, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Morador cadastrado com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao cadastrar morador: " + err.message);
    console.error(err);
  }
}

async function listarMoradores() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_MORADORES, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Erro ao buscar moradores");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function atualizarMorador(id, dados) {
  const token = localStorage.getItem("access_token");
  const payload = {
    name: dados.nome,
    cpf: dados.cpf,
    phone: dados.telefone,
    apartment_block: dados.bloco,
    apartment_number: Number(dados.apartamento)
  };

  try {
    const res = await fetch(`${API_URL_MORADORES}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Morador atualizado com sucesso!");
  } catch (err) {
    alert("Erro ao atualizar morador: " + err.message);
    console.error(err);
  }
}

async function deletarMorador(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_MORADORES}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert("Morador deletado!");
  } catch (err) {
    alert("Erro ao deletar morador: " + err.message);
    console.error(err);
  }
}