---
title: 'Functii avansate'
slug: functions-advanced
sort_order: 11
lang: ro
concepts: [functions, void, overloading]
summary: 'Ridica nivelul functiilor tale cu valori implicite si supraincarcare.'
estimated_minutes: 12
prev_lesson: functions
next_lesson: arrays
---

## Pregatit pentru mai mult?

Stii bazele functiilor -- cum sa le definesti, sa trimiti parametri si sa returnezi valori. Acum sa invatam cateva trucuri care fac functiile si mai flexibile si puternice.

## Valori implicite ale parametrilor

Uneori o functie are o valoare "obisnuita" pentru un parametru. In loc sa il obligi pe cel care apeleaza sa o specifice mereu, poti seta o valoare **implicita**.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

int main() {
    greet("Alex");              // uses default greeting
    greet("Sam", "Hey there");  // overrides the default
    greet("Jordan", "Yo");
    return 0;
}
```

Cand apelezi `greet("Alex")`, parametrul `greeting` devine automat `"Hello"`. Dar poti sa dai propria ta valoare daca vrei. Parametrii impliciti trebuie sa fie **ultimii** in lista de parametri.

## Mai multe valori implicite

Poti avea mai multi parametri impliciti. Retine doar ca se completeaza de la dreapta la stanga:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void drawLine(int length = 10, char symbol = '-') {
    for (int i = 0; i < length; i++) {
        cout << symbol;
    }
    cout << endl;
}

int main() {
    drawLine();           // 10 dashes (both defaults)
    drawLine(5);          // 5 dashes (default symbol)
    drawLine(20, '=');    // 20 equals signs (no defaults)
    return 0;
}
```

Poti sari peste parametrii de la dreapta, dar nu din mijloc. Deci `drawLine()` si `drawLine(5)` functioneaza, dar nu poti sari peste `length` si sa setezi doar `symbol`.

## Supraincarcarea functiilor

In C++, poti avea **mai multe functii cu acelasi nume** atata timp cat primesc tipuri sau numere diferite de parametri. Compilatorul isi da seama pe care sa o apeleze in functie de ce trimiti.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << "add(3, 4) = " << add(3, 4) << endl;          // calls int version
    cout << "add(1.5, 2.7) = " << add(1.5, 2.7) << endl;  // calls double version
    cout << "add(1, 2, 3) = " << add(1, 2, 3) << endl;    // calls three-int version
    return 0;
}
```

Asta se numeste **supraincarcare**. E ca si cum cuvantul "merge" inseamna lucruri diferite in "merge la scoala" si "merge programul" -- acelasi nume, comportament diferit in functie de context.

## Transmitere prin valoare vs transmitere prin referinta

Asta e un concept important. In mod normal, cand trimiti o variabila unei functii, functia primeste o **copie**. Modificarea copiei nu schimba originalul. Asta se numeste **transmitere prin valoare**.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void tryToChange(int x) {
    x = 999;
    cout << "Inside function: x = " << x << endl;
}

int main() {
    int myNumber = 42;
    tryToChange(myNumber);
    cout << "After function call: myNumber = " << myNumber << endl;
    // myNumber is still 42!
    return 0;
}
```

Functia si-a schimbat propria copie `x`, dar `myNumber` din `main` a ramas la fel. E ca si cum ai da cuiva o fotocopie a unui document -- pot sa mazgaleasca pe ea, dar originalul tau ramane neatins.

## Transmitere prin referinta (Trucul cu &)

Daca vrei ca o functie sa **schimbe cu adevarat** variabila originala, adauga `&` dupa tip. Asta se numeste **transmitere prin referinta** -- in loc de o copie, functia lucreaza cu variabila reala.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void doubleIt(int &x) {    // notice the &
    x = x * 2;
}

void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int num = 5;
    cout << "Before: " << num << endl;
    doubleIt(num);
    cout << "After doubleIt: " << num << endl;

    int x = 10, y = 20;
    cout << "Before swap: x=" << x << " y=" << y << endl;
    swap(x, y);
    cout << "After swap: x=" << x << " y=" << y << endl;
    return 0;
}
```

`&` este diferenta cheie. Cu el, functia poate sa ajunga inapoi si sa modifice variabila originala. Fara el, modificarile raman in interiorul functiei.

## Domeniul de vizibilitate: Unde traiesc variabilele

Variabilele exista doar in interiorul blocului (acoladele `{}`) unde au fost create. Asta se numeste **domeniu de vizibilitate** (scope).

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int stars = 5;  // global variable -- available everywhere

void showStars() {
    cout << "Global stars: " << stars << endl;
    int bonus = 3;  // local to this function
    cout << "Bonus: " << bonus << endl;
}

int main() {
    cout << "In main, stars = " << stars << endl;
    showStars();

    // This would cause an error:
    // cout << bonus;  // bonus doesn't exist here!

    int stars = 99;  // local variable "shadows" the global one
    cout << "Local stars = " << stars << endl;
    return 0;
}
```

