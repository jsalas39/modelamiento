function tabla = amortizacion(monto, plazo, tasas, cuota)
  saldo = monto;
  tabla = zeros(plazo, 4); % Mes, Cuota, Interés, Saldo
  for i = 1:plazo
    tasa_i = tasas(i) / 100;
    interes = saldo * tasa_i;
    abono = cuota - interes;
    saldo = saldo - abono;
    tabla(i, :) = [i, cuota, interes, saldo];
  end

  % Guardar en CSV
  csvwrite('resultados/amortizacion.csv', tabla);
end
