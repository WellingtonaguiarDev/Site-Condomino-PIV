// ------------------------
// apiReservas.js
// ------------------------
const API_URL_RESERVAS = "https://api.porttusmart.tech/api/v1/core/reservations-admin/";

async function criarReserva(dados) {
  const token = localStorage.getItem("access_token");

  // Monta os horários completos no formato ISO UTC
  const start_time = `${dados.data}T${dados.horaInicio}:00Z`;
  const end_time = `${dados.data}T${dados.horaFim}:00Z`;

  const payload = {
    space: dados.space,
    apartment_block: dados.apartment_block,
    apartment_code: dados.apartment_code,
    start_time,
    end_time,
  };

  try {
    const res = await fetch(API_URL_RESERVAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }

    alert("Reserva cadastrada com sucesso!");
    return await res.json();
  } catch (err) {
    alert("Erro ao cadastrar reserva: " + err.message);
    console.error(err);
  }
}

async function listarReservas() {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(API_URL_RESERVAS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erro ao buscar reservas");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function deletarReserva(id) {
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_URL_RESERVAS}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    alert("Reserva excluída com sucesso!");
  } catch (err) {
    alert("Erro ao excluir reserva: " + err.message);
    console.error(err);
  }
}

async function atualizarReserva(id, dados) {
  const token = localStorage.getItem("access_token");

  const start_time = `${dados.data}T${dados.horaInicio}:00Z`;
  const end_time = `${dados.data}T${dados.horaFim}:00Z`;

  const payload = {
    space: dados.space,
    apartment_block: dados.apartment_block,
    apartment_code: dados.apartment_code,
    start_time,
    end_time,
  };

  try {
    const res = await fetch(`${API_URL_RESERVAS}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    alert("Reserva atualizada com sucesso!");
  } catch (err) {
    alert("Erro ao atualizar reserva: " + err.message);
    console.error(err);
  }
}
