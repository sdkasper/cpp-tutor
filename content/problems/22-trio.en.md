---
title: Trio
difficulty: medium
sort_order: 22
lang: en
concepts: [arrays, loops, nested-loops, file-io]
hints:
  - >-
    To compare pieces, encode each piece. Two pieces are identical if they
    have the same digits in the same order or in reverse order. You can
    normalize each piece by choosing the minimum of (C1,C2,C3) and (C3,C2,C1).
  - >-
    Two pieces are "friends" if they contain exactly the same digits,
    regardless of order. Sort the three digits of each piece and use the
    sorted combination as a group key.
  - >-
    For task 1, count the frequency of each normalized piece (identical)
    and report the maximum. For task 2, count how many distinct "friendship"
    keys (sorted digits) exist.
  - >-
    For task 3, you need to find the longest subsequence of consecutive pieces
    where the first and last are friends. Fix each piece as start and find
    the farthest piece that is a friend of it. Optimize with a map that stores
    the last occurrence of each friendship key.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("trio.in");
  ofstream fout("trio.out");

  int main() {
      int C, N;
      fin >> C >> N;

      int c1[100001], c2[100001], c3[100001];
      for (int i = 1; i <= N; i++)
          fin >> c1[i] >> c2[i] >> c3[i];

      if (C == 1) {
          // Determine the maximum number M of pieces identical to a chosen piece
      }

      if (C == 2) {
          // Determine the number of groups of friend pieces
      }

      if (C == 3) {
          // Determine the maximum length of a consecutive sequence
          // where the first and last pieces are friends
      }

      return 0;
  }
solution_notes: >-
  Normalize pieces: for identity use min((C1,C2,C3), (C3,C2,C1)), and for
  friendship sort the 3 digits. Task 1: maximum frequency of a normalized
  piece. Task 2: number of distinct friendship keys. Task 3: for each
  friendship key, store the first and last occurrence, and the maximum
  length is max(last - first + 1).
---

Trio is a game that contains `N` pieces of the same shape, placed one next to another on a game board and numbered from left to right with values from `1` to `N`. Each piece has three zones marked on it, and in each zone a digit is written. A piece on which the digits `C1`, `C2`, and `C3` are written from left to right has the following properties:

- It is **identical** to another piece if that piece contains exactly the same digits, in the same order or in reverse order. Thus, piece `C1|C2|C3` is identical to another piece of the form `C1|C2|C3` and to a piece of the form `C3|C2|C1`.
- It is a **friend** of another piece if that piece contains exactly the same digits as the given piece, but not necessarily in the same order. Thus, piece `C1|C2|C3` is a friend of the pieces: `C1|C2|C3`, `C1|C3|C2`, `C2|C1|C3`, `C2|C3|C1`, `C3|C1|C2`, and `C3|C2|C1`. Note that two identical pieces are also friends! A group of friend pieces consists of ALL pieces on the game board that are friends with each other.

## Task

1) Choose a piece from the game board such that the number `M` of pieces identical to it is as large as possible, and output the determined number `M`;

2) Output the number of groups of friend pieces existing on the game board;

3) Output the maximum number of pieces in a sequence of consecutive pieces on the game board for which the first piece and the last piece in the sequence are friends.

## Input Data

The input file `trio.in` contains:

- on the first line, a natural number `C` representing the task number, which can have values `1`, `2`, or `3`.
- on the second line, a natural number `N` representing the number of game pieces;
- on the following `N` lines, three digits each, separated by spaces, representing, in order, the digits written on each game piece. The pieces are given in the order of their numbering on the game board.

## Output Data

The output file `trio.out` will contain on the first line a single natural number representing the result determined according to each task.

## Constraints and Notes

- `2 <= N <= 100,000`
- There are at least two identical pieces on the game board
- A piece that is not a friend of any other piece on the game board forms a group by itself
- For solving task 1, `20` points are awarded; for task 2, `30` points; for task 3, `50` points

## Example 1

`trio.in`

```
1
6
1 3 3
4 5 9
1 3 3
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
2
```

### Explanation

Task 1 is solved. Choosing any of pieces `1`, `3`, or `5`, there are two pieces on the board identical to the chosen piece. Choosing any of pieces `2` or `4`, there is only one piece identical to the chosen piece. If we choose piece `6`, there are no pieces on the board identical to it.

## Example 2

`trio.in`

```
2
6
1 3 3
4 5 9
0 8 0
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
3
```

### Explanation

Task 2 is solved. Pieces `1` and `5` form a group of friend pieces. Pieces `2`, `4`, and `6` form another group. Piece `3` forms a group by itself. In total, there are `3` groups of friend pieces on the board.

## Example 3

`trio.in`

```
3
6
1 3 3
4 5 9
0 8 0
9 5 4
3 3 1
9 4 5
```

`trio.out`

```
5
```

### Explanation

Task 3 is solved. We identify two sequences of maximum length equal to `5` for which the first and last pieces are friends: `Piece 1 | Piece 2 | Piece 3 | Piece 4 | Piece 5` and `Piece 2 | Piece 3 | Piece 4 | Piece 5 | Piece 6`.
