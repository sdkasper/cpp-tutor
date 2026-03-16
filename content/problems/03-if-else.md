---
title: Grade Calculator
difficulty: easy
sort_order: 3
hints:
  - >-
    You'll need to check the score against multiple thresholds. Start with the
    highest grade first.
  - 'Use if, else if, and else to check ranges. For example: if (score >= 90) ...'
  - Make sure your conditions don't overlap and cover all possible scores.
starter_code: |
  #include <iostream>
  using namespace std;

  int main() {
      int score;
      cout << "Enter your score (0-100): ";
      cin >> score;

      // Add your if/else logic here

      return 0;
  }
solution_notes: >-
  Chain of if/else if/else checking score ranges: >=90 A, >=80 B, >=70 C, >=60
  D, else F
---
Write a program that asks for a test score (0-100) and prints the letter grade:

| Score | Grade |
|-------|-------|
| 90-100 | A |
| 80-89 | B |
| 70-79 | C |
| 60-69 | D |
| Below 60 | F |

Example:
```
Enter your score (0-100): 85
Your grade: B
```

**Challenge:** What happens if someone enters a number over 100 or below 0? Can you handle that too?
