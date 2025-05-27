function total_pagado = integracion(cuota, plazo)
  meses = 0:plazo;
  pagos = cuota * ones(1, length(meses));
  total_pagado = trapz(meses, pagos);
  printf("Total pagado aproximado: %.2f\n", total_pagado);
end
