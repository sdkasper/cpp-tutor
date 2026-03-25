---
title: 'Making Decisions with If-Else'
slug: if-else
sort_order: 5
concepts: [if-else, conditions, bool]
summary: 'Teach your program to make decisions based on conditions.'
estimated_minutes: 12
prev_lesson: math
next_lesson: switch
---

## Programs That Think

Up until now, your programs do the exact same thing every time. But real programs make **decisions**. A game checks if your health hits zero. A phone checks if your password is correct. Let's teach your programs to think!

## Your First If Statement

An `if` statement runs some code **only when a condition is true**:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int temperature = 35;

    if (temperature > 30) {
        cout << "It's hot outside! Drink water!" << endl;
    }

    cout << "Have a nice day!" << endl;
    return 0;
}
```

The code inside the curly braces `{ }` only runs if the condition `temperature > 30` is true. Try changing `35` to `20` in your head -- the "hot" message would be skipped, but "Have a nice day!" still prints because it's outside the `if` block.

## If-Else: Two Paths

What if you want to do one thing when the condition is true, and something **different** when it's false? That's what `else` is for:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "How old are you? ";
    cin >> age;

    if (age >= 13) {
        cout << "You're a teenager or older!" << endl;
    } else {
        cout << "You're still a kid -- enjoy it!" << endl;
    }
    return 0;
}
```

The program **always** takes one path or the other. It's like a fork in the road -- you go left or right, but never both.

## Comparison Operators

Here are all the ways to compare things in C++:

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `score == 100` |
| `!=` | Not equal to | `lives != 0` |
| `<` | Less than | `age < 13` |
| `>` | Greater than | `temp > 30` |
| `<=` | Less than or equal | `grade <= 60` |
| `>=` | Greater than or equal | `points >= 500` |

**Big warning:** `==` (two equals signs) checks if things are equal. A single `=` assigns a value. Mixing them up is a super common bug!

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 85;

    cout << "Score: " << score << endl;

    if (score == 100) {
        cout << "Perfect score!" << endl;
    }
    if (score >= 90) {
        cout << "Awesome job!" << endl;
    }
    if (score >= 70) {
        cout << "You passed!" << endl;
    }
    if (score < 70) {
        cout << "Keep practicing!" << endl;
    }
    return 0;
}
```

## Else If: Multiple Choices

Sometimes you need more than two paths. Use `else if` to chain conditions together:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Enter your test score (0-100): ";
    cin >> score;

    if (score >= 90) {
        cout << "Grade: A -- Amazing!" << endl;
    } else if (score >= 80) {
        cout << "Grade: B -- Great work!" << endl;
    } else if (score >= 70) {
        cout << "Grade: C -- Not bad!" << endl;
    } else if (score >= 60) {
        cout << "Grade: D -- You can do better!" << endl;
    } else {
        cout << "Grade: F -- Time to study harder!" << endl;
    }
    return 0;
}
```

C++ checks each condition from top to bottom. The moment one is true, it runs that block and **skips the rest**. The `else` at the end catches everything that didn't match.

## Logical Operators: Combining Conditions

Sometimes one condition isn't enough. You can combine conditions with logical operators:

| Operator | Meaning | Example |
|----------|---------|---------|
| `&&` | AND (both must be true) | `age >= 13 && age <= 19` |
| `\|\|` | OR (at least one true) | `day == 6 \|\| day == 7` |
| `!` | NOT (flips true/false) | `!gameOver` |

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    int height;

    cout << "Enter your age: ";
    cin >> age;
    cout << "Enter your height in cm: ";
    cin >> height;

    cout << endl << "=== Roller Coaster Check ===" << endl;

    if (age >= 8 && height >= 120) {
        cout << "You can ride the roller coaster!" << endl;
    } else if (age < 8) {
        cout << "Sorry, you need to be at least 8 years old." << endl;
    } else {
        cout << "Sorry, you need to be at least 120 cm tall." << endl;
    }
    return 0;
}
```

The `&&` means BOTH conditions must be true. You have to be old enough AND tall enough.

## The Bool Type

A `bool` variable stores either `true` or `false`. It's like an on/off switch:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    bool hasKey = true;
    bool doorLocked = true;

    cout << "Door is locked: " << doorLocked << endl;
    cout << "You have key: " << hasKey << endl;
    cout << endl;

    if (doorLocked && hasKey) {
        cout << "You unlock the door and walk through!" << endl;
    } else if (doorLocked && !hasKey) {
        cout << "The door is locked and you don't have a key..." << endl;
    } else {
        cout << "The door is open. You walk right in!" << endl;
    }
    return 0;
}
```

`true` prints as `1` and `false` prints as `0`. The `!` operator flips a bool: `!true` becomes `false`, and `!false` becomes `true`.

<!-- exercise -->
### Your Turn: Number Checker

Write a program that asks the user for a number, then tells them whether it's **positive**, **negative**, or **zero**. Also tell them if it's **even** or **odd** (hint: use `% 2`).

```cpp
#include <iostream>
using namespace std;

int main() {
    int number;
    cout << "Enter a number: ";
    cin >> number;

    // Check if the number is positive, negative, or zero

    // Check if the number is even or odd

    return 0;
}
```
<!-- hint: Use if (number > 0) for positive, else if (number < 0) for negative, else for zero. For even/odd: if (number % 2 == 0) means even, else odd. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Adventure Game

Create a tiny text adventure! Ask the user to pick "left" or "right" at a fork in the road. Then, ask them for a lucky number. If they went left AND their number is greater than 5, they find treasure. Otherwise, print a different outcome for each path.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string direction;
    int luckyNumber;

    cout << "You're in a dungeon and reach a fork." << endl;
    cout << "Do you go left or right? ";
    cin >> direction;

    cout << "Pick a lucky number (1-10): ";
    cin >> luckyNumber;

    // Write your adventure logic here!

    return 0;
}
```
<!-- hint: Use if (direction == "left" && luckyNumber > 5) for the treasure path. Add else if blocks for other combinations. Remember to use == for comparing strings! -->
<!-- /exercise -->

## What You Learned

- `if` runs code only when a condition is true
- `else` handles the "otherwise" case, and `else if` adds more branches
- Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&` (AND), `||` (OR), `!` (NOT)
- `bool` stores `true` or `false`

Your programs can now make decisions like a real app! Next, we'll learn about `switch` -- a cleaner way to handle lots of choices.
