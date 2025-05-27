exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      cuota: 1234.56,
      total: 43210.00,
      grafico: ""  // Podrías usar base64 de un gráfico real más adelante
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
};
