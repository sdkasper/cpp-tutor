---
title: Cadouri 1
difficulty: medium
sort_order: 21
concepts: [arrays, loops, conditions, file-io]
hints:
  - >-
    Cutiile se împart în ordine, consecutiv. Dacă fiecare copil primește exact
    D cutii, poți împărți N cutii la cel mult N/D copii. Dar poți sări peste
    cel mult o cutie. Care sunt valorile posibile pentru D?
  - >-
    Pentru cerința 1, vrei numărul maxim de copii, deci D minim (D ≥ 2).
    Încearcă D = 2: poți distribui N cutii la N/2 copii (sau (N-1)/2 dacă
    sari peste una). Verifică ce cutie e optim de eliminat.
  - >-
    Gândește-te la toate valorile D care sunt divizori ai lui N sau ai lui
    N-1. Pentru fiecare D valid, calculează câți copii primesc cutii și care
    cutie e mai bine de eliminat (cea cu cele mai puține bomboane).
  - >-
    Pentru cerința 2, vrei maximul de bomboane pe care le primește un copil.
    Fixează D (numărul de cutii per copil) și calculează suma maximă pe un
    bloc de D cutii consecutive, cu posibilitatea de a sări o cutie.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("cadouri.in");
  ofstream fout("cadouri.out");

  int main() {
      int C, N;
      fin >> C >> N;

      long long a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          // Determină numărul maxim de copii și cutia păstrată
      }

      if (C == 2) {
          // Determină numărul maxim de bomboane per copil și cutia păstrată
      }

      return 0;
  }
solution_notes: >-
  Se distribuie cutiile consecutiv, câte D fiecărui copil, cu opțiunea de a
  elimina cel mult o cutie. Pentru cerința 1, se maximizează numărul de copii
  (D minim = 2), verificând dacă N sau N-1 este divizibil cu D și alegând
  cutia eliminată pentru a maximiza totalul. Pentru cerința 2, se iterează
  peste valorile posibile ale lui D și se calculează suma maximă per copil,
  alegând optimal cutia de eliminat.
---

Inaintea vacantei de Paste, la scoala, s-au primit cadouri pentru elevii din clasa a V-a. Sunt `N` cutii cu bomboane si se cunoaste numarul de bomboane din fiecare cutie. Numarul de cutii de bomboane primite de fiecare copil trebuie sa fie acelasi. Acest numar trebuie sa fie mai mare sau egal cu `2`. Cutiile cu bomboane vor fi oferite in ordinea primirii, primele cutii primului copil, urmatoarele cutii celui de al doilea copil, urmatoarele cutii celui de al treilea copil etc.

Se doreste sa se imparta cutiile cu bomboane unui numar cat mai mare de copii. De asemenea, mai este o conditie: sa se imparta copiilor toate cutiile, sau cel mult una dintre cutii sa ramana neoferita. In cazul ca se ia decizia ca o cutie sa nu fie data copiilor, aceasta se pastreaza de catre doamna diriginta pentru a-i servi pe acestia la intoarcerea la scoala, iar restul cutiilor cu bomboane se pun pe catedra in ordinea in care au fost primite, fara ca elevii sa stie despre cea pastrata. Alegerea acestei cutii trebuie facuta astfel incat numarul total de bomboane care se impart sa fie cat mai mare.

## Cerinta

1) Care este numarul maxim de copii care vor primi cadouri?
2) Care este numarul maxim posibil de bomboane pe care le poate primi un copil in conditiile descrise mai sus?

Pentru ambele cerinte trebuie determinat si numarul de bomboane din cutia care eventual se pastreaza.

## Date de intrare

Fisierul de intrare `cadouri.in` contine pe prima linie un numar `C`, indicand cerinta. Pe linia a doua se afla un numar `N`, reprezentand numarul de cutii de bomboane primite la scoala. Pe linia a treia se afla `N` numere, separate prin cate un spatiu, reprezentand numarul de bomboane din fiecare cutie, in ordinea in care acestea au fost primite.

## Date de iesire

Fisierul de iesire `cadouri.out` va contine doua numere naturale, separate printr-un singur spatiu liber, cu urmatoarea semnificatie: pentru `C = 1` prima valoare este numarul maxim de copii care primesc cadouri iar a doua este numarul de bomboane din cutia pastrata; pentru `C = 2` prima valoare este numarul maxim de bomboane primite de un copil iar a doua reprezinta numarul de bomboane din cutia pastrata. Daca nu se pastreaza nicio cutie, in fisierul de iesire a doua valoare scrisa va fi `0` (atat in cazul cerintei 1 cat si in cazul cerintei 2).

## Restrictii si precizari

- `2 ≤ N ≤ 100.000`
- Numerele de pe linia a treia sunt naturale, nenule, formate din cel mult `9` cifre
- Pentru 23 de puncte, `C = 1`
- Pentru 77 de puncte, `C = 2`

## Exemplul 1

`cadouri.in`

```
1
5
2 7 4 1 2
```

`cadouri.out`

```
2 1
```

### Explicatie

Se rezolva cerinta 1. Doi copii primesc cadouri. Cutia cu o bomboana nu este data nici unui copil.

## Exemplul 2

`cadouri.in`

```
2
5
2 7 4 1 2
```

`cadouri.out`

```
9 1
```

### Explicatie

Se rezolva cerinta 2. Doi copii primesc cadouri, primul copil primeste cutiile cu `2` si `7` bomboane, iar al doilea copil primeste cutiile cu `4` si `2` bomboane. Deci primul copil primeste numar maxim de bomboane, `9`. Cutia cu o bomboana nu este data niciunui copil.
