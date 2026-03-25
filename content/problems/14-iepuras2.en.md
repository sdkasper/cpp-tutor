---
title: Bunny 2
difficulty: hard
sort_order: 14
lang: en
concepts: [loops, conditions, arithmetic, file-io]
hints:
  - >-
    For task 1, extract the distinct digits of the number. The largest number is
    formed with digits sorted in descending order, the smallest with digits
    sorted in ascending order. Careful: the smallest cannot start with 0!
  - >-
    Use a frequency array for digits 0-9. Mark the distinct digits, sort them,
    and form the two numbers.
  - >-
    For task 2, the control digit is computed iteratively (sum of digits
    repeated until a single digit). Equivalent: control_digit = 1 + (n-1) % 9
    for n > 0.
  - >-
    Counting occurrences of a digit in all numbers from 1 to N is a classic
    problem. Think digit by digit (units, tens, hundreds...) and compute the
    contribution of each position. Note: N can be up to 10^18!
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("iepuras.in");
  ofstream fout("iepuras.out");

  int main() {
      int C, n;
      fin >> C >> n;

      for (int i = 0; i < n; i++) {
          long long numar;
          fin >> numar;

          if (C == 1) {
              // Determine the sum of the largest and smallest number
              // formed from the distinct digits of the number
          }

          if (C == 2) {
              // Determine how many times the control digit appears
              // in the writing of all numbers from 1 to numar
          }
      }

      return 0;
  }
solution_notes: >-
  Task 1: extract distinct digits, sort ascending/descending, form the 2
  numbers (careful with leading 0), display their sum. Task 2: control digit =
  1 + (n-1)%9. Counting occurrences of digit d in 1..N: traverse each position
  (powers of 10), compute the contribution of each position using the classic
  formula with higher/current/lower digits.
---
Because he loves digits, Skippie, the lucky bunny, established how to obtain the control digit of a number: compute the sum of its digits, then the sum of the digits of that sum, until the obtained sum is a single-digit number. This last digit, says Skippie, is called the control digit. Skippie has hidden `n` red eggs in the forest. On each egg, he painted a non-zero natural number. And now he wonders what is the sum of the largest and smallest natural number that can be formed from all the distinct digits used in writing the painted number. Additionally, because Skippie likes complicated problems, for each number painted on an egg, he would like to know how many times the control digit of the number appears in the writing of all natural numbers less than or equal to the painted number.

## Task

1\. For each of the `n` numbers painted by Skippie, find the sum of the largest and smallest natural number that can be formed from all the distinct digits used in writing the painted number.
2\. For each of the `n` numbers painted by Skippie, find how many times the control digit of the painted number appears in the writing of all natural numbers less than or equal to the painted number.

## Input Data

The input file `iepuras.in` contains a natural number `C`. This can have values `1` or `2` and represents the task of the problem. The second line of the input file contains a natural number `n` representing the number of red eggs painted by Skippie. Each of the next `n` lines of the input file contains a non-zero natural number representing the numbers painted by the bunny on the `n` red eggs.

## Output Data

The output file `iepuras.out` will contain `n` integers, each on a separate line. In the order of appearance of the numbers painted by the bunny in the input file, the answers to task `C` are displayed.

## Constraints and Notes

- `1 ≤ C ≤ 2`
- `1 ≤ n ≤ 100,000`
- the numbers painted by the bunny are less than or equal to 10^18

## Example 1:

`iepuras.in`

```
1
2
121
33343
```

`iepuras.out`

```
33
77
```

### Explanation

Task `1` is solved. There are `2` painted eggs (`n = 2`). For the first egg, painted with the number `121`:
\- the largest natural number with distinct digits formed from all distinct digits of the painted number is `21`;
\- the smallest natural number with distinct digits formed from all distinct digits of the painted number is `12`.
So the sum of the two numbers is `33` (`21 + 12 = 33`).

For the second egg, painted with the number `33343`:
\- the largest natural number with distinct digits formed from all distinct digits of the painted number is `43`;
\- the smallest natural number with distinct digits formed from all distinct digits of the painted number is `34`.
So the sum of the two numbers is `77` (`43 + 34 = 77`).

## Example 2:

`iepuras.in`

```
2
2
123
191
```

`iepuras.out`

```
22
39
```

### Explanation

Task `2` is solved. There are `2` painted eggs (`n = 2`). On the first egg is the number `123` and on the second the number `191`. The control digit of `123` is `6` (`1 + 2 + 3 = 6`). The number of occurrences of digit `6` in the writing of all natural numbers less than or equal to `123` is `22`. Digit `6` appears in the numbers: `6`, `16`, `26`, `36`, `46`, `56`, `60`, `61`, `62`, `63`, `64`, `65`, `66`, `67`, `68`, `69`, `76`, `86`, `96`, `106`, `116` a total of `22` times. The control digit of `191` is `2`. (`1 + 9 + 1 = 11`, `1 + 1 = 2`). The number of occurrences of digit `2` in the writing of all natural numbers less than or equal to `191` is `39`. Digit `2` appears in the numbers `2`, `12`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `32`, `42`, `52`, `62`, `72`, `82`, `92`, `102`, `112`, `120`, `121`, `122`, `123`, `124`, `125`, `126`, `127`, `128`, `129`, `132`, `142`, `152`, `162`, `172`, `182` a total of `39` times.
