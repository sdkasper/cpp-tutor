---
title: 'Bucle imbricate'
slug: nested-loops
sort_order: 9
lang: ro
concepts: [loops, nested-loops]
summary: 'Pune bucle in bucle ca sa creezi modele si grile.'
estimated_minutes: 12
prev_lesson: while-loops
next_lesson: functions
---

## Bucle in bucle

Stii deja cum sa folosesti o singura bucla. Dar ce se intampla cand pui o bucla *in interiorul* altei bucle? Bucla interioara se executa **complet** la fiecare pas al buclei exterioare. E ca un ceas: minutarul (bucla interioara) face 60 de ture pentru fiecare tact al ceasului de ore (bucla exterioara).

## Prima ta bucla imbricata

Sa incepem simplu si sa vedem cum lucreaza cele doua bucle impreuna:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int outer = 1; outer <= 3; outer++) {
        for (int inner = 1; inner <= 4; inner++) {
            cout << "(" << outer << "," << inner << ") ";
        }
        cout << endl;
    }
    return 0;
}
```

Bucla exterioara se executa de 3 ori. De fiecare data, bucla interioara isi parcurge toate cele 4 runde. Asa ca obtinem 3 randuri cu cate 4 elemente fiecare -- adica 12 perechi in total (3 x 4).

## Desenarea unui dreptunghi

Buclele imbricate sunt perfecte pentru a desena forme. Bucla exterioara se ocupa de randuri, iar bucla interioara se ocupa de coloane.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int rows = 4;
    int cols = 10;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

Gandeste-te la asta ca la completarea unei grile: parcurgi primul rand, apoi treci la randul urmator, parcurgi din nou, si tot asa. `endl` dupa bucla interioara ne muta pe linia urmatoare.

## Desenarea unui triunghi

Aici devine distractiv. Ca sa faci un triunghi, bucla interioara trebuie sa afiseze un numar *diferit* de stele pe fiecare rand. Trucul este sa faci bucla interioara sa depinda de variabila buclei exterioare.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int height = 6;

    for (int row = 1; row <= height; row++) {
        for (int star = 0; star < row; star++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

Pe randul 1, bucla interioara se executa o data. Pe randul 2, se executa de 2 ori. Pe randul 6, se executa de 6 ori. Asta creeaza forma de triunghi!

## Un triunghi centrat (Piramida)

Ca sa faci o piramida corecta, ai nevoie de spatii inainte de stele. Asta foloseste doua bucle interioare -- una pentru spatii si una pentru stele.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int height = 5;

    for (int row = 1; row <= height; row++) {
        // Mai intai: afiseaza spatii
        for (int s = 0; s < height - row; s++) {
            cout << " ";
        }
        // Apoi: afiseaza stele
        for (int star = 0; star < 2 * row - 1; star++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

Pe fiecare rand, numarul de spatii scade si numarul de stele creste. Impreuna creeaza piramida centrata.

## Tabla inmultirii

Iata o utilizare practica a buclelor imbricate -- tabla inmultirii! Bucla exterioara este un numar, bucla interioara este celalalt.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "    ";
    for (int i = 1; i <= 5; i++) {
        cout << i << "\t";
    }
    cout << endl;
    cout << "   -------------------------" << endl;

    for (int row = 1; row <= 5; row++) {
        cout << row << " | ";
        for (int col = 1; col <= 5; col++) {
            cout << row * col << "\t";
        }
        cout << endl;
    }
    return 0;
}
```

Fiecare celula din tabel este `row * col`. `\t` (tab) pastreaza lucrurile aliniate frumos.

## Cum sa te gandesti la buclele imbricate

Imagineaza-ti un plan de locuri intr-un cinematograf. Bucla exterioara alege randul in care te afli. Bucla interioara alege locul din acel rand. Impreuna, viziteaza fiecare loc.

Iata un alt mod de a te gandi la asta:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Imagineaza-ti 3 cutii, fiecare cu 4 obiecte inauntru
    for (int box = 1; box <= 3; box++) {
        cout << "Opening box " << box << ":" << endl;
        for (int item = 1; item <= 4; item++) {
            cout << "  Item " << item << endl;
        }
    }
    return 0;
}
```

Deschizi fiecare cutie (bucla exterioara), si pentru fiecare cutie, te uiti la fiecare obiect din ea (bucla interioara).

## Un model de tabla de sah

Sa combinam buclele imbricate cu o instructiune `if` pentru a crea un model:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int size = 8;
    for (int row = 0; row < size; row++) {
        for (int col = 0; col < size; col++) {
            if ((row + col) % 2 == 0) {
                cout << "# ";
            } else {
                cout << ". ";
            }
        }
        cout << endl;
    }
    return 0;
}
```

Verificand daca `row + col` este par sau impar, alternam intre doua caractere pentru a crea o tabla de sah.

<!-- exercise -->
### Randul tau: Deseneaza o cutie goala

Deseneaza o cutie care are 6 latime si 4 inaltime folosind caractere `*`, dar fa-o **goala** -- doar marginea trebuie sa aiba stele, interiorul trebuie sa fie spatii.

Rezultatul asteptat:
```
******
*    *
*    *
******
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int width = 6;
    int height = 4;

    // Bucla exterioara pentru randuri
    // Bucla interioara pentru coloane
    // Afiseaza '*' daca este pe margine, altfel afiseaza ' '

    return 0;
}
```
<!-- hint: Un caracter este pe margine daca se afla pe primul sau ultimul rand (row == 0 sau row == height-1) sau pe prima sau ultima coloana (col == 0 sau col == width-1). Foloseste un if-else in bucla interioara. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Triunghi de numere

Afiseaza acest triunghi de numere folosind bucle imbricate:

```
1
12
123
1234
12345
```

```cpp
#include <iostream>
using namespace std;

int main() {
    // Bucla exterioara pentru randurile de la 1 la 5
    // Bucla interioara afiseaza numerele de la 1 pana la numarul randului

    return 0;
}
```
<!-- hint: Bucla exterioara merge de la row = 1 la 5. Bucla interioara merge de la num = 1 la row. Afiseaza num (nu o stea) in bucla interioara. -->
<!-- /exercise -->

## Ce ai invatat

- O bucla imbricata este o bucla in interiorul altei bucle
- Bucla interioara se executa complet la fiecare pas al buclei exterioare
- Numarul total de iteratii = numarul exterior x numarul interior
- Bucla exterioara controleaza randurile, bucla interioara controleaza coloanele
- Poti face bucla interioara sa depinda de variabila buclei exterioare pentru forme ca triunghiurile
- Buclele imbricate pot desena dreptunghiuri, triunghiuri, piramide, tabele si table de sah

In continuare, vom invata despre **functii** -- cum sa iti organizezi codul in blocuri reutilizabile, cu nume!
