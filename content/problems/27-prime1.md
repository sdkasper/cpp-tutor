---
title: Prime 1
difficulty: hard
sort_order: 27
hints:
  - >-
    Pentru cerința 1, trebuie să verifici dacă un număr este și prim și aparține
    șirului Fibonacci. Generează toate numerele Fibonacci până la 10^7 (sunt
    puține), apoi verifică pentru fiecare număr din secvență dacă este prim și
    apare în lista Fibonacci.
  - >-
    Pentru cerința 2, un număr este „economic" dacă are mai multe cifre decât
    descompunerea sa în factori primi (scriind fiecare factor și exponentul
    doar dacă e > 1). Compară len(n) cu len(descompunere).
  - >-
    La cerința 2, atenție la numere mari (până la 10^14). Factorizarea directă
    funcționează dacă iterezi doar până la sqrt(n). Dacă rămâne un factor > 1,
    acesta e prim.
  - >-
    Pentru cerința 3, verifică dacă un număr poate fi scris ca sumă de două
    prime. Prin conjectura lui Goldbach, numerele pare > 2 pot fi scrise ca
    sumă de două prime. Dar numerele impare? Un impar = 2 + (impar-2),
    verifică dacă impar-2 este prim.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("prime1.in");
  ofstream fout("prime1.out");

  int main() {
      int c, n;
      fin >> c >> n;

      long long a[51];
      for (int i = 1; i <= n; i++)
          fin >> a[i];

      if (c == 1) {
          // Numără câte numere sunt prime Fibonacci
      }

      if (c == 2) {
          // Numără câte numere sunt economice
      }

      if (c == 3) {
          // Numără câte numere NU pot fi scrise ca sumă de două prime
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: se generează Fibonacci până la 10^7 într-un set, apoi fiecare
  element se verifică dacă e prim și e în set. Cerința 2: se factorizează
  fiecare număr (până la sqrt, atenție la 10^14), se numără cifrele
  descompunerii (factor + exponent dacă > 1) și se compară cu cifrele
  numărului. Cerința 3: un număr nu poate fi scris ca sumă de 2 prime dacă
  e 1, 2, 3, impar cu n-2 neprim, sau 4; se folosește un ciur până la 10^7.
---

Eu sunt fascinata de numerele prime. Consider ca numerele prime sunt "scheletul" tuturor numerelor sau "atomii" acestora, pentru ca orice numar natural mai mare decat 1 poate fi scris ca un produs de numere prime. Recent am aflat si alte proprietati interesante legate de numerele prime, de exemplu:

1. In sirul Fibonacci exista o infinitate de numere prime. Va mai amintiti sirul Fibonacci? `0, 1, 1, 2, 3, 5, 8, 13, ...` Este sirul in care fiecare termen, exceptand primii doi, se obtine ca suma celor doi termeni care il preceda.

2. Exista numere naturale denumite "economice". Un numar natural este economic daca numarul de cifre necesare pentru scrierea sa este mai mare decat numarul de cifre necesare pentru scrierea descompunerii sale in factori primi (adica decat numarul de cifre necesare pentru scrierea factorilor primi si a puterilor acestora). De exemplu `128` este economic pentru ca `128` se scrie cu 3 cifre, iar descompunerea sa in factori primi se scrie cu doua cifre (`2^7`); `4374` este economic pentru ca se scrie cu 4 cifre, in timp ce descompunerea sa in factori primi se scrie cu 3 cifre (`2*3^7`). Observati ca atunci cand un factor prim apare la puterea 1, aceasta nu este necesar sa fie scrisa.

3. Multe numere naturale pot fi scrise ca suma de doua numere prime. Dar nu toate. De exemplu, `121` nu poate fi scris ca suma de doua numere prime.

## Cerinta

Scrieti un program care citeste numarul natural `n` si o secventa de `n` numere naturale, apoi rezolva urmatoarele cerinte:

1. determina si afiseaza cate dintre numerele din secventa data sunt numere prime din sirul Fibonacci;
2. determina si afiseaza cate dintre numerele din secventa data sunt numere economice;
3. determina si afiseaza cate dintre numerele din secventa data nu pot fi scrise ca suma de doua numere prime.

## Date de intrare

Fisierul de intrare `prime1.in` contine pe prima linie un numar natural `c` care reprezinta cerinta (`1`, `2` sau `3`). Pe a doua linie se afla numarul natural `n`. Pe a treia linie se afla o secventa de `n` numere naturale separate prin spatii.

## Date de iesire

Fisierul de iesire `prime1.out` va contine o singura linie pe care va fi scris raspunsul la cerinta din fisierul de intrare.

## Restrictii si precizari

- `1 < n ≤ 50`
- Daca `c=1` sau `c=3` numerele naturale din sir sunt mai mari decat `1` si mai mici decat `10^7`
- Daca `c=2` numerele naturale din sir sunt mai mari decat `1` si mai mici decat `10^14`
- Pentru rezolvarea corecta a cerintei 1 se acorda 20 de puncte
- Pentru rezolvarea corecta a cerintei 2 se acorda 50 de puncte
- Pentru rezolvarea corecta a cerintei 3 se acorda 30 de puncte

## Exemplul 1

`prime1.in`

```
1
5
2 10 13 997 233
```

`prime1.out`

```
3
```

### Explicatie

Cerinta este 1. Cele 3 numere prime din sirul Fibonacci existente in secventa sunt `2`, `13` si `233`.

## Exemplul 2

`prime1.in`

```
2
4
128 25 4374 720
```

`prime1.out`

```
2
```

### Explicatie

Cerinta este 2. Secventa contine doua numere economice (`128` si `4374`).

## Exemplul 3

`prime1.in`

```
3
5
57 30 121 11 3
```

`prime1.out`

```
4
```

### Explicatie

Cerinta este 3. Sunt 4 numere naturale din secventa care nu pot fi scrise ca suma de doua numere prime: `57`, `121`, `11`, `3`.
