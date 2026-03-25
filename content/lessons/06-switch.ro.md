---
title: 'Instrucțiunea Switch'
slug: switch
sort_order: 6
concepts: [switch, case]
summary: 'Gestionează mai multe alegeri într-un mod curat cu instrucțiunea switch.'
estimated_minutes: 8
prev_lesson: if-else
next_lesson: for-loops
lang: ro
---

## Prea multe blocuri If-Else?

În lecția trecută am folosit `if`, `else if` și `else` pentru a gestiona mai multe alegeri. Funcționează grozav, dar când ai **foarte multe** valori specifice de verificat, poate deveni dezordonat. Aici intervine `switch` -- e ca un automat de vânzare. Introduci un număr, și îți dă exact ce se potrivește.

## Primul tău Switch

Să zicem că construiești un meniu pentru un joc:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int choice;
    cout << "=== Game Menu ===" << endl;
    cout << "1. Start Game" << endl;
    cout << "2. Load Game" << endl;
    cout << "3. Settings" << endl;
    cout << "4. Quit" << endl;
    cout << "Pick an option: ";
    cin >> choice;

    switch (choice) {
        case 1:
            cout << "Starting new game..." << endl;
            break;
        case 2:
            cout << "Loading saved game..." << endl;
            break;
        case 3:
            cout << "Opening settings..." << endl;
            break;
        case 4:
            cout << "Goodbye!" << endl;
            break;
        default:
            cout << "Invalid choice! Pick 1-4." << endl;
            break;
    }
    return 0;
}
```

Iată cum funcționează:

- **`switch (choice)`** -- "Uită-te la valoarea lui `choice`"
- **`case 1:`** -- "Dacă e 1, fă asta"
- **`break;`** -- "Oprește-te aici, nu cădea mai jos la următorul case"
- **`default:`** -- "Dacă nimic nu s-a potrivit, fă asta" (ca `else`)

## Nu uita de Break!

Iată o greșeală frecventă. Uită-te ce se întâmplă dacă omiti `break`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int day = 3;

    cout << "Without break (whoops!):" << endl;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
        case 2:
            cout << "Tuesday" << endl;
        case 3:
            cout << "Wednesday" << endl;
        case 4:
            cout << "Thursday" << endl;
        case 5:
            cout << "Friday" << endl;
    }

    cout << endl << "With break (correct!):" << endl;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        case 4:
            cout << "Thursday" << endl;
            break;
        case 5:
            cout << "Friday" << endl;
            break;
    }
    return 0;
}
```

Fără `break`, codul "cade mai jos" și continuă să execute cazurile de dedesubt. E ca și cum ai cădea pe scări -- odată ce ai început, nu te oprești până la fund! Folosește mereu `break` dacă nu vrei în mod specific comportamentul de cădere.

## Switch cu Char

Switch funcționează excelent și cu valori `char`. Hai să construim un calculator simplu:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;

    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter operator (+, -, *, /): ";
    cin >> op;
    cout << "Enter second number: ";
    cin >> b;

    switch (op) {
        case '+':
            cout << a << " + " << b << " = " << a + b << endl;
            break;
        case '-':
            cout << a << " - " << b << " = " << a - b << endl;
            break;
        case '*':
            cout << a << " * " << b << " = " << a * b << endl;
            break;
        case '/':
            if (b != 0) {
                cout << a << " / " << b << " = " << a / b << endl;
            } else {
                cout << "Error: can't divide by zero!" << endl;
            }
            break;
        default:
            cout << "Unknown operator: " << op << endl;
            break;
    }
    return 0;
}
```

Observă că am pus chiar și un `if` în interiorul unuia dintre cazuri pentru a verifica împărțirea la zero. Poți combina `switch` și `if` cum ai nevoie!

## Când să folosești Switch vs If-Else

Iată un ghid rapid:

| Folosește **switch** când... | Folosește **if-else** când... |
|----------------------|----------------------|
| Verifici o variabilă contra unor valori specifice | Compari intervale (ca `score >= 90`) |
| Ai 3 sau mai multe potriviri exacte | Ai nevoie de condiții `&&` sau `\|\|` |
| Valorile sunt `int` sau `char` | Compari `string` sau `double` |

**Important:** `switch` funcționează doar cu `int`, `char` și tipuri similare de numere întregi. Nu-l poți folosi cu `string` sau `double`.

## Un exemplu distractiv: Bila Magică 8

Hai să combinăm `switch` cu `%` pentru a alege un răspuns oarecum aleatoriu:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string question;
    int luckyNumber;

    cout << "=== Magic 8 Ball ===" << endl;
    cout << "Ask a yes/no question: ";
    cin >> question;
    cout << "Now pick a number between 1 and 100: ";
    cin >> luckyNumber;

    int answer = luckyNumber % 5;

    switch (answer) {
        case 0:
            cout << "Definitely yes!" << endl;
            break;
        case 1:
            cout << "Hmm, probably not." << endl;
            break;
        case 2:
            cout << "Ask again later..." << endl;
            break;
        case 3:
            cout << "Absolutely!" << endl;
            break;
        case 4:
            cout << "I wouldn't count on it." << endl;
            break;
    }
    return 0;
}
```

Am folosit `% 5` pentru a converti orice număr într-o valoare de la 0 la 4, apoi am folosit `switch` pentru a alege un răspuns. Truc ingenios!

<!-- exercise -->
### Rândul tău: Planificator de zi

Scrie un program care cere utilizatorului un număr de zi (1-7, unde 1 este Luni). Folosește un `switch` pentru a afișa ce activitate ar trebui să facă în acea zi. De exemplu: Luni = "Scoala", Sambata = "Jocuri video", Duminica = "Timp cu familia". Nu uita de `default` pentru numere invalide!

```cpp
#include <iostream>
using namespace std;

int main() {
    int day;
    cout << "Enter day number (1=Monday, 7=Sunday): ";
    cin >> day;

    // Use a switch to print the activity for each day

    return 0;
}
```
<!-- hint: switch (day) { case 1: cout << "Scoala" << endl; break; case 2: ... și tot așa. Folosește default: pentru numere în afara 1-7. -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Notă în stele

Cere utilizatorului o notă ca literă sub formă de caracter: A, B, C, D sau F. Folosește un `switch` pe `char` pentru a afișa atâtea stele. A = 5 stele, B = 4 stele, C = 3 stele, D = 2 stele, F = 0 stele.

```cpp
#include <iostream>
using namespace std;

int main() {
    char grade;
    cout << "Enter your grade (A/B/C/D/F): ";
    cin >> grade;

    // Use switch to print the right number of stars for the grade
    // Example output: "Grade B: ****"

    return 0;
}
```
<!-- hint: switch (grade) { case 'A': cout << "Grade A: *****" << endl; break; case 'B': ... Nu uita să folosești ghilimele simple în jurul valorilor char ca 'A'. -->
<!-- /exercise -->

## Ce ai învățat

- `switch` verifică o variabilă contra mai multor valori specifice -- mai curat decât lanțuri lungi de if-else
- Fiecare `case` are nevoie de un `break;` altfel codul cade la următorul case
- `default` prinde tot ce nu s-a potrivit (ca `else`)
- Folosește `switch` pentru valori `int` și `char`; folosește `if-else` pentru intervale, string-uri și condiții complexe

Bravo că ai terminat această lecție! Acum știi două moduri de a lua decizii în codul tău. Urmează **buclele** -- cum să faci programul să repete lucruri fără să scrii același cod de mai multe ori!
