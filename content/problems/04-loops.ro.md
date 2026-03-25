---
title: FizzBuzz
difficulty: easy
sort_order: 4
lang: ro
concepts: [loops, for-loop, conditions, modulo]
hints:
  - >-
    Ai nevoie de o buclă care numără de la 1 la un număr. O buclă for este
    perfectă pentru asta.
  - >-
    Folosește operatorul modulo (%) pentru a verifica divisibilitatea. Dacă n % 3 == 0, atunci n
    este divisibil cu 3.
  - >-
    Verifică mai întâi divisibilitatea cu ambele numere, apoi cu 3, apoi cu 5,
    apoi doar afișează numărul.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int n;
      cout << "Enter a number: ";
      cin >> n;

      // Buclă de la 1 la n și aplică regulile FizzBuzz

      return 0;
  }
solution_notes: >-
  buclă for 1..n, verifică %15 mai întâi (FizzBuzz), apoi %3 (Fizz), apoi %5 (Buzz),
  altfel afișează numărul
---
Scrie clasicul program **FizzBuzz**! Cere utilizatorului un număr `n`, apoi pentru fiecare număr de la 1 la `n`:

- Dacă numărul este divisibil cu **3**, afișează `Fizz`
- Dacă numărul este divisibil cu **5**, afișează `Buzz`
- Dacă numărul este divisibil cu **3 și cu 5**, afișează `FizzBuzz`
- Altfel, afișează doar numărul

Exemplu pentru n = 15:
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**Indiciu:** Ordinea în care verifici condițiile contează!
