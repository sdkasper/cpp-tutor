---
title: Children 1
difficulty: hard
sort_order: 23
lang: en
concepts: [arrays, loops, conditions, file-io]
hints:
  - >-
    For task 1, you need to compute X! (factorial), remove the trailing zeros,
    then output the last K digits. Trailing zeros come from factors of 2 and 5.
    How many trailing zeros does X! have?
  - >-
    You cannot compute X! directly (it's huge). Work modulo 10^K, but be
    careful to remove factors of 2 and 5 first, then add them back at the
    end (those in excess beyond the 2*5 pairs). Or compute the product
    removing factors of 10 as you go.
  - >-
    For task 2, a number has an odd number of divisors if and only if it is
    a perfect square. So Z must be the largest divisor of Y that is a
    perfect square.
  - >-
    Decompose Y into prime factors. Z is the product of each prime factor
    raised to the largest even power <= the exponent in Y. Then the number
    of divisors of Z is computed from the formula (e1+1)*(e2+1)*...
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("copii.in");
  ofstream fout("copii.out");

  int main() {
      int C;
      fin >> C;

      if (C == 1) {
          int X, K;
          fin >> X >> K;
          // Compute the last K digits of X! after removing trailing zeros
      }

      if (C == 2) {
          long long Y;
          fin >> Y;
          // Determine the largest divisor Z of Y with an odd number of divisors
          // and the number of divisors of Z
      }

      return 0;
  }
solution_notes: >-
  Task 1: compute X! modulo 10^K, removing factors of 2 and 5 that produce
  trailing zeros (count pairs min(v2, v5), remove them from the product, then
  reintroduce excess factors). Task 2: a number with an odd number of divisors
  is a perfect square, so Z is the largest perfect square that divides Y.
  Decompose Y into prime factors, truncate each exponent to the largest even
  value, and compute the product.
---

Iliuta and Pandele learned arithmetic operations with natural numbers at school. The two brothers practice operations using a board. Iliuta says a natural number `X`, and Pandele writes on the board the result of multiplying all natural numbers from `1` to `X`. As a joke, Iliuta erases the digits equal to `0` from the end of the number written by Pandele. To be forgiven, Pandele says a natural number `Y` and asks Iliuta to determine a natural number `Z` which is the largest divisor of `Y` having an odd number of divisors.

## Task

Given the numbers said by the children, write a program that solves the following tasks:

1) Output the last `K` digits of the product computed by Pandele, after erasing the digits equal to `0` from the end;
2) Output the number `Z` with the meaning above and the number of divisors of `Z`.

## Input Data

The input file `copii.in` contains on the first line the number `C`, which represents the task number and can only have values `1` or `2`. For the first task, the file contains the number `X` on the second line and the number `K` on the third line. For the second task, the file contains the number `Y` on the second line.

## Output Data

For task 1, the first line of the output file `copii.out` will contain the `K` requested digits, without spaces, from left to right. For task 2, the first line will contain, in this order, the determined number `Z` and the number of divisors of `Z`. The numbers will be separated by a space.

## Constraints and Notes

- `1 <= X <= 10^6`
- `1 <= Y <= 10^12`
- `1 <= K <= 9`
- The number remaining after erasing the trailing zeros of the product has at least `K` digits
- For correctly solving the first task, `40` points are awarded
- For correctly solving the second task, `60` points are awarded

## Example 1

`copii.in`

```
1
12
3
```

`copii.out`

```
016
```

### Explanation

The product `1*2*3*4*5*6*7*8*9*10*11*12 = 479001600`. After erasing the trailing zeros, the last `3` digits are `016`.

## Example 2

`copii.in`

```
2
14641
```

`copii.out`

```
14641 5
```

### Explanation

The largest divisor of `14641` that has an odd number of divisors is `14641` itself.

## Example 3

`copii.in`

```
1
723432
9
```

`copii.out`

```
813433856
```

### Explanation

After erasing the trailing zeros of the product, the last `9` digits are `813433856`.

## Example 4

`copii.in`

```
2
573194962208
```

`copii.out`

```
286597481104 105
```

### Explanation

The largest divisor with an odd number of divisors is `286597481104`, which has `105` divisors.
