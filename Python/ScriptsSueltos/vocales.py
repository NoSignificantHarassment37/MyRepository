texto = input("Frase: ")

cont = 0

for caracter in texto:
    if caracter == "a" or caracter == "e" or caracter == "i" or caracter == "o" or caracter == "u":
        cont += 1

print(f"Vocales: {cont}")