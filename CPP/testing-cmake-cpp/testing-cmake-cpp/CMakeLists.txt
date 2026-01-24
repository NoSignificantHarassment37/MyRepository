# CMakeList.txt: proyecto de CMake para testing-cmake-cpp, incluya el origen y defina
# la lógica específica del proyecto aquí.
#

# Agregue un origen al ejecutable de este proyecto.
add_executable (testing-cmake-cpp "testing-cmake-cpp.cpp" "testing-cmake-cpp.h")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET testing-cmake-cpp PROPERTY CXX_STANDARD 20)
endif()

# TODO: Agregue pruebas y destinos de instalación si es necesario.
