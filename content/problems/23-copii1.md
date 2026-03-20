---
title: Copii 1
difficulty: hard
sort_order: 23
hints:
  - >-
    Pentru cerința 1, trebuie să calculezi X! (factorial), să elimini zerourile
    de la final, apoi să afișezi ultimele K cifre. Zerourile de la final vin
    din factorii de 2 și 5. Câte zerouri are X! la final?
  - >-
    Nu poți calcula X! direct (e uriaș). Lucrează modulo 10^K, dar ai grijă
    să elimini factorii de 2 și 5 înainte, apoi să-i adaugi înapoi la final
    (cei în exces față de perechile 2*5). Sau calculează produsul eliminând
    factorii de 10 pe parcurs.
  - >-
    Pentru cerința 2, un număr are un număr impar de divizori dacă și numai
    dacă este un pătrat perfect. Deci Z trebuie să fie cel mai mare divizor
    al lui Y care este pătrat perfect.
  - >-
    Descompune Y în factori primi. Z este produsul fiecărui factor prim la
    cea mai mare putere pară ≤ exponentul din Y. Apoi, numărul de divizori
    ai lui Z se calculează din formula produsului (e1+1)*(e2+1)*...
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("copii.in");
  ofstream fout("copii.out");

  int main() {
      int C;
      fin >> C;

      if (C == 1) {
          int X, K;
          fin >> X >> K;
          // Calculează ultimele K cifre ale lui X! după eliminarea zerourilor finale
      }

      if (C == 2) {
          long long Y;
          fin >> Y;
          // Determină cel mai mare divizor Z al lui Y cu număr impar de divizori
          // și numărul de divizori ai lui Z
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: se calculează X! modulo 10^K, eliminând factorii de 2 și 5 care
  produc zerouri finale (se numără perechile min(v2, v5), se scot din produs,
  apoi se reintroduc factorii în exces). Cerința 2: un număr cu număr impar de
  divizori este un pătrat perfect, deci Z este cel mai mare pătrat perfect
  care divide Y. Se descompune Y în factori primi, se trunchiază fiecare
  exponent la cea mai mare valoare pară, și se calculează produsul.
---

Iliuta si Pandele au invatat la scoala operatii aritmetice cu numere naturale. Astfel cei doi frati exerseaza operatiile folosindu-se de o tabla. Iliuta spune un numar natural `X`, iar Pandele scrie pe tabla rezultatul inmultirii tuturor numerelor naturale de la `1` la `X`. Glumet, Iliuta sterge cifrele egale cu `0` de la finalul numarului scris de Pandele. Ca sa il ierte, Pandele spune si el un numar natural `Y` si ii cere lui Iliuta sa determine un numar natural `Z` care este cel mai mare divizor al lui `Y` avand un numar impar de divizori.

## Cerinta

Cunoscandu-se numerele spuse de copii, scrieti un program care rezolva urmatoarele cerinte:

1) afiseaza ultimele `K` cifre ale produsului calculat de Pandele, dupa stergerea cifrelor egale cu `0` de la finalul acestuia;
2) afiseaza numarul `Z` cu semnificatia de mai sus si numarul de divizori ai acestuia.

## Date de intrare

Fisierul de intrare `copii.in` contine pe prima linie numarul `C`, care reprezinta numarul cerintei si poate avea doar valorile `1` sau `2`. Pentru prima cerinta fisierul contine pe a doua linie numarul `X`, iar pe cea de a treia linie numarul `K`. Pentru a doua cerinta fisierul contine pe a doua linie numarul `Y`.

## Date de iesire

Pentru cerinta 1, pe prima linie a fisierului `copii.out` se vor afisa cele `K` cifre cerute, fara spatii, in ordine de la stanga la dreapta. Pentru cerinta 2, pe prima linie se vor afisa, in aceasta ordine, numarul `Z` determinat si numarul de divizori ai acestuia. Numerele vor fi separate printr-un spatiu.

## Restrictii si precizari

- `1 ≤ X ≤ 10^6`
- `1 ≤ Y ≤ 10^12`
- `1 ≤ K ≤ 9`
- Numarul ramas dupa stergerea zerourilor de la finalul produsului are cel putin `K` cifre
- Pentru rezolvarea primei cerinte se acorda `40` de puncte
- Pentru rezolvarea celei de a doua cerinte se acorda `60` de puncte

## Exemplul 1

`copii.in`

```
1
12
3
```

`copii.out`

```
016
```

### Explicatie

Produsul `1*2*3*4*5*6*7*8*9*10*11*12 = 479001600`. Dupa stergerea zerourilor de la finalul produsului, ultimele `3` cifre sunt `016`.

## Exemplul 2

`copii.in`

```
2
14641
```

`copii.out`

```
14641 5
```

### Explicatie

Cel mai mare divizor al lui `14641` care are un numar impar de divizori este chiar `14641`.

## Exemplul 3

`copii.in`

```
1
723432
9
```

`copii.out`

```
813433856
```

### Explicatie

Dupa stergerea zerourilor de la finalul produsului, ultimele `9` cifre sunt `813433856`.

## Exemplul 4

`copii.in`

```
2
573194962208
```

`copii.out`

```
286597481104 105
```

### Explicatie

Cel mai mare divizor cu un numar impar de divizori este `286597481104` care are `105` divizori.
