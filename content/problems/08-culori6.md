---
title: Culori 6
difficulty: medium
sort_order: 8
lang: ro
concepts: [2d-arrays, loops, nested-loops, file-io, strings]
hints:
  - >-
    Pentru cerința 1, gândește-te cum verifici dacă un rând are toate
    pătrățelele alăturate de culori diferite. Ce comparație faci la fiecare pas?
  - >-
    Parcurge fiecare rând și compară elementul curent cu cel precedent. Dacă
    niciodată nu sunt egale, rândul are proprietatea cerută. Menține lungimea
    maximă și un contor.
  - >-
    Pentru cerința 2, trebuie să compari numere formate prin concatenarea
    cifrelor. Atenție: nu poți converti direct la int dacă sunt multe cifre —
    compară ca șiruri de caractere.
  - >-
    La compararea ca șiruri: mai întâi compară lungimea (mai lung = mai mare),
    iar la lungimi egale compară lexicografic.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("culori.in");
  ofstream fout("culori.out");

  int main() {
      int C, N;
      fin >> C >> N;

      if (C == 1) {
          // Determină Lmax și Kmax
      }

      if (C == 2) {
          // Determină cel mai mare număr format din cifrele unui rând
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: pentru fiecare rând, verifică dacă oricare două elemente
  consecutive sunt diferite; dacă da, compară lungimea cu Lmax. Cerința 2:
  concatenează cifrele fiecărui rând într-un string, apoi compară stringurile
  (lungime, apoi lexicografic) pentru a găsi maximul.
---
Pe o foaie a unui caiet de matematică sunt `N` rânduri de pătrățele pe care Andrei le-a numerotat de sus în jos cu valori de la `1` la `N`. Pe fiecare rând, Andrei colorează unul sau mai multe pătrățele având la dispoziție un set de `9` creioane de culori diferite, culori ce sunt codificate cu valori distincte de la `1` la `9`. Pentru fiecare rând al caietului, Andrei stabilește un număr de pătrățele alăturate ce le va colora și procedează astfel: alege un creion cu care colorează primul pătrățel (cel din stânga foii sale), apoi procedează la fel pentru al doilea pătrățel și așa mai departe până termină de colorat numărul de pătrățele stabilit de el pentru rândul respectiv (pot exista două sau mai multe pătrățele colorate la fel). Lungimea unui rând este astfel determinată de numărul tuturor pătrățelelor colorate de pe acel rând.

*Figura: Un caiet cu rânduri de pătrățele colorate cu cifrele 1-9, numerotate de sus în jos.*

## Cerința

Cunoscând numărul `N` de rânduri cu pătrățele, numărul de pătrățele colorate de pe fiecare rând și culoarea fiecărui pătrățel, scrieți un program care să determine:

- `Lmax` si `Kmax`, două numere naturale, unde `Lmax` reprezintă lungimea maximă unui rând ce are proprietatea că oricare două pătrățele alăturate au culori diferite, iar `Kmax` reprezintă câte astfel de rânduri sunt pe foaie.
- Cel mai mare număr natural ce se poate forma prin lipirea tuturor cifrelor corespunzătoare culorilor de pe același rând, parcurse de la stânga la dreapta.

## Date de intrare

Fișierul de intrare `culori.in` conține pe prima linie două numere naturale `C` și `N`, unde `C` reprezintă numărul cerinţei şi poate avea valorile `1` sau `2`, iar `N` reprezintă numărul rândurilor din caiet colorate de Andrei. Pe fiecare din următoarele `N` linii, numere naturale despărțite prin câte un spațiu. Fiecare linie corespunde unui rând al foii de caiet, în ordinea numerotării rândurilor. Primul număr de pe fiecare linie reprezintă numărul pătrățelelor colorate de Andrei pe rândul respectiv, iar apoi următoarele valori reprezintă codurile culorilor folosite pentru colorarea pătrățelelor de pe rândul respectiv, fiecare corespunzând câte unui pătrățel, în ordine, începând cu primul de pe acel rând (cel din stânga), până la ultimul de pe acel rând (cel din dreapta).

## Date de ieșire

Fișierul de ieșire `culori.out` va conține pe prima linie:

- pentru cerința `1`, două numere naturale `Lmax` și `Kmax`, în această ordine și despărțite printr-un spațiu;
- pentru cerința `2`, un singur număr natural determinat conform cerinței.

## Restricții și precizări

- `1 ≤ N ≤ 10.000`;
- `1 ≤ numărul pătrățelelor colorate de pe fiecare rând ≤ 500`;
- pentru rezolvarea corectă a primei cerințe se acordă `27` de puncte, iar pentru rezolvarea corectă a celei de-a doua cerințe se acordă `73` de puncte;

## Exemplul 1:

`culori.in`

```
1 7
6 4 2 3 1 1 1
5 7 2 3 9 3
2 4 4
6 2 2 7 1 7 7
1 3
4 9 9 9 9
5 7 2 7 2 7
```

`culori.out`

```
5 2
```

### Explicație

Exemplul corespunde desenului din imaginea de mai sus. Se va rezolva cerința `1`. Rândurile `2`, `5` și `7` au proprietatea din cerință. Lungimea rândului `2` este `5`, a rândului `5` este `1`, iar a rândului `7` este `5`, deci lungimea maximă a unui rând este `5` și sunt `2` rânduri de această lungime. `Lmax=5` și `Kmax=2`.

## Exemplul 2:

`culori.in`

```
2 7
6 4 2 3 1 1 1
5 7 2 3 9 3
2 4 4
6 2 2 7 1 7 7
1 3
4 9 9 9 9
5 7 2 7 2 7
```

`culori.out`

```
423111
```

### Explicație

Se va rezolva cerința 2. Numerele naturale construite din cifrele fiecărui rând sunt: `423111`, `72393`, `44`, `227177`, `3`, `9999` și `72727`. Cel mai mare dintre ele este `423111`.
