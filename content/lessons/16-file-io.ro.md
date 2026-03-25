---
title: 'Citirea si scrierea fisierelor'
slug: file-io
sort_order: 16
lang: ro
concepts: [file-io, ifstream, ofstream]
summary: 'Citeste din fisiere si scrie in fisiere ca programele tale sa poata salva date.'
estimated_minutes: 12
prev_lesson: structs
next_lesson: null
---

## De ce citirea/scrierea fisierelor?

Fiecare program pe care l-ai scris pana acum uita totul cand se opreste. Variabilele dispar, scorurile se pierd si recordurile se evapora. **Citirea/scrierea fisierelor** (File I/O) permite programelor tale sa salveze date in fisiere si sa le incarce inapoi mai tarziu -- ca si cum ai da programului tau un caiet in care sa scrie.

Citirea/scrierea fisierelor este, de asemenea, esentiala pentru problemele de **informatica de concurs** (ca problemele romanesti din aceasta aplicatie), unde programul tau citeste datele de intrare dintr-un fisier si scrie raspunsurile intr-un fisier.

> **Nota despre butonul Run:** Executorul de cod din aceasta aplicatie (Wandbox) nu poate crea sau citi fisiere de pe disc. Exemplele de mai jos iti arata sintaxa corecta C++ si explica ce s-ar intampla, dar operatiile cu fisiere nu vor produce rezultate vizibile cand apesi Run. Ca sa exersezi pe bune, ruleaza aceste programe pe calculatorul tau! Poti totusi sa apesi Run ca sa verifici ca programul se compileaza fara erori.

## Scrierea intr-un fisier cu ofstream

`ofstream` vine de la "output file stream" -- e ca `cout`, dar in loc sa afiseze pe ecran, scrie intr-un fisier:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // On your computer, this would create a file called "scores.txt"
    // ofstream outFile("scores.txt");
    // outFile << "Alice 95" << endl;
    // outFile << "Bob 87" << endl;
    // outFile << "Carlos 92" << endl;
    // outFile.close();

    // Let's show the same concept using cout (this works in the browser!)
    cout << "If we wrote to scores.txt, it would contain:" << endl;
    cout << "---" << endl;
    cout << "Alice 95" << endl;
    cout << "Bob 87" << endl;
    cout << "Carlos 92" << endl;
    cout << "---" << endl;
    cout << "The syntax is just like cout, but with ofstream!" << endl;

    return 0;
}
```

Pasii cheie pentru scrierea intr-un fisier:

1. **Include `<fstream>`** -- asta iti da instrumentele pentru fisiere.
2. **Creeaza un obiect `ofstream`** cu numele fisierului: `ofstream outFile("scores.txt");`
3. **Foloseste `<<`** pentru a scrie, exact ca la `cout`.
4. **Inchide fisierul** cu `.close()` cand ai terminat.

## Citirea dintr-un fisier cu ifstream

`ifstream` vine de la "input file stream" -- e ca `cin`, dar citeste dintr-un fisier:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // On your computer, this would read from "scores.txt"
    // ifstream inFile("scores.txt");
    // string name;
    // int score;
    // while (inFile >> name >> score) {
    //     cout << name << " scored " << score << endl;
    // }
    // inFile.close();

    // Let's demonstrate the logic using arrays (works in the browser!)
    string names[] = {"Alice", "Bob", "Carlos"};
    int scores[] = {95, 87, 92};

    cout << "Reading from a file would look like this:" << endl;
    for (int i = 0; i < 3; i++) {
        cout << names[i] << " scored " << scores[i] << endl;
    }

    return 0;
}
```

Operatorul `>>` citeste un cuvant sau un numar pe rand, la fel ca `cin >>`. Bucla `while` continua sa citeasca pana nu mai ramane nimic in fisier.

## Verificarea daca un fisier s-a deschis cu succes

