---
title: Robin Hood
difficulty: medium
sort_order: 19
concepts: [arrays, loops, conditions, arithmetic, file-io]
hints:
  - >-
    Simulează mișcarea fiecărui arcaș. Robin pleacă de la ținta 1 spre n,
    apoi se întoarce. John pleacă de la n spre 1, apoi se întoarce. La fiecare
    secundă, fiecare avansează cu o poziție. Cum determini poziția la momentul t?
  - >-
    Mișcarea este periodică cu perioada 2*(n-1). Dacă Robin trage la fiecare p
    secunde, poziția sa la momentul t*p se calculează din t*p modulo 2*(n-1).
    Același lucru pentru John cu intervalul q.
  - >-
    Pentru cerința 1, simulează tragerile ambilor arcași actualizând un vector
    de frecvențe. Concursul se termină când toate țintele au fost atinse cel
    puțin o dată. Verifică după fiecare tragere dacă s-a completat.
  - >-
    Pentru cerințele 2 și 3, folosește vectorul de frecvențe construit la
    simulare. Cerința 2: numără țintele cu frecvența 1. Cerința 3: găsește
    frecvența maximă și afișează toate țintele cu acea frecvență.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("robinhood.in");
  ofstream fout("robinhood.out");

  int main() {
      int C, n, p, q;
      fin >> C >> n >> p >> q;

      if (C == 1) {
          // Simulează tragerile și determină momentul t
          // când toate țintele au fost atinse
      }

      if (C == 2) {
          // Afișează țintele atinse exact o dată, în ordine crescătoare
      }

      if (C == 3) {
          // Afișează numărul maxim de săgeți într-o țintă
          // și țintele respective
      }

      return 0;
  }
solution_notes: >-
  Se simulează mișcarea celor doi arcași folosind poziții periodice cu perioada
  2*(n-1). La fiecare multiplu de p (Robin) sau q (John) secunde, se
  incrementează frecvența țintei curente. Simularea continuă până când toate
  cele n ținte au frecvență nenulă. Apoi se răspunde la cerință din vectorul
  de frecvențe.
---

Robin Hood si Little John au hotarat sa stabileasca care dintre ei este cel mai bun arcas. Pentru aceasta au construit `n` tinte asezate in linie dreapta si numerotate de la `1` la `n`. Au stabilit apoi distanta de tragere. Cei doi se deplaseaza prin fata tintelor in linie dreapta la distanta stabilita de comun acord.

Ei incearca sa atinga cu sagetile toate cele `n` tinte procedand in felul urmator: Robin pleaca din dreptul tintei `1` si se deplaseaza pana in dreptul tintei `n`, apoi se intoarce inapoi spre tinta `1` si asa mai departe... John pleaca din dreptul tintei `n` si se deplaseaza pana la tinta `1`, apoi se intoarce inapoi spre tinta `n` si asa mai departe... Fiecare dintre cei doi concurenti parcurge spatiul dintre doua tinte consecutive intr-o secunda. Robin trage o data dupa fiecare `p` secunde, iar John trage o data dupa fiecare `q` secunde, fiecare in tinta in dreptul careia se afla.

Cei doi pot trage simultan in aceeasi tinta sau intr-una deja atinsa. Concursul se incheie in momentul in care fiecare tinta a fost atinsa cel putin o data.

## Cerinta

1. Se cere sa se determine timpul in care se termina concursul.
2. Care sunt tintele atinse exact o data in timpul concursului.
3. Care sunt tintele atinse de cele mai multe ori in timpul concursului.

## Date de intrare

Fisierul de intrare `robinhood.in` contine pe prima linie o valoare naturala `C`, reprezentand cerinta. Pe linia a doua a fisierului de intrare se gaseste un numar natural `n`, reprezentand numarul de tinte, iar pe linia a treia doua numere naturale `p` `q`, separate printr-un spatiu, reprezentand intervalul de timp la care trag cei doi arcasi.

## Date de iesire

Daca cerinta este `1`, fisierul de iesire `robinhood.out` contine pe prima linie un numar natural `t`, reprezentand timpul in care cei doi arcasi ating toate tintele. Daca cerinta este `2` pe prima linie a fisierului de iesire se vor afisa in ordine crescatoare, separate prin cate un spatiu, numerele de ordine ale tintelor atinse o singura data. In cazul in care nici o tinta nu a fost atinsa exact o data, se va afisa valoarea `0`. Daca cerinta este `3`, pe prima linie a fisierului de iesire se va afisa un numar natural reprezentand numarul maxim de sageti care au atins o tinta, iar pe linia urmatoare se vor afisa in ordine crescatoare, separate prin cate un spatiu, numerele de ordine ale tintelor respective.

## Restrictii si precizari

- `1 ≤ C ≤ 3`
- `3 ≤ n ≤ 10.000`
- `1 ≤ p, q ≤ 500`
- Pentru toate testele exista solutie
- Pentru 53 de puncte, `C = 1`
- Pentru 21 de puncte, `C = 2`
- Pentru 26 de puncte, `C = 3`

## Exemplul 1

`robinhood.in`

```
1
5
2 3
```

`robinhood.out`

```
9
```

### Explicatie

Cu 5 tinte si intervale de tragere de 2 si 3 secunde, concursul se incheie la momentul 9.

## Exemplul 2

`robinhood.in`

```
2
5
2 3
```

`robinhood.out`

```
1 2 4 5
```

### Explicatie

Tintele care au fost atinse cu o singura sageata sunt tintele `1`, `2`, `4` si `5`.

## Exemplul 3

`robinhood.in`

```
3
5
2 3
```

`robinhood.out`

```
3
3
```

### Explicatie

Tinta `3` a fost atinsa de `3` ori: de `2` ori de Robin si o data de John.
