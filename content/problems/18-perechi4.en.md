---
title: Pairs 4
difficulty: medium
sort_order: 18
lang: en
concepts: [arrays, loops, nested-loops, file-io]
hints:
  - >-
    Think about remainders when dividing by K. If an element has remainder r,
    what remainder must its pair have so that their sum is divisible by K?
  - >-
    For task 1, calculate the remainder of X when divided by K. Then find the
    minimum element in the array whose remainder complements X's remainder to K.
    Don't forget: if Y appears multiple times, choose the rightmost position.
  - >-
    For task 2, count how many elements have each possible remainder (0, 1, ...,
    K-1). Pairs are formed between remainder r and remainder K-r. What happens
    with remainder 0? And with remainder K/2 when K is even?
  - >-
    For each group of complementary remainders, you can form min(count[r],
    count[K-r]) pairs. The remaining unpaired elements must be eliminated.
    Pay special attention to remainder 0 (pairs among themselves) and K/2.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("perechi.in");
  ofstream fout("perechi.out");

  int main() {
      int C, N, K;
      fin >> C >> N >> K;

      int a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          // Determine the rightmost position of the smallest Y
          // such that (a[1] + Y) % K == 0
      }

      if (C == 2) {
          // Determine the minimum number of elements to remove
          // to form pairs with sum divisible by K
      }

      return 0;
  }
solution_notes: >-
  For task 1, compute the required remainder (K - a[1] % K) % K and traverse
  the array looking for the minimum element with that remainder, keeping the
  rightmost position. For task 2, build a frequency array of remainders
  modulo K, then form pairs between complementary remainders (r and K-r),
  treating remainder 0 separately and, if K is even, remainder K/2.
---

Gigel received an interesting task: given an array of `N` natural numbers and a natural number `K`. Help Gigel solve the following two tasks.

## Task

1) Let `X` be the first number in the array. Determine the position of the smallest number `Y` that belongs to the array, such that the sum of the two numbers `X` and `Y` is divisible by `K`. If the value `Y` with the stated property appears multiple times in the array, the rightmost position is considered. There is at least one such number `Y` in the array.

2) Determine the minimum number of elements that must be removed from the array so that the remaining elements can be grouped into disjoint pairs (each remaining element belongs to exactly one pair), with the property that the sum of the two values in each pair is divisible by `K`.

## Input Data

The input file `perechi.in` contains:

- on the first line, a natural number `C` representing the task to solve (`C` = `1` or `C` = `2`);
- on the second line, two natural numbers `N` and `K`, with the meaning from the statement;
- on the third line, `N` natural numbers, representing the elements of the array.

Numbers on the same line are separated by spaces.

## Output Data

The output file `perechi.out` contains on the first line a natural number, representing the number determined according to task `C`.

## Constraints and Notes

- `2 <= N <= 100,000`
- `1 <= K <= 100,000`
- All elements of the array have values between `0` and `1,000,000,000`
- For `C = 1`, the position of the first element `X` does not coincide with the position of `Y`
- A pair consists of exactly two elements
- For 31 points, `C = 1`
- For 69 points, `C = 2`

## Example 1

`perechi.in`

```
1
7 3
2 3 4 5 1 1 2
```

`perechi.out`

```
6
```

### Explanation

`C = 1`, `N = 7`, `K = 3`, the array is `[2, 3, 4, 5, 1, 1, 2]`, and `X = 2`. The values of `Y` in the array for which `(X + Y) % 3 = 0` are: `4` (position `3`, because `2 + 4 = 6`) and `1` (positions `5` and `6`, because `2 + 1 = 3`). Thus, the minimum required value with the stated property is `Y` = `1`, and its rightmost position is 6.

## Example 2

`perechi.in`

```
2
4 4
1 2 3 4
```

`perechi.out`

```
2
```

### Explanation

`C = 2`, `N = 4`, `K = 4`, the array is `[1, 2, 3, 4]`. If we remove elements `2` and `4`, the remaining `1` and `3` form a pair with sum `1 + 3 = 4`, divisible by `4`. Thus, the answer is `2`.

## Example 3

`perechi.in`

```
2
6 2
2 4 6 8 10 12
```

`perechi.out`

```
0
```

### Explanation

`C = 2`, `N = 6`, `K = 2`, the array is `[2, 4, 6, 8, 10, 12]`. The pairs `(2, 4)`, `(6, 8)`, `(10, 12)` can be formed, with sums `6`, `14`, `22`, each divisible by `2`. Thus, the answer is `0`.
