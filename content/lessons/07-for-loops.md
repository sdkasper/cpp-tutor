---
title: 'For Loops'
slug: for-loops
sort_order: 7
concepts: [loops, for-loop]
summary: 'Make the computer repeat things using for loops.'
estimated_minutes: 12
prev_lesson: switch
next_lesson: while-loops
---

## Why Repeat Yourself?

Imagine you want to print "I love coding!" ten times. You *could* write `cout` ten times, but that's boring and a lot of typing. Loops let you tell the computer "do this thing over and over" with just a few lines of code.

## Your First For Loop

A `for` loop has three parts inside the parentheses, separated by semicolons:

1. **Start** -- where to begin (like `int i = 1`)
2. **Condition** -- keep going while this is true (like `i <= 5`)
3. **Update** -- what to change each time (like `i++`)

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << "Loop number: " << i << endl;
    }
    return 0;
}
```

Click **Run** and watch it count from 1 to 5! The variable `i` starts at 1, and each time through the loop it goes up by 1. When `i` becomes 6, the condition `i <= 5` is false, so the loop stops.

## Counting Sheep

Let's use a for loop to count sheep before bed. This is what loops are great at -- doing the same thing with different numbers.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Time to sleep..." << endl;
    for (int sheep = 1; sheep <= 10; sheep++) {
        cout << sheep << " sheep... ";
    }
    cout << endl << "Zzzzz!" << endl;
    return 0;
}
```

Notice how we named the variable `sheep` instead of `i`. You can name it anything that makes sense!

## Counting Down

Loops can go backwards too. Just start high, check that you're still above your target, and subtract each time.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Rocket launch countdown!" << endl;
    for (int t = 10; t >= 1; t--) {
        cout << t << "... ";
    }
    cout << endl << "LIFTOFF!" << endl;
    return 0;
}
```

Here `t--` means "subtract 1 from t each time." The loop keeps going while `t >= 1`.

## Stepping by 2s (or More)

You don't have to go one at a time. Want to count by 2s? Change the update part to `i += 2`.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Even numbers from 2 to 20:" << endl;
    for (int i = 2; i <= 20; i += 2) {
        cout << i << " ";
    }
    cout << endl;

    cout << "Counting by 5s:" << endl;
    for (int i = 0; i <= 50; i += 5) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

You can step by any amount -- `i += 3`, `i += 10`, whatever you need.

## Drawing with Loops

Loops are perfect for drawing patterns. Here's a simple star line:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Draw a line of 20 stars
    for (int i = 0; i < 20; i++) {
        cout << "*";
    }
    cout << endl;

    // Draw a line of 20 dashes
    for (int i = 0; i < 20; i++) {
        cout << "-";
    }
    cout << endl;

    // Draw a line of 20 stars again
    for (int i = 0; i < 20; i++) {
        cout << "*";
    }
    cout << endl;
    return 0;
}
```

Think of the loop like a stamp -- it stamps one star, then another, then another, until it has stamped 20.

## Building a Times Table

For loops are great for math too. Let's print a times table for any number:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 7;
    cout << "Times table for " << number << ":" << endl;
    for (int i = 1; i <= 10; i++) {
        cout << number << " x " << i << " = " << number * i << endl;
    }
    return 0;
}
```

Try changing `number` to your favorite number and run it again!

<!-- exercise -->
### Your Turn: Star Staircase

Write a program that prints a staircase made of stars. Each line should have one more star than the line before it, from 1 star up to 6 stars. The output should look like:

```
*
**
***
****
*****
******
```

You'll need a for loop for the rows, and *inside* that loop, another for loop to print the right number of stars on each row. (Don't worry if that sounds tricky -- the hint below can help!)

```cpp
#include <iostream>
using namespace std;

int main() {
    // Use a for loop to go from row 1 to row 6
    // Inside, use another for loop to print 'row' number of stars
    // Don't forget endl after each row!

    return 0;
}
```
<!-- hint: The outer loop goes from 1 to 6 (for each row). The inner loop prints stars: for (int s = 0; s < row; s++) { cout << "*"; } Then print endl after the inner loop. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Odd Numbers

Print all the odd numbers from 1 to 25, separated by spaces. Use a for loop that steps by 2.

```cpp
#include <iostream>
using namespace std;

int main() {
    // Print odd numbers from 1 to 25

    return 0;
}
```
<!-- hint: Start your loop at 1 and use i += 2 to skip even numbers: for (int i = 1; i <= 25; i += 2) -->
<!-- /exercise -->

## What You Learned

- A `for` loop repeats code a specific number of times
- The three parts are: **start**, **condition**, and **update**
- `i++` counts up by 1, `i--` counts down by 1
- `i += 2` (or any number) lets you step by larger amounts
- You can use loops to draw patterns, print tables, and avoid writing the same code over and over

Next up, we'll learn about **while loops** -- a different way to repeat things when you don't know exactly how many times you need to go!
