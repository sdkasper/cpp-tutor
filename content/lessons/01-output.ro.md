---
title: 'Primul tău program'
slug: output
sort_order: 1
concepts: [output, cout, endl]
summary: 'Pune calculatorul să spună lucruri! Învață cum să afișezi text pe ecran.'
estimated_minutes: 10
prev_lesson: null
next_lesson: variables
lang: ro
---

## Bine ai venit!

Ești pe cale să scrii primul tău program C++. La sfârșitul acestei lecții, vei putea să faci calculatorul să afișeze orice vrei pe ecran.

## Programul "Hello, World!"

Fiecare programator începe de aici. Iată cel mai simplu program C++ care face ceva cu adevărat:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Apasă **Run** și vezi ce se întâmplă! Calculatorul ar trebui să afișeze `Hello, World!` în zona de output de mai jos.

## Ce înseamnă fiecare linie?

Hai să le luăm pe rând:

- **`#include <iostream>`** -- Asta îi spune lui C++ "Vreau să folosesc input și output." Gândește-te la asta ca și cum ai deschide o cutie cu unelte înainte să începi să construiești.
- **`using namespace std;`** -- Aceasta e o scurtătură ca să putem scrie `cout` în loc de varianta mai lungă `std::cout`. Deocamdată nu trebuie să-ți faci griji în privința asta.
- **`int main()`** -- De aici începe să ruleze programul tău. Fiecare program C++ are nevoie de o funcție `main`. E ca ușa de la intrare a programului tău.
- **`cout << "Hello, World!" << endl;`** -- Asta e partea distractivă! `cout` (se citește "si-aut") trimite text pe ecran. `endl` adaugă o linie nouă la final.
- **`return 0;`** -- Asta îi spune calculatorului "Am terminat, totul a mers bine."

## Afișarea mai multor linii

Poți folosi `cout` de mai multe ori pentru a afișa mai multe linii:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "My name is C++ Tutor" << endl;
    cout << "I can print anything!" << endl;
    cout << "Even numbers: " << 42 << endl;
    return 0;
}
```

Observă cum fiecare instrucțiune `cout` afișează pe propria linie datorită lui `endl`.

## Afișarea fără linie nouă

Ce faci dacă vrei să afișezi lucruri pe **aceeași linie**? Pur și simplu nu pune `endl`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello ";
    cout << "World ";
    cout << "!" << endl;
    return 0;
}
```

Totul rămâne pe aceeași linie până când adaugi `endl`.

## Caractere speciale

Uneori ai nevoie să afișezi lucruri precum ghilimele sau tab-uri. Folosești un **backslash** `\` pentru acestea:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "She said \"hello\"" << endl;
    cout << "Line 1\nLine 2\nLine 3" << endl;
    cout << "Name:\tAge:" << endl;
    cout << "Alex\t12" << endl;
    return 0;
}
```

- `\"` afișează un semn de ghilimele
- `\n` începe o linie nouă (ca `endl` dar în interiorul unui text)
- `\t` adaugă un spațiu de tip tab

Iată un exemplu de artă ASCII -- apasă **Run** ca să vezi ce afișează:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "   /\\" << endl;
    cout << "  /  \\" << endl;
    cout << " /    \\" << endl;
    cout << "|------|" << endl;
    cout << "|      |" << endl;
    cout << "|      |" << endl;
    cout << "--------" << endl;
    return 0;
}
```

<!-- exercise -->
### Rândul tău: Creează propria artă ASCII

Acum încearcă să faci propriul desen folosind `cout`! Poate fi un copac, o rachetă, o față, sau orice îți place.

```cpp
#include <iostream>
using namespace std;

int main() {
    // Draw something cool with cout!
    // Use spaces, slashes, dashes, pipes, and other characters.

    return 0;
}
```
<!-- hint: Încearcă o formă simplă mai întâi, ca un triunghi: cout << "  *" << endl; cout << " ***" << endl; cout << "*****" << endl; -->
<!-- /exercise -->

## Ce ai învățat

- `cout` trimite text pe ecran
- `endl` trece la o linie nouă
- Poți afișa text, numere și caractere speciale
- Fiecare program C++ are nevoie de `#include <iostream>` și `int main()`

Bravo că ai terminat prima lecție! În continuare vom învăța despre **variabile** -- cum să stochezi și să reții informații în programele tale.
