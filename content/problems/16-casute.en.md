---
title: Boxes
difficulty: hard
sort_order: 16
lang: en
concepts: [arrays, loops, conditions, file-io]
hints:
  - >-
    You cannot create an array of N elements when N can be up to 1 billion!
    Think about what alternative data structure you could use to store only
    the relevant intervals.
  - >-
    Notice that Q <= 3000. You can store only the positions that appear in
    operations and work with them as "events" on an axis. This reduces the
    required space.
  - >-
    Use a vector of pairs (position, value) to store the current state.
    For operation type 1, update the interval [st, dr). For operation
    type 2, look up the value at position pos.
  - >-
    For operation type 3, traverse all boxes in the interval [st, dr) and
    determine the maximum value and how many times it appears. Using
    coordinate compression, the interval contains at most 2*Q distinct points.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("casute.in");
  ofstream fout("casute.out");

  int main() {
      int N, Q;
      fin >> N >> Q;

      for (int i = 0; i < Q; i++) {
          int tip;
          fin >> tip;

          if (tip == 1) {
              int st, dr, nr;
              fin >> st >> dr >> nr;
              // Update the interval [st, dr) with value nr
          }

          if (tip == 2) {
              int poz;
              fin >> poz;
              // Output the value at position poz
          }

          if (tip == 3) {
              int st, dr;
              fin >> st >> dr;
              // Output how many times the maximum appears in interval [st, dr)
          }
      }

      return 0;
  }
solution_notes: >-
  N can be 10^9 but Q <= 3000, so you cannot allocate an array of N elements.
  Use coordinate compression: collect all distinct positions from operations,
  work on compressed intervals. For type 1, set the value on the compressed
  interval. For type 2, binary search for the position. For type 3, traverse
  the compressed interval and determine the maximum and its frequency.
---
There are `N` boxes (small squares), arranged in order from left to right, numbered from 1 to `N`. Inside each box we can write a natural number. Initially, we write the same number `0` in every box. We execute, in order, `Q` operations, which can be of three types:

- The first type of operation is encoded as `1 st dr nr` and means that in each box with indices from `st` (inclusive) to `dr` (exclusive), we erase the numbers that existed before and write the same number `nr` in their place.
- The second type of operation is encoded as `2 pos` and the result of the operation is the number found in the box with index `pos`.
- The third type of operation is encoded as `3 st dr` and the result of the operation is the number of occurrences of the largest value among the boxes with indices from `st` (inclusive) to `dr` (exclusive).

## Task

Determine the results of all operations of type 2 or 3, in the order they are executed.

## Input Data

The input file `casute.in` contains on the first line two natural numbers `N` and `Q` separated by a space, with the meaning from the statement. On each of the following `Q` lines are the encodings of the `Q` operations. Each line encoding an operation begins with a natural number representing the operation type, which can be 1, 2, or 3, followed by a space.

- If the operation type is 1, then three natural numbers separated by spaces follow: `st`, `dr`, and `nr`, with the meaning from the statement.
- If the operation type is 2, then a single natural number `pos` follows, with the meaning from the statement.
- If the operation type is 3, then two natural numbers separated by a space follow: `st` and `dr`, with the meaning from the statement.

## Output Data

The output file `casute.out` contains, for each operation of type 2 or 3, in the order they appear in the input file, on separate lines, a natural number representing the result of the corresponding operation.

## Constraints and Notes

- `Q <= 3000`;
- `N <= 1,000,000,000`;
- `1 <= st < dr <= N+1` for any operation of type 1 and 3;
- `1 <= pos <= N` for any operation of type 2;
- `1 <= nr <= 3000` for any operation of type 1;
- In the table below, we write `Op = {1, 2}` if there are only operations of types 1 and 2, or `Op = {1, 2, 3}` if there are operations of all types (1, 2, and 3);
- In the table below, we write `D = 1` if any of the values `st`, `dr`, and `pos` appear in only one operation, or `D = 0` if they can repeat.
- For 25 points, `N <= 3000`, `D = 0`, `Op = {1, 2}`
- For 25 points, `N <= 3000`, `D = 0`, `Op = {1, 2, 3}`
- For 25 points, `N <= 1,000,000,000`, `D = 1`, `Op = {1, 2}`
- For 15 points, `N <= 1,000,000,000`, `D = 1`, `Op = {1, 2, 3}`
- For 10 points, `N <= 1,000,000,000`, `D = 0`, `Op = {1, 2, 3}`

## Example:

`casute.in`

```
9 12
1 3 7 4
1 2 4 5
1 6 10 3
2 1
2 2
2 3
2 9
3 1 10
3 5 8
3 1 2
1 1 4 1
2 1
```

`casute.out`

```
0
5
5
3
2
1
1
1
```

### Explanation

There are `N = 9` boxes. Initially the numbers in all 9 boxes are: `0 0 0 0 0 0 0 0 0` (we write `0` in all positions).
After the first operation: `1 3 7 4`, the numbers become: `0 0 4 4 4 4 0 0 0` (we write `4` in positions `3`, `4`, `5`, and `6`).
After the second operation: `1 2 4 5`, the numbers become: `0 5 5 4 4 4 0 0 0` (we write `5` in positions `2` and `3`).
After the third operation: `1 6 10 3`, the numbers become: `0 5 5 4 4 3 3 3 3` (we write `3` in positions `6`, `7`, `8`, and `9`).
The result for the fourth operation: `2 1` is `0`.
The result for the fifth operation: `2 2` is `5`.
The result for the sixth operation: `2 3` is `5`.
The result for the seventh operation: `2 9` is `3`.
The result for the eighth operation: `3 1 10` is `2`, because the maximum among all boxes is `5` and it appears twice.
The result for the ninth operation: `3 5 8` is `1`, because the maximum among the boxes with values: `4 3 3` is `4` and it appears once.
The result for the tenth operation: `3 1 2` is `1`, because the maximum among the boxes with values: `0` is `0` and it appears once.
After the eleventh operation: `1 1 4 1`, the numbers become: `1 1 1 4 4 3 3 3 3` (we write `1` in positions `1`, `2`, and `3`).
The result for the twelfth operation: `2 1` is `1`.
