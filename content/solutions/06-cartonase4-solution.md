# Cartonașe 4 — Soluție C++

Problema de pe [pbinfo.ro](https://www.pbinfo.ro/) — Cartonașe 4.

## Soluție

```cpp
#include <fstream>
using namespace std;

ifstream fin("cartonase4.in");
ofstream fout("cartonase4.out");

const int NMAX = 100005;

int n, C;
int a[NMAX];   // permutarea
int pos[NMAX]; // pos[v] = pozitia valorii v in sir

int main() {
    fin >> n >> C;
    for (int i = 1; i <= n; i++) {
        fin >> a[i];
        pos[a[i]] = i;
    }

    if (C == 1) {
        // Cerinta 1: cel mai mare prefix in care toate valorile < a[poz]
        int poz;
        fin >> poz;
        int limita = a[poz];
        int maxVal = 0;
        int r = 0;
        for (int i = 1; i <= n; i++) {
            maxVal = max(maxVal, a[i]);
            if (maxVal < limita)
                r = i;
            else
                break;
        }
        fout << r << "\n";
    }
    else if (C == 2) {
        // Cerinta 2: toate pozitiile p unde primele p cartonase
        // formeaza o permutare a lui {1..p}
        // Echivalent: max(a[1..p]) == p
        int maxVal = 0;
        int cnt = 0;
        for (int p = 1; p <= n; p++) {
            maxVal = max(maxVal, a[p]);
            if (maxVal == p) {
                if (cnt > 0) fout << " ";
                fout << p;
                cnt++;
            }
        }
        fout << "\n";
    }
    else {
        // Cerinta 3: toate pozitiile p unde primele p cartonase
        // contin exact p-1 valori din {1..p}
        // cnt[p] = cate valori <= p se afla in primele p pozitii
        // cnt[p] = cnt[p-1] + (a[p] <= p ? 1 : 0) + (pos[p] <= p-1 ? 1 : 0)
        //   - termenul 2: valoarea noua a[p] e <= p?
        //   - termenul 3: valoarea p apare deja in primele p-1 pozitii?
        // Dar atentie: daca a[p] == p, ambii termeni se refera la acelasi element
        // => formula corecta tine cont de suprapunere:
        // cnt[p] = cnt[p-1] + (a[p] <= p ? 1 : 0) + (pos[p] <= p && pos[p] != p ? 1 : 0)
        //        = cnt[p-1] + (a[p] <= p ? 1 : 0) + (pos[p] < p ? 1 : 0)
        // Simplificare: pos[p] < p inseamna ca valoarea p e deja in primele p-1 pozitii
        //               a[p] <= p inseamna ca noul element e relevant pt multimea {1..p}

        int cntVal = 0; // cate valori <= p in primele p pozitii
        int nr = 0;
        for (int p = 1; p <= n; p++) {
            if (a[p] <= p) cntVal++;
            if (pos[p] < p) cntVal++;
            // pos[p] < p: valoarea p apare pe o pozitie anterioara lui p
            // a[p] <= p: elementul de pe pozitia p e <= p
            // Daca a[p] == p atunci pos[p] == p, deci pos[p] < p e fals
            //   => nu numaram dublu
            if (cntVal == p - 1) {
                if (nr > 0) fout << " ";
                fout << p;
                nr++;
            }
        }
        fout << "\n";
    }

    return 0;
}
```

## Complexitate

- **Timp:** O(N) pentru toate cele 3 cerințe
- **Memorie:** O(N) — vectorii `a[]` și `pos[]`

## Explicație pe scurt

| Cerința | Idee principală |
|---------|-----------------|
| C=1 | Parcurgem de la stânga, menținem maximul prefixului. Ultimul index unde `maxVal < a[poz]` e răspunsul. |
| C=2 | `max(a[1..p]) == p` ⟺ primele p elemente formează o permutare a lui {1..p} (valorile sunt distincte în [1,N]). |
| C=3 | Menținem `cnt` = câte valori ≤ p sunt în primele p poziții, cu formulă incrementală. Dacă `cnt == p-1`, avem exact p-1 valori din {1..p}. |
