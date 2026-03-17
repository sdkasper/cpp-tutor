---
title: Puzzle 1
difficulty: hard
sort_order: 15
hints:
  - >-
    Două piese se pot lipi dacă au cel puțin 3 cifre comune. Gândește-te cum
    verifici asta eficient — contorizează frecvența cifrelor distincte din
    fiecare număr.
  - >-
    Folosește un vector de 10 elemente (pentru cifrele 0-9) pentru a marca
    cifrele distincte ale fiecărui număr. Intersecția a două astfel de vectori
    îți dă cifrele comune.
  - >-
    La lipirea a două etichete: primele 4 cifre ale primei + ultimele 4 cifre
    ale celei de-a doua (sau mai puțin dacă nu au 4 cifre). Lucrează cu
    stringuri pentru manipulare ușoară.
  - >-
    Pentru cerința 2, sortează grupurile: mai întâi descrescător după numărul de
    cifre distincte din etichetă, apoi crescător după valoarea etichetei.
    Selectează primele K.
starter_code: |
  #include <fstream>
  #include <cstring>
  using namespace std;

  ifstream fin("puzzle.in");
  ofstream fout("puzzle.out");

  int main() {
      int C, N, K;
      fin >> C >> N >> K;

      // Citește cele N numere de pe etichete

      if (C == 1) {
          // Determină numărul de grupuri G
      }

      if (C == 2) {
          // Determină cele K etichete alese de Maria
      }

      return 0;
  }
solution_notes: >-
  Parcurge piesele în ordine. Pentru fiecare piesă, verifică dacă se poate lipi
  de grupul curent (≥3 cifre comune, comparând cifrele distincte). Dacă da,
  actualizează eticheta grupului (primele 4 cifre ale etichetei curente +
  ultimele 4 ale piesei noi). Dacă nu, finalizează grupul curent și începe unul
  nou. Pentru cerința 2, sortează etichetele descrescător după nr. cifre
  distincte, apoi crescător după valoare, și afișează primele K.
---
Maria a primit cadou de ziua ei o cutie cu piese de puzzle, etichetate cu numere naturale. Pentru a-l rezolva trebuie să lipească între ele, în ordinea în care le extrage din cutie, cât mai multe piese, formând astfel grupuri de piese.

Două piese de puzzle se pot lipi între ele dacă numerele de pe etichetele lor au cel puțin trei cifre comune. La operația de lipire a două piese se obține un grup de piese care va fi etichetat cu numărul obținut prin alipirea primelor patru cifre de pe prima etichetă cu ultimele patru cifre de pe cea de a doua etichetă (dacă numerele de pe etichete nu au cel puțin patru cifre se păstrează doar cele existente fără a adăuga altele). O piesă se poate lipi de o altă piesă sau de un grupul de piese anterior creat (dacă acesta există), sau poate forma singură un grup.

De exemplu dacă pe etichete avem numerele `133454` și `3523143` atunci putem lipi cele două piese deoarece au în comun cinci cifre (o cifră `1`, două cifre `3`, o cifră `4` și o cifră `5`). În urma lipirii obținem un grup cu eticheta `13343143`.

Pentru a rezolva jocul Maria extrage pe rând din cutie câte o piesă. Dacă aceasta se poate lipi de ultimul grup format atunci o lipește de el și actualizează eticheta grupului, altfel pune deoparte grupul respectiv și începe să formeze un nou grup pornind cu piesa extrasă.

După ce formează grupurile Maria alege etichete de grupuri în următoarea ordine: prima dată alege eticheta cu număr maxim de cifre distincte. Dacă sunt mai multe, o alege pe cea cu valoarea cea mai mică. Dintre etichetele rămase alege următoarea etichetă după aceiași regulă. Continuă procedeul până când a ales `K` etichete.

Cunoscând cele `N` numere naturale care se găsesc pe etichetele pieselor de joc, în ordinea în care aceste se extrag din cutie, să se determine:

## Cerința

1\. Numărul de grupuri pe care le obține Maria după ce rezolvă jocul de puzzle;
2\. Cele `K` numere înscrise pe etichetele grupurilor alese de Maria.

## Date de intrare

În fișierul de intrare `puzzle.in` se găsesc pe prima linie, separate prin câte un spațiu, `C`, `N` și `K`, unde `C` reprezintă cerința ce trebuie rezolvată, `N` numărul de piese din joc, `K` numărul de valori cerute la cerința 2. Pe linia următoare, separate prin câte un spațiu, sunt cele `N` numere înscrise pe etichetele pieselor de joc, în ordinea în care se extrag din cutie.

## Date de ieșire

Dacă cerința este `1`, fişierul de ieşire `puzzle.out` va conţine pe prima linie un număr natural `G`, reprezentând numărul de grupuri obținut după finalizarea jocului.

Dacă cerința este `2` pe prima linie a fișierului de ieșire `puzzle.out` se vor scrie, separate prin câte un spațiu, cele `K` numere înscrise pe etichetele grupurilor alese de Maria.

## Restricții și precizări

- `1 ≤ C ≤ 2`
- `1 ≤ N ≤ 100.000`
- `1 ≤ K ≤ 10`
- Numerele de pe etichetele pieselor sunt numere naturale cu cel mult nouă cifre;
- Pentru toate datele de test există soluție.
- Pentru 53 de puncte, `C = 1`
- Pentru 7 puncte, `C = 2`, `K = 1`
- Pentru 13 puncte, `C = 2`, `K = 2`
- Pentru 27 de puncte, `C = 2`, `K > 2`

## Exemplul 1:

`puzzle.in`

```
1 6 1
13345 23143 4343 784532 432 7826
```

`puzzle.out`

```
2
```

### Explicație

Piesa cu eticheta `13345` se poate lipi cu piesa cu eticheta `23143` obținând astfel grupul cu eticheta `13343143` la care se poate lipi piesa cu eticheta `4343` și obținem `13344343` care nu se mai poate lipi cu următoarea piesă cu eticheta `784532`, dar această piesă se va lipi cu piesa etichetată cu `432` și obținem `7845432` care în continuare se lipește cu piesa `7826` și obținem a doua etichetă a unui grup `78457826`.

## Exemplul 2:

`puzzle.in`

```
2 6 1
13345 23143 4343 784532 432 7826
```

`puzzle.out`

```
78457826
```

### Explicație

În urma grupării pieselor obținem două grupuri etichetate cu `13344343` și respectiv `78457826`. Dintre acestea `78457826` are `6` cifre distincte, iar `13344343` are doar `3` cifre distincte. Deci valoarea căutată este `78457826`.
