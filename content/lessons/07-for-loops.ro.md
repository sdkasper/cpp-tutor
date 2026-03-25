---
title: 'Bucle For'
slug: for-loops
sort_order: 7
concepts: [loops, for-loop]
summary: 'Pune calculatorul să repete lucruri folosind bucle for.'
estimated_minutes: 12
prev_lesson: switch
next_lesson: while-loops
lang: ro
---

## De ce să te repeți?

Imaginează-ți că vrei să afișezi "Ador programarea!" de zece ori. Ai *putea* scrie `cout` de zece ori, dar asta e plictisitor și mult de tastat. Buclele îți permit să-i spui calculatorului "fă lucrul ăsta din nou și din nou" cu doar câteva linii de cod.

## Prima ta buclă For

O buclă `for` are trei părți în interiorul parantezelor, separate prin punct și virgulă:

1. **Start** -- de unde să înceapă (ca `int i = 1`)
2. **Condiție** -- continuă cât timp asta e adevărat (ca `i <= 5`)
3. **Actualizare** -- ce să schimbe de fiecare dată (ca `i++`)

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << "Loop number: " << i << endl;
    }
    return 0;
}
```

Apasă **Run** și privește cum numără de la 1 la 5! Variabila `i` începe de la 1, și de fiecare dată prin buclă crește cu 1. Când `i` devine 6, condiția `i <= 5` este falsă, deci bucla se oprește.

## Număratul oilor

Hai să folosim o buclă for pentru a număra oi înainte de somn. La asta sunt buclele grozave -- fac același lucru cu numere diferite.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Time to sleep..." << endl;
    for (int sheep = 1; sheep <= 10; sheep++) {
        cout << sheep << " sheep... ";
    }
    cout << endl << "Zzzzz!" << endl;
    return 0;
}
```

Observă cum am numit variabila `sheep` în loc de `i`. O poți numi cum vrei, atâta timp cât are sens!

## Număratul invers

Buclele pot merge și invers. Începe de sus, verifică dacă ești încă deasupra țintei, și scade de fiecare dată.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Rocket launch countdown!" << endl;
    for (int t = 10; t >= 1; t--) {
        cout << t << "... ";
    }
    cout << endl << "LIFTOFF!" << endl;
    return 0;
}
```

Aici `t--` înseamnă "scade 1 din t de fiecare dată." Bucla continuă cât timp `t >= 1`.

## Pași din 2 în 2 (sau mai mult)

Nu trebuie să mergi câte unu. Vrei să numeri din 2 în 2? Schimbă partea de actualizare în `i += 2`.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Even numbers from 2 to 20:" << endl;
    for (int i = 2; i <= 20; i += 2) {
        cout << i << " ";
    }
    cout << endl;

    cout << "Counting by 5s:" << endl;
    for (int i = 0; i <= 50; i += 5) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

Poți face pași de orice dimensiune -- `i += 3`, `i += 10`, ce ai nevoie.

## Desenat cu bucle

Buclele sunt perfecte pentru desenat modele. Iată o linie simplă de stele:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Draw a line of 20 stars
    for (int i = 0; i < 20; i++) {
        cout << "*";
    }
    cout << endl;

    // Draw a line of 20 dashes
    for (int i = 0; i < 20; i++) {
        cout << "-";
    }
    cout << endl;

    // Draw a line of 20 stars again
    for (int i = 0; i < 20; i++) {
        cout << "*";
    }
    cout << endl;
    return 0;
}
```

Gândește-te la buclă ca la o ștampilă -- ștampilează o stea, apoi alta, apoi alta, până a ștampilat 20.

## Construirea unei table de înmulțire

Buclele for sunt grozave și pentru matematică. Hai să afișăm tabla de înmulțire pentru orice număr:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 7;
    cout << "Times table for " << number << ":" << endl;
    for (int i = 1; i <= 10; i++) {
        cout << number << " x " << i << " = " << number * i << endl;
    }
    return 0;
}
```

Încearcă să schimbi `number` cu numărul tău preferat și rulează din nou!

<!-- exercise -->
### Rândul tău: Scara de stele

Scrie un program care afișează o scară din stele. Fiecare linie ar trebui să aibă cu o stea mai mult decât linia anterioară, de la 1 stea până la 6 stele. Rezultatul ar trebui să arate așa:

```
*
**
***
****
*****
******
```

Vei avea nevoie de o buclă for pentru rânduri, și *în interiorul* acelei bucle, altă buclă for pentru a afișa numărul corect de stele pe fiecare rând. (Nu-ți face griji dacă sună complicat -- indiciul de mai jos te poate ajuta!)

```cpp
#include <iostream>
using namespace std;

int main() {
    // Use a for loop to go from row 1 to row 6
    // Inside, use another for loop to print 'row' number of stars
    // Don't forget endl after each row!

    return 0;
}
```
<!-- hint: Bucla exterioară merge de la 1 la 6 (pentru fiecare rând). Bucla interioară afișează stele: for (int s = 0; s < row; s++) { cout << "*"; } Apoi afișează endl după bucla interioară. -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Numere impare

Afișează toate numerele impare de la 1 la 25, separate prin spații. Folosește o buclă for care face pași din 2 în 2.

```cpp
#include <iostream>
using namespace std;

int main() {
    // Print odd numbers from 1 to 25

    return 0;
}
```
<!-- hint: Începe bucla de la 1 și folosește i += 2 pentru a sări peste numerele pare: for (int i = 1; i <= 25; i += 2) -->
<!-- /exercise -->

## Ce ai învățat

- O buclă `for` repetă cod de un anumit număr de ori
- Cele trei părți sunt: **start**, **condiție** și **actualizare**
- `i++` numără în sus cu 1, `i--` numără în jos cu 1
- `i += 2` (sau orice număr) îți permite să faci pași mai mari
- Poți folosi bucle pentru a desena modele, a afișa tabele și a evita scrierea aceluiași cod de mai multe ori

Urmează **buclele while** -- un mod diferit de a repeta lucruri când nu știi exact de câte ori trebuie să mergi!
