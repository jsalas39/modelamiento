function generar_graficos()
  datos = csvread('resultados/amortizacion.csv');
  meses = datos(:, 1);
  saldo = datos(:, 4);

  figure;
  plot(meses, saldo, '-o', 'LineWidth', 2);
  title('Saldo del préstamo a lo largo del tiempo');
  xlabel('Mes');
  ylabel('Saldo restante');
  grid on;

  print('resultados/grafico.png', '-dpng');
end
