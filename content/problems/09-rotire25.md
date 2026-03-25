---
title: Rotire 25
difficulty: medium
sort_order: 9
lang: ro
concepts: [loops, while-loop, modulo, file-io]
hints:
  - >-
    Pentru cerința 1, nu trebuie să calculezi X^K complet. Gândește-te: ultima
    cifră a unei puteri depinde doar de ultima cifră a bazei. Ce proprietate au
    ultimele cifre ale puterilor?
  - >-
    Ultimele cifre ale puterilor se repetă ciclic (cu perioadă cel mult 4).
    Calculează K mod perioadă pentru a afla ultima cifră fără a calcula X^K.
  - >-
    Pentru cerința 2, aplică transformările pas cu pas. Dar K poate fi foarte
    mare (10^9)! Observă că numerele rezultate se vor repeta la un moment dat —
    caută ciclul.
  - >-
    Simulează transformările și memorează fiecare rezultat. Când întâlnești un
    număr deja văzut, ai găsit ciclul. Folosește K mod lungimea_ciclului pentru
    a sări direct la răspuns.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("rotire25.in");
  ofstream fout("rotire25.out");

  int main() {
      int C, X, K;
      fin >> C >> X >> K;

      if (C == 1) {
          // Determină produsul dintre ultima cifră a lui X^K și prima cifră a lui X
      }

      if (C == 2) {
          // Determină numărul rezultat după K transformări
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: ultima cifră a lui X^K se obține din ciclicitatea ultimei cifre
  (perioadă max 4). Cerința 2: simulează transformările (înmulțire, eliminare
  zerouri, oglindire) și detectează ciclul; apoi folosește K mod lungime_ciclu
  pentru a determina rezultatul final.
---
George a primit ca temă la matematică următoarea problemă. Se dă un număr `X`, asupra acestui număr se pot face următoarele transformări:

1) În această ordine (toți acești `3` pași reprezintă o transformare):

- se înmulțește numărul cu `5` (de exemplu: `X=416` devine `416*5=2080`)
- se elimină toate zerourile din număr (`2080` devine `28`)
- se oglindește numărul (`28` devine `82`)

2) În această ordine (toți acești `3` pași reprezintă o transformare):

- se înmulțește numărul cu `2` (de exemplu: `X=32` devine `32*2=64`)
- se elimină toate zerourile din număr (`64` rămâne `64`)
- se oglindește numărul (`64` devine `46`)

George trebuie să aplice alternativ cele două transformări asupra numărului `X`. Prima dată aplică transformarea `1`, apoi pe rezultatul obținut se aplică transformarea `2`, apoi pe rezultat se aplică iar transformarea `1`, apoi iar transformarea `2` și așa mai departe. George trebuie să aplice asupra numărului `X` exact `K` transformări, în ordinea descrisă mai sus.

## Cerința

Dându-se numerele `X` și `K` determinaţi:
1) Produsul dintre ultima cifră a numărului `X * X * X * ... * X` (de `K` ori) şi prima cifră a lui `X`.
2) Numărul rezultat după aplicarea celor `K` transformări.

## Date de intrare

Pe prima linie a fișierului de intrare `rotire25.in` se află trei numere separate prin câte un spațiu `C`, `X` și `K`. Dacă `C=1` se va rezolva doar prima cerință, iar dacă `C=2` se va rezolva doar a doua cerință.

## Date de ieșire

Fișierul de ieșire `rotire25.out` va conține un singur număr. Dacă `C = 1`, acest număr reprezintă rezultatul pentru prima cerinţă, iar dacă `C = 2`, acest număr reprezintă rezultatul pentru a doua cerință.

## Restricții și precizări

- `1 ≤ X ≤ 999`
- `1 ≤ K ≤ 1.000.000.000`
- Pentru teste în valoare de `29` de puncte, `C = 1`.
- Pentru teste în valoare de `71` de puncte, `C = 2`.

## Exemplul 1:

`rotire25.in`

```
1 27 3
```

`rotire25.out`

```
6
```

### Explicație

Se rezolvă cerinţa 1: `X = 27`, `K = 3`. `27 * 27 * 27 = 19683` → ultima cifră este `3`. Prima cifră a lui `27` este `2`, deci rezultatul este `2 * 3 = 6`

## Exemplul 2:

`rotire25.in`

```
2 13 3
```

`rotire25.out`

```
551
```

### Explicație

Se rezolvă cerinţa 2: `X = 13`, `K = 3`. Se fac urmatoărele transformări:

- `13 * 5 = 65`, scoatem zerourile si rotim → `56`
- `56 * 2 = 112`, scoatem zerourile și rotim → `211`
- `211 * 5 = 1055`, scoatem zerourile → `155`, rotim → `551`

## Exemplul 3:

`rotire25.in`

```
2 42 1782321
```

`rotire25.out`

```
12
```

### Explicație

Se rezolvă cerinţa 2: `X = 42`, `K = 1782321`. După ce se fac cele `K` transformări se ajunge la numărul `12`.