Ce se intampla daca fisierul nu exista? Verifica intotdeauna inainte de a citi:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Demonstrating the pattern for checking file open
    // ifstream inFile("data.txt");
    // if (!inFile) {
    //     cout << "Error: Could not open file!" << endl;
    //     return 1;
    // }

    // The pattern is simple:
    cout << "Always check if your file opened!" << endl;
    cout << endl;
    cout << "ifstream inFile(\"data.txt\");" << endl;
    cout << "if (!inFile) {" << endl;
    cout << "    cout << \"Error!\" << endl;" << endl;
    cout << "    return 1;" << endl;
    cout << "}" << endl;
    cout << endl;
    cout << "The ! operator checks if the file failed to open." << endl;
    cout << "return 1 means 'something went wrong' (0 means success)." << endl;

    return 0;
}
```

Daca fisierul nu exista sau nu poate fi deschis, `!inFile` va fi adevarat. Returnarea lui `1` din `main` semnaleaza ca ceva a mers prost.

## Citirea linie cu linie cu getline

Uneori datele au spatii (ca numele complete). Foloseste `getline()` ca sa citesti linii intregi:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // On your computer:
    // ifstream inFile("names.txt");
    // string line;
    // int lineNumber = 1;
    // while (getline(inFile, line)) {
    //     cout << "Line " << lineNumber << ": " << line << endl;
    //     lineNumber++;
    // }
    // inFile.close();

    // Simulating reading lines from a file:
    string lines[] = {
        "Alice Johnson",
        "Bob Smith",
        "Carlos Garcia"
    };

    cout << "Reading line by line (with getline):" << endl;
    for (int i = 0; i < 3; i++) {
        cout << "Line " << (i + 1) << ": " << lines[i] << endl;
    }

    cout << endl;
    cout << "getline reads the WHOLE line, including spaces." << endl;
    cout << ">> only reads one word at a time." << endl;

    return 0;
}
```

Foloseste `getline(inFile, line)` cand datele tale au spatii. Foloseste `inFile >> variabila` cand citesti cuvinte sau numere individuale.

## Modelul complet: Scrie apoi citeste

Iata un exemplu complet care scrie date si le citeste inapoi. Acesta este modelul pe care il vei folosi cel mai des:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // === WRITING (what you'd do on your computer) ===
    // ofstream outFile("game_scores.txt");
    // outFile << 3 << endl;           // Number of players
    // outFile << "Alice 1500" << endl;
    // outFile << "Bob 2300" << endl;
    // outFile << "Carlos 1800" << endl;
    // outFile.close();
    // cout << "Scores saved!" << endl;

    // === READING (what you'd do on your computer) ===
    // ifstream inFile("game_scores.txt");
    // int count;
    // inFile >> count;
    // for (int i = 0; i < count; i++) {
    //     string name;
    //     int score;
    //     inFile >> name >> score;
    //     cout << name << ": " << score << " points" << endl;
    // }
    // inFile.close();

    // === Demo version (works in browser) ===
    cout << "=== Saving Game Scores ===" << endl;
    string names[] = {"Alice", "Bob", "Carlos"};
    int scores[] = {1500, 2300, 1800};
    int count = 3;

    cout << "Writing to game_scores.txt..." << endl;
    cout << "Saved " << count << " players." << endl;
    cout << endl;

    cout << "=== Loading Game Scores ===" << endl;
    int highScore = 0;
    string champion = "";
    for (int i = 0; i < count; i++) {
        cout << names[i] << ": " << scores[i] << " points" << endl;
        if (scores[i] > highScore) {
            highScore = scores[i];
            champion = names[i];
        }
    }
    cout << endl << "Champion: " << champion << " with " << highScore << " points!" << endl;

    return 0;
}
```

Un model frecvent este sa scrii **numarul** mai intai (cate elemente urmeaza), apoi elementele. Asta face citirea mult mai usoara pentru ca stii exact cate linii sa astepti.

## Citirea/scrierea fisierelor pentru informatica de concurs

In informatica de concurs romaneasca (ca problemele din aceasta aplicatie), programele citesc dintr-un fisier de intrare si scriu intr-un fisier de iesire. Iata modelul standard:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Standard competitive programming pattern:
    // ifstream fin("problem.in");
    // ofstream fout("problem.out");
    //
    // int n;
    // fin >> n;  // Read how many numbers
    //
    // int sum = 0;
    // for (int i = 0; i < n; i++) {
    //     int x;
    //     fin >> x;
    //     sum += x;
    // }
    //
    // fout << sum << endl;  // Write the answer
    //
    // fin.close();
    // fout.close();

    // Demo: solving a "sum of numbers" problem
    cout << "Competitive programming file I/O pattern:" << endl;
    cout << endl;

    // Simulating reading from problem.in
    int numbers[] = {10, 20, 30, 40, 50};
    int n = 5;

    cout << "Input file (problem.in) contains:" << endl;
    cout << n << endl;
    for (int i = 0; i < n; i++) {
        cout << numbers[i] << " ";
    }
    cout << endl << endl;

    // Solving the problem
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += numbers[i];
    }

    cout << "Output file (problem.out) would contain:" << endl;
    cout << sum << endl;

    return 0;
}
```

