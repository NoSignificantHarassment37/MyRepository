from utils import try_parse

while True:
    number1 = 0
    number2 = 0 
    while True:
        tuple = try_parse(input("Introduce un numero."), float)
        if not tuple[1]:
            print("Input invalido, introduce un numero.")
            continue
        else:
            number1 = tuple[0]
            break
    
    while True:
        tuple = try_parse(input("Introduce otro numero."), float)
        if not tuple[1]:
            print("Input invalido, introduce un numero.")
            continue
        else:
            number2 = tuple[0]
            break

    while True:
        option = input("Escribe: \n1 - sumar\n2 - restar\n3 - multiplicar\n4 - dividir\n")

        match option:
            case "1":
                print(f"{number1} + {number2} = {number1 + number2}")
                break
            case "2":
                print(f"{number1} - {number2} = {number1 - number2}")
                break
            case "3":
                print(f"{number1} * {number2} = {number1 * number2}")
                break
            case "4":
                print(f"{number1} * {number2} = {number1 / number2}")
                break
            case _:
                print("Opcion invalida.")