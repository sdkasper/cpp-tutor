---
title: Cuts
difficulty: hard
sort_order: 12
lang: en
concepts: [arrays, loops, for-loop, file-io]
hints:
  - >-
    Think greedy: is it more efficient to cut bars starting from the largest
    required length (8) down to the smallest (1), or the reverse? Why?
  - >-
    Top-down greedy approach: for each bar, allocate as much as you can for bars
    of length 8 first, then from the remainder for length 4, then 2, then 1.
    Leftovers from larger cuts can be used for smaller cuts.
  - >-
    Note: an unallocated bar of length 8 can be cut into 2 bars of length 4, or
    4 of length 2, etc. Keep track of the accumulated remainders at each level.
  - >-
    For each query, simulate independently: traverse the bars and distribute
    greedily. If at the end all 4 requirements are satisfied, the answer is 1.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("taieri.in");
  ofstream fout("taieri.out");

  int main() {
      int n;
      fin >> n;

      int bare[100001];
      for (int i = 0; i < n; i++)
          fin >> bare[i];

      int m;
      fin >> m;

      for (int q = 0; q < m; q++) {
          long long a, b, c, d;
          fin >> a >> b >> c >> d;

          // Determine if we can obtain a bars of 1, b of 2, c of 4, d of 8
      }

      return 0;
  }
solution_notes: >-
  For each query, traverse the bars and allocate greedily from length 8 down.
  From each bar, allocate as many bars of 8 as possible (min(bar/8, d_remaining)),
  the rest is used for bars of 4, then 2, then 1. Accumulate remainders. At the
  end, check if all requirements are satisfied.
---
We have `n` metal bars of the same thickness but different lengths. We can choose any bar and cut it, obtaining two bars of smaller lengths. We want, using only this operation (so without welding), to obtain a number of bars of certain given lengths. More precisely, given a set of four numbers `a`, `b`, `c`, `d`, we must decide whether we can obtain `a` bars of length `1`, `b` bars of length `2`, `c` bars of length `4`, and `d` bars of length `8`. Once a cut of length `L` is applied to a bar, the remainder can continue to be used to cut other bars of any of the desired lengths.

## Task

Given `n` -- the number of metal bars and the lengths of the `n` metal bars available, for each of the sets of four numbers `a b c d` given, determine whether, starting from the `n` given lengths, the bars of the desired lengths can be obtained.

## Input Data

The input file `taieri.in` contains on the first line the natural number `n`. On the second line are the `n` natural numbers representing the lengths of the initial bars. On the third line is a natural number `m` representing the number of sets of four numbers. On each of the next `m` lines are four natural numbers `a b c d` with the meaning described above. Numbers on the same line are separated by spaces.

## Output Data

The output file `taieri.out` will contain `m` values of `0` and `1`, separated by spaces. For each set of four numbers, in the order they appear in the input file, the value `1` is written if the desired number of bars for all four lengths can be obtained from the corresponding set, or `0` otherwise.

## Constraints and Notes

- Bar lengths are non-zero natural numbers at most `10,000,000`.
- `0 ≤ a, b, c, d ≤ 10,000,000`

## Example:

`taieri.in`

```
5
10 12 8 3 1
3
2 3 2 2
31 0 0 0
1 13 0 1
```

`taieri.out`

```
1 1 0
```

### Explanation

For the first set -- `2 3 2 2`, we need to obtain two bars of length `1`, three bars of length `2`, two of length `4`, and two of length `8`. We can cut the bar of length `10` into one of `8` and one of `2`. We already have the second bar of length `8`. We are left with bars of lengths: `2`, `12`, `3`, and `1`. The two bars of length `4` can be cut from the one of length `12`, leaving bars of lengths `2`, `4`, `3`, and `1`. For the 3 bars of length `2`, we can use the first bar and cut the second one in two, and the 4 bars of length `1` can be obtained using the bars with lengths `3` and `1` remaining.

For the second set -- `31 0 0 0`, we can obtain from the first bar `10` bars of length `1`, from the second `12` bars of length `1`, from the third `8` more bars of length `1`, and we already have the last bar of length `1`, so we can obtain the required `31` bars. Note that we didn't need to use the bar of length `3`. Note that we don't need to obtain bars of lengths `2`, `4`, `8`.

For the third set -- `1 13 0 1`, no matter how we cut the available bars, we cannot obtain the entire set of: one bar of length `1`, `13` bars of length `2`, and one bar of length `8`.
