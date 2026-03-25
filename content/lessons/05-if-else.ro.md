---
title: 'Luarea deciziilor cu If-Else'
slug: if-else
sort_order: 5
concepts: [if-else, conditions, bool]
summary: 'Învață programul tău să ia decizii pe baza condițiilor.'
estimated_minutes: 12
prev_lesson: math
next_lesson: switch
lang: ro
---

## Programe care gândesc

Până acum, programele tale fac exact același lucru de fiecare dată. Dar programele adevărate iau **decizii**. Un joc verifică dacă viața ta ajunge la zero. Un telefon verifică dacă parola ta e corectă. Hai să-ți învățăm programele să gândească!

## Prima ta instrucțiune If

O instrucțiune `if` execută cod **doar când o condiție este adevărată**:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int temperature = 35;

    if (temperature > 30) {
        cout << "It's hot outside! Drink water!" << endl;
    }

    cout << "Have a nice day!" << endl;
    return 0;
}
```

Codul din interiorul acoladelor `{ }` se execută doar dacă condiția `temperature > 30` este adevărată. Încearcă să schimbi `35` cu `20` în minte -- mesajul despre căldură ar fi sărit, dar "Have a nice day!" tot s-ar afișa pentru că e în afara blocului `if`.

## If-Else: Două drumuri

Ce faci dacă vrei să faci un lucru când condiția e adevărată, și ceva **diferit** când e falsă? Pentru asta e `else`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "How old are you? ";
    cin >> age;

    if (age >= 13) {
        cout << "You're a teenager or older!" << endl;
    } else {
        cout << "You're still a kid -- enjoy it!" << endl;
    }
    return 0;
}
```

Programul ia **întotdeauna** un drum sau celălalt. E ca o bifurcație pe drum -- mergi la stânga sau la dreapta, dar niciodată pe ambele.

## Operatori de comparare

Iată toate modurile de a compara lucruri în C++:

| Operator | Semnificație | Exemplu |
|----------|---------|---------|
| `==` | Egal cu | `score == 100` |
| `!=` | Diferit de | `lives != 0` |
| `<` | Mai mic decât | `age < 13` |
| `>` | Mai mare decât | `temp > 30` |
| `<=` | Mai mic sau egal | `grade <= 60` |
| `>=` | Mai mare sau egal | `points >= 500` |

**Atenție mare:** `==` (două semne egal) verifică dacă lucrurile sunt egale. Un singur `=` atribuie o valoare. Confundarea lor e un bug super frecvent!

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 85;

    cout << "Score: " << score << endl;

    if (score == 100) {
        cout << "Perfect score!" << endl;
    }
    if (score >= 90) {
        cout << "Awesome job!" << endl;
    }
    if (score >= 70) {
        cout << "You passed!" << endl;
    }
    if (score < 70) {
        cout << "Keep practicing!" << endl;
    }
    return 0;
}
```

## Else If: Alegeri multiple

Uneori ai nevoie de mai mult de două drumuri. Folosește `else if` pentru a înlănțui condiții:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Enter your test score (0-100): ";
    cin >> score;

    if (score >= 90) {
        cout << "Grade: A -- Amazing!" << endl;
    } else if (score >= 80) {
        cout << "Grade: B -- Great work!" << endl;
    } else if (score >= 70) {
        cout << "Grade: C -- Not bad!" << endl;
    } else if (score >= 60) {
        cout << "Grade: D -- You can do better!" << endl;
    } else {
        cout << "Grade: F -- Time to study harder!" << endl;
    }
    return 0;
}
```

C++ verifică fiecare condiție de sus în jos. În momentul în care una este adevărată, execută acel bloc și **sare peste restul**. `else` de la final prinde tot ce nu s-a potrivit.

## Operatori logici: Combinarea condițiilor

Uneori o singură condiție nu e de ajuns. Poți combina condiții cu operatori logici:

| Operator | Semnificație | Exemplu |
|----------|---------|---------|
| `&&` | ȘI (ambele trebuie să fie adevărate) | `age >= 13 && age <= 19` |
| `\|\|` | SAU (cel puțin una adevărată) | `day == 6 \|\| day == 7` |
| `!` | NU (inversează adevărat/fals) | `!gameOver` |

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    int height;

    cout << "Enter your age: ";
    cin >> age;
    cout << "Enter your height in cm: ";
    cin >> height;

    cout << endl << "=== Roller Coaster Check ===" << endl;

    if (age >= 8 && height >= 120) {
        cout << "You can ride the roller coaster!" << endl;
    } else if (age < 8) {
        cout << "Sorry, you need to be at least 8 years old." << endl;
    } else {
        cout << "Sorry, you need to be at least 120 cm tall." << endl;
    }
    return 0;
}
```

`&&` înseamnă că AMBELE condiții trebuie să fie adevărate. Trebuie să ai suficientă vârstă ȘI suficientă înălțime.

## Tipul Bool

O variabilă `bool` stochează fie `true` fie `false`. E ca un întrerupător pornit/oprit:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    bool hasKey = true;
    bool doorLocked = true;

    cout << "Door is locked: " << doorLocked << endl;
    cout << "You have key: " << hasKey << endl;
    cout << endl;

    if (doorLocked && hasKey) {
        cout << "You unlock the door and walk through!" << endl;
    } else if (doorLocked && !hasKey) {
        cout << "The door is locked and you don't have a key..." << endl;
    } else {
        cout << "The door is open. You walk right in!" << endl;
    }
    return 0;
}
```

`true` se afișează ca `1` și `false` se afișează ca `0`. Operatorul `!` inversează un bool: `!true` devine `false`, și `!false` devine `true`.

<!-- exercise -->
### Rândul tău: Verificator de numere

Scrie un program care cere utilizatorului un număr, apoi îi spune dacă este **pozitiv**, **negativ** sau **zero**. Spune-i și dacă e **par** sau **impar** (indiciu: folosește `% 2`).

```cpp
#include <iostream>
using namespace std;

int main() {
    int number;
    cout << "Enter a number: ";
    cin >> number;

    // Check if the number is positive, negative, or zero

    // Check if the number is even or odd

    return 0;
}
```
<!-- hint: Folosește if (number > 0) pentru pozitiv, else if (number < 0) pentru negativ, else pentru zero. Pentru par/impar: if (number % 2 == 0) înseamnă par, altfel impar. -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Joc de aventură

Creează o mică aventură text! Cere utilizatorului să aleagă "left" sau "right" la o bifurcație. Apoi cere-i un număr norocos. Dacă a mers la stânga ȘI numărul e mai mare de 5, găsește o comoară. Altfel, afișează un rezultat diferit pentru fiecare drum.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string direction;
    int luckyNumber;

    cout << "You're in a dungeon and reach a fork." << endl;
    cout << "Do you go left or right? ";
    cin >> direction;

    cout << "Pick a lucky number (1-10): ";
    cin >> luckyNumber;

    // Write your adventure logic here!

    return 0;
}
```
<!-- hint: Folosește if (direction == "left" && luckyNumber > 5) pentru drumul cu comoara. Adaugă blocuri else if pentru alte combinații. Nu uita să folosești == pentru compararea string-urilor! -->
<!-- /exercise -->

## Ce ai învățat

- `if` execută cod doar când o condiție este adevărată
- `else` se ocupă de cazul "altfel", iar `else if` adaugă mai multe ramuri
- Operatori de comparare: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Operatori logici: `&&` (ȘI), `||` (SAU), `!` (NU)
- `bool` stochează `true` sau `false`

Programele tale pot acum lua decizii ca o aplicație reală! Urmează `switch` -- un mod mai curat de a gestiona multe alegeri.
