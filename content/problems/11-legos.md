---
title: Legos
difficulty: medium
sort_order: 11
lang: ro
concepts: [loops, arithmetic, conditions, file-io]
hints:
  - >-
    Pentru cerința 1, o fundație este un pătrat cu latura cel puțin 3. Trebuie
    să găsești cel mai mare pătrat perfect care se potrivește în P piese. Ce
    operație matematică te ajută?
  - >-
    Caută cel mai mare L astfel încât L*L ≤ P și L ≥ 3. Poți folosi sqrt(P) și
    ajusta rezultatul.
  - >-
    Pentru cerința 2, un turn cu h etaje și latura L are: (h+1) etaje pătrate
    (L*L fiecare) + h seturi de 4 piloni. Total = (h+1)*L*L + h*4. Încearcă
    fiecare L ≥ 3 și maximizează h.
  - >-
    Pentru cerința 3, numără câte dreptunghiuri cu laturile a ≥ 3 și b ≥ 3 au
    aria exact P. Parcurge divisorii lui P de la 3 la sqrt(P) și verifică dacă
    P/d ≥ 3.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("legos.in");
  ofstream fout("legos.out");

  int main() {
      int C;
      long long P;
      fin >> C >> P;

      if (C == 1) {
          // Determină numărul de piese din cea mai mare fundație
      }

      if (C == 2) {
          // Determină numărul de piese din cel mai înalt turn
      }

      if (C == 3) {
          // Determină numărul de terenuri de legoball
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: cel mai mare L cu L*L ≤ P și L ≥ 3, răspuns = L*L. Cerința 2:
  pentru fiecare L de la 3 la sqrt(P), calculează h maxim din (h+1)*L*L + h*4 ≤
  P, reține maximul de h și la egalitate maximul de piese. Cerința 3: numără
  perechile (a, b) cu a*b = P, a ≥ 3, b ≥ 3; fiecare pereche cu a ≠ b se numără
  de 2 ori.
---
Un joc de lego are `P` piese care sunt cuburi identice. Dorel se joacă cu ele pentru a construi diverse jucării, dar pentru aceasta are nevoie de ajutorul vostru.

## Cerințe

Cunoscându-se numărul de piese `P` pe care le are, Dorel vrea să știe:
1) Numărul de piese din care poate să construiască cea mai mare fundație. O fundație are forma unui pătrat și are latura formată din cel puțin 3 piese (ca în figura 1).
2) Numărul de piese din cel mai înalt turn care se poate construi. Un turn din piese de lego Dorel îl construiește astfel: la început va face un pătrat pe care îl numește parter (sau etajul 0). Peste acesta va pune 4 piese în colțuri pe care le numește piloni. Apoi, peste piloni, va pune un nou pătrat pe care îl numește etaj 1. Peste acesta va pune din nou piloni, peste care va pune etajul 2. Și va continua, până la ultimul etaj. Peste ultimul etaj **nu** pune piloni. Toate etajele construite au același număr de piese și au forma de pătrat cu latura de cel puțin 3 piese. Înălțimea unui turn este dată de numărul de etaje. Pilonii **nu** sunt considerați etaje, aceștia fac parte din structura turnului. Dacă se pot construi mai multe turnuri având aceeași înălțime, atunci Dorel vrea să știe numărul de piese al turnului cu cele mai multe piese.(Vezi figura 2).
3) Numărul de terenuri de legoball care se pot construi folosind **toate** piesele de lego. Un teren de legoball are forma unui dreptunghi în care fiecare latură este formată din cel puțin 3 piese (ca în figura 3).

*Figura 1: O fundație sub formă de pătrat (exemplu: 5×5 = 25 piese).*

*Figura 2: Un turn format din etaje pătrate și piloni în colțuri între etaje.*

*Figura 3: Un teren de legoball sub formă de dreptunghi (exemplu: 3×6 = 18 piese).*

## Date de intrare

Fișierul de intrare `legos.in` conține două numere naturale nenule `C` și `P`, separate printr-un singur spațiu liber, reprezentând cerința respectiv numărul de piese de lego pe care le are Dorel.

## Date de ieșire

Pentru fiecare din cele 3 cerințe fișierul `legos.out` va conține un singur număr care reprezintă răspunsul la acea cerință.

## Restricții și precizări

- `1 ≤ C ≤ 3`
- `1 ≤ P ≤ 1.000.000.000`
- Pentru cerința 2 un turn poate fi format doar din parter, dar nu poate fi format din parter și piloni (deoarece ar
	avea piloni peste ultimul etaj).
- Pentru 31 de puncte, `C = 1`
- Pentru 33 de puncte, `C = 2`
- Pentru 36 de puncte, `C = 3`

## Exemplul 1:

`legos.in`

```
1 29
```

`legos.out`

```
25
```

### Explicație

Se rezolvă cerința 1. Sunt `29` piese de lego. Cea mai mare fundație ce poate fi construită are dimensiunea `5 x 5`, este formată din 25 de piese.

## Exemplul 2:

`legos.in`

```
2 19
```

`legos.out`

```
16
```

### Explicație

Se rezolvă cerința 2. Sunt `19` piese de lego. Cel mai înalt turn care poate fi făcut este format doar din parter. Există două astfel de turnuri, unul are `9` piese iar celălalt `16`. Dintre acestea mai multe sunt în turnul de `16` piese.

## Exemplul 3:

`legos.in`

```
3 18
```

`legos.out`

```
2
```

### Explicație

Se rezolvă cerința 3. Sunt două moduri de a construi un teren de legoball. Acestea au dimensiunile `3 x 6`, respectiv `6 x 3`.
