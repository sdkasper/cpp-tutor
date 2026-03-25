---
title: Roua
difficulty: hard
sort_order: 28
concepts: [2d-arrays, loops, nested-loops, conditions, file-io]
hints:
  - >-
    O secvență „roua" de lungime R conține exact R-1 caractere 'r' și exact
    un caracter din {'g', 'v', 'a'}. Pentru cerința 1, parcurge fiecare
    fereastră de R caractere consecutive și verifică dacă este roua.
  - >-
    Pentru a verifica rapid dacă o fereastră este roua, numără câte caractere
    diferite de 'r' sunt. Dacă exact unul nu este 'r', este o secvență roua.
    Folosește un contor glisant la mutarea ferestrei.
  - >-
    Pentru cerința 2, gândește-te la structura unei colorări R-frumoase.
    Dacă ORICE R caractere consecutive formează o roua, atunci cel mult o
    poziție din fiecare R consecutive poate fi non-roșie. Ce restricții impune
    asta asupra poziționării culorilor non-roșii?
  - >-
    Într-o colorare R-frumoasă, între oricare două poziții non-roșii trebuie
    să fie cel puțin R-1 poziții roșii. Deci pozițiile non-roșii sunt la
    distanță ≥ R-1. Numără câte moduri de a plasa aceste poziții și câte
    alegeri de culoare (3) ai la fiecare. Atenție: rezultatul poate avea
    mii de cifre — folosește aritmetică pe numere mari.
starter_code: |
  #include <fstream>
  #include <cstring>
  using namespace std;

  ifstream fin("roua.in");
  ofstream fout("roua.out");

  int main() {
      int C, N, R;
      fin >> C >> N >> R;

      if (C == 1) {
          char s[10001];
          fin >> s;
          // Numără câte secvențe roua de lungime R există în colorare
      }

      if (C == 2) {
          // Calculează numărul total de colorări R-frumoase pentru N ouă
          // Atenție: rezultatul poate avea mii de cifre!
      }

      return 0;
  }
solution_notes: >-
  Cerința 1: fereastră glisantă de lungime R, numărând caracterele non-'r'.
  Dacă exact 1 caracter nu este 'r', fereastra este roua. Cerința 2: într-o
  colorare R-frumoasă, pozițiile non-roșii sunt la distanță ≥ R-1 una de alta.
  Se numără combinațiile de a plasa 0, 1, 2, ... poziții non-roșii în cele N
  poziții respectând distanța minimă, înmulțite cu 3^(nr. poziții non-roșii).
  Rezultatul necesită aritmetică pe numere mari (BigNum).
---

Un copil doreste sa vopseasca ouale de Pasti, avand la dispozitie vopsele de culoare rosie, galbena, verde si albastra. Fiecare culoare va fi reprezentata printr-un singur caracter astfel: `'r'` pentru culoarea rosie, `'g'` pentru galben, `'v'` pentru verde, `'a'` pentru albastru. Pentru a vopsi ouale, le aseaza in rand, unul dupa altul. Astfel, o colorare va fi o succesiune de `N` caractere din multimea `{'r', 'g', 'v', 'a'}`, reprezentand, in ordinea asezarii, culorile celor `N` oua.

Numim **"roua"** o secventa de `R` caractere cu proprietatea ca dintre acestea exact `R-1` caractere reprezinta culoarea rosie, iar un caracter reprezinta una dintre celelalte `3` culori. De exemplu secventele roua de lungime `3` sunt `"grr"`, `"rgr"`, `"rrg"`, `"vrr"`, `"rvr"`, `"rrv"`, `"arr"`, `"rar"`, `"rra"`.

Copilul considera ca o colorare este **R-frumoasa**, daca oricare `R` caractere consecutive din colorare formeaza o secventa roua. De exemplu, pentru `N=11` oua, sirul `"arrrvrrrarr"` reprezinta o colorare **4-frumoasa**.

## Cerinta

Cunoscand `N`, numarul de oua vopsite, si numarul natural `R`, scrieti un program care determina si afiseaza:

1. numarul de secvente **"roua"** de lungime `R` existente in colorarea celor `N` oua;
2. numarul total al colorarilor `R`-frumoase pentru cele `N` oua.

## Date de intrare

Fisierul de intrare `roua.in` contine pe prima linie un numar natural `C` reprezentand cerinta din problema care trebuie rezolvata (`1` sau `2`). A doua linie din fisier contine numerele naturale `N` si `R`, separate prin spatiu, reprezentand numarul de oua si lungimea unei secvente "roua". Daca `C=1`, fisierul va contine si o a treia linie pe care se afla colorarea celor `N` oua.

## Date de iesire

Fisierul de iesire `roua.out` va contine o singura linie pe care va fi scris un numar natural, reprezentand raspunsul la cerinta specificata in fisierul de intrare.

## Restrictii si precizari

- `3 ≤ N ≤ 10000`
- `2 ≤ R < N`
- Pentru rezolvarea corecta a cerintei 1 se acorda 40 puncte
- Pentru rezolvarea corecta a cerintei 2 se acorda 60 de puncte
- Pentru 60% dintre testele pentru cerinta 2, `3 ≤ N ≤ 70`
- Pentru 40% dintre testele pentru cerinta 2, `N > 70`
- Rezultatul la cerinta 2 poate avea cel mult `2400` de cifre

## Exemplul 1

`roua.in`

```
1
7 3
vrrrgrr
```

`roua.out`

```
4
```

### Explicatie

Cerinta este 1. Exista `N=7` oua. Secventele roua de lungime `3` existente in colorare sunt `"vrr"`, `"rrg"`, `"rgr"`, `"grr"`.

## Exemplul 2

`roua.in`

```
2
4 3
```

`roua.out`

```
15
```

### Explicatie

Cerinta este 2. Exista `4` oua. Colorarile `3`-frumoase ale celor `4` oua sunt `"grrg"`, `"grrv"`, `"grra"`, `"vrrg"`, `"vrrv"`, `"vrra"`, `"arrg"`, `"arrv"`, `"arra"`, `"rgrr"`, `"rvrr"`, `"rarr"`, `"rrgr"`, `"rrvr"`, `"rrar"`.
