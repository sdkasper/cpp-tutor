---
title: Mostenire
difficulty: hard
sort_order: 24
lang: ro
concepts: [arrays, loops, arithmetic, file-io]
hints:
  - >-
    Codul cheie Q definește o substituție: cifra 1 devine Q[1], cifra 2 devine
    Q[2], ..., cifra 9 devine Q[9]. Pentru a inversa o modificare, construiește
    substituția inversă: dacă Q[i] = j, atunci inversa[j] = i.
  - >-
    Fiecare an, o secvență [S, D] din parolă este modificată. Pentru a recupera
    parola inițială, aplică inversele în ordine inversă: mai întâi inversul
    ultimei modificări, apoi al penultimei, etc.
  - >-
    Atenție: aceeași poziție poate fi modificată de mai multe ori în cei K ani.
    La fiecare pas, inversarea se aplică doar pe intervalul [S, D] specificat.
    Procesează modificările de la K la 1.
  - >-
    Pentru cerința 2, numără de câte ori apare fiecare poziție în cele K
    intervale. Găsește frecvența maximă, apoi pozițiile cu acea frecvență.
    Z este minimul dintre aceste poziții. Urmărește ce cifră a stat pe Z
    în fiecare etapă a decodificării.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("mostenire.in");
  ofstream fout("mostenire.out");

  int main() {
      int C;
      fin >> C;

      long long Q;
      int N, K;
      fin >> Q >> N >> K;

      int P[10001];
      for (int i = 1; i <= N; i++)
          fin >> P[i];

      int S[101], D[101];
      for (int i = 1; i <= K; i++)
          fin >> S[i] >> D[i];

      if (C == 1) {
          // Determină parola inițială X inversând cele K modificări
      }

      if (C == 2) {
          // Determină poziția minimă Z cu frecvență maximă
          // și cifrele distincte care au ocupat-o
      }

      return 0;
  }
solution_notes: >-
  Se construiește substituția inversă din codul cheie Q. Parola finală P se
  decodifică aplicând inversele celor K modificări în ordine inversă (de la K
  la 1), fiecare pe intervalul [S[i], D[i]]. Pentru cerința 2, se numără
  frecvența fiecărei poziții în cele K intervale, se găsește maximul, Z este
  poziția minimă cu acea frecvență, iar cifrele distincte de pe Z se colectează
  pe parcursul decodificării.
---

Regele Rufus doreste sa stabileasca mostenitorul averii sale, adica sa ofere parola de la seif celui mai destept dintre fiii sai. Initial, regele a avut parola `X` formata din `N` cifre nenule si un cod cheie `Q` (numar natural cu exact noua cifre, distincte, toate nenule). In fiecare an din cei `K` ani de domnie, folosind codul cheie `Q`, Rufus a modificat cate o secventa de cifre din parola ajungand la parola finala `P`.

Modificarea unei secvente din `X` consta in inlocuirea fiecarei aparitii a cifrei `1` cu prima cifra a lui `Q`, apoi a fiecarei aparitii a cifrei `2` cu a doua cifra a lui `Q`, ..., a fiecarei aparitii a cifrei `9` cu ultima cifra a lui `Q`.

Pentru a decide mostenitorul, regele le da fiilor parola finala `P`, codul cheie `Q`, numarul `K` de ani de domnie si cele `K` secvente de cifre care au fost modificate si le cere sa gaseasca: parola initiala `X`, pozitia minima `Z` din parola `X` care a aparut in cele mai multe secvente dintre cele modificate de rege de-a lungul celor `K` ani de domnie si cifrele distincte care au ocupat pozitia `Z` in cei `K` ani.

## Cerinta

Scrieti un program care citeste numerele `Q`, `N`, `K`, cele `N` cifre ale parolei finale `P` si cele `K` perechi de pozitii `S` si `D`, si care rezolva urmatoarele doua cerinte:

1. determina parola initiala `X`;
2. determina pozitia minima `Z` si cifrele distincte care au ocupat aceasta pozitie in cei `K` ani de domnie.

## Date de intrare

Fisierul de intrare `mostenire.in` contine pe prima linie un numar natural `C` reprezentand cerinta din problema care trebuie rezolvata (1 sau 2). A doua linie din fisier contine cele trei numere naturale `Q`, `N` si `K`, separate prin cate un spatiu. A treia linie din fisier contine cele `N` cifre ale parolei finale `P`, separate prin cate un spatiu. Fiecare linie dintre urmatoarele `K`, contine cate doua numere naturale `S` si `D`, separate printr-un singur spatiu, reprezentand cate o pereche de pozitii.

## Date de iesire

Daca `C=1`, fisierul de iesire `mostenire.out` va contine pe prima linie cele `N` cifre ale parolei initiale `X`, separate prin cate un spatiu, in ordinea in care apar in `X`, reprezentand raspunsul la cerinta 1.

Daca `C=2`, fisierul de iesire `mostenire.out` va contine pe prima linie numarul natural `Z`, iar pe a doua linie cifrele distincte care au aparut pe pozitia minima `Z`, reprezentand raspunsul la cerinta 2. Acestea vor fi afisate in ordine crescatoare, separate prin cate un spatiu.

## Restrictii si precizari

- `1 ≤ N ≤ 10.000`
- Numarul natural `Q` este format din exact 9 cifre, distincte si nenule
- Pozitiile cifrelor din parola `X` sunt numerotate cu numerele distincte consecutive `1, 2, ..., N`
- `1 ≤ K ≤ 100`
- Pentru toate perechile de pozitii modificate de rege: `S ≤ D`
- Cel putin o cifra din parola `X` va fi inlocuita
- Pentru rezolvarea corecta a cerintei 1 se acorda 50 de puncte
- Pentru rezolvarea corecta a cerintei 2 se acorda 50 de puncte

## Exemplul 1

`mostenire.in`

```
1
712534698 12 4
1 4 7 1 3 4 7 1 4 8 1 8
2 4
6 11
3 9
1 7
```

`mostenire.out`

```
2 7 3 5 4 1 3 3 7 9 2 8
```

### Explicatie

Parola initiala `X` este `2 7 3 5 4 1 3 3 7 9 2 8`.

## Exemplul 2

`mostenire.in`

```
2
712534698 12 4
1 4 7 1 3 4 7 1 4 8 1 8
2 4
6 11
3 9
1 7
```

`mostenire.out`

```
3
1 2 3 7
```

### Explicatie

Cerinta este 2, `N=12`, `K=4`. `P=(1 4 7 1 3 4 7 1 4 8 1 8)`. Pozitiile care au aparut in cele mai multe secvente sunt: 3, 4, 6, 7 => `Z=3`, iar cifrele distincte care au ocupat succesiv aceasta pozitie sunt `3`, `2`, `1`, `7`. Aceste cifre se vor scrie in fisier in ordine crescatoare.
