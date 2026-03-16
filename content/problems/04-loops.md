---
title: FizzBuzz
difficulty: easy
sort_order: 4
hints:
  - >-
    You need a loop that counts from 1 to a number. A for-loop is perfect for
    this.
  - >-
    Use the modulo operator (%) to check divisibility. If n % 3 == 0, then n is
    divisible by 3.
  - >-
    Check for divisible-by-both FIRST, then divisible-by-3, then divisible-by-5,
    then just the number.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int n;
      cout << "Enter a number: ";
      cin >> n;

      // Loop from 1 to n and apply FizzBuzz rules

      return 0;
  }
solution_notes: >-
  for loop 1..n, check %15 first (FizzBuzz), then %3 (Fizz), then %5 (Buzz),
  else print number
---
Write the classic **FizzBuzz** program! Ask the user for a number `n`, then for each number from 1 to `n`:

- If the number is divisible by **3**, print `Fizz`
- If the number is divisible by **5**, print `Buzz`
- If the number is divisible by **both 3 and 5**, print `FizzBuzz`
- Otherwise, just print the number

Example for n = 15:
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**Hint:** The order you check conditions matters!
