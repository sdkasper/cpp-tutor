---
title: Găsește Maximul
difficulty: medium
sort_order: 5
lang: ro
concepts: [arrays, loops, for-loop, indexing]
hints:
  - >-
    Mai întâi, trebuie să stochezi numerele undeva. Un vector sau un array ar
    funcționa.
  - >-
    Pentru a găsi maximul, începe prin a presupune că primul element este cel mai mare,
    apoi compară cu fiecare alt element.
  - >-
    Folosește o buclă for pentru a parcurge fiecare element. Dacă găsești ceva mai mare decât
    maximul curent, actualizează-l.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int n;
      cout << "How many numbers? ";
      cin >> n;

      int numbers[100]; // Vector pentru a stoca numerele

      // Citește numerele

      // Găsește și afișează maximul

      return 0;
  }
solution_notes: >-
  Citește n numere în vector, inițializează max cu primul element, parcurge vectorul
  comparând fiecare element cu max
---
Scrie un program care:
1. Cere utilizatorului câte numere dorește să introducă
2. Citește atâtea numere de la utilizator
3. Găsește și afișează cel mai **mare** număr

Exemplu:
```
How many numbers? 5
Enter number 1: 12
Enter number 2: 45
Enter number 3: 7
Enter number 4: 89
Enter number 5: 23
The maximum is: 89
```

**Gândește-te:** Cu ce valoare ar trebui să începi când cauți maximul? Ce se întâmplă dacă toate numerele sunt negative?
