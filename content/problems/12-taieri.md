---
title: Tăieri
difficulty: hard
sort_order: 12
concepts: [arrays, loops, for-loop, file-io]
hints:
  - >-
    Gândește-te greedy: e mai eficient să tai barele pornind de la lungimea cea
    mai mare cerută (8) spre cea mai mică (1), sau invers? De ce?
  - >-
    Abordare greedy de sus în jos: pentru fiecare bară, alocă mai întâi cât poți
    pentru bare de lungime 8, apoi din rest pentru lungime 4, apoi 2, apoi 1.
    Resturile de la tăieri mai mari pot fi folosite pentru tăieri mai mici.
  - >-
    Atenție: o bară de lungime 8 nealocată poate fi tăiată în 2 bare de lungime
    4, sau 4 de lungime 2, etc. Ține cont de resturile acumulate la fiecare
    nivel.
  - >-
    Pentru fiecare query, simulează independent: parcurge barele și distribuie
    greedy. Dacă la final toate cele 4 cerințe sunt satisfăcute, răspunsul e 1.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("taieri.in");
  ofstream fout("taieri.out");

  int main() {
      int n;
      fin >> n;

      int bare[100001];
      for (int i = 0; i < n; i++)
          fin >> bare[i];

      int m;
      fin >> m;

      for (int q = 0; q < m; q++) {
          long long a, b, c, d;
          fin >> a >> b >> c >> d;

          // Determină dacă se pot obține a bare de 1, b de 2, c de 4, d de 8
      }

      return 0;
  }
solution_notes: >-
  Pentru fiecare query, parcurge barele și alocă greedy de la lungimea 8 în jos.
  Din fiecare bară, alocă câte bare de 8 se pot (min(bară/8, d_ramas)), restul
  se folosește pentru bare de 4, apoi 2, apoi 1. Acumulează resturile. La final,
  verifică dacă toate cerințele sunt satisfăcute.
---
Avem la dispoziție `n` bare metalice cu aceeași grosime, dar lungimi diferite. Putem alege oricare bară și să o tăiem, obținând alte două bare de lungimi mai mici. Ne dorim ca, folosind doar această operație (deci fără să le putem suda), să obținem un număr de bare de anumite lungimi date. Mai exact, dându-se un set de patru numere `a`, `b`, `c`, `d`, trebuie să decidem dacă putem obține `a` bare de lungime `1`, `b` bare de lungime `2`, `c` bare de lungime `4` și `d` bare de lungime `8`. Odată aplicată o tăiere de lungime `L` asupra unei bare, restul poate fi în continuare folosit pentru a tăia alte bare de oricare dintre lungimile dorite.

## Cerința

Cunoscând `n` – numărul de bare metalice și lungimile celor `n` bare metalice avute la dispoziție, pentru fiecare din seturile de patru numere `a b c d` date, determinați dacă, pornind de la cele `n` lungimi date se pot obține barele de lungimile dorite.

## Date de intrare

Fișierul de intrare `taieri.in` conține pe prima linie numărul natural `n`. Pe linia a doua se află cele `n` numere naturale ce reprezintă lungimile barelor inițiale. Pe linia a treia se află un număr natural `m` ce reprezintă numărul de seturi de patru numere. Pe fiecare din următoarele `m` linii se află câte patru numere naturale `a b c d` cu semnificația de mai sus. Numerele de pe aceeași linie sunt separate prin câte un spațiu.

## Date de ieșire

Fișierul de ieșire `taieri.out` va conține `m` valori `0` și `1`, separate prin câte un spațiu. Pentru fiecare set de patru numere, în ordinea apariției lor în fișierul de intrare, se scrie în fișierul de ieșire valoarea `1`, dacă se poate obține numărul dorit de bare pentru toate cele patru lungimi din setul corespunzător, respectiv `0` în
caz contrar.

## Restricții și precizări

- Lungimile barelor sunt numere naturale nenule cel mult egale cu `10.000.000`.
- `0 ≤ a, b, c, d ≤ 10.000.000`

## Exemplu:

`taieri.in`

```
5
10 12 8 3 1
3
2 3 2 2
31 0 0 0
1 13 0 1
```

`taieri.out`

```
1 1 0
```

### Explicație

La primul set – `2 3 2 2` trebuie obținute două bare de lungime `1`, trei bare de lungime `2`, două de lungime `4` și două de lungime `8`. Putem tăia bara de lungime `10` în una de `8` și una de `2`. Avem deja a doua bară de lungime `8`. Ne mai rămân astfel bare cu lungimile: `2`, `12`, `3` și `1`. Cele două bare de lungime `4` le putem tăia din cea de lungime `12`, rămânându-ne bare de lungimile `2`, `4`, `3` și `1`. Pentru cele `3` de lungime `2` putem folosi prima bară și pe a doua o tăiem în două bucăți, iar pe cele `4` de lungime `1` le putem obține folosind barele cu lungimile `3` și `1` rămase.

La al doilea set – `31 0 0 0` putem obține din prima bară dată `10` bare de lungime `1`, din a doua `12` bare de lungime `1`, din a treia încă `8` bare de lungime `1` și mai avem ultima bară deja de lungime `1`, așadar se pot obține cele `31` de bare necesare. Remarcați că nu a fost nevoie să folosim bara de lungime `3`. Se observă că nu este nevoie să obținem bare de lungimile `2`, `4`, `8`.

La al treilea set – `1 13 0 1`, oricum am tăia barele avute la dispoziție, nu putem obține întreg setul format din: o bară de lungime `1`, `13` bare de lungime `2` și o bară de lungime `8`.
