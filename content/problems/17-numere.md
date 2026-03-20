---
title: Numere
difficulty: hard
sort_order: 17
hints:
  - >-
    Începe prin a identifica toate prefixele valide de 3 cifre. Care sunt
    pătratele perfecte de două cifre unde cifrele au parități diferite, și ce
    cifre prime pot urma pe poziția a treia?
  - >-
    După ce ai fixat primele 3 cifre, fiecare cifră următoare trebuie să aibă
    paritate diferită de predecesorul său. Câte alegeri ai la fiecare pas?
    (Hint: sunt 5 cifre pare și 5 cifre impare.)
  - >-
    Pentru cerința 1, odată ce știi prefixele valide de 3 cifre, poți calcula
    câte extensii există fără a le genera pe toate. Dacă ai P prefixe valide și
    N-3 cifre rămase, fiecare cu 5 alegeri, câte numere obții?
  - >-
    Pentru cerința 2, trebuie să găsești cel mai apropiat număr valid de X.
    Generează toate numerele valide cu același număr de cifre ca X (sunt
    P × 5^(len-3), un număr gestionabil pentru len ≤ 18) și alege-l pe cel cu
    distanța minimă.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("numere.in");
  ofstream fout("numere.out");

  int main() {
      int C;
      fin >> C;

      if (C == 1) {
          int N;
          fin >> N;
          // Determină câte numere de N cifre îndeplinesc cele trei condiții
      }

      if (C == 2) {
          long long X;
          fin >> X;
          // Determină cel mai apropiat număr de X care îndeplinește condițiile
      }

      return 0;
  }
solution_notes: >-
  Pătratele perfecte de două cifre cu parități alternante sunt: 16 (impar-par),
  25 (par-impar), 36 (impar-par), 49 (par-impar), 81 (par-impar). Se exclude
  64 (par-par). Cifrele prime sunt: 2, 3, 5, 7. Pentru fiecare pătrat perfect,
  a treia cifră trebuie să fie primă și de paritate opusă celei de-a doua cifre.
  Rezultă 9 prefixe valide de 3 cifre. Pentru cerința 1: fiecare prefix se
  extinde cu N-3 cifre, fiecare având 5 variante (alternând paritatea).
  Răspunsul este 9 × 5^(N-3). Pentru cerința 2: generează toate numerele
  valide cu același număr de cifre ca X și alege-l pe cel cu |număr - X| minim
  (la egalitate, cel mai mic).
---
Se consideră numerele naturale care au cel puțin 3 cifre și care respectă **simultan** următoarele condiții:

1. Primele două cifre (cele mai semnificative) formează un **pătrat perfect** (de exemplu: 16, 25, 36, 49, 64, 81).
2. A treia cifră este un **număr prim** (2, 3, 5 sau 7).
3. Oricare două cifre **alăturate** au **parități diferite** (una pară și una impară).

## Cerința

Fișierul de intrare `numere.in` conține pe prima linie un număr natural `C` care reprezintă cerința (1 sau 2).

- Dacă `C = 1`, pe a doua linie se află un număr natural `N` (3 ≤ N ≤ 29). Determinați **câte** numere naturale de exact `N` cifre îndeplinesc simultan cele trei condiții de mai sus.
- Dacă `C = 2`, pe a doua linie se află un număr natural `X` care are cel puțin 3 cifre și cel mult 18 cifre. Determinați cel mai apropiat număr de `X` (în valoare absolută) care are **același număr de cifre** ca `X` și îndeplinește cele trei condiții. Dacă există două numere la aceeași distanță, se alege cel **mai mic**.

## Date de intrare

Fișierul de intrare `numere.in` conține:
- Pe prima linie, numărul natural `C` (1 sau 2).
- Pe a doua linie, `N` (dacă `C = 1`) sau `X` (dacă `C = 2`).

## Date de ieșire

Fișierul de ieșire `numere.out` conține un singur număr:
- Dacă `C = 1`: numărul de numere de `N` cifre care respectă toate condițiile.
- Dacă `C = 2`: cel mai apropiat număr valid de `X`.

## Restricții și precizări

- `C ∈ {1, 2}`
- Pentru `C = 1`: `3 ≤ N ≤ 29`
- Pentru `C = 2`: `X` are între 3 și 18 cifre
- Pătratele perfecte de două cifre sunt: 16, 25, 36, 49, 64, 81
- Cifrele prime sunt: 2, 3, 5, 7
- Două cifre alăturate trebuie să aibă parități diferite (de exemplu, dacă o cifră este pară, următoarea trebuie să fie impară, și invers)
- Pentru `C = 2`, dacă există două numere la aceeași distanță față de `X`, se afișează cel mai mic

## Exemplu 1

`numere.in`

```
1
3
```

`numere.out`

```
9
```

### Explicație

Pătratele perfecte de două cifre unde cele două cifre au parități diferite sunt: **16** (1-impar, 6-par), **25** (2-par, 5-impar), **36** (3-impar, 6-par), **49** (4-par, 9-impar), **81** (8-par, 1-impar). Se exclude 64 deoarece 6 și 4 sunt ambele pare.

Pentru fiecare, a treia cifră trebuie să fie primă (2, 3, 5 sau 7) și de paritate opusă celei de-a doua cifre:

| Prefix | c2 | c3 trebuie | Cifre prime valide | Numere |
|--------|----|------------|--------------------|--------|
| 16 | 6 (par) | impară | 3, 5, 7 | 163, 165, 167 |
| 25 | 5 (impar) | pară | 2 | 252 |
| 36 | 6 (par) | impară | 3, 5, 7 | 363, 365, 367 |
| 49 | 9 (impar) | pară | 2 | 492 |
| 81 | 1 (impar) | pară | 2 | 812 |

Total: 3 + 1 + 3 + 1 + 1 = **9** numere.

## Exemplu 2

`numere.in`

```
1
4
```

`numere.out`

```
45
```

### Explicație

Fiecare număr valid de 3 cifre (sunt 9) se poate extinde cu o a patra cifră care are paritate diferită de a treia. Există 5 cifre de fiecare paritate (pare: 0, 2, 4, 6, 8; impare: 1, 3, 5, 7, 9), deci fiecare prefix de 3 cifre se extinde în 5 moduri. Total: 9 × 5 = **45**.

## Exemplu 3

`numere.in`

```
2
200
```

`numere.out`

```
163
```

### Explicație

Cel mai apropiat număr valid de 3 cifre față de 200 este 163 (distanța |200 − 163| = 37). Următorul candidat mai apropiat ar fi 252 (distanța |200 − 252| = 52), deci 163 este răspunsul.
