---
title: Cartonașe 4
difficulty: hard
sort_order: 6
lang: ro
concepts: [arrays, loops, for-loop, file-io]
hints:
  - >-
    Gândește-te cum poți verifica eficient dacă primele p cartonașe conțin toate
    valorile de la 1 la p. Ce structură de date te-ar ajuta?
  - >-
    Pentru cerința 1, parcurge cartonașele de la stânga la dreapta și numără
    câte au valoarea mai mică decât valoarea de pe poziția poz.
  - >-
    Pentru cerințele 2 și 3, menține un maxim al valorilor văzute pe măsură ce
    parcurgi șirul. Dacă maximul la poziția p este egal cu p, atunci primele p
    cartonașe conțin exact valorile 1..p.
  - >-
    Pentru cerința 3, compară maximul cu p: dacă max == p, ai toate valorile
    1..p (cerința 2). Dacă max == p+1 sau lipsește exact una, ai p-1 valori din
    1..p (cerința 3).
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("cartonase.in");
  ofstream fout("cartonase.out");

  int main() {
      int C, N;
      fin >> C >> N;

      int a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          int poz;
          fin >> poz;
          // Determină r conform cerinței 1
      }

      if (C == 2) {
          // Determină toate valorile p conform cerinței 2
      }

      if (C == 3) {
          // Determină toate valorile p conform cerinței 3
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: parcurge de la 1 la poz-1, numără câte a[i] < a[poz], r = ultimul
  index unde toate precedentele sunt mai mici. Cerințele 2/3: menține maximul
  prefixului; dacă max[p]==p atunci primele p conțin exact 1..p (cerința 2);
  pentru cerința 3, verifică dacă lipsește exact o valoare din 1..p.
---
Maria are `N` cartonașe numerotate de la `1` la `N`, pe care se află înscrise, nu neapărat în ordine, toate valorile naturale distincte de la `1` la `N`.

## Cerința

Maria formulează lui Petru cerințe de următoarele tipuri:

1) Îți spun un număr `poz` și trebuie să determini cartonașul numerotat cu cea mai mare valoare `r` astfel încât primele `r` cartonașe din șir au înscrisă o valoare strict mai mică decât cea scrisă pe cartonașul numerotat cu `poz`. Dacă nu există niciun astfel de cartonaș, pentru `r` se stabilește valoarea `0`.
2) Determină toate valorile `p` cu proprietatea că pe primele `p` cartonașe se află înscrise toate numerele naturale de la `1` la `p`.
3) Determină toate valorile `p` cu proprietatea că pe primele `p` cartonașe se află înscrise exact `p-1` dintre numerele naturale de la `1` la `p`.

## Date de intrare

Fișierul de intrare `cartonase.in` conține:

- pe prima linie numărul `C`, reprezentând cerința de rezolvat (`1`, `2` sau `3`);
- pe linia a doua se află numărul `N`, cu semnificația din enunț;
- pe linia a treia, se află, separate prin câte un spațiu, `N` valori naturale distincte, cuprinse între `1` și `N`, reprezentând valorile înscrise pe cartonașe în ordinea din șir, după amestecare;
- dacă `C = 1`, pe linia a patra se află valoarea `poz`.

## Date de ieșire

Fișierul de ieșire `cartonase.out` va conține:

- Dacă `C = 1`, în fișierul de ieșire se va afla valoarea `r` cu semnificația din enunț.
- Dacă `C = 2` sau `C = 3`, în fișierul de ieșire se vor afișa, separate prin câte un spațiu, valorile lui `p` care îndeplinesc condițiile din cerința corespunzătoare, în ordine crescătoare. Se garantează că există cel puțin o astfel de valoare.

## Restricții și precizări

- `1 ≤ C ≤ 3`
- `1 ≤ N ≤ 100.000`
- `1 ≤ poz ≤ N`
- Pentru 23 de puncte, `C = 1`
- Pentru 41 de puncte, `C = 2`
- Pentru 36 de puncte, `C = 3`

## Exemplul 1

`cartonase.in`

```
1
6
3 1 6 2 4 5
5
```

`cartonase.out`

```
2
```

### Explicație

`C = 1`, `poz = 5`, pe cartonașul `5` se află valoarea `4`. Primele două cartonașe din șirul dat au înscrise valori mai mici decât `4` iar al treilea are o valoare mai mare.

## Exemplul 2

`cartonase.in`

```
2
6
3 1 2 6 4 5
```

`cartonase.out`

```
3 6
```

### Explicație

`C = 2`, pe primele `3` cartonașe se află valorile `1`, `2`, `3` și, de asemenea, pe primele `6` cartonașe se află valorile `1`, `2`, `3`, `4`, `5`, `6`.

## Exemplul 3

`cartonase.in`

```
3
6
3 1 2 6 5 4
```

`cartonase.out`

```
1 2 4 5
```

### Explicație

`C = 3`, pe primul cartonaș (`p = 1`) se află `p - 1 = 0` valori conform cerinței. Pe primele `p = 2` cartonașe se află `p - 1 = 1` valori conform cerinței (1). Pe primele `p = 3` cartonașe se află `3` valori conform cerinței (1, 2, 3). Pe primele `p = 4` cartonașe se află `p - 1 = 3` valori conform cerinței `(1, 2, 3)`. Pe primele `p = 5` cartonașe se află `p - 1 = 4` valori conform cerinței `(1, 2, 3, 5)`. Pe primele `p = 6` cartonașe se află `6` valori conform cerinței `(1, 2, 3, 4, 5, 6)`.

**Gândește-te:** Cum poți determina eficient, pentru fiecarePrefix de lungime p, dacă conține toate valorile de la 1 la p? Ce informație trebuie să menții pe măsură ce parcurgi șirul?
