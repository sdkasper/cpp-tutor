---
title: Dew
difficulty: hard
sort_order: 28
lang: en
concepts: [2d-arrays, loops, nested-loops, conditions, file-io]
hints:
  - >-
    A "dew" sequence of length R contains exactly R-1 characters 'r' and
    exactly one character from {'g', 'v', 'a'}. For task 1, traverse each
    window of R consecutive characters and check if it is a dew sequence.
  - >-
    To quickly check if a window is a dew sequence, count how many characters
    are different from 'r'. If exactly one is not 'r', it is a dew sequence.
    Use a sliding counter when moving the window.
  - >-
    For task 2, think about the structure of an R-beautiful coloring. If ANY
    R consecutive characters form a dew sequence, then at most one position
    in each R consecutive positions can be non-red. What constraints does this
    impose on the placement of non-red colors?
  - >-
    In an R-beautiful coloring, between any two non-red positions there must
    be at least R-1 red positions. So non-red positions are at distance >= R-1.
    Count how many ways to place these positions and how many color choices (3)
    you have at each. Note: the result can have thousands of digits -- use
    big number arithmetic.
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
          // Count how many dew sequences of length R exist in the coloring
      }

      if (C == 2) {
          // Calculate the total number of R-beautiful colorings for N eggs
          // Note: the result can have thousands of digits!
      }

      return 0;
  }
solution_notes: >-
  Task 1: sliding window of length R, counting non-'r' characters. If exactly
  1 character is not 'r', the window is a dew sequence. Task 2: in an
  R-beautiful coloring, non-red positions are at distance >= R-1 from each
  other. Count the combinations of placing 0, 1, 2, ... non-red positions
  among the N positions respecting the minimum distance, multiplied by
  3^(number of non-red positions). The result requires big number arithmetic
  (BigNum).
---

A child wants to paint Easter eggs, having available paints of colors red, yellow, green, and blue. Each color will be represented by a single character as follows: `'r'` for red, `'g'` for yellow, `'v'` for green, `'a'` for blue. To paint the eggs, they are arranged in a row, one after another. Thus, a coloring will be a sequence of `N` characters from the set `{'r', 'g', 'v', 'a'}`, representing, in order, the colors of the `N` eggs.

We call **"dew"** a sequence of `R` characters with the property that among them exactly `R-1` characters represent the red color, and one character represents one of the other `3` colors. For example, the dew sequences of length `3` are `"grr"`, `"rgr"`, `"rrg"`, `"vrr"`, `"rvr"`, `"rrv"`, `"arr"`, `"rar"`, `"rra"`.

The child considers that a coloring is **R-beautiful** if any `R` consecutive characters from the coloring form a dew sequence. For example, for `N=11` eggs, the string `"arrrvrrrarr"` represents a **4-beautiful** coloring.

## Task

Given `N`, the number of painted eggs, and the natural number `R`, write a program that determines and outputs:

1. the number of **"dew"** sequences of length `R` existing in the coloring of the `N` eggs;
2. the total number of `R`-beautiful colorings for the `N` eggs.

## Input Data

The input file `roua.in` contains on the first line a natural number `C` representing the task from the problem to be solved (`1` or `2`). The second line of the file contains the natural numbers `N` and `R`, separated by a space, representing the number of eggs and the length of a "dew" sequence. If `C=1`, the file will also contain a third line with the coloring of the `N` eggs.

## Output Data

The output file `roua.out` will contain a single line with a natural number, representing the answer to the task specified in the input file.

## Constraints and Notes

- `3 <= N <= 10000`
- `2 <= R < N`
- For correctly solving task 1, 40 points are awarded
- For correctly solving task 2, 60 points are awarded
- For 60% of the tests for task 2, `3 <= N <= 70`
- For 40% of the tests for task 2, `N > 70`
- The result for task 2 can have at most `2400` digits

## Example 1

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

### Explanation

Task is 1. There are `N=7` eggs. The dew sequences of length `3` existing in the coloring are `"vrr"`, `"rrg"`, `"rgr"`, `"grr"`.

## Example 2

`roua.in`

```
2
4 3
```

`roua.out`

```
15
```

### Explanation

Task is 2. There are `4` eggs. The `3`-beautiful colorings of the `4` eggs are `"grrg"`, `"grrv"`, `"grra"`, `"vrrg"`, `"vrrv"`, `"vrra"`, `"arrg"`, `"arrv"`, `"arra"`, `"rgrr"`, `"rvrr"`, `"rarr"`, `"rrgr"`, `"rrvr"`, `"rrar"`.
