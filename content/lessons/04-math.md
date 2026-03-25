---
title: 'Math with Code'
slug: math
sort_order: 4
concepts: [arithmetic, operators, modulo]
summary: 'Do math with your code — add, subtract, multiply, divide, and more.'
estimated_minutes: 10
prev_lesson: input
next_lesson: if-else
---

## Your Computer Is a Calculator

One of the things computers do best is math -- and they're ridiculously fast at it. C++ can do all the basic math operations you already know, plus a few extras.

## The Five Operators

Here are the math operators in C++:

| Operator | What It Does | Example |
|----------|-------------|---------|
| `+` | Addition | `5 + 3` gives `8` |
| `-` | Subtraction | `10 - 4` gives `6` |
| `*` | Multiplication | `6 * 7` gives `42` |
| `/` | Division | `15 / 3` gives `5` |
| `%` | Modulo (remainder) | `17 % 5` gives `2` |

Let's see them all in action:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "5 + 3 = " << 5 + 3 << endl;
    cout << "10 - 4 = " << 10 - 4 << endl;
    cout << "6 * 7 = " << 6 * 7 << endl;
    cout << "15 / 3 = " << 15 / 3 << endl;
    cout << "17 % 5 = " << 17 % 5 << endl;
    return 0;
}
```

The `%` operator (modulo) might be new to you. It gives you the **remainder** after division. So `17 % 5` means "17 divided by 5 has remainder 2." It's super useful -- for example, you can check if a number is even by testing if `number % 2 == 0`.

## Watch Out: Integer Division

Here's a tricky part. When you divide two `int` values, C++ throws away the decimal part:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "7 / 2 = " << 7 / 2 << endl;
    cout << "Hmm... that should be 3.5!" << endl;
    cout << endl;
    cout << "Fix it with doubles:" << endl;
    cout << "7.0 / 2.0 = " << 7.0 / 2.0 << endl;
    return 0;
}
```

If you want the real answer with decimals, make at least one of the numbers a `double` (add `.0` to it). This is one of the most common mistakes beginners make, so remember it!

## Order of Operations

C++ follows the same order of operations you learned in math class: multiplication and division happen before addition and subtraction. Use parentheses `()` to change the order:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "2 + 3 * 4 = " << 2 + 3 * 4 << endl;
    cout << "(2 + 3) * 4 = " << (2 + 3) * 4 << endl;
    cout << endl;

    // Pizza party calculator
    int totalSlices = 3 * 8;
    int people = 5;
    int slicesEach = totalSlices / people;
    int leftover = totalSlices % people;

    cout << "3 pizzas with 8 slices each = " << totalSlices << " slices" << endl;
    cout << "Split between " << people << " people = " << slicesEach << " each" << endl;
    cout << "Leftover slices: " << leftover << endl;
    return 0;
}
```

Just like in math: parentheses first, then `*`, `/`, `%`, then `+` and `-`.

## Shortcuts: Compound Assignment

When you want to change a variable by adding, subtracting, etc., C++ has handy shortcuts:

| Long Way | Shortcut | What It Does |
|----------|----------|-------------|
| `score = score + 10;` | `score += 10;` | Add 10 to score |
| `lives = lives - 1;` | `lives -= 1;` | Subtract 1 from lives |
| `coins = coins * 2;` | `coins *= 2;` | Double the coins |
| `total = total / 3;` | `total /= 3;` | Divide total by 3 |

And for adding or subtracting 1, there's an even shorter shortcut:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 0;

    score += 100;
    cout << "Found treasure! Score: " << score << endl;

    score += 50;
    cout << "Defeated monster! Score: " << score << endl;

    score -= 25;
    cout << "Hit by trap! Score: " << score << endl;

    score *= 2;
    cout << "Double points bonus! Score: " << score << endl;

    // Increment and decrement
    int lives = 3;
    cout << endl << "Lives: " << lives << endl;

    lives--;
    cout << "Ouch! Lives: " << lives << endl;

    lives--;
    cout << "Ouch again! Lives: " << lives << endl;

    lives++;
    cout << "Found extra life! Lives: " << lives << endl;
    return 0;
}
```

`lives++` adds 1 (increment), and `lives--` subtracts 1 (decrement). You'll use these a LOT, especially in loops later.

## Math with User Input

Let's build a tip calculator that combines everything we've learned:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    double bill;
    int tipPercent;

    cout << "Enter the bill amount: ";
    cin >> bill;
    cout << "Enter tip percent (like 15 or 20): ";
    cin >> tipPercent;

    double tip = bill * tipPercent / 100.0;
    double total = bill + tip;

    cout << "Bill: $" << bill << endl;
    cout << "Tip (" << tipPercent << "%): $" << tip << endl;
    cout << "Total: $" << total << endl;
    return 0;
}
```

<!-- exercise -->
### Your Turn: Grade Average

Write a program that asks the user for three test scores (whole numbers), then calculates and prints the average. Remember: to get a decimal average, you need to divide by `3.0`, not `3`!

```cpp
#include <iostream>
using namespace std;

int main() {
    // Declare three int variables for test scores

    // Ask for each score and read it with cin

    // Calculate the average (use 3.0 to get decimals!)

    // Print the average

    return 0;
}
```
<!-- hint: int s1, s2, s3; Read each with cin. Then double average = (s1 + s2 + s3) / 3.0; and print it. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Time Converter

Ask the user for a number of **total seconds**. Convert it to minutes and remaining seconds. For example, 135 seconds = 2 minutes and 15 seconds. You'll need the `/` and `%` operators!

```cpp
#include <iostream>
using namespace std;

int main() {
    int totalSeconds;
    cout << "Enter total seconds: ";
    cin >> totalSeconds;

    // Calculate minutes and remaining seconds

    // Print the result

    return 0;
}
```
<!-- hint: int minutes = totalSeconds / 60; int seconds = totalSeconds % 60; Then print them. -->
<!-- /exercise -->

## What You Learned

- C++ has 5 math operators: `+`, `-`, `*`, `/`, `%`
- Dividing two integers throws away the decimal -- use `double` values if you need decimals
- Order of operations works just like in math class (use parentheses to change it)
- Shortcuts like `+=`, `-=`, `++`, `--` make updating variables faster

Now that you can do math, it's time to teach your programs to **make decisions**. Next up: if-else statements!
