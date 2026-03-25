---
title: 'Matematică cu cod'
slug: math
sort_order: 4
concepts: [arithmetic, operators, modulo]
summary: 'Fă matematică cu codul tău — adunare, scădere, înmulțire, împărțire și altele.'
estimated_minutes: 10
prev_lesson: input
next_lesson: if-else
lang: ro
---

## Calculatorul tău este un calculator

Unul dintre lucrurile la care calculatoarele sunt cele mai bune este matematica -- și sunt incredibil de rapide. C++ poate face toate operațiile matematice de bază pe care le știi deja, plus câteva în plus.

## Cei cinci operatori

Iată operatorii matematici din C++:

| Operator | Ce face | Exemplu |
|----------|-------------|---------|
| `+` | Adunare | `5 + 3` dă `8` |
| `-` | Scădere | `10 - 4` dă `6` |
| `*` | Înmulțire | `6 * 7` dă `42` |
| `/` | Împărțire | `15 / 3` dă `5` |
| `%` | Modulo (rest) | `17 % 5` dă `2` |

Hai să-i vedem pe toți în acțiune:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "5 + 3 = " << 5 + 3 << endl;
    cout << "10 - 4 = " << 10 - 4 << endl;
    cout << "6 * 7 = " << 6 * 7 << endl;
    cout << "15 / 3 = " << 15 / 3 << endl;
    cout << "17 % 5 = " << 17 % 5 << endl;
    return 0;
}
```

Operatorul `%` (modulo) s-ar putea să fie nou pentru tine. Îți dă **restul** după împărțire. Deci `17 % 5` înseamnă "17 împărțit la 5 are restul 2." E super util -- de exemplu, poți verifica dacă un număr este par testând dacă `number % 2 == 0`.

## Atenție: Împărțirea numerelor întregi

Iată o parte complicată. Când împarți două valori `int`, C++ aruncă partea zecimală:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "7 / 2 = " << 7 / 2 << endl;
    cout << "Hmm... that should be 3.5!" << endl;
    cout << endl;
    cout << "Fix it with doubles:" << endl;
    cout << "7.0 / 2.0 = " << 7.0 / 2.0 << endl;
    return 0;
}
```

Dacă vrei răspunsul real cu zecimale, fă cel puțin unul dintre numere `double` (adaugă `.0`). Aceasta este una dintre cele mai frecvente greșeli ale începătorilor, deci reține-o!

## Ordinea operațiilor

C++ respectă aceeași ordine a operațiilor pe care ai învățat-o la școală: înmulțirea și împărțirea se fac înaintea adunării și scăderii. Folosește paranteze `()` pentru a schimba ordinea:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "2 + 3 * 4 = " << 2 + 3 * 4 << endl;
    cout << "(2 + 3) * 4 = " << (2 + 3) * 4 << endl;
    cout << endl;

    // Pizza party calculator
    int totalSlices = 3 * 8;
    int people = 5;
    int slicesEach = totalSlices / people;
    int leftover = totalSlices % people;

    cout << "3 pizzas with 8 slices each = " << totalSlices << " slices" << endl;
    cout << "Split between " << people << " people = " << slicesEach << " each" << endl;
    cout << "Leftover slices: " << leftover << endl;
    return 0;
}
```

La fel ca la matematică: parantezele mai întâi, apoi `*`, `/`, `%`, apoi `+` și `-`.

## Scurtături: Atribuire compusă

Când vrei să modifici o variabilă prin adunare, scădere etc., C++ are scurtături la îndemână:

| Varianta lungă | Scurtătură | Ce face |
|----------|----------|-------------|
| `score = score + 10;` | `score += 10;` | Adaugă 10 la score |
| `lives = lives - 1;` | `lives -= 1;` | Scade 1 din lives |
| `coins = coins * 2;` | `coins *= 2;` | Dublează coins |
| `total = total / 3;` | `total /= 3;` | Împarte total la 3 |

Iar pentru adunarea sau scăderea cu 1, există o scurtătură și mai scurtă:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 0;

    score += 100;
    cout << "Found treasure! Score: " << score << endl;

    score += 50;
    cout << "Defeated monster! Score: " << score << endl;

    score -= 25;
    cout << "Hit by trap! Score: " << score << endl;

    score *= 2;
    cout << "Double points bonus! Score: " << score << endl;

    // Increment and decrement
    int lives = 3;
    cout << endl << "Lives: " << lives << endl;

    lives--;
    cout << "Ouch! Lives: " << lives << endl;

    lives--;
    cout << "Ouch again! Lives: " << lives << endl;

    lives++;
    cout << "Found extra life! Lives: " << lives << endl;
    return 0;
}
```

`lives++` adaugă 1 (incrementare), iar `lives--` scade 1 (decrementare). Le vei folosi FOARTE des, mai ales mai târziu la bucle.

## Matematică cu input de la utilizator

Hai să construim un calculator de bacșiș care combină tot ce am învățat:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    double bill;
    int tipPercent;

    cout << "Enter the bill amount: ";
    cin >> bill;
    cout << "Enter tip percent (like 15 or 20): ";
    cin >> tipPercent;

    double tip = bill * tipPercent / 100.0;
    double total = bill + tip;

    cout << "Bill: $" << bill << endl;
    cout << "Tip (" << tipPercent << "%): $" << tip << endl;
    cout << "Total: $" << total << endl;
    return 0;
}
```

<!-- exercise -->
### Rândul tău: Media notelor

Scrie un program care cere utilizatorului trei note de test (numere întregi), apoi calculează și afișează media. Reține: pentru a obține o medie cu zecimale, trebuie să împarți la `3.0`, nu la `3`!

```cpp
#include <iostream>
using namespace std;

int main() {
    // Declare three int variables for test scores

    // Ask for each score and read it with cin

    // Calculate the average (use 3.0 to get decimals!)

    // Print the average

    return 0;
}
```
<!-- hint: int s1, s2, s3; Citește fiecare cu cin. Apoi double average = (s1 + s2 + s3) / 3.0; și afișeaz-o. -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Convertor de timp

Cere utilizatorului un număr de **secunde totale**. Convertește-le în minute și secunde rămase. De exemplu, 135 secunde = 2 minute și 15 secunde. Vei avea nevoie de operatorii `/` și `%`!

```cpp
#include <iostream>
using namespace std;

int main() {
    int totalSeconds;
    cout << "Enter total seconds: ";
    cin >> totalSeconds;

    // Calculate minutes and remaining seconds

    // Print the result

    return 0;
}
```
<!-- hint: int minutes = totalSeconds / 60; int seconds = totalSeconds % 60; Apoi afișează-le. -->
<!-- /exercise -->

## Ce ai învățat

- C++ are 5 operatori matematici: `+`, `-`, `*`, `/`, `%`
- Împărțirea a două numere întregi aruncă zecimalele -- folosește valori `double` dacă ai nevoie de zecimale
- Ordinea operațiilor funcționează exact ca la matematică (folosește paranteze pentru a o schimba)
- Scurtăturile precum `+=`, `-=`, `++`, `--` fac actualizarea variabilelor mai rapidă

Acum că poți face matematică, e timpul să-ți înveți programele să **ia decizii**. Urmează: instrucțiunile if-else!
