---
title: Calculator de Note
difficulty: easy
sort_order: 3
lang: ro
concepts: [if-else, conditions, input, cin]
hints:
  - >-
    Va trebui să verifici scorul față de mai multe praguri. Începe cu cea mai
    mare notă mai întâi.
  - 'Folosește if, else if și else pentru a verifica intervalele. De exemplu: if (score >= 90) ...'
  - Asigură-te că condițiile tale nu se suprapun și acoperă toate scorurile posibile.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int score;
      cout << "Enter your score (0-100): ";
      cin >> score;

      // Adaugă logica if/else aici

      return 0;
  }
solution_notes: >-
  Lanț de if/else if/else care verifică intervalele scorului: >=90 A, >=80 B, >=70 C, >=60
  D, altfel F
---
Scrie un program care cere un scor la un test (0-100) și afișează nota corespunzătoare:

| Scor | Notă |
|------|------|
| 90-100 | A |
| 80-89 | B |
| 70-79 | C |
| 60-69 | D |
| Sub 60 | F |

Exemplu:
```
Enter your score (0-100): 85
Your grade: B
```

**Provocare:** Ce se întâmplă dacă cineva introduce un număr peste 100 sau sub 0? Poți gestiona și aceste cazuri?
