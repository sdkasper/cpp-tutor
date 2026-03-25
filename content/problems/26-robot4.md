---
title: Robot 4
difficulty: medium
sort_order: 26
lang: ro
concepts: [2d-arrays, loops, conditions, file-io]
hints:
  - >-
    O etichetă este corectă dacă are și cifre pare și cifre impare, iar cifrele
    impare sunt în ordine crescătoare urmate de cifrele pare în ordine
    descrescătoare. Separă cifrele în pare și impare, sortează-le, și compară.
  - >-
    Pentru reparare: extrage cifrele impare (sortează crescător), apoi cifrele
    pare (sortează descrescător), și concatenează-le. Cazuri speciale: fără
    cifre impare → înlocuiește cea mai mare cifră pară cu 9; fără cifre pare →
    înlocuiește cea mai mică cifră impară cu 0.
  - >-
    Pentru cerința 1, calculează timpul total: la primul stand petrece v (sau
    v+r dacă e incorect). Între standuri adaugă t secunde. Convertește
    totalul de secunde în format oră:minut:secundă.
  - >-
    Atenție la conversia timpului: adaugă secundele la (h, m, s), apoi
    propagă carry-urile (60 secunde = 1 minut, 60 minute = 1 oră).
    Robotul termină în aceeași zi.
starter_code: |
  #include <fstream>
  #include <cstring>
  using namespace std;

  ifstream fin("robot4.in");
  ofstream fout("robot4.out");

  int main() {
      int C, N, h, m, s, t, v, r;
      fin >> C >> N >> h >> m >> s >> t >> v >> r;

      char eticheta[501][10];
      for (int i = 0; i < N; i++)
          fin >> eticheta[i];

      if (C == 1) {
          // Calculează ora de final (hf, mf, sf) după verificarea/repararea tuturor
      }

      if (C == 2) {
          // Repară etichetele incorecte și afișează toate etichetele
      }

      return 0;
  }
solution_notes: >-
  Se verifică fiecare etichetă: se separă cifrele în pare și impare, se
  verifică dacă ambele categorii sunt prezente și dacă ordinea este
  corectă (impare crescător + pare descrescător). Pentru reparare, se
  reconstruiește eticheta din cifrele sortate. Cazuri speciale: fără impare
  (cea mai mare pară → 9) sau fără pare (cea mai mică impară → 0). Pentru
  cerința 1, se acumulează timpul (v per stand + r dacă incorect + t între
  standuri) și se convertește în h:m:s.
---

Vlad a inventat un nou joc. Jocul contine `N` standuri asezate in linie dreapta. Fiecare stand are o eticheta pe care este scris un numar natural. Eticheta este considerata corecta daca numarul indeplineste urmatoarele doua conditii:

- contine atat cifre pare, cat si cifre impare;
- incepe cu cifrele impare asezate in ordine crescatoare, urmate de cifrele pare in ordine descrescatoare.

De exemplu, eticheta `137860` este corecta, dar etichetele `23541`, `135`, `64` si `3146` nu sunt corecte.

Pentru jocul sau, Vlad a construit robotul reparator care stie sa verifice numere si sa le repare, daca este necesar. Robotul reparator se deplaseaza in linie dreapta si se opreste pe rand la fiecare dintre cele `N` standuri. La fiecare stand, robotul verifica eticheta si daca nu este corecta, o "repara". Pentru a repara eticheta, robotul aranjeaza cifrele impare in ordine crescatoare, apoi, in continuare, aranjeaza cifrele pare in ordine descrescatoare; daca eticheta nu contine nicio cifra impara, cea mai mare cifra para o inlocuieste cu `9`; daca eticheta nu contine nicio cifra para, cea mai mica cifra impara o inlocuieste cu `0`. Deplasarea de la un stand la altul dureaza `t` secunde, verificarea etichetei unui stand dureaza `v` secunde, iar repararea acesteia dureaza `r` secunde. Cursa robotului se incheie dupa ce robotul a verificat toate cele `N` standuri si a reparat etichetele incorecte.

## Cerinta

Scrieti un program care citeste numarul `N` de standuri, timpul (ora `h`, minutul `m`, secunda `s`) cand robotul ajunge la primul stand, timpii `t`, `v` si `r` cu semnificatia din enunt si etichetele standurilor si care rezolva urmatoarele cerinte:

1. calculeaza si afiseaza timpul (ora, minutul si secunda) cand robotul a incheiat verificarea tuturor celor `N` standuri si repararea etichetelor incorecte;
2. repara (unde este necesar) etichetele standurilor si afiseaza etichetele celor `N` standuri la final.

## Date de intrare

Fisierul de intrare `robot4.in` contine pe prima linie numarul `C`, reprezentand cerinta care urmeaza sa fie rezolvata (`1` sau `2`). Pe linia a doua se afla numerele naturale `N`, `h`, `m`, `s`, iar pe linia a treia numerele naturale `t`, `v`, `r`, cu semnificatia din enunt. Numerele aflate pe aceeasi linie sunt separate prin cate un spatiu. Pe urmatoarele `N` linii se afla etichetele standurilor, in ordinea asezarii acestora, cate o eticheta pe o linie.

## Date de iesire

Daca `C=1`, fisierul de iesire `robot4.out` va contine o singura linie pe care vor fi scrise 3 numere naturale separate prin cate un spatiu `hf mf sf`, reprezentand ora, minutul si respectiv secunda la care robotul termina repararea.

Daca `C=2`, fisierul de iesire `robot4.out` va contine `N` linii pe care vor fi scrise etichetele standurilor, in ordinea asezarii acestora, dupa ce robotul a incheiat verificarea si repararea, cate o eticheta pe o linie.

## Restrictii si precizari

- `2 ≤ N ≤ 500`
- Etichetele standurilor au cel putin doua si cel mult noua cifre
- Robotul incepe si incheie repararea in aceeasi zi; `0 ≤ h, hf < 24`; `0 ≤ m, mf, s, sf < 60`
- Pentru rezolvarea corecta a cerintei 1 se acorda 40 de puncte
- Pentru rezolvarea corecta a cerintei 2 se acorda 60 de puncte

## Exemplul 1

`robot4.in`

```
1
3 11 20 50
7 5 15
376572
3564
123
```

`robot4.out`

```
11 21 49
```

### Explicatie

Cerinta este 1. Exista `3` standuri. La primul stand robotul ajunge la ora `11:20:50`. Primul stand are eticheta `376572`, care este incorecta, deci robotul o repara. Aici va petrece `5` secunde pentru verificare si `15` secunde pentru reparare, deci va pleca de aici la ora `11:21:10`. La al doilea stand va ajunge la ora `11:21:17`; eticheta sa `3564` este corecta deci robotul nu o va modifica; aici va petrece `5` secunde pentru verificare si pleaca la ora `11:21:22`. La al treilea stand va ajunge la ora `11:21:29`. Al treilea stand are eticheta incorecta `123`, robotul o repara, deci aici va petrece `5+15=20` secunde si ora la care incheie cursa este `11:21:49`.

## Exemplul 2

`robot4.in`

```
2
3 11 20 50
7 5 15
376572
3564
113
```

`robot4.out`

```
357762
3564
130
```

### Explicatie

Cerinta este 2. Exista `3` standuri. Primul stand are eticheta `376572`, care este incorecta, robotul o repara si aceasta devine `357762`. La al doilea stand eticheta `3564` este corecta, deci robotul nu o va modifica. Al treilea stand are eticheta incorecta `113`, robotul o repara si devine `130`.
