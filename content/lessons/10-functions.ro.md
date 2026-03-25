---
title: 'Functii'
slug: functions
sort_order: 10
lang: ro
concepts: [functions, parameters, return]
summary: 'Organizeaza-ti codul in bucati reutilizabile numite functii.'
estimated_minutes: 14
prev_lesson: nested-loops
next_lesson: functions-advanced
---

## De ce functii?

Imagineaza-ti ca faci prajituri. Urmezi o reteta: amesteci ingredientele, modelezi aluatul, coci 12 minute. Acum imagineaza-ti ca ar trebui sa rescrii intreaga reteta de fiecare data cand vrei prajituri. Ar fi epuizant!

Functiile sunt ca retetele pentru codul tau. Scrii instructiunile o singura data, le dai un nume, si apoi folosesti acel nume ori de cate ori trebuie sa rulezi acele instructiuni. Asta economiseste timp si iti pastreaza codul organizat.

## Prima ta functie

Sa incepem cu o functie simpla care saluta:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

// Define the function
void sayHello() {
    cout << "Hello there!" << endl;
    cout << "Welcome to C++!" << endl;
}

// Use (call) the function
int main() {
    sayHello();
    cout << "---" << endl;
    sayHello();
    return 0;
}
```

Am scris codul de salut o singura data in `sayHello()`, dar l-am folosit de doua ori! Cuvantul `void` inseamna ca aceasta functie nu trimite inapoi nicio valoare -- doar face ceva.

## Functii cu parametri

Functiile devin cu adevarat puternice cand le dai **parametri** -- informatii de care au nevoie pentru a-si face treaba. E ca si cum ai spune unui bucatar ce aroma de tort sa faca.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void greet(string name) {
    cout << "Hey " << name << "! Nice to see you!" << endl;
}

int main() {
    greet("Alex");
    greet("Sam");
    greet("Jordan");
    return 0;
}
```

Functia `greet` primeste un parametru numit `name`. De fiecare data cand o apelam, trimitem un nume diferit, iar functia il foloseste.

## Mai multi parametri

Poti da unei functii cati parametri are nevoie, separati prin virgula:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void introduce(string name, int age, string hobby) {
    cout << "Hi, I'm " << name << "!" << endl;
    cout << "I'm " << age << " years old." << endl;
    cout << "I love " << hobby << "!" << endl;
    cout << "---" << endl;
}

int main() {
    introduce("Alex", 12, "coding");
    introduce("Sam", 11, "drawing");
    return 0;
}
```

Cand apelezi functia, trebuie sa trimiti valorile in aceeasi ordine in care sunt definite.

## Valori returnate: Primesti raspunsuri inapoi

Uneori nu vrei doar ca o functie sa *faca* ceva -- vrei sa iti *dea un raspuns*. Pentru asta este `return`. In loc de `void`, scrii tipul valorii pe care o returneaza.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int sum = add(15, 27);
    cout << "15 + 27 = " << sum << endl;

    int product = multiply(6, 7);
    cout << "6 x 7 = " << product << endl;

    // You can also use the result directly
    cout << "3 + 4 + 5 = " << add(add(3, 4), 5) << endl;
    return 0;
}
```

`int` dinaintea numelui functiei inseamna "aceasta functie returneaza un numar intreg." Instructiunea `return` trimite acea valoare inapoi la locul unde a fost apelata functia.

## Construirea unui mini calculator

Sa punem mai multe functii impreuna pentru a construi ceva util:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        cout << "Error: can't divide by zero!" << endl;
        return 0;
    }
    return a / b;
}

int square(int n) {
    return n * n;
}

bool isEven(int n) {
    return n % 2 == 0;
}

