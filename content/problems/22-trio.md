---
title: Trio
difficulty: medium
sort_order: 22
concepts: [arrays, loops, nested-loops, file-io]
hints:
  - >-
    Pentru a compara piese, codifică fiecare piesă. Două piese sunt identice
    dacă au aceleași cifre în aceeași ordine sau în ordine inversă. Poți
    normaliza fiecare piesă alegând minimul dintre (C1,C2,C3) și (C3,C2,C1).
  - >-
    Două piese sunt „prietene" dacă conțin exact aceleași cifre, indiferent
    de ordine. Sortează cele trei cifre ale fiecărei piese și folosește
    combinația sortată ca cheie de grup.
  - >-
    Pentru cerința 1, numără frecvența fiecărei piese normalizate (identice)
    și raportează maximul. Pentru cerința 2, numără câte chei distincte de
    „prietenie" (cifre sortate) există.
  - >-
    Pentru cerința 3, trebuie să găsești cea mai lungă subsecvență de piese
    consecutive unde prima și ultima sunt prietene. Fixează fiecare piesă ca
    start și caută cea mai îndepărtată piesă prietenoasă cu ea. Optimizează
    cu un map care reține ultima apariție a fiecărei chei de prietenie.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("trio.in");
  ofstream fout("trio.out");

  int main() {
      int C, N;
      fin >> C >> N;

      int c1[100001], c2[100001], c3[100001];
      for (int i = 1; i <= N; i++)
          fin >> c1[i] >> c2[i] >> c3[i];

      if (C == 1) {
          // Determină numărul maxim M de piese identice cu o piesă aleasă
      }

      if (C == 2) {
          // Determină numărul de grupuri de piese prietene
      }

      if (C == 3) {
          // Determină lungimea maximă a unei secvențe consecutive
          // unde prima și ultima piesă sunt prietene
      }

      return 0;
  }
solution_notes: >-
  Se normalizează piesele: pentru identitate se folosește min((C1,C2,C3),
  (C3,C2,C1)), iar pentru prietenie se sortează cele 3 cifre. Cerința 1:
  frecvența maximă a unei piese normalizate. Cerința 2: numărul de chei
  distincte de prietenie. Cerința 3: pentru fiecare cheie de prietenie, se
  reține prima și ultima apariție, iar lungimea maximă este max(ultima - prima + 1).
---

Trio este un joc ce contine `N` piese de aceeasi forma, asezate una langa alta pe o tabla de joc si numerotate de la stanga la dreapta cu valori de la `1` la `N`. Fiecare piesa are marcate pe ea trei zone, iar in fiecare dintre ele este scrisa cate o cifra. Se considera ca o piesa pe care sunt scrise in ordine, de la stanga la dreapta, cifrele `C1`, `C2` si `C3` are urmatoarele proprietati:

- este **identica** cu o alta piesa, daca aceasta piesa contine exact aceleasi cifre, in aceeasi ordine cu ale ei sau in ordine inversa. Astfel, piesa `C1|C2|C3` este identica cu o alta piesa de forma `C1|C2|C3` si cu o piesa de forma `C3|C2|C1`.
- este **prietena** cu o alta piesa daca aceasta contine exact aceleasi cifre ca piesa data, dar nu neaparat in aceeasi ordine. Astfel, piesa `C1|C2|C3` este prietena cu piesele: `C1|C2|C3`, `C1|C3|C2`, `C2|C1|C3`, `C2|C3|C1`, `C3|C1|C2` si `C3|C2|C1`. Se observa ca doua piese identice sunt si prietene! Un grup de piese prietene este format din TOATE piesele prietene intre ele, aflate pe tabla de joc.

## Cerinta

1) Alegeti o piesa de pe tabla de joc, astfel incat numarul `M` al pieselor identice cu ea sa fie cel mai mare posibil si afisati numarul `M` determinat;

2) Afisati numarul grupurilor de piese prietene existente pe tabla de joc;

3) Afisati numarul maxim de piese dintr-o secventa ce contine piese asezate una langa alta pe tabla de joc, pentru care prima piesa si ultima piesa din secventa sunt prietene.

## Date de intrare

Fisierul de intrare `trio.in` contine:

- pe prima linie un numar natural `C` care reprezinta numarul cerintei si poate avea valorile `1`, `2` sau `3`.
- pe cea de-a doua linie un numar natural `N` ce reprezinta numarul pieselor de joc;
- pe urmatoarele `N` linii, cate trei cifre, despartite prin cate un spatiu, ce reprezinta, in ordine, cifrele scrise pe cate o piesa de joc. Piesele sunt date in ordinea numerotarii acestora pe tabla de joc.

## Date de iesire

Fisierul de iesire `trio.out` va contine pe prima linie un singur numar natural ce reprezinta rezultatul determinat conform fiecarei cerinte.

## Restrictii si precizari

- `2 ≤ N ≤ 100.000`
- Exista cel putin doua piese identice pe tabla de joc
- O piesa ce nu e prietena cu nicio alta piesa de pe tabla de joc formeaza singura un grup
- Pentru rezolvarea cerintei 1 se acorda `20` de puncte, pentru rezolvarea cerintei 2 se acorda `30` de puncte iar pentru rezolvarea cerintei 3 se acorda `50` de puncte

## Exemplul 1

`trio.in`

```
1
6
1 3 3
4 5 9
1 3 3
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
2
```

### Explicatie

Se rezolva cerinta 1. Alegand oricare din piesele `1`, `3` sau `5` exista pe tabla doua piese identice cu piesa aleasa. Alegand oricare din piesele `2` sau `4` exista doar o piesa ce este identica cu piesa aleasa. Daca alegem piesa `6` nu exista pe tabla piese identice cu ea.

## Exemplul 2

`trio.in`

```
2
6
1 3 3
4 5 9
0 8 0
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
3
```

### Explicatie

Se rezolva cerinta 2. Piesele `1` si `5` formeaza un grup de piese prietene. Piesele `2`, `4` si `6` formeaza alt grup. Piesa `3` formeaza singura un grup. In total, pe tabla, sunt `3` grupuri de piese prietene.

## Exemplul 3

`trio.in`

```
3
6
1 3 3
4 5 9
0 8 0
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
5
```

### Explicatie

Se rezolva cerinta 3. Identificam doua secvente de lungime maxima, egala cu `5`, pentru care prima si ultima piesa sunt prietene: `Piesa 1 | Piesa 2 | Piesa 3 | Piesa 4 | Piesa 5` si `Piesa 2 | Piesa 3 | Piesa 4 | Piesa 5 | Piesa 6`.
