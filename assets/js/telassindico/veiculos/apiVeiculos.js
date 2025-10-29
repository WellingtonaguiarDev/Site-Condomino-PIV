// ------------------------
// apiVeiculos.js
// ------------------------
const API_URL_VEICULOS = "https://api.porttusmart.tech/api/v1/core/vehicles/";

async function criarVeiculo(dados) {
  const token = localStorage.getItem("access_token");
  const payload = {
    plate: dados.placa,
    model: dados.modelo,
    color: dados.cor,
    apartment_number: Number(dados.apartamento),
    apartment_block: dados.bloco
  };

  try {
    const res = await fetch(API_URL_VEICULOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Veículo cadastrado com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao cadastrar veículo: " + err.message);
    console.error(err);
  }
}

async function listarVeiculos() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_VEICULOS, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Erro ao buscar veículos");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function atualizarVeiculo(id, dados) {
  const token = localStorage.getItem("access_token");
  const payload = {
    plate: dados.placa,
    model: dados.modelo,
    color: dados.cor,
    apartment_number: Number(dados.apartamento),
    apartment_block: dados.bloco
  };

  try {
    const res = await fetch(`${API_URL_VEICULOS}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Veículo atualizado com sucesso!");
  } catch (err) {
    alert("Erro ao atualizar veículo: " + err.message);
    console.error(err);
  }
}

async function deletarVeiculo(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_VEICULOS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    alert("Veículo excluído com sucesso!");
  } catch (err) {
    alert("Erro ao excluir veículo: " + err.message);
    console.error(err);
  }
}
