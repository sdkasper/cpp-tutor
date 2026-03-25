---
title: Puzzle 1
difficulty: hard
sort_order: 15
lang: en
concepts: [2d-arrays, loops, nested-loops, file-io]
hints:
  - >-
    Two pieces can be glued if they have at least 3 common digits. Think about
    how to check this efficiently -- count the frequency of distinct digits in
    each number.
  - >-
    Use a 10-element array (for digits 0-9) to mark the distinct digits of each
    number. The intersection of two such arrays gives you the common digits.
  - >-
    When gluing two labels: the first 4 digits of the first + the last 4 digits
    of the second (or fewer if they don't have 4 digits). Work with strings for
    easy manipulation.
  - >-
    For task 2, sort the groups: first descending by the number of distinct
    digits in the label, then ascending by label value. Select the first K.
starter_code: |
  #include <fstream>
  #include <cstring>
  using namespace std;

  ifstream fin("puzzle.in");
  ofstream fout("puzzle.out");

  int main() {
      int C, N, K;
      fin >> C >> N >> K;

      // Read the N numbers from the labels

      if (C == 1) {
          // Determine the number of groups G
      }

      if (C == 2) {
          // Determine the K labels chosen by Maria
      }

      return 0;
  }
solution_notes: >-
  Traverse pieces in order. For each piece, check if it can be glued to the
  current group (>=3 common digits, comparing distinct digits). If yes, update
  the group label (first 4 digits of current label + last 4 of new piece). If
  not, finalize the current group and start a new one. For task 2, sort labels
  descending by number of distinct digits, then ascending by value, and display
  the first K.
---
Maria received a box of puzzle pieces as a birthday gift, labeled with natural numbers. To solve it, she must glue pieces together, in the order she extracts them from the box, forming as many groups as possible.

Two puzzle pieces can be glued together if the numbers on their labels have at least three common digits. When gluing two pieces, a group of pieces is obtained which will be labeled with the number formed by concatenating the first four digits of the first label with the last four digits of the second label (if the numbers on the labels don't have at least four digits, only the existing ones are kept without adding others). A piece can be glued to another piece or to a previously created group of pieces (if one exists), or it can form a group by itself.

For example, if the labels have the numbers `133454` and `3523143`, we can glue the two pieces because they have five common digits (one digit `1`, two digits `3`, one digit `4`, and one digit `5`). After gluing, we obtain a group with label `13343143`.

To solve the game, Maria extracts pieces one by one from the box. If a piece can be glued to the last formed group, she glues it and updates the group's label; otherwise, she sets aside that group and begins forming a new group starting with the extracted piece.

After forming the groups, Maria chooses group labels in the following order: first she chooses the label with the maximum number of distinct digits. If there are multiple, she chooses the one with the smallest value. From the remaining labels, she chooses the next label by the same rule. She continues until she has chosen `K` labels.

Given the `N` natural numbers on the piece labels, in the order they are extracted from the box, determine:

## Task

1\. The number of groups Maria obtains after solving the puzzle game;
2\. The `K` numbers written on the group labels chosen by Maria.

## Input Data

The input file `puzzle.in` contains on the first line, separated by spaces, `C`, `N`, and `K`, where `C` is the task to be solved, `N` is the number of game pieces, and `K` is the number of values required for task 2. On the next line, separated by spaces, are the `N` numbers on the piece labels, in the order they are extracted from the box.

## Output Data

If the task is `1`, the output file `puzzle.out` will contain on the first line a natural number `G`, representing the number of groups obtained after finishing the game.

If the task is `2`, the first line of the output file `puzzle.out` will contain, separated by spaces, the `K` numbers on the group labels chosen by Maria.

## Constraints and Notes

- `1 ≤ C ≤ 2`
- `1 ≤ N ≤ 100,000`
- `1 ≤ K ≤ 10`
- Numbers on piece labels are natural numbers with at most nine digits;
- For all test data, a solution exists.
- For 53 points, `C = 1`
- For 7 points, `C = 2`, `K = 1`
- For 13 points, `C = 2`, `K = 2`
- For 27 points, `C = 2`, `K > 2`

## Example 1:

`puzzle.in`

```
1 6 1
13345 23143 4343 784532 432 7826
```

`puzzle.out`

```
2
```

### Explanation

The piece with label `13345` can be glued with the piece with label `23143`, thus forming a group with label `13343143`, to which the piece with label `4343` can be glued, obtaining `13344343`, which can no longer be glued with the next piece with label `784532`, but this piece will be glued with the piece labeled `432`, obtaining `7845432`, which then glues with piece `7826`, and we get the second group label `78457826`.

## Example 2:

`puzzle.in`

```
2 6 1
13345 23143 4343 784532 432 7826
```

`puzzle.out`

```
78457826
```

### Explanation

After grouping the pieces, we obtain two groups labeled `13344343` and `78457826` respectively. Of these, `78457826` has `6` distinct digits, while `13344343` has only `3` distinct digits. So the sought value is `78457826`.