int main() {
    cout << "10 / 3 = " << divide(10, 3) << endl;
    cout << "5 squared = " << square(5) << endl;

    for (int i = 1; i <= 6; i++) {
        cout << i << " is " << (isEven(i) ? "even" : "odd") << endl;
    }
    return 0;
}
```

Observa cum fiecare functie are o treaba clara. `divide` returneaza un `double` (numar zecimal), `square` returneaza un `int`, si `isEven` returneaza un `bool` (adevarat sau fals).

## Functii void: Doar fac ceva

Nu orice functie trebuie sa returneze o valoare. Functiile `void` executa o actiune fara sa trimita nimic inapoi. Sunt excelente pentru afisare sau desenare.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void drawLine(int length, char symbol) {
    for (int i = 0; i < length; i++) {
        cout << symbol;
    }
    cout << endl;
}

void drawBox(int width, int height) {
    for (int row = 0; row < height; row++) {
        drawLine(width, '*');
    }
}

int main() {
    drawLine(20, '=');
    cout << "  My Program" << endl;
    drawLine(20, '=');
    cout << endl;
    drawBox(8, 3);
    return 0;
}
```

Vezi cum `drawBox` apeleaza `drawLine`? Functiile pot apela alte functii! Asa construiesti programe complexe din blocuri simple.

## Unde se scriu functiile

O functie trebuie sa fie **definita** (sau cel putin **declarata**) inainte de a fi folosita. De aceea ne scriem functiile deasupra lui `main()`. Daca apelezi o functie pe care compilatorul nu a vazut-o inca, vei primi o eroare.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

// This is called a "function declaration" or "prototype"
int doubleIt(int n);

int main() {
    // We can use doubleIt here because we declared it above
    cout << "Double 8 is " << doubleIt(8) << endl;
    return 0;
}

// The full definition can come after main
int doubleIt(int n) {
    return n * 2;
}
```

Declaratia de la inceput ii spune compilatorului "ai incredere, aceasta functie exista." Definitia completa vine mai tarziu. Asta este optional dar util pentru organizarea programelor mai mari.

<!-- exercise -->
### Randul tau: Convertor de temperatura

Scrie o functie numita `celsiusToFahrenheit` care primeste o temperatura `double` in Celsius si o returneaza in Fahrenheit. Formula este: **F = C x 9/5 + 32**

Apoi apeleaz-o din `main()` pentru a converti aceste temperaturi: 0, 20, 37 si 100.

```cpp
#include <iostream>
using namespace std;

// Write your celsiusToFahrenheit function here

int main() {
    cout << "0 C = " << celsiusToFahrenheit(0) << " F" << endl;
    cout << "20 C = " << celsiusToFahrenheit(20) << " F" << endl;
    cout << "37 C = " << celsiusToFahrenheit(37) << " F" << endl;
    cout << "100 C = " << celsiusToFahrenheit(100) << " F" << endl;
    return 0;
}
```
<!-- hint: Semnatura functiei este: double celsiusToFahrenheit(double celsius). Inauntru, returneaza celsius * 9.0 / 5.0 + 32; -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Maximul din trei

Scrie o functie numita `maxOfThree` care primeste trei numere intregi si il returneaza pe cel mai mare. Testeaz-o cu cateva seturi diferite de numere.

```cpp
#include <iostream>
using namespace std;

// Write your maxOfThree function here

int main() {
    cout << "Max of 3, 7, 5 is: " << maxOfThree(3, 7, 5) << endl;
    cout << "Max of 10, 2, 8 is: " << maxOfThree(10, 2, 8) << endl;
    cout << "Max of 4, 4, 4 is: " << maxOfThree(4, 4, 4) << endl;
    return 0;
}
```
<!-- hint: O abordare: foloseste if-else pentru a compara. Incepe cu int result = a; apoi if (b > result) result = b; apoi if (c > result) result = c; return result; -->
<!-- /exercise -->

## Ce ai invatat

- Functiile iti permit sa denumesti si sa reutilizezi blocuri de cod
- Parametrii trimit informatii *catre* o functie
- `return` trimite o valoare *inapoi* la apelant
- Functiile `void` executa actiuni fara sa returneze o valoare
- Functiile trebuie definite sau declarate inainte de a fi apelate
- Poti apela functii din interiorul altor functii pentru a construi comportamente complexe din parti simple

In continuare, vom explora **functii avansate** -- parametri impliciti, supraincarcarea si cum sa modifici variabile din interiorul unei functii!
