import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function ParqueoForm() {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [hora, setHora] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/parqueo/calcular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa, tipo, hora, minutos })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <label>Placa</label>
        <input value={placa} onChange={(e) => setPlaca(e.target.value)} required />

        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
        </select>

        <label>Horas</label>
        <input type="number" min="0" value={hora} onChange={(e) => setHora(Number(e.target.value))} />

        <label>Minutos</label>
        <input type="number" min="0" max="59" value={minutos} onChange={(e) => setMinutos(Number(e.target.value))} />

        <button type="submit" disabled={loading}>{loading ? "Calculando..." : "Calcular"}</button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h3>Resultado</h3>
          <p><strong>Placa:</strong> {result.placa}</p>
          <p><strong>Tipo:</strong> {result.tipo}</p>
          <p><strong>Tiempo de uso:</strong> {result.tiempouso}</p>
          <p><strong>Horas cobradas:</strong> {result.horascobradas}</p>
          <p><strong>Total:</strong> {result.total}</p>
        </div>
      )}
    </div>
  );
}
