from utils import try_parse

fruta_valor_por_kilo = {
    "platano": 1700,
    "manzana": 2300,
    "pera": 2100,
    "naranja": 1950.70,
}

def preguntar_fruta(dict: dict) -> str:
    while True:
        fruta = input("¿Qué fruta desea comprar?")

        if fruta in dict:
            return fruta
        else:
            print("No vendemos esa fruta.")


def preguntar_kilos() -> float:
    while True:
        tuple = try_parse(input("¿Cuántos kilos desea comprar?"), float)
        
        if tuple[1]:
           return tuple[0]
        else:
           print("La cantidad de kilos deberia ser un numero.")
           
           
def calcular_total(dict:dict, fruta:str, kilos: float) -> None:
    return dict[fruta] * kilos
    
    
def main():
    while True:
        fruta:str = preguntar_fruta(fruta_valor_por_kilo)
        kilos:float = preguntar_kilos()
        valor_a_pagar:float = calcular_total(fruta_valor_por_kilo, fruta, kilos)
        print(f'El valor a pagar son:{valor_a_pagar}\nEl modulo de pago todavia no está terminado...')

fruta_valor_por_kilo["piña"] = 4800

print(fruta_valor_por_kilo)

main()