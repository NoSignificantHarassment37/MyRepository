from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# 1. Cargar datos
iris = load_iris()
X = iris.data  # características (longitud/sepal/petal)
y = iris.target  # etiquetas (0 = setosa, 1 = versicolor, 2 = virginica)

# 2. Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Crear y entrenar modelo
modelo = KNeighborsClassifier(n_neighbors=3)
modelo.fit(X_train, y_train)

# 4. Predecir y evaluar
y_pred = modelo.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Precisión del modelo: {accuracy * 100:.2f}%")

# Un nuevo ejemplo: largo y ancho del sépalo y del pétalo
nueva_flor = [[5.1, 3.5, 1.4, 0.2]]  # tipo setosa

nueva_flor2 = [[3.1, 3.5, 1.3, 0.5]]

nueva_flor3 = [[4.5,5.6,3.5,6]]

# Ejemplos para probar el modelo de clasificación de iris
# Formato: [longitud_sépalo, ancho_sépalo, longitud_pétalo, ancho_pétalo]

# ============= EJEMPLOS DE SETOSA (esperado: setosa) =============
print("=== EJEMPLOS DE SETOSA ===")
ejemplos_setosa = [
    [5.1, 3.5, 1.4, 0.2],  # Setosa típica
    [4.9, 3.0, 1.4, 0.2],  # Setosa pequeña
    [5.4, 3.9, 1.7, 0.4],  # Setosa grande
    [4.4, 2.9, 1.4, 0.2],  # Setosa muy pequeña
    [5.8, 4.0, 1.2, 0.2],  # Setosa con sépalo grande
]

for i, ejemplo in enumerate(ejemplos_setosa, 1):
    prediccion = modelo.predict([ejemplo])
    print(f"Ejemplo {i}: {ejemplo} → Predicción: {iris.target_names[prediccion[0]]}")

# ============= EJEMPLOS DE VERSICOLOR (esperado: versicolor) =============
print("\n=== EJEMPLOS DE VERSICOLOR ===")
ejemplos_versicolor = [
    [7.0, 3.2, 4.7, 1.4],  # Versicolor típica
    [6.4, 3.2, 4.5, 1.5],  # Versicolor mediana
    [5.7, 2.8, 4.5, 1.3],  # Versicolor pequeña
    [6.5, 2.8, 4.6, 1.5],  # Versicolor alargada
    [5.6, 3.0, 4.1, 1.3],  # Versicolor compacta
]

for i, ejemplo in enumerate(ejemplos_versicolor, 1):
    prediccion = modelo.predict([ejemplo])
    print(f"Ejemplo {i}: {ejemplo} → Predicción: {iris.target_names[prediccion[0]]}")

# ============= EJEMPLOS DE VIRGINICA (esperado: virginica) =============
print("\n=== EJEMPLOS DE VIRGINICA ===")
ejemplos_virginica = [
    [6.3, 3.3, 6.0, 2.5],  # Virginica típica
    [7.1, 3.0, 5.9, 2.1],  # Virginica grande
    [6.5, 3.0, 5.8, 2.2],  # Virginica mediana
    [7.6, 3.0, 6.6, 2.1],  # Virginica muy grande
    [6.0, 3.0, 4.8, 1.8],  # Virginica pequeña
]

for i, ejemplo in enumerate(ejemplos_virginica, 1):
    prediccion = modelo.predict([ejemplo])
    print(f"Ejemplo {i}: {ejemplo} → Predicción: {iris.target_names[prediccion[0]]}")

# ============= CASOS LÍMITE INTERESANTES =============
print("\n=== CASOS LÍMITE (pueden ser más difíciles) ===")
casos_limite = [
    [5.9, 3.0, 4.2, 1.5],  # Entre versicolor y virginica
    [6.0, 2.9, 4.5, 1.5],  # Entre versicolor y virginica
    [6.2, 2.9, 4.3, 1.3],  # Versicolor grande o virginica pequeña
    [5.0, 3.5, 1.6, 0.6],  # Setosa grande
]

for i, ejemplo in enumerate(casos_limite, 1):
    prediccion = modelo.predict([ejemplo])
    print(f"Caso límite {i}: {ejemplo} → Predicción: {iris.target_names[prediccion[0]]}")

# ============= FUNCIÓN PARA PROBAR TUS PROPIOS EJEMPLOS =============
def probar_flor(longitud_sepalo, ancho_sepalo, longitud_petalo, ancho_petalo):
    """
    Función para probar una flor con medidas específicas
    """
    ejemplo = [[longitud_sepalo, ancho_sepalo, longitud_petalo, ancho_petalo]]
    prediccion = modelo.predict(ejemplo)
    probabilidades = modelo.predict_proba(ejemplo)
    
    print(f"\nMedidas: {ejemplo[0]}")
    print(f"Predicción: {iris.target_names[prediccion[0]]}")
    print("Probabilidades:")
    for i, prob in enumerate(probabilidades[0]):
        print(f"  {iris.target_names[i]}: {prob:.3f}")

# Ejemplos de uso de la función:
print("\n=== PRUEBAS CON FUNCIÓN PERSONALIZADA ===")
probar_flor(5.0, 3.6, 1.4, 0.2)  # Debería ser setosa
probar_flor(6.0, 3.0, 4.0, 1.2)  # Probablemente versicolor
probar_flor(7.0, 3.2, 6.0, 2.0)  # Probablemente virginica

# ============= CARACTERÍSTICAS TÍPICAS DE CADA ESPECIE =============
print("\n=== GUÍA DE CARACTERÍSTICAS ===")
print("SETOSA:")
print("  - Sépalos: 4.3-5.8 cm largo, 2.3-4.4 cm ancho")
print("  - Pétalos: 1.0-1.9 cm largo, 0.1-0.6 cm ancho")
print("  - Son las más pequeñas, especialmente los pétalos")

print("\nVERSICOLOR:")
print("  - Sépalos: 4.9-7.0 cm largo, 2.0-3.4 cm ancho") 
print("  - Pétalos: 3.0-5.1 cm largo, 1.0-1.8 cm ancho")
print("  - Tamaño intermedio")

print("\nVIRGINICA:")
print("  - Sépalos: 4.9-7.9 cm largo, 2.2-3.8 cm ancho")
print("  - Pétalos: 4.5-6.9 cm largo, 1.4-2.5 cm ancho") 
print("  - Son las más grandes, especialmente los pétalos")

