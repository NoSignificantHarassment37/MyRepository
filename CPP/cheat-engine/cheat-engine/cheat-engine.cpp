#include <iostream>
#include <iomanip>
#include <windows.h>

int main() {
    int* i = new int(0);

    while (true) {
        (*i)++;
        std::cout << "i = " << *i << "\n";
        std::cout << "direccion i = 0x"
            << std::hex << reinterpret_cast<uintptr_t>(i)
            << std::dec << "\n";
        Sleep(1000);
    }
}
