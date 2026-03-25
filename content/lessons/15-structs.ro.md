---
title: 'Structuri'
slug: structs
sort_order: 15
lang: ro
concepts: [structs, struct]
summary: 'Creeaza-ti propriile tipuri de date personalizate pentru a grupa informatii asociate.'
estimated_minutes: 12
prev_lesson: strings
next_lesson: file-io
---

## De ce structuri?

Imagineaza-ti ca construiesti o baza de date cu elevi. Fiecare elev are un nume, o varsta si o nota. Ai putea folosi trei tablouri separate:

```
string names[30];
int ages[30];
double grades[30];
```

Dar asta e dezordonat. Daca sortezi numele, trebuie sa iti amintesti sa rearanjezi si varstele si notele. Ce-ar fi daca ai putea impacheta toate informatiile despre un elev intr-un singur pachet? Exact asta face o **structura** (struct).

## Definirea unei structuri

O structura este ca un plan (sablon) pentru un tip de date personalizat. Definesti ce informatii contine:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double grade;
};

int main() {
    Student alice;
    alice.name = "Alice";
    alice.age = 14;
    alice.grade = 92.5;

    cout << "Name: " << alice.name << endl;
    cout << "Age: " << alice.age << endl;
    cout << "Grade: " << alice.grade << endl;

    return 0;
}
```

Sa analizam:

- **`struct Student { ... };`** creeaza un tip nou numit `Student`. Nu uita punctul si virgula dupa `}`!
- Fiecare variabila din interiorul structurii (ca `name`, `age`, `grade`) se numeste **membru**.
- **`Student alice;`** creeaza o variabila de tip `Student`, la fel cum `int x;` creeaza un numar intreg.
- **`alice.name`** foloseste **operatorul punct** (`.`) pentru a accesa un membru.

## Initializarea unei structuri

Poti completa toti membrii dintr-o data cand creezi structura:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Pet {
    string name;
    string species;
    int age;
};

int main() {
    Pet myPet = {"Buddy", "dog", 3};
    Pet friendsPet = {"Whiskers", "cat", 7};

    cout << myPet.name << " is a " << myPet.age
         << "-year-old " << myPet.species << endl;

    cout << friendsPet.name << " is a " << friendsPet.age
         << "-year-old " << friendsPet.species << endl;

    return 0;
}
```

Valorile din `{ }` trebuie sa fie in aceeasi ordine ca membrii din definitia structurii.

## Structuri in viata reala: Personaje de joc

Structurile stralucesc cand modelezi lucruri din lumea reala. Iata un personaj de joc cu mai multe statistici:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int health;
    int attack;
    int defense;
    int level;
};

int main() {
    Character hero = {"Knight", 100, 25, 15, 1};
    Character monster = {"Dragon", 200, 40, 20, 5};

    cout << "=== BATTLE ===" << endl;
    cout << hero.name << " (Lv." << hero.level << ")"
         << " HP:" << hero.health
         << " ATK:" << hero.attack << endl;

    cout << monster.name << " (Lv." << monster.level << ")"
         << " HP:" << monster.health
         << " ATK:" << monster.attack << endl;

    // Hero attacks monster
    int damage = hero.attack - monster.defense;
    if (damage < 0) damage = 0;
    monster.health -= damage;

    cout << endl << hero.name << " deals " << damage << " damage!" << endl;
    cout << monster.name << " HP is now " << monster.health << endl;

    return 0;
}
```

Fara structuri, ai avea nevoie de variabile separate pentru `heroName`, `heroHealth`, `heroAttack`... ar deveni haos rapid.

## Tablouri de structuri

Aici structurile isi dovedesc cu adevarat valoarea. Poti face un **tablou de structuri** ca sa stochezi o lista intreaga de date structurate:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int grade;
};

int main() {
    const int SIZE = 4;
    Student classRoom[SIZE] = {
        {"Alice", 95},
        {"Bob", 82},
        {"Carlos", 91},
        {"Diana", 88}
    };

    // Find the top student
    int bestIndex = 0;
    for (int i = 1; i < SIZE; i++) {
        if (classRoom[i].grade > classRoom[bestIndex].grade) {
            bestIndex = i;
        }
    }

    cout << "Class grades:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "  " << classRoom[i].name << ": " << classRoom[i].grade;
        if (i == bestIndex) cout << " <-- Top student!";
        cout << endl;
    }

    return 0;
}
```

