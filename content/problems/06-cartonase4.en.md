---
title: Cards 4
difficulty: hard
sort_order: 6
lang: en
concepts: [arrays, loops, for-loop, file-io]
hints:
  - >-
    Think about how you can efficiently check whether the first p cards contain
    all values from 1 to p. What data structure would help?
  - >-
    For task 1, traverse the cards from left to right and count how many have a
    value smaller than the value at position poz.
  - >-
    For tasks 2 and 3, maintain a running maximum of the values seen as you
    traverse the sequence. If the maximum at position p equals p, then the first
    p cards contain exactly the values 1..p.
  - >-
    For task 3, compare the maximum with p: if max == p, you have all values
    1..p (task 2). If max == p+1 or exactly one value is missing, you have p-1
    values from 1..p (task 3).
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("cartonase.in");
  ofstream fout("cartonase.out");

  int main() {
      int C, N;
      fin >> C >> N;

      int a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          int poz;
          fin >> poz;
          // Determine r according to task 1
      }

      if (C == 2) {
          // Determine all values p according to task 2
      }

      if (C == 3) {
          // Determine all values p according to task 3
      }

      return 0;
  }
solution_notes: >-
  Task 1: traverse from 1 to poz-1, count how many a[i] < a[poz], r = the last
  index where all predecessors are smaller. Tasks 2/3: maintain the prefix
  maximum; if max[p]==p then the first p values contain exactly 1..p (task 2);
  for task 3, check if exactly one value from 1..p is missing.
---
Maria has `N` cards numbered from `1` to `N`, on which all distinct natural values from `1` to `N` are written, not necessarily in order.

## Task

Maria poses the following types of tasks to Petru:

1) I give you a number `poz` and you must determine the card numbered with the largest value `r` such that the first `r` cards in the sequence have a value strictly less than the value written on the card numbered `poz`. If no such card exists, `r` is set to `0`.
2) Determine all values `p` with the property that the first `p` cards contain all natural numbers from `1` to `p`.
3) Determine all values `p` with the property that the first `p` cards contain exactly `p-1` of the natural numbers from `1` to `p`.

## Input Data

The input file `cartonase.in` contains:

- on the first line, the number `C`, representing the task to solve (`1`, `2`, or `3`);
- on the second line, the number `N`, with the meaning from the statement;
- on the third line, separated by spaces, `N` distinct natural values between `1` and `N`, representing the values written on the cards in their sequence order after shuffling;
- if `C = 1`, on the fourth line, the value `poz`.

## Output Data

The output file `cartonase.out` will contain:

- If `C = 1`, the output file will contain the value `r` with the meaning from the statement.
- If `C = 2` or `C = 3`, the output file will display, separated by spaces, the values of `p` that satisfy the conditions of the corresponding task, in ascending order. It is guaranteed that at least one such value exists.

## Constraints and Notes

- `1 ≤ C ≤ 3`
- `1 ≤ N ≤ 100,000`
- `1 ≤ poz ≤ N`
- For 23 points, `C = 1`
- For 41 points, `C = 2`
- For 36 points, `C = 3`

## Example 1

`cartonase.in`

```
1
6
3 1 6 2 4 5
5
```

`cartonase.out`

```
2
```

### Explanation

`C = 1`, `poz = 5`, on card `5` the value is `4`. The first two cards in the given sequence have values less than `4`, while the third has a larger value.

## Example 2

`cartonase.in`

```
2
6
3 1 2 6 4 5
```

`cartonase.out`

```
3 6
```

### Explanation

`C = 2`, the first `3` cards contain the values `1`, `2`, `3`, and also the first `6` cards contain the values `1`, `2`, `3`, `4`, `5`, `6`.

## Example 3

`cartonase.in`

```
3
6
3 1 2 6 5 4
```

`cartonase.out`

```
1 2 4 5
```

### Explanation

`C = 3`, on the first card (`p = 1`) there are `p - 1 = 0` values according to the task. On the first `p = 2` cards there are `p - 1 = 1` values according to the task (1). On the first `p = 3` cards there are `3` values according to the task (1, 2, 3). On the first `p = 4` cards there are `p - 1 = 3` values according to the task `(1, 2, 3)`. On the first `p = 5` cards there are `p - 1 = 4` values according to the task `(1, 2, 3, 5)`. On the first `p = 6` cards there are `6` values according to the task `(1, 2, 3, 4, 5, 6)`.

**Think about:** How can you efficiently determine, for each prefix of length p, whether it contains all values from 1 to p? What information do you need to maintain as you traverse the sequence?
