---
title: Perechi 4
difficulty: medium
sort_order: 18
concepts: [arrays, loops, nested-loops, file-io]
hints:
  - >-
    Gândește-te la resturile împărțirii la K. Dacă un element are restul r,
    cu ce rest trebuie să fie perechea sa pentru ca suma să fie divizibilă cu K?
  - >-
    Pentru cerința 1, calculează restul lui X la K. Apoi caută elementul minim
    din șir al cărui rest completează pe al lui X la K. Nu uita: dacă Y apare
    de mai multe ori, alegi poziția cea mai din dreapta.
  - >-
    Pentru cerința 2, numără câte elemente au fiecare rest posibil (0, 1, ...,
    K-1). Perechile se formează între restul r și restul K-r. Ce se întâmplă
    cu restul 0? Dar cu restul K/2 când K este par?
  - >-
    La fiecare grup de resturi complementare, poți forma min(count[r],
    count[K-r]) perechi. Elementele rămase nepereche trebuie eliminate.
    Atenție specială la restul 0 (se împerechează între ele) și la K/2.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("perechi.in");
  ofstream fout("perechi.out");

  int main() {
      int C, N, K;
      fin >> C >> N >> K;

      int a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          // Determină poziția cea mai din dreapta a celui mai mic Y
          // astfel încât (a[1] + Y) % K == 0
      }

      if (C == 2) {
          // Determină numărul minim de elemente de eliminat
          // pentru a forma perechi cu suma divizibilă cu K
      }

      return 0;
  }
solution_notes: >-
  Pentru cerința 1, se calculează restul necesar (K - a[1] % K) % K și se
  parcurge șirul căutând elementul minim cu acel rest, păstrând poziția cea mai
  din dreapta. Pentru cerința 2, se construiește un vector de frecvențe al
  resturilor modulo K, apoi se formează perechi între resturi complementare
  (r și K-r), tratând separat restul 0 și, dacă K e par, restul K/2.
---

Gigel a primit o sarcina interesanta: se da un sir de `N` numere naturale si un numar natural `K`. Ajutati-l pe Gigel sa rezolve urmatoarele doua cerinte.

## Cerinta

1) Fie `X` primul numar din sir. Determinati pozitia celui mai mic numar `Y` care apartine sirului, astfel incat suma celor doua numere `X` si `Y` sa fie divizibila cu `K`. Daca valoarea `Y`, cu proprietatea precizata, apare de mai multe ori in sir, se ia in considerare pozitia cea mai din dreapta. Exista cel putin un astfel de numar `Y`, care apartine sirului.

2) Determinati numarul minim de elemente care trebuie eliminate din sir astfel incat elementele ramase sa poata fi grupate in perechi disjuncte (fiecare element ramas apartine unei singure perechi), cu proprietatea ca suma celor doua valori din fiecare pereche este divizibila cu `K`.

## Date de intrare

Fisierul de intrare `perechi.in` contine:

- pe prima linie, un numar natural `C` reprezentand cerinta de rezolvat (`C` = `1` sau `C` = `2`);
- pe cea de-a doua linie, doua numere naturale `N` si `K`, cu semnificatia din enunt;
- pe cea de-a treia linie, `N` numere naturale, reprezentand elementele sirului.

Numerele aflate pe aceeasi linie sunt separate prin cate un spatiu.

## Date de iesire

Fisierul de iesire `perechi.out` contine pe prima linie un numar natural, reprezentand numarul determinat conform cerintei `C`.

## Restrictii si precizari

- `2 ≤ N ≤ 100.000`
- `1 ≤ K ≤ 100.000`
- toate elementele sirului au valori cuprinse intre `0` si `1.000.000.000`
- pentru `C = 1`, pozitia primului element `X` nu coincide cu pozitia lui `Y`
- o pereche este formata din exact doua elemente
- Pentru 31 de puncte, `C = 1`
- Pentru 69 de puncte, `C = 2`

## Exemplul 1

`perechi.in`

```
1
7 3
2 3 4 5 1 1 2
```

`perechi.out`

```
6
```

### Explicatie

`C = 1`, `N = 7`, `K = 3`, sirul este `[2, 3, 4, 5, 1, 1, 2]`, iar `X = 2`. Valorile lui `Y` din sir pentru care `(X + Y) % 3 = 0` sunt: `4` (pozitia `3`, deoarece `2 + 4 = 6`) si `1` (pozitiile `5` si `6`, deoarece `2 + 1 = 3`). Astfel, valoarea minima ceruta cu proprietatea precizata este `Y` = `1`, iar cea mai din dreapta pozitie a sa este 6.

## Exemplul 2

`perechi.in`

```
2
4 4
1 2 3 4
```

`perechi.out`

```
2
```

### Explicatie

`C = 2`, `N = 4`, `K = 4`, sirul este `[1, 2, 3, 4]`. Daca eliminam elementele `2` si `4` raman `1` si `3`, care formeaza o pereche cu suma `1 + 3 = 4`, divizibila cu `4`. Astfel, raspunsul este `2`.

## Exemplul 3

`perechi.in`

```
2
6 2
2 4 6 8 10 12
```

`perechi.out`

```
0
```

### Explicatie

`C = 2`, `N = 6`, `K = 2`, sirul este `[2, 4, 6, 8, 10, 12]`. Se pot forma perechile `(2, 4)`, `(6, 8)`, `(10, 12)`, cu sumele `6`, `14`, `22`, fiecare divizibila cu `2`. Astfel, raspunsul este `0`.
