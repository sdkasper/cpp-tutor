---
title: 'Tablouri'
slug: arrays
sort_order: 12
lang: ro
concepts: [arrays, indexing]
summary: 'Stocheaza liste de lucruri folosind tablouri.'
estimated_minutes: 12
prev_lesson: functions-advanced
next_lesson: arrays-2d
---

## Ce este un tablou?

Imagineaza-ti un rand de cutii postale la un bloc. Fiecare cutie este numerotata (0, 1, 2, 3...) si poate contine o scrisoare. Un **tablou** in C++ functioneaza exact asa -- este un rand de cutii, fiecare continand o valoare, si fiecare cutie are un numar ca sa o poti gasi.

In loc sa creezi cinci variabile separate ca `scor1`, `scor2`, `scor3`... creezi un singur tablou care contine toate cele cinci scoruri intr-un rand ordonat.

## Declararea unui tablou

Iata cum creezi un tablou de 5 numere intregi:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5] = {95, 87, 72, 100, 68};

    cout << "First score: " << scores[0] << endl;
    cout << "Second score: " << scores[1] << endl;
    cout << "Last score: " << scores[4] << endl;

    return 0;
}
```

Cateva lucruri de observat:

- **`int scores[5]`** creeaza 5 cutii care contin fiecare un `int`.
- **`{95, 87, 72, 100, 68}`** umple cutiile cu valori.
- Numarul din `[]` cand accesezi un element se numeste **index**.

## Indexurile incep de la 0!

Asta e cel mai important lucru de retinut despre tablouri: **numaratoarea incepe de la 0, nu de la 1**. Gandeste-te ca la etajele unei cladiri in unele tari -- parterul este etajul 0.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    string friends[4] = {"Alice", "Bob", "Carlos", "Diana"};

    cout << "Index 0: " << friends[0] << endl;
    cout << "Index 1: " << friends[1] << endl;
    cout << "Index 2: " << friends[2] << endl;
    cout << "Index 3: " << friends[3] << endl;

    // There is NO index 4! The array only goes from 0 to 3.
    return 0;
}
```

Un tablou cu 4 elemente are indexurile **0, 1, 2, 3**. Ultimul index valid este intotdeauna dimensiunea minus 1.

## Schimbarea valorilor intr-un tablou

Poti schimba ce se afla in orice cutie folosind indexul ei:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int temperatures[5] = {20, 22, 19, 25, 23};

    cout << "Wednesday was: " << temperatures[2] << " degrees" << endl;

    // Oops, we made a mistake! Wednesday was actually 21 degrees.
    temperatures[2] = 21;

    cout << "Fixed! Wednesday was: " << temperatures[2] << " degrees" << endl;

    return 0;
}
```

## Parcurgerea unui tablou cu o bucla

Aici tablourile devin cu adevarat puternice. In loc sa scrii `scores[0]`, `scores[1]`, `scores[2]`... poti folosi o **bucla for** ca sa vizitezi fiecare element automat:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[6] = {88, 92, 75, 100, 67, 95};
    int total = 0;

    for (int i = 0; i < 6; i++) {
        cout << "Score " << i << ": " << scores[i] << endl;
        total = total + scores[i];
    }

    cout << "Total: " << total << endl;
    cout << "Average: " << total / 6 << endl;

    return 0;
}
```

Variabila `i` merge de la 0 la 5, si `scores[i]` ia fiecare scor pe rand. Asta functioneaza la fel fie ca ai 6 scoruri sau 6.000!

## Gasirea celei mai mari valori

O sarcina frecventa este cautarea prin tablou pentru a gasi valoarea maxima. Incepi presupunand ca primul element este cel mai mare, apoi verifici fiecare alt element:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5] = {78, 95, 63, 88, 91};
    int highest = scores[0];

    for (int i = 1; i < 5; i++) {
        if (scores[i] > highest) {
            highest = scores[i];
        }
    }

    cout << "The highest score is: " << highest << endl;

    return 0;
}
```

## Urmarirea dimensiunii tabloului

Este un obicei bun sa stochezi dimensiunea tabloului intr-o variabila sau constanta. Astfel, daca schimbi numarul de elemente, trebuie sa actualizezi un singur loc:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    const int SIZE = 4;
    string pets[SIZE] = {"dog", "cat", "hamster", "fish"};

    cout << "My pets:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "  " << (i + 1) << ". " << pets[i] << endl;
    }

    return 0;
}
```

Folosirea `const int SIZE` face codul mai usor de citit si mai putin predispus la erori.

<!-- exercise -->
### Exercitiu: Raport de note

Scrie un program care stocheaza 7 note ale elevilor intr-un tablou, apoi parcurge tabloul pentru a gasi si afisa nota cea mai mare, nota cea mai mica si media.

```cpp
#include <iostream>
using namespace std;

int main() {
    int grades[7] = {85, 92, 78, 95, 88, 70, 100};

    // TODO: Find the highest grade

    // TODO: Find the lowest grade

    // TODO: Calculate the average

    // TODO: Print all three results

    return 0;
}
```
<!-- hint: Incepe cu int highest = grades[0]; si int lowest = grades[0]; apoi parcurge tabloul si actualizeaza-le cu instructiuni if. Pentru medie, aduna toate notele intr-o variabila total si imparte la 7. -->
<!-- /exercise -->

<!-- exercise -->
### Exercitiu: Afisare inversa

Afiseaza elementele unui tablou in ordine inversa (de la ultimul la primul). Rezultatul trebuie sa fie: 50 40 30 20 10

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};

    // TODO: Use a for loop that counts backwards
    // to print the array in reverse order

    return 0;
}
```
<!-- hint: Incepe bucla de la i = 4 si mergi in jos pana la 0. Foloseste i-- in loc de i++ si conditia i >= 0. -->
<!-- /exercise -->

## Ce ai invatat

- Un **tablou** stocheaza mai multe valori de acelasi tip intr-un rand, ca niste cutii postale numerotate.
- Indexurile tablourilor incep de la **0**, nu de la 1.
- Accesezi elementele cu `numeTablou[index]` si le schimbi in acelasi mod.
- O **bucla for** este partenerul perfect al tablourilor -- iti permite sa vizitezi fiecare element.
- Tine intotdeauna evidenta dimensiunii tabloului pentru a evita depasirea limitelor.

In continuare, vom trece la **tablouri 2D** -- tablouri de tablouri care iti permit sa lucrezi cu grile si tabele!