Conventia este sa folosesti `fin` si `fout` ca nume scurte de variabile pentru fluxurile de fisiere de intrare si iesire.

<!-- exercise -->
### Exercitiu: Modelul cu fisier de elevi

Scrie codul C++ care ar salva 4 nume de elevi si scorurile lor intr-un fisier, apoi le-ar citi inapoi si ar gasi cel mai mare scor. Foloseste `cout` ca sa arati ce ar contine fisierul, apoi arata rezultatul citirii.

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Student data
    string names[] = {"Alice", "Bob", "Carlos", "Diana"};
    int scores[] = {88, 95, 72, 91};
    int count = 4;

    // Show what we would WRITE to the file
    cout << "=== File contents (students.txt) ===" << endl;
    cout << count << endl;  // First line: how many students
    // TODO: Loop and print each name and score on its own line
    //       Format: "Alice 88" (name space score)

    cout << endl;

    // Show what we would READ back and find the highest
    cout << "=== Reading back ===" << endl;
    // TODO: Loop through the data, print each student,
    //       and track the highest score and who got it
    // TODO: Print "Top student: [name] with [score] points"

    return 0;
}
```
<!-- hint: Pentru scriere, parcurge si afiseaza: cout << names[i] << " " << scores[i] << endl; Pentru gasirea celui mai mare, foloseste int best = 0; si verifica daca scores[i] > scores[best] ca sa actualizezi best. -->
<!-- /exercise -->

## Referinta rapida

Iata o fisa de referinta pentru citirea/scrierea fisierelor la care poti reveni:

| Sarcina | Cod |
|---------|-----|
| Include instrumentele de fisiere | `#include <fstream>` |
| Deschide fisier pentru scriere | `ofstream outFile("name.txt");` |
| Scrie in fisier | `outFile << "text" << endl;` |
| Deschide fisier pentru citire | `ifstream inFile("name.txt");` |
| Citeste cuvant/numar | `inFile >> variable;` |
| Citeste o linie intreaga | `getline(inFile, stringVar);` |
| Verifica daca fisierul s-a deschis | `if (!inFile) { ... }` |
| Inchide fisierul | `inFile.close();` |

## Ce ai invatat

- **`ofstream`** scrie in fisiere (ca `cout` dar intr-un fisier).
- **`ifstream`** citeste din fisiere (ca `cin` dar dintr-un fisier).
- Verifica intotdeauna **daca fisierul s-a deschis** inainte de a-l folosi.
- Foloseste **`>>`** pentru a citi cuvinte/numere si **`getline()`** pentru a citi linii intregi.
- Inchide intotdeauna **fisierele** cand ai terminat cu `.close()`.
- Pentru informatica de concurs, modelul este: `ifstream fin("problem.in")` si `ofstream fout("problem.out")`.
- Executorul de cod din aceasta aplicatie nu poate crea fisiere reale, dar vei avea nevoie de aceasta abilitate pentru problemele de concurs si programele din lumea reala!

Felicitari ca ai ajuns pana aici! Acum ai o fundatie solida in C++ -- de la variabile si bucle la tablouri, siruri de caractere, structuri si citirea/scrierea fisierelor. Continua sa exersezi cu problemele din aceasta aplicatie ca sa iti ascuti abilitatile!
