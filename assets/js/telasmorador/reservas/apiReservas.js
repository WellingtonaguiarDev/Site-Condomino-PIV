// ------------------------
// apiReservas.js
// ------------------------
const API_URL_RESERVAS = "https://api.porttusmart.tech/api/v1/core/reservations/";

async function criarReserva(dados) {
  const token = localStorage.getItem("access_token");
  const morador = JSON.parse(localStorage.getItem("moradorInfo"));

  // 🔹 Debug do morador e token
  console.log("Morador Info:", morador);
  console.log("Token:", token);

  if (!morador?.code_condominium) {
    throw new Error("Condomínio não encontrado.");
  }

  const start_time = `${dados.data}T${dados.horaInicio}:00-03:00`;
  const end_time = `${dados.data}T${dados.horaFim}:00-03:00`;

  const payload = {
    space: dados.space,
    apartment_block: String(morador.block),      // garante string
    apartment_number: String(morador.apartment), // garante string
    code_condominium: String(morador.code_condominium),
    start_time,
    end_time,
  };

  // 🔹 Debug do payload completo
  console.log("Payload enviado para criarReserva:", JSON.stringify(payload, null, 2));
  console.log("Start Time:", start_time);
  console.log("End Time:", end_time);

  const res = await fetch(API_URL_RESERVAS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro ao criar reserva:", errorText);
    throw new Error(errorText);
  }

  const json = await res.json();
  console.log("Resposta da API ao criar reserva:", json);
  return json;
}

async function listarReservas() {
  const token = localStorage.getItem("access_token");
  const morador = JSON.parse(localStorage.getItem("moradorInfo"));

  const res = await fetch(API_URL_RESERVAS, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar reservas");

  const data = await res.json();
  const reservas = data.results || data;

  return reservas.filter(r => {
    const bloco = r.resident?.apartment?.block || r.apartment_block;
    const apto = r.resident?.apartment?.number || r.apartment_number;
    return bloco === morador.block && apto === morador.apartment;
  });
}

async function deletarReserva(id) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL_RESERVAS}${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
}

async function atualizarReserva(id, dados) {
  const token = localStorage.getItem("access_token");
  const morador = JSON.parse(localStorage.getItem("moradorInfo"));

  const start_time = `${dados.data}T${dados.horaInicio}:00-03:00`;
  const end_time = `${dados.data}T${dados.horaFim}:00-03:00`;

  const payload = {
    space: dados.space,
    apartment_block: String(morador.block),
    apartment_number: String(morador.apartment),
    code_condominium: String(morador.code_condominium),
    start_time,
    end_time,
  };

  const res = await fetch(`${API_URL_RESERVAS}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
}
