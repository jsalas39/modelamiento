# Simulador de Préstamos con Interés Variable

Aplicación educativa para visualizar el impacto de tasas de interés variables en préstamos. Usa GNU Octave para los cálculos numéricos.

## Cómo funciona

1. El usuario ingresa monto, plazo y tasas variables.
2. Se calcula la cuota con Newton-Raphson.
3. Se genera una tabla de amortización.
4. Se calcula el total pagado (integración).
5. Se genera un gráfico del saldo mes a mes.

## Estructura

- `index.html` – Interfaz web.
- `script.js` – Lógica de interacción.
- `api/ejecutar_octave.py` – Llama a Octave desde Netlify Functions.
- `backend_octave/` – Scripts de cálculo.
