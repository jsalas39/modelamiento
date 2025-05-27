function cuota = calcular_cuota(monto, plazo, tasas)
  % Convertir string a vector si viene como texto
  if ischar(tasas)
    tasas = str2num(tasas);
  end

  if length(tasas) ~= plazo
    error("La cantidad de tasas debe coincidir con el plazo.");
  end

  % Estimar cuota inicial (método tradicional)
  tasa_prom = mean(tasas) / 100;
  cuota_estimada = monto * tasa_prom / (1 - (1 + tasa_prom)^(-plazo));

  % Definir función residual para Newton-Raphson
  f = @(C) calcular_valor_presente(C, tasas, plazo) - monto;

  % Derivada aproximada numéricamente
  df = @(C) (f(C + 0.01) - f(C - 0.01)) / 0.02;

  % Iteración de Newton-Raphson
  max_iter = 100;
  tol = 1e-5;
  C = cuota_estimada;
  for i = 1:max_iter
    C_new = C - f(C)/df(C);
    if abs(C_new - C) < tol
      break;
    end
    C = C_new;
  end

  cuota = round(C, 2);
  printf("Cuota calculada: %.2f\n", cuota);
end

function VP = calcular_valor_presente(C, tasas, plazo)
  VP = 0;
  for i = 1:plazo
    tasa_i = tasas(i) / 100;
    VP = VP + C / ((1 + tasa_i)^i);
  end
end
