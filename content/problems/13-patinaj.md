---
title: Patinaj
difficulty: hard
sort_order: 13
lang: ro
concepts: [2d-arrays, loops, nested-loops, file-io]
hints:
  - >-
    Primul pas: calculează valoarea fiecărui antrenor, fete și băiat ca suma
    cifrelor numărului lor. Poți face asta cu un while care extrage cifre.
  - >-
    O echipă validă (antrenor, fată, băiat) necesită VM - Vm ≤ 1, unde VM și Vm
    sunt maximul și minimul valorilor celor trei. Gândește-te ce combinații de
    valori sunt posibile.
  - >-
    Grupează persoanele pe valori. Pentru o echipă validă, toate cele 3 valori
    trebuie să fie egale, sau exact 2 valori distincte consecutive (v și v+1).
    Numără câte persoane ai la fiecare valoare.
  - >-
    Pentru cerința 1, la fiecare valoare v, formează echipe din persoane cu
    valorile v și v+1 (matching greedy). Pentru cerința 2, caută antrenorul cu
    valoarea maximă care are cel puțin o pereche (fată, băiat) compatibilă.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("patinaj.in");
  ofstream fout("patinaj.out");

  int sumaCifre(long long x) {
      int s = 0;
      while (x > 0) {
          s += x % 10;
          x /= 10;
      }
      return s;
  }

  int main() {
      int C, N;
      fin >> C >> N;

      // Citește codificările pentru antrenori, fete, băieți
      // Calculează valorile (suma cifrelor) pentru fiecare

      if (C == 1) {
          // Determină NP — numărul maxim de echipe
      }

      if (C == 2) {
          // Determină V și NV — valoarea maximă a unui antrenor
          // cu pereche validă și numărul de variante
      }

      return 0;
  }
solution_notes: >-
  Calculează suma cifrelor pentru toți. Grupează pe valori (0..81 maxim pentru 9
  cifre). Cerința 1: pentru fiecare valoare v, formează echipe din persoane cu
  valori v sau v+1 respectând condiția VM-Vm ≤ 1, maximizând numărul de echipe.
  Cerința 2: parcurge antrenorii descrescător după valoare, verifică dacă există
  cel puțin o pereche (fată, băiat) compatibilă, numără combinațiile.
---
Clubul Sportiv SEPI are și o secție de patinaj artistic. Conducerea clubului și-a propus să participe la proba de perechi a următoarei olimpiade și are de luat unele decizii privind echipele pe care le poate înscrie.

Fiecare echipă participantă la olimpiadă trebuie să fie formată dintr-o pereche de patinatori (o fată și un băiat) și un antrenor. În plus, valorile membrilor unei echipe trebuie să fie cât mai apropiate. Valoarea unui sportiv și respectiv a unui antrenor este calculată pe baza rezultatelor obținute la competițiile anterioare. Acestea sunt codificate sub forma unui singur număr cu cel mult `9` cifre. Fiecare cifră a numărului reprezintă un rezultat anterior, iar **suma cifrelor reprezintă valoarea sportivului, respectiv antrenorului**. De exemplu, numărul `18305` codifică rezultatele `1`, `8`, `3`, `0`, `5`, obținute la ultimele `5` concursuri, ceea ce corespunde valorii `17 (= 1 + 8 + 3 + 0 + 5)`.

La olimpiadă fiecare sportiv și fiecare antrenor poate să facă parte din cel mult o echipă înscrisă. În plus, pentru fiecare echipă, dacă notăm cu `VM` maximul dintre valorile antrenorului, fetei și băiatului și cu `Vm` minimul dintre valorile antrenorului, fetei și băiatului, înscrierea în concurs este permisă doar dacă `VM - Vm ≤ 1`.

## Cerința

Cunoscând numerele care codifică rezultatele antrenorilor, fetelor și băieților, scrieți un program care să determine:
1) Numărul maxim de echipe, `NP`, pe care le poate înscrie Clubul Sportiv SEPI la olimpiadă astfel încât acestea să respecte regulile de mai sus.
2) Valoarea maximă, `V`, a unui antrenor al clubului care poate antrena o pereche de patinatori (fată, băiat), ce poate fi înscrisă la olimpiadă conform regulilor de mai sus și numărul de variante `NV` în care se poate alege o echipă care poate fi pregătită de un antrenor de valoare `V`.

## Date de intrare

Fișierul de intrare `patinaj.in` conține:

- pe prima linie numărul natural `C` care reprezintă numărul cerinței și poate avea una dintre valorile `1` sau `2`;
- pe cea de-a doua linie, un număr natural `N`, care reprezintă atât numărul antrenorilor angajați, cât și al fetelor și al băieților legitimați la club;
- pe fiecare dintre următoarele trei linii câte `N` valori, despărțite prin câte un spațiu. Pe cea de-a treia linie, acestea reprezintă codificările rezultatelor anterioare ale celor `N` antrenori, pe cea de-a patra linie ele reprezintă codificările rezultatelor anterioare ale celor `N` fete, iar valorile de pe cea de-a cincea linie reprezintă codificările rezultatelor anterioare ale celor `N` băieți.

## Date de ieșire

În fișierul text `patinaj.out` se va afișa:

- pentru cerința `1`: numărul maxim de echipe `NP` care pot fi înscrise la olimpiadă conform regulilor precizate mai sus;
- pentru cerința `2`: două numere naturale, `V` și `NV`, separate printr-un spațiu, reprezentând valoarea maximă a unui antrenor al clubului **pentru care există cel puțin o pereche pe care o poate antrena** și respectiv numărul variantelor în care clubul poate alege o echipă care poate fi pregătită de un antrenor cu valoarea `V`, dacă se rezolvă cerința `2`. În cazul în care clubul nu poate înscrie nicio pereche, se va afișa **un singur număr**: `-1`.

## Restricții și precizări

- `1 ≤ N ≤ 100.000`
- fiecare dintre numerele citite de pe a treia, a patra și a cincea linie a fișierului este un număr natural cu cel mult 9 cifre.
- Pentru 51 de puncte, `C = 1`
- Pentru 49 de puncte, `C = 2`

## Exemplul 1:

`patinaj.in`

```
1
4
8093 18305 20009 188
1803 3303331 909 91995
8017 20009 0 8017
```

`patinaj.out`

```
2
```

### Explicație

Se pot forma cel mult `2` echipe. Prima ar putea fi formată din fata cu codificarea `1803` și băiatul cu codificarea `20009` și pregătită de antrenorul cu codificarea `20009`. A doua poate fi formată din fata `3303331`, băiatul `8017` și pregătită de antrenorul `18305`.

## Exemplul 2:

`patinaj.in`

```
2
4
8093 18305 20009 188
1803 3303331 909 91995
8017 20009 0 8017
```

`patinaj.out`

```
17 4
```

### Explicație

Clubul are `4` antrenori cu valorile `20=8+0+9+3`, `17=1+8+3+0+5`, `11=2+0+0+0+9` și `17=1+8+8`. Valoarea maximă este `20`, dar nu există o pereche pe care să o poată pregăti antrenorul cu valoarea `20` conform regulilor impuse. În schimb, un antrenor cu valoarea `17` ar putea pregăti o pereche înscrisă la olimpiadă. Sunt `4` variante de alegere a unei echipe pregătite de un antrenor cu valoarea `17`. Acestea ar putea avea în componență fata `3303331` și unul dintre cei doi băieți cu codificarea rezultatelor anterioare `8017`. O astfel de pereche ar putea fi pregătită de antrenorul `18305` sau de `188`.
