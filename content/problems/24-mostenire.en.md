---
title: Inheritance
difficulty: hard
sort_order: 24
lang: en
concepts: [arrays, loops, arithmetic, file-io]
hints:
  - >-
    The key code Q defines a substitution: digit 1 becomes Q[1], digit 2
    becomes Q[2], ..., digit 9 becomes Q[9]. To reverse a modification,
    build the inverse substitution: if Q[i] = j, then inverse[j] = i.
  - >-
    Each year, a subsequence [S, D] of the password is modified. To recover
    the initial password, apply the inverses in reverse order: first the
    inverse of the last modification, then the second-to-last, etc.
  - >-
    Note: the same position can be modified multiple times over the K years.
    At each step, the reversal is applied only to the interval [S, D].
    Process the modifications from K to 1.
  - >-
    For task 2, count how many times each position appears in the K intervals.
    Find the maximum frequency, then the positions with that frequency. Z is
    the minimum among these positions. Track what digit occupied position Z
    at each stage of the decoding.
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
          // Determine the initial password X by reversing the K modifications
      }

      if (C == 2) {
          // Determine the minimum position Z with maximum frequency
          // and the distinct digits that occupied it
      }

      return 0;
  }
solution_notes: >-
  Build the inverse substitution from the key code Q. The final password P is
  decoded by applying the inverses of the K modifications in reverse order
  (from K to 1), each on the interval [S[i], D[i]]. For task 2, count the
  frequency of each position across the K intervals, find the maximum, Z is
  the minimum position with that frequency, and the distinct digits at Z are
  collected during the decoding process.
---

King Rufus wishes to establish the heir to his fortune, that is, to give the safe password to the cleverest of his sons. Initially, the king had password `X` consisting of `N` nonzero digits and a key code `Q` (a natural number with exactly nine distinct nonzero digits). In each of the `K` years of his reign, using the key code `Q`, Rufus modified a subsequence of digits from the password, arriving at the final password `P`.

Modifying a subsequence of `X` consists of replacing every occurrence of digit `1` with the first digit of `Q`, then every occurrence of digit `2` with the second digit of `Q`, ..., every occurrence of digit `9` with the last digit of `Q`.

To decide the heir, the king gives his sons the final password `P`, the key code `Q`, the number `K` of years of reign, and the `K` subsequences of digits that were modified, and asks them to find: the initial password `X`, the minimum position `Z` from password `X` that appeared in the most subsequences among those modified by the king over the `K` years, and the distinct digits that occupied position `Z` during the `K` years.

## Task

Write a program that reads the numbers `Q`, `N`, `K`, the `N` digits of the final password `P`, and the `K` pairs of positions `S` and `D`, and solves the following two tasks:

1. determine the initial password `X`;
2. determine the minimum position `Z` and the distinct digits that occupied this position during the `K` years of reign.

## Input Data

The input file `mostenire.in` contains on the first line a natural number `C` representing the task from the problem to be solved (1 or 2). The second line of the file contains the three natural numbers `Q`, `N`, and `K`, separated by spaces. The third line of the file contains the `N` digits of the final password `P`, separated by spaces. Each of the following `K` lines contains two natural numbers `S` and `D`, separated by a single space, representing a pair of positions.

## Output Data

If `C=1`, the output file `mostenire.out` will contain on the first line the `N` digits of the initial password `X`, separated by spaces, in the order they appear in `X`, representing the answer to task 1.

If `C=2`, the output file `mostenire.out` will contain on the first line the natural number `Z`, and on the second line the distinct digits that appeared at the minimum position `Z`, representing the answer to task 2. These will be displayed in ascending order, separated by spaces.

## Constraints and Notes

- `1 <= N <= 10,000`
- The natural number `Q` consists of exactly 9 distinct nonzero digits
- The positions of digits in password `X` are numbered with consecutive distinct numbers `1, 2, ..., N`
- `1 <= K <= 100`
- For all pairs of modified positions: `S <= D`
- At least one digit from password `X` will be replaced
- For correctly solving task 1, 50 points are awarded
- For correctly solving task 2, 50 points are awarded

## Example 1

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

### Explanation

The initial password `X` is `2 7 3 5 4 1 3 3 7 9 2 8`.

## Example 2

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

### Explanation

Task is 2, `N=12`, `K=4`. `P=(1 4 7 1 3 4 7 1 4 8 1 8)`. The positions that appeared in the most subsequences are: 3, 4, 6, 7 => `Z=3`, and the distinct digits that successively occupied this position are `3`, `2`, `1`, `7`. These digits will be written to the file in ascending order.
