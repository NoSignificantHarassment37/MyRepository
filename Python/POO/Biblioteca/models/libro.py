class Libro:
    def __init__(self, titulo:str, autor:str, ano_publicacion:int, disponible:bool):
        if not isinstance(titulo, str):
            raise TypeError("El argumento 'titulo' debe ser string.")
        if not isinstance(autor, str):
            raise TypeError("El argumento 'autor' debe ser string.")
        if not isinstance(ano_publicacion, int):
            raise TypeError("El argumento 'ano_publicacion' debe ser un int.")
        if not isinstance(disponible, bool):
            raise TypeError("El argumento '")
        self.__titulo = titulo
        self.__autor = autor
        self.__ano_publicacion = ano_publicacion
        
    @property
    def titulo(self):
        return self.__titulo
    
    @property
    def autor(self):
        return self.__autor

    @property
    def ano_publicacion(self):
        return self.__ano_publicacion

    @property
    def disponible(self):
        return self.__disponible

    @titulo.setter
    def titulo(self, value):
        if not isinstance(value, str):
            raise TypeError("El valor nuevo debe ser un string.")
        if len(value) < 50 and len(value) > 5:
            raise TypeError("El valor nuevo debe tener una longitud menor a 50 y mayor a 5.")
        self.__titulo = value
    
    @autor.setter
    def autor(self, value):
        if not isinstance(value, str):
            raise TypeError("El valor nuevo debe ser un string.")
        if len(value) < 50 and len(value) > 5:
            raise TypeError("El valor nuevo debe tener una longitud menor a 50 y mayor a 5.")
        self.__autor = value
        
    @ano_publicacion.setter
    def ano_publicacion(self, value):
        if not isinstance(value, int):
            raise TypeError("El valor nuevo debe ser un string.")
        if value < 0:
            raise TypeError("El valor nuevo debe ser mayor a 0.")
        self.__ano_publicacion = value
        
    @disponible.setter
    def disponible(self, value):
        if not isinstance(value, bool):
            raise TypeError("El valor nuevo debe ser un bool.")
        self.__disponible = value

    def mostrar_info(self):
        disponible = "Si" if self.__disponible == False else "No"
        print(f'Titulo: {self.__titulo}, Autor:{self.__autor}, Año:{self.__ano_publicacion}, Disponible:{disponible}')

    def prestar_libro(self):
        if self.__disponible == False:
            raise Exception("El libro ya esta prestado.")
        else:
            self.__disponible = False
    
    def devolver_libro(self):
        if self.__disponible == True:
            raise Exception("El libro no esta prestado.")
        else:
            self.__disponible = True