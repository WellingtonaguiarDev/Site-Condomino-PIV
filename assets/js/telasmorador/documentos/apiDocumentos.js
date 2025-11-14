// ==========================================================
// apiDocumentos.js
// ==========================================================
const API_URL_DOCUMENTOS = "https://api.porttusmart.tech/api/v1/core/notices/";

async function listarDocumentos() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token ausente");

  const res = await fetch(API_URL_DOCUMENTOS, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  const lista = data.results || [];

  return lista.map(doc => ({
    titulo: doc.title || "-",
    descricao: doc.content || "-",
    arquivo: doc.file_complement || null
  }));
}
