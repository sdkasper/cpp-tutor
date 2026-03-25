---
title: 'Bucle While'
slug: while-loops
sort_order: 8
concepts: [loops, while-loop]
summary: 'Continuă până când o condiție este îndeplinită cu buclele while.'
estimated_minutes: 10
prev_lesson: for-loops
next_lesson: nested-loops
lang: ro
---

## Un alt fel de buclă

În lecția trecută ai învățat buclele `for`, care sunt grozave când știi exact de câte ori să repeți. Dar uneori nu știi dinainte -- vrei doar să continui *până se întâmplă ceva*. Aici strălucesc buclele `while`.

Gândește-te la asta ca la mâncatul de popcorn: nu numeri fiecare bob, doar continui să mănânci *cât timp* mai e popcorn în bol.

## Bucla While

O buclă `while` verifică o condiție *înainte* de fiecare rundă. Dacă e adevărată, codul din interior se execută. Dacă e falsă, bucla se oprește.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int cookies = 5;
    cout << "I have " << cookies << " cookies!" << endl;

    while (cookies > 0) {
        cout << "Nom! Ate a cookie. " << cookies - 1 << " left." << endl;
        cookies--;
    }

    cout << "All gone!" << endl;
    return 0;
}
```

De fiecare dată prin buclă, mâncăm un biscuit (`cookies--`). Când `cookies` ajunge la 0, condiția `cookies > 0` este falsă, și bucla se oprește.

## While vs For

De fapt poți face același lucru cu ambele bucle. Iată o comparație una lângă alta:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // For loop version
    cout << "For loop:" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // While loop version of the same thing
    cout << "While loop:" << endl;
    int i = 1;
    while (i <= 5) {
        cout << i << " ";
        i++;
    }
    cout << endl;
    return 0;
}
```

**Regula generală:** Folosește `for` când știi de câte ori să faci bucla. Folosește `while` când aștepți să se întâmple ceva.

## Pericolul: Bucle infinite

Dacă condiția nu devine *niciodată* falsă, bucla rulează la nesfârșit. Asta se numește **buclă infinită** și va bloca programul!

```cpp
// NU rula asta -- nu s-ar opri niciodată!
int x = 1;
while (x > 0) {
    cout << x << endl;
    x++;  // x tot crește, deci x > 0 e mereu adevărat!
}
```

Asigură-te mereu că ceva în interiorul buclei se schimbă astfel încât condiția să devină în cele din urmă falsă.

## Do-While: Verifică după

O buclă `while` normală verifică condiția *înainte* de execuție. O buclă `do-while` execută codul *mai întâi*, apoi verifică. Asta înseamnă că se execută mereu **cel puțin o dată**.

E perfect pentru lucruri ca un meniu, unde vrei să-l afișezi cel puțin o dată.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 1;

    do {
        cout << "Number is: " << number << endl;
        number *= 2;  // double it
    } while (number <= 100);

    cout << "Stopped because " << number << " is over 100!" << endl;
    return 0;
}
```

Observă punct și virgulă după `while (number <= 100);` -- `do-while` este singura buclă care are nevoie de asta.

## Break: Ieșire de urgență

Uneori trebuie să ieși dintr-o buclă devreme. Instrucțiunea `break` iese imediat din buclă.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Searching for the number 7 in a countdown
    cout << "Searching..." << endl;
    int n = 20;

    while (n > 0) {
        if (n == 7) {
            cout << "Found 7! Stopping search." << endl;
            break;  // exit the loop immediately
        }
        cout << n << " is not 7." << endl;
        n -= 3;
    }

    cout << "Loop ended." << endl;
    return 0;
}
```

Când se ajunge la `break`, programul sare direct la linia de după acolada de închidere a buclei.

## Continue: Sari peste asta

Instrucțiunea `continue` sare peste restul rundei *curente* și se întoarce la verificarea condiției. E ca și cum ai spune "lasă asta, treci mai departe."

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Printing numbers 1-10, but skipping multiples of 3:" << endl;

    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;  // skip this iteration
        }
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

Când `i` este 3, 6 sau 9, `continue` sare peste `cout` și se întoarce la începutul buclei.

## Un joc de ghicit

Iată un exemplu distractiv care combină `while`, `break` și număratul. Imaginează-ți un joc de ghicit numere în care jucătorul continuă să ghicească până nimereRte.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int secret = 42;
    int guesses[] = {10, 50, 30, 42};  // pretend player guesses
    int numGuesses = 4;

    int attempt = 0;
    while (attempt < numGuesses) {
        int guess = guesses[attempt];
        cout << "Guess: " << guess;

        if (guess == secret) {
            cout << " -- Correct! You got it in " << attempt + 1 << " tries!" << endl;
            break;
        } else if (guess < secret) {
            cout << " -- Too low!" << endl;
        } else {
            cout << " -- Too high!" << endl;
        }
        attempt++;
    }
    return 0;
}
```

Bucla while continuă prin ghiciri, iar `break` o oprește când se găsește răspunsul corect.

<!-- exercise -->
### Rândul tău: Jocul înjumătățirii

Începe cu numărul 1000. Continuă să-l împarți la 2 (folosind împărțire cu numere întregi) cât timp e mai mare decât 1. Afișează fiecare valoare pe o linie nouă. Câți pași sunt necesari pentru a ajunge la 1?

Rezultatul așteptat începe cu:
```
1000
500
250
125
...
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 1000;
    int steps = 0;

    // Use a while loop to keep halving the number
    // Print the number each time
    // Count the steps

    cout << "It took " << steps << " steps to reach 1." << endl;
    return 0;
}
```
<!-- hint: În interiorul buclei while: afișează numărul cu cout, apoi împarte la 2 (number = number / 2 sau number /= 2), și incrementează steps. Condiția este while (number > 1). -->
<!-- /exercise -->

## Ce ai învățat

- Buclele `while` repetă cât timp o condiție este adevărată
- Buclele `do-while` se execută mereu cel puțin o dată, apoi verifică condiția
- Folosește `for` când știi numărul de repetări, `while` când aștepți o condiție
- `break` iese dintr-o buclă imediat
- `continue` sare la următoarea iterație
- Asigură-te mereu că condiția buclei va deveni în cele din urmă falsă pentru a evita buclele infinite

Urmează: vom pune bucle *în interiorul* altor bucle pentru a crea modele uimitoare!
