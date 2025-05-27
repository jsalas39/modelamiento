import json
import subprocess

def handler(event, context):
    data = json.loads(event['body'])

    monto = data['monto']
    plazo = data['plazo']
    tasas = data['tasas']

    result = subprocess.run(
        ['octave', '--eval',
         f"addpath('../backend_octave'); calcular_cuota({monto}, {plazo}, [{tasas}]);"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    # Aquí deberías leer el archivo JSON de salida o los datos generados por Octave
    output = {
        "cuota": 1234.56,
        "total": 43210.00,
        "grafico": ""  # base64 del gráfico generado
    }

    return {
        "statusCode": 200,
        "body": json.dumps(output),
        "headers": {
            "Content-Type": "application/json"
        }
    }