Variabila globala `stars` este vizibila peste tot, dar variabila locala `stars` din `main` o ascunde temporar. Ca regula generala, evita variabilele globale -- pot face codul confuz. Pastreaza variabilele locale ori de cate ori este posibil.

## Punand totul la un loc

Iata un mini program care foloseste mai multe dintre aceste concepte:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void printHeader(string title, char border = '=') {
    int width = title.length() + 4;
    for (int i = 0; i < width; i++) cout << border;
    cout << endl;
    cout << border << " " << title << " " << border << endl;
    for (int i = 0; i < width; i++) cout << border;
    cout << endl;
}

int power(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int power(int base) {   // overloaded: default squares
    return base * base;
}

int main() {
    printHeader("Powers Calculator");
    cout << endl;

    for (int n = 1; n <= 5; n++) {
        cout << n << " squared = " << power(n) << endl;
        cout << n << " cubed = " << power(n, 3) << endl;
    }

    cout << endl;
    printHeader("Done!", '-');
    return 0;
}
```

Acest program foloseste parametri impliciti (`border`), supraincarcarea functiilor (doua versiuni ale lui `power`) si organizare curata a functiilor.

<!-- exercise -->
### Randul tau: Functia clamp

Scrie o functie numita `clamp` care primeste trei numere intregi: o valoare, un minim si un maxim. Trebuie sa returneze valoarea daca este in interval, minimul daca este prea mica, sau maximul daca este prea mare. Da lui `min` o valoare implicita de 0 si lui `max` o valoare implicita de 100.

De exemplu: `clamp(50)` returneaza 50, `clamp(-10)` returneaza 0, `clamp(200)` returneaza 100, `clamp(15, 10, 20)` returneaza 15.

```cpp
#include <iostream>
using namespace std;

// Write your clamp function here

int main() {
    cout << "clamp(50) = " << clamp(50) << endl;
    cout << "clamp(-10) = " << clamp(-10) << endl;
    cout << "clamp(200) = " << clamp(200) << endl;
    cout << "clamp(15, 10, 20) = " << clamp(15, 10, 20) << endl;
    cout << "clamp(5, 10, 20) = " << clamp(5, 10, 20) << endl;
    return 0;
}
```
<!-- hint: int clamp(int value, int minVal = 0, int maxVal = 100). Foloseste instructiuni if: daca value < minVal returneaza minVal, daca value > maxVal returneaza maxVal, altfel returneaza value. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Interschimbare cu referinte

Scrie o functie numita `sortTwo` care primeste doua numere intregi **prin referinta** si se asigura ca primul este mai mic decat al doilea. Daca sunt in ordine gresita, interschimba-le.

```cpp
#include <iostream>
using namespace std;

// Write your sortTwo function here (use & for references)

int main() {
    int a = 8, b = 3;
    cout << "Before: a=" << a << " b=" << b << endl;
    sortTwo(a, b);
    cout << "After: a=" << a << " b=" << b << endl;

    int x = 1, y = 9;
    cout << "Before: x=" << x << " y=" << y << endl;
    sortTwo(x, y);
    cout << "After: x=" << x << " y=" << y << endl;
    return 0;
}
```
<!-- hint: void sortTwo(int &a, int &b). Inauntru: daca (a > b), interschimba-le folosind o variabila temporara: int temp = a; a = b; b = temp; -->
<!-- /exercise -->

## Ce ai invatat

- Parametrii impliciti iti permit sa sari peste argumente care de obicei au aceeasi valoare
- Supraincarcarea functiilor iti permite sa creezi mai multe functii cu acelasi nume dar parametri diferiti
- Transmiterea prin valoare da functiei o copie (originalul ramane neschimbat)
- Transmiterea prin referinta (`&`) permite functiei sa modifice variabila originala
- Variabilele au un **domeniu de vizibilitate** -- exista doar in interiorul blocului lor `{}`
- Variabilele globale sunt vizibile peste tot, dar variabilele locale sunt preferate

In continuare, vom invata despre **tablouri** -- cum sa stochezi o lista intreaga de valori intr-o singura variabila!
