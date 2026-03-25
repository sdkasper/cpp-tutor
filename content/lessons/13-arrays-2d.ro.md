---
title: 'Tablouri 2D'
slug: arrays-2d
sort_order: 13
lang: ro
concepts: [arrays, 2d-arrays, matrix]
summary: 'Lucreaza cu grile si tabele folosind tablouri 2D.'
estimated_minutes: 12
prev_lesson: arrays
next_lesson: strings
---

## De la randuri la grile

In lectia trecuta, ai invatat despre tablouri -- un singur rand de cutii postale. Dar ce faci daca ai nevoie de o **grila**, ca un tabel, o tabla de sah sau o tabla de X si 0? Aici intervin **tablourile 2D**.

Un tablou 2D este ca un tablou de tablouri. Gandeste-te la el ca la un tabel cu **randuri** si **coloane**. Ca sa gasesti orice celula, ai nevoie de doua numere: care rand si care coloana.

## Declararea unui tablou 2D

Iata un tablou 2D cu 3 randuri si 4 coloane -- ca un mini tabel de note ale elevilor:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // 3 students, 4 test scores each
    int grades[3][4] = {
        {88, 92, 75, 80},   // Student 0
        {95, 87, 91, 100},  // Student 1
        {70, 65, 82, 78}    // Student 2
    };

    cout << "Student 1, Test 2: " << grades[1][2] << endl;
    cout << "Student 0, Test 0: " << grades[0][0] << endl;
    cout << "Student 2, Test 3: " << grades[2][3] << endl;

    return 0;
}
```

Sintaxa este `numeTablou[rand][coloana]`. La fel ca tablourile obisnuite, atat indexurile de rand cat si cele de coloana incep de la **0**.

## Vizualizarea randurilor si coloanelor

Te ajuta sa iti imaginezi tabloul ca un tabel. Iata cum arata `grades[3][4]`:

|           | Col 0 | Col 1 | Col 2 | Col 3 |
|-----------|-------|-------|-------|-------|
| **Rand 0** | 88    | 92    | 75    | 80    |
| **Rand 1** | 95    | 87    | 91    | 100   |
| **Rand 2** | 70    | 65    | 82    | 78    |

Deci `grades[1][2]` inseamna randul 1, coloana 2 = **91**.

## Bucle imbricate: Cheia tablourilor 2D

Ca sa vizitezi fiecare celula dintr-un tablou 2D, folosesti **doua bucle** -- una in interiorul celeilalte. Bucla exterioara parcurge randurile, bucla interioara parcurge coloanele:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 4; col++) {
            cout << grid[row][col] << "\t";
        }
        cout << endl;  // New line after each row
    }

    return 0;
}
```

`\t` (caracterul tab) pastreaza coloanele frumos aliniate. Bucla exterioara alege un rand, apoi bucla interioara afiseaza fiecare coloana din acel rand.

## Completarea unui tablou 2D cu un model

Poti folosi bucle imbricate pentru a completa un tablou 2D cu valori calculate, ca o tabla de inmultire:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int table[5][5];

    // Fill the multiplication table
    for (int row = 0; row < 5; row++) {
        for (int col = 0; col < 5; col++) {
            table[row][col] = (row + 1) * (col + 1);
        }
    }

    // Print it with a header
    cout << "  x |  1   2   3   4   5" << endl;
    cout << "----+-------------------" << endl;
    for (int row = 0; row < 5; row++) {
        cout << "  " << (row + 1) << " |";
        for (int col = 0; col < 5; col++) {
            if (table[row][col] < 10) cout << "  ";
            else cout << " ";
            cout << table[row][col];
        }
        cout << endl;
    }

    return 0;
}
```

## O tabla de X si 0

Tablourile 2D sunt perfecte pentru jocuri de tabla! Iata o tabla de X si 0 stocata ca caractere:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    char board[3][3] = {
        {'X', 'O', 'X'},
        {'.', 'X', 'O'},
        {'O', '.', 'X'}
    };

    // Print the board
    cout << "  0 1 2" << endl;
    for (int row = 0; row < 3; row++) {
        cout << row << " ";
        for (int col = 0; col < 3; col++) {
            cout << board[row][col] << " ";
        }
        cout << endl;
    }

    // Count X's and O's
    int xCount = 0, oCount = 0;
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            if (board[row][col] == 'X') xCount++;
            if (board[row][col] == 'O') oCount++;
        }
    }

    cout << endl;
    cout << "X has " << xCount << " marks" << endl;
    cout << "O has " << oCount << " marks" << endl;
}
```

Caracterele `.` reprezinta spatiile libere de pe tabla.

## Insumarea randurilor sau coloanelor

Uneori trebuie sa aduni un singur rand (totalul unui elev) sau o singura coloana (totalul unui test):

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int grades[3][4] = {
        {88, 92, 75, 80},
        {95, 87, 91, 100},
        {70, 65, 82, 78}
    };

    // Average for each student (sum across columns)
    for (int row = 0; row < 3; row++) {
        int total = 0;
        for (int col = 0; col < 4; col++) {
            total += grades[row][col];
        }
        cout << "Student " << row << " average: " << total / 4 << endl;
    }

    cout << endl;

    // Average for each test (sum down rows)
    for (int col = 0; col < 4; col++) {
        int total = 0;
        for (int row = 0; row < 3; row++) {
            total += grades[row][col];
        }
        cout << "Test " << col << " average: " << total / 3 << endl;
    }

    return 0;
}
```

Observa cum insumarea unui **rand** parcurge coloanele, iar insumarea unei **coloane** parcurge randurile.

<!-- exercise -->
### Exercitiu: Verificarea diagonalei la X si 0

Avand o tabla de X si 0, verifica daca diagonala principala (din stanga-sus in dreapta-jos) are toate caracterele identice. Afiseaza "Diagonal win!" daca da, sau "No diagonal win" daca nu.

```cpp
#include <iostream>
using namespace std;

int main() {
    char board[3][3] = {
        {'X', 'O', '.'},
        {'O', 'X', '.'},
        {'.', 'O', 'X'}
    };

    // Print the board first
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            cout << board[row][col] << " ";
        }
        cout << endl;
    }

    // TODO: Check if board[0][0], board[1][1], and board[2][2]
    // are all the same and not '.'
    // Print "Diagonal win!" or "No diagonal win"

    return 0;
}
```
<!-- hint: Verifica daca board[0][0] == board[1][1] SI board[1][1] == board[2][2] SI board[0][0] != '.' folosind o instructiune if. -->
<!-- /exercise -->

## Ce ai invatat

- Un **tablou 2D** este o grila (tabel) de valori cu randuri si coloane.
- Il declari cu doua dimensiuni: `int grid[randuri][coloane]`.
- Accesezi celulele cu `grid[rand][coloana]` -- ambele indexuri incep de la 0.
- **Buclele imbricate** (o bucla in interiorul altei bucle) iti permit sa vizitezi fiecare celula din grila.
- Tablourile 2D sunt excelente pentru tabele, jocuri de tabla, harti si date de tip tabel.

In continuare, vom invata despre **siruri de caractere** -- cum sa lucrezi cu text in C++!
