// script.js
document.getElementById('loanForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const monto = parseFloat(document.getElementById('monto').value);
  const plazo = parseInt(document.getElementById('plazo').value);
  const tasas = document.getElementById('tasas').value
    .split(',')
    .map(t => parseFloat(t.trim()) / 100);

  if (tasas.length !== plazo) {
    alert("La cantidad de tasas debe coincidir con el plazo en meses.");
    return;
  }

  function valorPresente(C) {
    let VP = 0;
    for (let i = 0; i < plazo; i++) {
      VP += C / Math.pow(1 + tasas[i], i + 1);
    }
    return VP;
  }

  function f(C) {
    return valorPresente(C) - monto;
  }

  function df(C) {
    return (f(C + 0.01) - f(C - 0.01)) / 0.02;
  }

  let cuota = 500;
  for (let i = 0; i < 100; i++) {
    const nueva = cuota - f(cuota) / df(cuota);
    if (Math.abs(nueva - cuota) < 0.01) break;
    cuota = nueva;
  }

  cuota = parseFloat(cuota.toFixed(2));
  let saldo = monto;
  const tabla = [];
  let totalPagado = 0;
  const saldos = [];

  for (let i = 0; i < plazo; i++) {
    const interes = saldo * tasas[i];
    const abono = cuota - interes;
    saldo -= abono;
    totalPagado += cuota;
    saldos.push(Math.max(0, saldo));
    tabla.push({
      mes: i + 1,
      cuota: cuota.toFixed(2),
      interes: interes.toFixed(2),
      saldo: Math.max(0, saldo).toFixed(2)
    });
  }

  mostrarResultados(cuota, totalPagado, tabla, saldos);
});

function mostrarResultados(cuota, total, tabla, saldos) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <h3>Resultados</h3>
    <p><strong>Cuota mensual:</strong> $${cuota}</p>
    <p><strong>Total pagado:</strong> $${total.toFixed(2)}</p>
    <h4>Tabla de amortización:</h4>
    <table>
      <tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Saldo</th></tr>
      ${tabla.map(row => `
        <tr>
          <td>${row.mes}</td>
          <td>${row.cuota}</td>
          <td>${row.interes}</td>
          <td>${row.saldo}</td>
        </tr>
      `).join('')}
    </table>
  `;

  const ctx = document.getElementById('grafico').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: tabla.map(row => row.mes),
      datasets: [{
        label: 'Saldo restante',
        data: saldos,
        borderColor: '#0066cc',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Saldo del préstamo mes a mes'
        }
      }
    }
  });
}