Fiecare element din tablou este un `Student` complet cu toate informatiile grupate. Mult mai curat decat tablourile paralele!

## Transmiterea structurilor catre functii

Poti transmite structuri functiilor la fel ca orice alta variabila:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Rectangle {
    double width;
    double height;
};

double area(Rectangle r) {
    return r.width * r.height;
}

double perimeter(Rectangle r) {
    return 2 * (r.width + r.height);
}

void printInfo(Rectangle r) {
    cout << "Width: " << r.width << ", Height: " << r.height << endl;
    cout << "Area: " << area(r) << endl;
    cout << "Perimeter: " << perimeter(r) << endl;
}

int main() {
    Rectangle room = {5.5, 4.0};
    Rectangle garden = {12.0, 8.5};

    cout << "Room:" << endl;
    printInfo(room);

    cout << endl << "Garden:" << endl;
    printInfo(garden);

    return 0;
}
```

Functia primeste o copie a structurii si poate citi toti membrii folosind operatorul punct.

## Functii care returneaza structuri

Functiile pot, de asemenea, sa creeze si sa returneze structuri:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Point {
    double x;
    double y;
};

Point midpoint(Point a, Point b) {
    Point mid;
    mid.x = (a.x + b.x) / 2;
    mid.y = (a.y + b.y) / 2;
    return mid;
}

int main() {
    Point start = {0.0, 0.0};
    Point end = {10.0, 6.0};

    Point middle = midpoint(start, end);

    cout << "Start: (" << start.x << ", " << start.y << ")" << endl;
    cout << "End: (" << end.x << ", " << end.y << ")" << endl;
    cout << "Midpoint: (" << middle.x << ", " << middle.y << ")" << endl;

    return 0;
}
```

<!-- exercise -->
### Exercitiu: Agenda de contacte

Creeaza o structura `Contact` cu `name` (string), `phone` (string) si `age` (int). Fa un tablou de 3 contacte, apoi scrie o bucla care afiseaza doar contactele care au 18 ani sau mai mult.

```cpp
#include <iostream>
#include <string>
using namespace std;

// TODO: Define a Contact struct with name, phone, and age

int main() {
    // TODO: Create an array of 3 contacts:
    // "Alice", "555-1234", 15
    // "Bob", "555-5678", 21
    // "Carlos", "555-9012", 18

    cout << "Contacts aged 18+:" << endl;
    // TODO: Loop through the array and print only contacts with age >= 18

    return 0;
}
```
<!-- hint: Defineste struct Contact { string name; string phone; int age; }; apoi creeaza Contact contacts[3] = { {"Alice", "555-1234", 15}, ... }; si parcurge cu un if care verifica contacts[i].age >= 18. -->
<!-- /exercise -->

## Ce ai invatat

- O **structura** grupeaza variabile asociate intr-un singur tip de date personalizat.
- Definesti o structura cu `struct Nume { membri };` (nu uita punctul si virgula!).
- Accesezi membrii folosind **operatorul punct**: `variabila.membru`.
- Poti initializa toti membrii dintr-o data cu `{ }`.
- **Tablourile de structuri** pastreaza datele structurate organizate si usor de lucrat.
- Structurile pot fi **transmise catre** si **returnate din** functii la fel ca orice alt tip.

In lectia urmatoare, vei invata despre **citirea si scrierea fisierelor** -- cum sa faci programele sa citeasca din fisiere si sa scrie in fisiere ca sa poata salva date!
