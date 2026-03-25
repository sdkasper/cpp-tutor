---
title: Colors 6
difficulty: medium
sort_order: 8
lang: en
concepts: [2d-arrays, loops, nested-loops, file-io, strings]
hints:
  - >-
    For task 1, think about how to check if a row has all adjacent squares of
    different colors. What comparison do you make at each step?
  - >-
    Traverse each row and compare the current element with the previous one. If
    they are never equal, the row has the required property. Maintain the maximum
    length and a counter.
  - >-
    For task 2, you need to compare numbers formed by concatenating the digits.
    Be careful: you cannot convert directly to int if there are many digits --
    compare as strings.
  - >-
    When comparing as strings: first compare the length (longer = larger),
    and for equal lengths compare lexicographically.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("culori.in");
  ofstream fout("culori.out");

  int main() {
      int C, N;
      fin >> C >> N;

      if (C == 1) {
          // Determine Lmax and Kmax
      }

      if (C == 2) {
          // Determine the largest number formed from the digits of a row
      }

      return 0;
  }
solution_notes: >-
  Task 1: for each row, check if any two consecutive elements are different; if
  so, compare the length with Lmax. Task 2: concatenate the digits of each row
  into a string, then compare the strings (length, then lexicographically) to
  find the maximum.
---
On a sheet from a math notebook, there are `N` rows of squares that Andrei has numbered from top to bottom with values from `1` to `N`. On each row, Andrei colors one or more squares using a set of `9` pencils of different colors, coded with distinct values from `1` to `9`. For each row of the notebook, Andrei decides a number of adjacent squares to color and proceeds as follows: he chooses a pencil to color the first square (the leftmost on his sheet), then does the same for the second square and so on until he finishes coloring the number of squares he decided for that row (there may be two or more squares colored the same). The length of a row is thus determined by the number of all colored squares on that row.

*Figure: A notebook with rows of squares colored with digits 1-9, numbered from top to bottom.*

## Task

Given the number `N` of rows with squares, the number of colored squares on each row, and the color of each square, write a program that determines:

- `Lmax` and `Kmax`, two natural numbers, where `Lmax` represents the maximum length of a row that has the property that any two adjacent squares have different colors, and `Kmax` represents how many such rows are on the sheet.
- The largest natural number that can be formed by concatenating all the digits corresponding to the colors on the same row, traversed from left to right.

## Input Data

The input file `culori.in` contains on the first line two natural numbers `C` and `N`, where `C` represents the task number and can have values `1` or `2`, and `N` represents the number of rows in the notebook colored by Andrei. On each of the next `N` lines, natural numbers separated by spaces. Each line corresponds to a row of the notebook sheet, in the order of row numbering. The first number on each line represents the number of squares colored by Andrei on that row, followed by the color codes used for coloring the squares on that row, each corresponding to a square, in order, starting with the first on that row (the leftmost) to the last on that row (the rightmost).

## Output Data

The output file `culori.out` will contain on the first line:

- for task `1`, two natural numbers `Lmax` and `Kmax`, in this order, separated by a space;
- for task `2`, a single natural number determined according to the task.

## Constraints and Notes

- `1 ≤ N ≤ 10,000`;
- `1 ≤ number of colored squares per row ≤ 500`;
- for correctly solving the first task, `27` points are awarded, and for correctly solving the second task, `73` points are awarded;

## Example 1:

`culori.in`

```
1 7
6 4 2 3 1 1 1
5 7 2 3 9 3
2 4 4
6 2 2 7 1 7 7
1 3
4 9 9 9 9
5 7 2 7 2 7
```

`culori.out`

```
5 2
```

### Explanation

The example corresponds to the figure above. Task `1` is solved. Rows `2`, `5`, and `7` have the property from the task. The length of row `2` is `5`, of row `5` is `1`, and of row `7` is `5`, so the maximum row length is `5` and there are `2` rows of this length. `Lmax=5` and `Kmax=2`.

## Example 2:

`culori.in`

```
2 7
6 4 2 3 1 1 1
5 7 2 3 9 3
2 4 4
6 2 2 7 1 7 7
1 3
4 9 9 9 9
5 7 2 7 2 7
```

`culori.out`

```
423111
```

### Explanation

Task 2 is solved. The natural numbers constructed from the digits of each row are: `423111`, `72393`, `44`, `227177`, `3`, `9999`, and `72727`. The largest among them is `423111`.
