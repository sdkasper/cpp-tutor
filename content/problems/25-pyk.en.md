---
title: PYK
difficulty: hard
sort_order: 25
lang: en
concepts: [strings, loops, conditions, file-io]
hints:
  - >-
    For task 1, a number is formed only of identical digits if all its digits
    are equal (e.g., 4, 88, 999, 1111). Traverse each number in the array
    and check this property.
  - >-
    For task 2, we need P = y * x1 * x2 * ... * xn to be a k-th power,
    meaning P = z^k. Think about the prime factorization of the product
    x1 * x2 * ... * xn.
  - >-
    If the product X has decomposition p1^e1 * p2^e2 * ..., then P = y * X
    is a k-th power if all exponents in P are multiples of k. So y must
    complete each exponent to the smallest multiple of k >= ei.
  - >-
    For each prime factor pi with exponent ei in X, y must contribute
    (k - ei % k) % k to that factor. Compute the decomposition of the
    product step by step, using a sieve or direct factorization.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("pyk.in");
  ofstream fout("pyk.out");

  int main() {
      int C, k, n;
      fin >> C >> k >> n;

      int x[50001];
      for (int i = 1; i <= n; i++)
          fin >> x[i];

      if (C == 1) {
          // Find the smallest and largest number formed only of identical digits
      }

      if (C == 2) {
          // Decompose the product into prime factors
          // Determine the smallest y >= 2 that makes the product a k-th power
          // Output the decomposition of y
      }

      return 0;
  }
solution_notes: >-
  Task 1: check each number if all its digits are equal, then keep the minimum
  and maximum. Task 2: decompose each xi into prime factors, accumulating total
  exponents. For each prime factor, y must complete the exponent to the nearest
  multiple of k. y is the product of these completions. If the product is
  already a k-th power, y = the smallest prime raised to the k-th power (y >= 2).
---

Let `k`, `n`, and `y` be three natural numbers. Let `X` be an array of `n` natural numbers: x1, x2, x3, ..., xn. Let `P` be the product of the numbers y, x1, x2, x3, ..., xn, that is P = y * x1 * x2 * x3 * ... * xn. The number `P` is a **"k-th power"** if there exists a natural number `z` such that P = z^k.

## Task

Write a program that reads the numbers k, n, x1, x2, x3, ..., xn and determines:

1. The **smallest** and **largest** number from the array `X` that are formed only of identical digits;
2. The **prime factorization of the smallest** natural number `y` (`y >= 2`) with the property that the number P = y * x1 * x2 * x3 * ... * xn is a **"k-th power"**.

## Input Data

The input file `pyk.in` contains:

- on the first line, a natural number `C`, representing the task from the problem to be solved (`1` or `2`);
- on the second line, the natural numbers `k` and `n`, separated by a single space;
- on the third line, the `n` natural numbers x1, x2, x3, ..., xn, separated by single spaces.

## Output Data

If `C=1`, then the first line of the output file `pyk.out` will contain two natural numbers, separated by a single space, representing the answer to task 1 of the problem. If no such numbers exist, the first line of the file will contain the value `1`.

If `C=2`, then the output file `pyk.out` will contain:

- on the first line, a natural number `m` representing the number of distinct prime factors in the prime factorization of the number `y`, determined when solving task 2;
- on each of the following `m` lines (one line for each prime factor in the prime factorization of `y`), two values `F` and `E`, separated by a single space, representing the prime factor `F` and the exponent `E` of this factor in the prime factorization of `y`.

The prime factors will be written to the file in ascending order of their values.

## Constraints and Notes

- `2 <= n <= 50,000`
- `2 <= k <= 100`
- `2 <= x1, x2, x3, ..., xn <= 10,000`
- `2 <= y`
- For correctly solving task 1, `10` points are awarded
- For correctly solving task 2, `90` points are awarded

## Example 1

`pyk.in`

```
1
2 7
122 1111 5 4 88 123 999
```

`pyk.out`

```
4 1111
```

### Explanation

Task is `1`, `k=2`, `n=7`. The numbers in array `X` formed only of identical digits are: `1111`, `5`, `4`, `88`, `999`. The smallest among these is `4`, and the largest is `1111`.

## Example 2

`pyk.in`

```
2
3 6
12 5 60 125 4 36
```

`pyk.out`

```
3
2 1
3 2
5 1
```

### Explanation

Task is `2`, `k=3`, `n=6`. The product of the `6` numbers in the array is: `12*5*60*125*4*36 = 64800000`. `y=90` is the smallest value for which `P = 90 * 64800000 = 5832000000` becomes a "k-th power". The prime factorization of `y` contains `m=3` distinct prime factors: 2^1 * 3^2 * 5^1.
