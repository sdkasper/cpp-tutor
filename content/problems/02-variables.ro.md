---
title: Variabile și Tipuri
difficulty: beginner
sort_order: 2
lang: ro
concepts: [variables, int, double, string]
hints:
  - >-
    Gândește-te ce tip de date ar trebui să conțină fiecare variabilă — un număr
    întreg? Un număr zecimal? Text?
  - 'Folosește int pentru numere întregi, double pentru numere zecimale și string pentru text.'
  - Nu uita să incluzi <string> dacă vrei să folosești variabile de tip string.
starter_code: |
  #include <iostream>
  #include <string>
  using namespace std;

  int main() {
      // Creează variabilele aici

      // Afișează-le

      return 0;
  }
solution_notes: 'Elevul trebuie să declare variabile de tip int, double și string și să le afișeze.'
---
Creează trei variabile:
1. Un **număr întreg** numit `age` (vârstă) setat la vârsta ta
2. Un **număr zecimal** numit `height` (înălțime) setat la înălțimea ta în metri (de ex., 1.65)
3. Un **text** numit `name` (nume) setat la prenumele tău

Apoi afișează fiecare pe o linie separată, astfel:
```
Name: Alex
Age: 14
Height: 1.65
```

**Sfat:** În C++, diferite tipuri de date au nevoie de tipuri diferite de variabile!
