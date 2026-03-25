---
title: Numbers
difficulty: hard
sort_order: 17
lang: en
concepts: [loops, arithmetic, modulo, file-io]
hints:
  - >-
    Start by identifying all valid 3-digit prefixes. Which two-digit perfect
    squares have digits with different parities, and which prime digits can
    follow in the third position?
  - >-
    After fixing the first 3 digits, each subsequent digit must have different
    parity from its predecessor. How many choices do you have at each step?
    (Hint: there are 5 even digits and 5 odd digits.)
  - >-
    For task 1, once you know the valid 3-digit prefixes, you can calculate
    how many extensions exist without generating them all. If you have P valid
    prefixes and N-3 remaining digits, each with 5 choices, how many numbers
    do you get?
  - >-
    For task 2, you need to find the closest valid number to X. Generate all
    valid numbers with the same number of digits as X (there are
    P * 5^(len-3), a manageable number for len <= 18) and choose the one with
    the minimum distance.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("numere.in");
  ofstream fout("numere.out");

  int main() {
      int C;
      fin >> C;

      if (C == 1) {
          int N;
          fin >> N;
          // Determine how many N-digit numbers satisfy all three conditions
      }

      if (C == 2) {
          long long X;
          fin >> X;
          // Determine the closest number to X that satisfies the conditions
      }

      return 0;
  }
solution_notes: >-
  The two-digit perfect squares with alternating parities are: 16 (odd-even),
  25 (even-odd), 36 (odd-even), 49 (even-odd), 81 (even-odd). 64 is excluded
  (even-even). The prime digits are: 2, 3, 5, 7. For each perfect square, the
  third digit must be prime and of opposite parity to the second digit. This
  yields 9 valid 3-digit prefixes. For task 1: each prefix extends with N-3
  digits, each having 5 options (alternating parity). The answer is 9 * 5^(N-3).
  For task 2: generate all valid numbers with the same number of digits as X
  and choose the one with |number - X| minimum (at tie, the smallest).
---
Consider natural numbers that have at least 3 digits and that **simultaneously** satisfy the following conditions:

1. The first two digits (most significant) form a **perfect square** (for example: 16, 25, 36, 49, 64, 81).
2. The third digit is a **prime number** (2, 3, 5, or 7).
3. Any two **adjacent** digits have **different parities** (one even and one odd).

## Task

The input file `numere.in` contains on the first line a natural number `C` representing the task (1 or 2).

- If `C = 1`, the second line contains a natural number `N` (3 <= N <= 29). Determine **how many** natural numbers of exactly `N` digits simultaneously satisfy all three conditions above.
- If `C = 2`, the second line contains a natural number `X` that has at least 3 digits and at most 18 digits. Determine the closest number to `X` (in absolute value) that has the **same number of digits** as `X` and satisfies all three conditions. If there are two numbers at the same distance, choose the **smallest** one.

## Input Data

The input file `numere.in` contains:
- On the first line, the natural number `C` (1 or 2).
- On the second line, `N` (if `C = 1`) or `X` (if `C = 2`).

## Output Data

The output file `numere.out` contains a single number:
- If `C = 1`: the count of N-digit numbers that satisfy all conditions.
- If `C = 2`: the closest valid number to `X`.

## Constraints and Notes

- `C in {1, 2}`
- For `C = 1`: `3 <= N <= 29`
- For `C = 2`: `X` has between 3 and 18 digits
- The two-digit perfect squares are: 16, 25, 36, 49, 64, 81
- The prime digits are: 2, 3, 5, 7
- Two adjacent digits must have different parities (for example, if a digit is even, the next must be odd, and vice versa)
- For `C = 2`, if two numbers are at the same distance from `X`, output the smallest one

## Example 1

`numere.in`

```
1
3
```

`numere.out`

```
9
```

### Explanation

The two-digit perfect squares where the two digits have different parities are: **16** (1-odd, 6-even), **25** (2-even, 5-odd), **36** (3-odd, 6-even), **49** (4-even, 9-odd), **81** (8-even, 1-odd). 64 is excluded because 6 and 4 are both even.

For each, the third digit must be prime (2, 3, 5, or 7) and of opposite parity to the second digit:

| Prefix | c2 | c3 must be | Valid prime digits | Numbers |
|--------|----|------------|--------------------|---------|
| 16 | 6 (even) | odd | 3, 5, 7 | 163, 165, 167 |
| 25 | 5 (odd) | even | 2 | 252 |
| 36 | 6 (even) | odd | 3, 5, 7 | 363, 365, 367 |
| 49 | 9 (odd) | even | 2 | 492 |
| 81 | 1 (odd) | even | 2 | 812 |

Total: 3 + 1 + 3 + 1 + 1 = **9** numbers.

## Example 2

`numere.in`

```
1
4
```

`numere.out`

```
45
```

### Explanation

Each valid 3-digit number (there are 9) can be extended with a fourth digit that has different parity from the third. There are 5 digits of each parity (even: 0, 2, 4, 6, 8; odd: 1, 3, 5, 7, 9), so each 3-digit prefix extends in 5 ways. Total: 9 * 5 = **45**.

## Example 3

`numere.in`

```
2
200
```

`numere.out`

```
163
```

### Explanation

The closest valid 3-digit number to 200 is 163 (distance |200 - 163| = 37). The next closest candidate would be 252 (distance |200 - 252| = 52), so 163 is the answer.
