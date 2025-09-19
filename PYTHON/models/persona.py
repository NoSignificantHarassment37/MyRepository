class persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    def saludar(self):
        print(f"Hola, soy {self.nombre}, y tengo {self.edad} años.")

class jefe(persona):
    def __init__(self, nombre, edad):
        super().__init__(nombre, edad)

    def saludar(self):
        print("Trabajen que este trabajo es para hoy!!!!!!!")

class empleado(persona):
    def __init__(self, nombre, edad):
        super().__init__(nombre, edad)

    def trabajar(self):
        print("Estoy cansado jefe...")

    def saludar(self):
        print("Hola jefe, hoy vine a chambear duro!")

class Restaurant:
    @property
    def categoria(self):
        return self.__categoria
    
    @categoria.setter
    def categoria(self, value):
        if not value.lenght > 5:
            raise Exception("La categoria es demasiado corta.")
        
        if not value.lenght < 50:
            raise Exception("La categoria es demasiado larga.")
        
        self.__categoria = value
            
    @property
    def nombre(self):
        return self.__nombre
    
    @nombre.setter
    def nombre(self, value):
        if not value.length > 5:
            raise Exception("La longitud del nombre nuevo debe ser mayor a 5.")
        
        if not value.length < 50:
            raise Exception("La longitud del nuevo nombre no puede ser mayor a 50.")
        
        self.__nombre = value

    def __init__(self, nombre, categoria, precio):
        self.__nombre = nombre
        self.__categoria = categoria
        self.__precio = precio
    
    def mostrar_informacion(self):
        print(f'Nombre: {self.nombre}, categoria: {self.__categoria}, precio: {self.__precio}')


mc_donalds = Restaurant("McDonalds", "Comida Rapida", 12000)

print(mc_donalds.categoria)

restaurante = Restaurant('Pizzeria mexico', 'comida rapida', 12000)

print(restaurante.categoria)

restaurante.categoria = "asasdasd"



print(type(restaurante.categoria))