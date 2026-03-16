---
title: Find the Maximum
difficulty: medium
sort_order: 5
hints:
  - >-
    First, you need to store the numbers somewhere. An array or vector would
    work.
  - >-
    To find the maximum, start by assuming the first element is the biggest,
    then compare with each other element.
  - >-
    Use a for-loop to go through each element. If you find something bigger than
    your current max, update it.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int n;
      cout << "How many numbers? ";
      cin >> n;

      int numbers[100]; // Array to store numbers

      // Read the numbers

      // Find and print the maximum

      return 0;
  }
solution_notes: >-
  Read n numbers into array, initialize max to first element, loop through
  comparing each to max
---
Write a program that:
1. Asks the user how many numbers they want to enter
2. Reads that many numbers from the user
3. Finds and prints the **largest** number

Example:
```
How many numbers? 5
Enter number 1: 12
Enter number 2: 45
Enter number 3: 7
Enter number 4: 89
Enter number 5: 23
The maximum is: 89
```

**Think about:** What value should you start with when looking for the maximum? What if all numbers are negative?
