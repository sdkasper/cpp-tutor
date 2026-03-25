---
title: Rotation 25
difficulty: medium
sort_order: 9
lang: en
concepts: [loops, while-loop, modulo, file-io]
hints:
  - >-
    For task 1, you don't need to compute X^K completely. Think: the last digit
    of a power depends only on the last digit of the base. What property do the
    last digits of powers have?
  - >-
    The last digits of powers repeat cyclically (with period at most 4).
    Compute K mod period to find the last digit without computing X^K.
  - >-
    For task 2, apply the transformations step by step. But K can be very
    large (10^9)! Notice that the resulting numbers will eventually repeat --
    look for the cycle.
  - >-
    Simulate the transformations and store each result. When you encounter a
    number already seen, you've found the cycle. Use K mod cycle_length to
    jump directly to the answer.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("rotire25.in");
  ofstream fout("rotire25.out");

  int main() {
      int C, X, K;
      fin >> C >> X >> K;

      if (C == 1) {
          // Determine the product of the last digit of X^K and the first digit of X
      }

      if (C == 2) {
          // Determine the number resulting after K transformations
      }

      return 0;
  }
solution_notes: >-
  Task 1: the last digit of X^K is obtained from the cyclicity of the last digit
  (period max 4). Task 2: simulate the transformations (multiply, remove zeros,
  reverse) and detect the cycle; then use K mod cycle_length to determine the
  final result.
---
George received the following math homework problem. Given a number `X`, the following transformations can be applied to it:

1) In this order (all 3 steps constitute one transformation):

- multiply the number by `5` (for example: `X=416` becomes `416*5=2080`)
- remove all zeros from the number (`2080` becomes `28`)
- reverse the number (`28` becomes `82`)

2) In this order (all 3 steps constitute one transformation):

- multiply the number by `2` (for example: `X=32` becomes `32*2=64`)
- remove all zeros from the number (`64` stays `64`)
- reverse the number (`64` becomes `46`)

George must alternately apply the two transformations to the number `X`. First he applies transformation `1`, then on the result he applies transformation `2`, then transformation `1` again on the result, then transformation `2` again, and so on. George must apply exactly `K` transformations to the number `X`, in the order described above.

## Task

Given the numbers `X` and `K`, determine:
1) The product of the last digit of `X * X * X * ... * X` (K times) and the first digit of `X`.
2) The number resulting after applying the `K` transformations.

## Input Data

The first line of the input file `rotire25.in` contains three space-separated numbers `C`, `X`, and `K`. If `C=1`, only the first task is solved; if `C=2`, only the second task is solved.

## Output Data

The output file `rotire25.out` will contain a single number. If `C = 1`, this number is the result for the first task; if `C = 2`, this number is the result for the second task.

## Constraints and Notes

- `1 ≤ X ≤ 999`
- `1 ≤ K ≤ 1,000,000,000`
- For tests worth `29` points, `C = 1`.
- For tests worth `71` points, `C = 2`.

## Example 1:

`rotire25.in`

```
1 27 3
```

`rotire25.out`

```
6
```

### Explanation

Task 1 is solved: `X = 27`, `K = 3`. `27 * 27 * 27 = 19683` -> the last digit is `3`. The first digit of `27` is `2`, so the result is `2 * 3 = 6`.

## Example 2:

`rotire25.in`

```
2 13 3
```

`rotire25.out`

```
551
```

### Explanation

Task 2 is solved: `X = 13`, `K = 3`. The following transformations are applied:

- `13 * 5 = 65`, remove zeros and reverse -> `56`
- `56 * 2 = 112`, remove zeros and reverse -> `211`
- `211 * 5 = 1055`, remove zeros -> `155`, reverse -> `551`

## Example 3:

`rotire25.in`

```
2 42 1782321
```

`rotire25.out`

```
12
```

### Explanation

Task 2 is solved: `X = 42`, `K = 1782321`. After performing all `K` transformations, the result is `12`.
