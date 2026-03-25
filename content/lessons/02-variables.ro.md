---
title: 'Variabile: Stocarea informațiilor'
slug: variables
sort_order: 2
concepts: [variables, int, double, string, char]
summary: 'Stochează și folosește informații în programele tale cu ajutorul variabilelor.'
estimated_minutes: 12
prev_lesson: output
next_lesson: input
lang: ro
---

## Ce sunt variabilele?

Imaginează-ți că ai o grămadă de **cutii cu etichete**. Pe o cutie scrie "vârstă" și pui numărul 12 înăuntru. Pe altă cutie scrie "nume" și pui numele tău înăuntru. Exact asta sunt variabilele în programare -- cutii cu etichete care stochează informații!

Programul tău poate să se uite în aceste cutii, să schimbe ce e în ele și să le folosească oricând are nevoie.

## Prima ta variabilă

Hai să creăm o variabilă care stochează un număr:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 12;
    cout << "I am " << age << " years old" << endl;
    return 0;
}
```

Iată ce s-a întâmplat: am creat o cutie numită `age`, i-am spus lui C++ că ține un număr întreg (`int`), și am pus `12` înăuntru. Apoi am afișat-o!

## Tipuri de variabile

Nu toate cutiile țin același tip de lucruri. C++ are **tipuri** diferite pentru diferite feluri de informații:

| Tip | Ce stochează | Exemplu |
|------|---------------|---------|
| `int` | Numere întregi (fără zecimale) | `42`, `-7`, `0` |
| `double` | Numere cu zecimale | `3.14`, `99.5` |
| `string` | Text (cuvinte și propoziții) | `"Hello"`, `"Pizza"` |
| `char` | Un singur caracter | `'A'`, `'z'`, `'!'` |

Observă că valorile `string` folosesc **ghilimele duble** `" "` iar valorile `char` folosesc **ghilimele simple** `' '`. Asta e important!

Hai să vedem toate cele patru tipuri în acțiune:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int lives = 3;
    double score = 98.5;
    string playerName = "Alex";
    char grade = 'A';

    cout << "Player: " << playerName << endl;
    cout << "Grade: " << grade << endl;
    cout << "Lives: " << lives << endl;
    cout << "Score: " << score << endl;
    return 0;
}
```

Am adăugat `#include <string>` în partea de sus pentru că `string` are nevoie de propria cutie de unelte. Celelalte tipuri (`int`, `double`, `char`) sunt deja incluse în C++.

## Schimbarea conținutului cutiei

Poți schimba valoarea unei variabile oricând. Folosește din nou `=`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int pizzaSlices = 8;
    cout << "We start with " << pizzaSlices << " slices" << endl;

    pizzaSlices = 6;
    cout << "After eating 2: " << pizzaSlices << " slices left" << endl;

    pizzaSlices = 0;
    cout << "After the party: " << pizzaSlices << " slices left" << endl;
    return 0;
}
```

Cutia rămâne aceeași, dar conținutul se schimbă. De aceea se numesc **variabile** -- pot varia!

## Declarare vs Atribuire

Sunt două lucruri pe care le poți face cu variabilele:

- **Declarare** -- creezi cutia și îi pui etichetă (`int score;`)
- **Atribuire** -- pui ceva înăuntru (`score = 100;`)

Poți face ambele deodată, sau separat:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare and assign at the same time
    int health = 100;

    // Declare first, assign later
    string weapon;
    weapon = "Diamond Sword";

    cout << "Health: " << health << endl;
    cout << "Weapon: " << weapon << endl;
    return 0;
}
```

De cele mai multe ori, e mai ușor să declari și să atribui pe aceeași linie.

## Folosirea variabilelor împreună

Variabilele devin foarte puternice când le combini:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string food = "pizza";
    int slices = 4;
    double pricePerSlice = 2.50;
    double total = slices * pricePerSlice;

    cout << "You ordered " << slices << " slices of " << food << endl;
    cout << "Each slice costs $" << pricePerSlice << endl;
    cout << "Total: $" << total << endl;
    return 0;
}
```

Am folosit chiar și o variabilă (`total`) ca să stocăm un calcul bazat pe alte variabile. Tare, nu?

<!-- exercise -->
### Rândul tău: Fișa personajului

Creează variabile pentru a descrie un personaj de joc: numele (string), nivelul (int), punctele de viață ca număr zecimal (double) și inițiala clasei ca 'W' pentru Warrior (char). Afișează totul într-un format frumos.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Create your character's variables here

    // Print the character card
    cout << "=== CHARACTER CARD ===" << endl;
    // Print name, level, health, and class initial

    return 0;
}
```
<!-- hint: Încearcă ceva de genul: string name = "Shadow"; int level = 5; double hp = 87.5; char classInitial = 'W'; Apoi afișează fiecare cu cout. -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Schimbă valorile

Ai două variabile. Poți să le schimbi valorile între ele astfel încât `a` să aibă 20 și `b` să aibă 10? Vei avea nevoie de o a treia variabilă ca să te ajute!

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 20;

    cout << "Before: a = " << a << ", b = " << b << endl;

    // Swap the values of a and b here
    // Hint: you might need a temporary variable!

    cout << "After: a = " << a << ", b = " << b << endl;
    return 0;
}
```
<!-- hint: Creează o variabilă precum int temp = a; apoi pune a = b; apoi pune b = temp; -->
<!-- /exercise -->

## Ce ai învățat

- Variabilele sunt ca niște **cutii cu etichete** care stochează informații
- `int` stochează numere întregi, `double` stochează zecimale, `string` stochează text, `char` stochează un singur caracter
- **Declari** o variabilă cu tipul și numele ei, și **atribui** o valoare cu `=`
- Poți schimba valoarea unei variabile oricând și poți folosi variabilele împreună în `cout`

Treabă excelentă! Acum că știi cum să stochezi informații, hai să învățăm cum să lași **utilizatorul** să introducă informații în programul tău folosind **input-ul**.
