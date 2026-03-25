---
title: Prime 1
difficulty: hard
sort_order: 27
lang: en
concepts: [loops, arithmetic, modulo, conditions, file-io]
hints:
  - >-
    For task 1, you need to check if a number is both prime and belongs to the
    Fibonacci sequence. Generate all Fibonacci numbers up to 10^7 (there are
    few), then check for each number in the sequence if it is prime and appears
    in the Fibonacci list.
  - >-
    For task 2, a number is "economic" if it has more digits than its prime
    factorization (writing each factor and the exponent only if > 1). Compare
    len(n) with len(factorization).
  - >-
    For task 2, watch out for large numbers (up to 10^14). Direct factorization
    works if you iterate only up to sqrt(n). If a factor > 1 remains, it is
    prime.
  - >-
    For task 3, check if a number can be written as a sum of two primes. By
    Goldbach's conjecture, even numbers > 2 can be written as a sum of two
    primes. But odd numbers? An odd number = 2 + (odd-2); check if odd-2 is
    prime.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("prime1.in");
  ofstream fout("prime1.out");

  int main() {
      int c, n;
      fin >> c >> n;

      long long a[51];
      for (int i = 1; i <= n; i++)
          fin >> a[i];

      if (c == 1) {
          // Count how many numbers are Fibonacci primes
      }

      if (c == 2) {
          // Count how many numbers are economic
      }

      if (c == 3) {
          // Count how many numbers CANNOT be written as a sum of two primes
      }

      return 0;
  }
solution_notes: >-
  Task 1: generate Fibonacci numbers up to 10^7 into a set, then check each
  element if it is prime and in the set. Task 2: factorize each number (up to
  sqrt, watch out for 10^14), count the digits of the factorization (factor +
  exponent if > 1) and compare with the number's digits. Task 3: a number
  cannot be written as a sum of 2 primes if it is 1, 2, 3, odd with n-2 not
  prime, or 4; use a sieve up to 10^7.
---

I am fascinated by prime numbers. I consider that prime numbers are the "skeleton" of all numbers or their "atoms," because any natural number greater than 1 can be written as a product of prime numbers. I recently learned other interesting properties related to prime numbers, for example:

1. In the Fibonacci sequence there are infinitely many prime numbers. Do you remember the Fibonacci sequence? `0, 1, 1, 2, 3, 5, 8, 13, ...` It is the sequence in which each term, except for the first two, is obtained as the sum of the two terms that precede it.

2. There exist natural numbers called "economic." A natural number is economic if the number of digits needed to write it is greater than the number of digits needed to write its prime factorization (that is, the number of digits needed to write the prime factors and their powers). For example, `128` is economic because `128` is written with 3 digits, while its prime factorization is written with two digits (`2^7`); `4374` is economic because it is written with 4 digits, while its prime factorization is written with 3 digits (`2*3^7`). Note that when a prime factor appears to the power 1, this power does not need to be written.

3. Many natural numbers can be written as the sum of two prime numbers. But not all. For example, `121` cannot be written as the sum of two prime numbers.

## Task

Write a program that reads the natural number `n` and a sequence of `n` natural numbers, then solves the following tasks:

1. determine and output how many of the numbers in the given sequence are prime numbers from the Fibonacci sequence;
2. determine and output how many of the numbers in the given sequence are economic numbers;
3. determine and output how many of the numbers in the given sequence cannot be written as the sum of two prime numbers.

## Input Data

The input file `prime1.in` contains on the first line a natural number `c` representing the task (`1`, `2`, or `3`). On the second line there is the natural number `n`. On the third line there is a sequence of `n` natural numbers separated by spaces.

## Output Data

The output file `prime1.out` will contain a single line with the answer to the task from the input file.

## Constraints and Notes

- `1 < n <= 50`
- If `c=1` or `c=3`, the natural numbers in the sequence are greater than `1` and less than `10^7`
- If `c=2`, the natural numbers in the sequence are greater than `1` and less than `10^14`
- For correctly solving task 1, 20 points are awarded
- For correctly solving task 2, 50 points are awarded
- For correctly solving task 3, 30 points are awarded

## Example 1

`prime1.in`

```
1
5
2 10 13 997 233
```

`prime1.out`

```
3
```

### Explanation

Task is 1. The 3 prime numbers from the Fibonacci sequence found in the sequence are `2`, `13`, and `233`.

## Example 2

`prime1.in`

```
2
4
128 25 4374 720
```

`prime1.out`

```
2
```

### Explanation

Task is 2. The sequence contains two economic numbers (`128` and `4374`).

## Example 3

`prime1.in`

```
3
5
57 30 121 11 3
```

`prime1.out`

```
4
```

### Explanation

Task is 3. There are 4 natural numbers in the sequence that cannot be written as the sum of two prime numbers: `57`, `121`, `11`, `3`.
