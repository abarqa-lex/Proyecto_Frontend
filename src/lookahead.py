# Solicitar el monto
monto = int(input('Monto: '))


# Validamos e indicamos el % que pagaríamos de impuesto
if monto<=10000:
    print('5%')
elif monto<=20000:
    print('15%')
elif monto<=35000:
    print('20%')
else:
    print('30%')