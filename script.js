document.getElementById('loanForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const monto = document.getElementById('monto').value;
  const plazo = document.getElementById('plazo').value;
  const tasas = document.getElementById('tasas').value;

  const response = await fetch('/.netlify/functions/ejecutar_octave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monto, plazo, tasas })
  });

  const data = await response.json();

  document.getElementById('resultado').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Cuota mensual aproximada:</strong> $${data.cuota}</p>
    <p><strong>Total a pagar:</strong> $${data.total}</p>
    <img src="data:image/png;base64,${data.grafico}" alt="Gráfico de amortización"/>
  `;
});
