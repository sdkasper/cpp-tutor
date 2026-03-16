---
title: Variables and Types
difficulty: beginner
sort_order: 2
hints:
  - >-
    Think about what type of data each variable should hold — a whole number? A
    decimal? Text?
  - 'Use int for whole numbers, double for decimals, and string for text.'
  - Remember to include <string> if you want to use string variables.
starter_code: |
  #include <iostream>
  #include <string>
  using namespace std;

  int main() {
      // Create variables here

      // Print them out

      return 0;
  }
solution_notes: 'Student should declare int, double, and string variables and print them.'
---
Create three variables:
1. An **integer** called `age` set to your age
2. A **decimal number** called `height` set to your height in meters (e.g., 1.65)
3. A **text string** called `name` set to your first name

Then print each one on its own line, like this:
```
Name: Alex
Age: 14
Height: 1.65
```

**Tip:** In C++, different types of data need different variable types!
