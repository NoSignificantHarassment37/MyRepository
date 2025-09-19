class Entity:
    def validar_string(value: str) -> bool:
        length = len(value)
        if length > 50 or length < 5:
            return False
        else: 
            return True

class Universidad(Entity):
    def __init__(self, nombre: str):
        length = len(nombre)
        if self.validar_string(length):
            raise Exception("La longitud debe estar entre 5 y 50.") 
        self.__nombre = nombre

class Carrera(Entity):
    def __init__(self, especialidad: str):
        if self.validar_string(especialidad):
            raise Exception("La longitud debe estar entre 5 y 50.")
        self.__especialidad = especialidad

class Estudiante(Entity):
    def __init__(self, nombre, edad):
        self.validar_string(nombre)
        self.__nombre = nombre
        self__edad = edad