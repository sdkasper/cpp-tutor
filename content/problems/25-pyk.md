---
title: PYK
difficulty: hard
sort_order: 25
lang: ro
concepts: [strings, loops, conditions, file-io]
hints:
  - >-
    Pentru cerința 1, un număr este format doar din cifre identice dacă toate
    cifrele sale sunt egale (ex: 4, 88, 999, 1111). Parcurge fiecare număr
    din șir și verifică această proprietate.
  - >-
    Pentru cerința 2, trebuie ca P = y * x1 * x2 * ... * xn să fie o k-putere,
    adică P = z^k. Gândește-te la descompunerea în factori primi a produsului
    x1 * x2 * ... * xn.
  - >-
    Dacă produsul X are descompunerea p1^e1 * p2^e2 * ..., atunci P = y * X
    este k-putere dacă toți exponenții din P sunt multipli de k. Deci y
    trebuie să completeze fiecare exponent la cel mai mic multiplu de k ≥ ei.
  - >-
    Pentru fiecare factor prim pi cu exponent ei în X, y trebuie să contribuie
    cu (k - ei % k) % k la acel factor. Calculează descompunerea produsului
    pas cu pas, folosind un ciur sau factorizare directă.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("pyk.in");
  ofstream fout("pyk.out");

  int main() {
      int C, k, n;
      fin >> C >> k >> n;

      int x[50001];
      for (int i = 1; i <= n; i++)
          fin >> x[i];

      if (C == 1) {
          // Găsește cel mai mic și cel mai mare număr format doar din cifre identice
      }

      if (C == 2) {
          // Descompune produsul în factori primi
          // Determină cel mai mic y ≥ 2 care face produsul o k-putere
          // Afișează descompunerea lui y
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: se verifică fiecare număr dacă are toate cifrele egale, apoi se
  rețin minimul și maximul. Cerința 2: se descompune fiecare xi în factori
  primi, acumulând exponenții totali. Pentru fiecare factor prim, y trebuie să
  completeze exponentul la cel mai apropiat multiplu de k. y este produsul
  acestor completări. Dacă produsul este deja k-putere, y = cel mai mic prim
  la puterea k (y ≥ 2).
---

Fie `k`, `n` si `y` trei numere naturale. Fie `X` un sir format din `n` numere naturale: x1, x2, x3, ..., xn. Fie `P` produsul numerelor y, x1, x2, x3, ..., xn, adica P = y * x1 * x2 * x3 * ... * xn. Numarul `P` este o **"k-putere"** daca exista un numar natural `z` astfel incat P = z^k.

## Cerinta

Scrieti un program care sa citeasca numerele k, n, x1, x2, x3, ..., xn si care sa determine:

1. **cel mai mic** si **cel mai mare** numar din sirul `X` ce sunt formate doar din cifre identice;
2. **descompunerea in factori primi a celui mai mic** numar natural `y` (`y ≥ 2`) cu proprietatea ca numarul P = y * x1 * x2 * x3 * ... * xn este o **"k-putere"**.

## Date de intrare

Fisierul de intrare `pyk.in` contine:

- pe prima linie, un numar natural `C`, reprezentand cerinta din problema care trebuie rezolvata (`1` sau `2`);
- pe a doua linie, numerele naturale `k` si `n`, separate printr-un singur spatiu;
- pe a treia linie, cele `n` numere naturale x1, x2, x3, ..., xn, separate prin cate un singur spatiu.

## Date de iesire

Daca `C=1`, atunci prima linie a fisierului de iesire `pyk.out` va contine doua numere naturale, separate printr-un singur spatiu, reprezentand raspunsul la cerinta 1 a problemei. Daca nu exista astfel de numere, prima linie a fisierului va contine valoarea `1`.

Daca `C=2`, atunci fisierul de iesire `pyk.out` va contine:

- pe prima linie, un numar natural `m` reprezentand numarul de factori primi distincti din descompunerea in factori primi a numarului `y`, determinat la rezolvarea cerintei 2;
- pe fiecare dintre urmatoarele `m` linii (cate o linie pentru fiecare factor prim din descompunerea in factori primi a lui `y`), cate doua valori `F` si `E`, separate printr-un singur spatiu, reprezentand factorul prim `F` si exponentul `E` al acestui factor din descompunerea in factori primi a lui `y`.

Scrierea in fisier a acestor factori primi se va face in ordinea crescatoare a valorii lor.

## Restrictii si precizari

- `2 ≤ n ≤ 50.000`
- `2 ≤ k ≤ 100`
- `2 ≤ x1, x2, x3, ..., xn ≤ 10.000`
- `2 ≤ y`
- Pentru rezolvarea corecta a cerintei 1 se acorda `10` puncte
- Pentru rezolvarea corecta a cerintei 2 se acorda `90` puncte

## Exemplul 1

`pyk.in`

```
1
2 7
122 1111 5 4 88 123 999
```

`pyk.out`

```
4 1111
```

### Explicatie

Cerinta este `1`, `k=2`, `n=7`. Numerele din sirul `X` formate doar din cifre identice sunt: `1111`, `5`, `4`, `88`, `999`. Cel mai mic numar dintre acestea este `4`, iar cel mai mare este `1111`.

## Exemplul 2

`pyk.in`

```
2
3 6
12 5 60 125 4 36
```

`pyk.out`

```
3
2 1
3 2
5 1
```

### Explicatie

Cerinta este `2`, `k=3`, `n=6`. Produsul celor `6` numere din sir este: `12*5*60*125*4*36 = 64800000`. `y=90` este cea mai mica valoare pentru care `P = 90 * 64800000 = 5832000000` devine o "k-putere". Descompunerea in factori primi a lui `y` contine `m=3` factori primi: 2^1 * 3^2 * 5^1.
