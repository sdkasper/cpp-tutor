---
title: Ktlon
difficulty: medium
sort_order: 7
concepts: [arrays, loops, for-loop, file-io, conditions]
hints:
  - >-
    Gândește-te cum poți determina câștigătorul unei probe. Ce condiție trebuie
    îndeplinită pentru ca un jucător să fie „mai bun" decât toți adversarii?
  - >-
    Sortează punctajele fiecărei echipe descrescător. Apoi compară maximul unei
    echipe cu maximul celeilalte pentru a determina M.
  - >-
    Pentru cerința 2, odată ce ai determinat M, suma celor mai mari M punctaje
    ale echipei câștigătoare minus suma celor mai mari M ale celeilalte echipe
    îți dă numărul de stele.
  - >-
    Folosește un vector sortat descrescător pentru fiecare echipă. Compară
    elementele din vârful fiecărui vector pentru a număra câți jucători ai
    câștigătorului au depășit toate punctajele adversarilor.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("ktlon.in");
  ofstream fout("ktlon.out");

  int main() {
      int C, n, k;
      fin >> C >> n >> k;

      if (C == 1) {
          // Determină numărul de probe câștigate de echipa R
      }

      if (C == 2) {
          // Determină numărul de stele al echipei câștigătoare
      }

      return 0;
  }
solution_notes: >-
  Pentru fiecare probă, sortează punctajele descrescător. Determină maximul
  fiecărei echipe; echipa al cărei jucător depășește toate punctajele adversare
  câștigă proba. M = numărul de jucători ai câștigătorului cu punctaj strict mai
  mare decât maximul adversarului. Stele = suma top M câștigător - suma top M
  perdant.
---
Două echipe, **F** și **R**, formate din `n` jucători fiecare, au participat în cadrul noii ediții ktlon la `k` probe. După fiecare probă s-au înregistrat în registrul ktlon `2*n` valori: primele `n` reprezintă numărul de puncte câștigate în cadrul probei de jucătorii echipei F și următoarele `n` reprezintă numărul de puncte câștigate în cadrul probei de jucătorii echipei R. Pentru ca o echipă să câștige o probă este necesar ca cel puțin unul din jucătorii săi să obțină un număr de puncte strict mai mare decât fiecare din punctajele obținute de către jucătorii celeilalte echipe. Echipa câștigătoare a probei primește un număr de stele. Pentru a stabili numărul de stele primite, mai întâi se determină numărul `M` de jucători care au obținut un număr de puncte strict mai mare decât fiecare din punctajele obținute de jucătorii celeilalte echipe. Apoi echipa câștigătoare primește un număr de stele egal cu diferența dintre suma celor mai mari `M` punctaje obținute de jucătorii echipei câștigătoare și suma celor mai mari `M` punctaje obținute de jucătorii celeilalte echipe.

De exemplu, dacă jucătorii celor două echipe au obținut punctajele `(8, 5, 8, 3, 9, 7)` și `(5, 7, 5, 4, 5, 1)`, atunci `M = 3` deoarece trei punctaje ale jucătorilor echipei F `(8, 8, 9)` sunt mai mari decât toate punctajele obținute de jucătorii echipei R. Echipa F câștigă proba și primește `8 stele = (9 + 8 + 8) - (7 + 5 + 5)`. Dacă niciun jucător al niciunei echipe nu obține un număr de puncte strict mai mare decât toate punctajele obținute de jucătorii celeilalte echipe, proba se încheie cu remiză și nicio echipă nu primește nicio stea (`M = 0`).

Competiția este câștigată de echipa care acumulează un număr maxim de stele la finalul tuturor probelor.

## Cerința

Cunoscând `n` – numărul de jucători din fiecare echipă, `k` – numărul de probe și pentru fiecare probă punctajele obținute de cei `2 * n` jucători ai celor două echipe, determinați:

1\. numărul de probe câștigate de echipa R;
2\. numărul de stele obținut de echipa câștigătoare.

## Date de intrare

Fișierul de intrare `ktlon.in` conține pe prima linie un număr `C` reprezentând cerința care trebuie să fie rezolvată (`1` sau `2`). Pe a doua linie se află două numere naturale `n` și `k`, care reprezintă numărul de jucători ai fiecărei echipe, respectiv numărul de probe, iar pe fiecare din următoarele `k` linii, câte `2 * n` numere naturale: primele `n` reprezintă numărul de puncte câștigate în cadrul probei curente de jucătorii echipei F și următoarele `n` reprezintă numărul de puncte câștigate în cadrul probei curente de jucătorii echipei R. Numerele de pe aceeași linie sunt separate prin câte un spațiu.

## Date de ieșire

Dacă `C = 1`, fișierul de ieșire `ktlon.out` va conține numărul de probe câștigate de echipa R. Dacă `C = 2`, fișierul de ieșire va conține numărul de stele obținute de echipa câștigătoare.

## Restricții și precizări

- `1 ≤ C ≤ 2`
- `1 ≤ n ≤ 10.000`
- `1 ≤ k ≤ 50`
- Punctajele obținute de concurenți sunt numere naturale cuprinse între `0` și `200.000` inclusiv.

## Exemplul 1:

`ktlon.in`

```
1
3 4
6 8 3 7 7 6
1 2 3 4 5 3
1 5 3 4 5 2
1 5 3 4 5 2
```

`ktlon.out`

```
1
```

### Explicație

Se rezolvă cerința `1`. Prima probă este câștigată de echipa F deoarece există un jucător care a obținut mai multe puncte (`8`) decât numărul de puncte câștigat de fiecare din jucătorii echipei R (`7`, `7`, `6`). A doua probă este câștigată de echipa R deoarece există doi jucători care au obținut mai multe puncte (`4` respectiv `5`) decât numărul de puncte câștigate de fiecare din jucătorii echipei F (`1`, `2`, `3`). A treia probă s-a încheiat cu remiză deoarece niciun jucător al niciunei echipe nu obține un număr de puncte strict mai mare decât toate punctajele obținute de jucătorii celeilalte echipe. A patra probă s-a încheiat tot cu remiză, deoarece toți jucătorii au obținut exact aceleași punctaje ca și la proba a treia. Răspunsul este `1` deoarece echipa R a câștigat o singură probă.

## Exemplul 2:

`ktlon.in`

```
2
3 3
8 8 5 7 7 7
1 2 3 3 5 3
4 1 2 6 5 1
```

`ktlon.out`

```
7
```

### Explicație

Se rezolvă cerința `2`. Echipa F câștigă prima probă și primește `2` stele (`M = 2`, `(8 + 8) - (7 + 7) = 2`).
Echipa R câștigă a doua probă și primește `2` stele (`M = 1`, `5 - 3 = 2`). Echipa R câștigă a treia probă și primește `5` stele (`M = 2`, `(6 + 5) - (4 + 2) = 5`). În total, echipa F a primit `2` stele iar echipa R a primit `7` stele. Competiția este câștigată de echipa R cu `7` stele.
