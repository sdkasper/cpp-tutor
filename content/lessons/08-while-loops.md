---
title: 'While Loops'
slug: while-loops
sort_order: 8
concepts: [loops, while-loop]
summary: 'Keep going until a condition is met with while loops.'
estimated_minutes: 10
prev_lesson: for-loops
next_lesson: nested-loops
---

## A Different Kind of Loop

In the last lesson you learned `for` loops, which are great when you know exactly how many times to repeat. But sometimes you don't know in advance -- you just want to keep going *until something happens*. That's where `while` loops shine.

Think of it like eating popcorn: you don't count each piece, you just keep eating *while* there's still popcorn in the bowl.

## The While Loop

A `while` loop checks a condition *before* each round. If it's true, the code inside runs. If it's false, the loop stops.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int cookies = 5;
    cout << "I have " << cookies << " cookies!" << endl;

    while (cookies > 0) {
        cout << "Nom! Ate a cookie. " << cookies - 1 << " left." << endl;
        cookies--;
    }

    cout << "All gone!" << endl;
    return 0;
}
```

Each time through the loop, we eat one cookie (`cookies--`). When `cookies` hits 0, the condition `cookies > 0` is false, and the loop stops.

## While vs For

You can actually do the same thing with both loops. Here's a side-by-side comparison:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // For loop version
    cout << "For loop:" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // While loop version of the same thing
    cout << "While loop:" << endl;
    int i = 1;
    while (i <= 5) {
        cout << i << " ";
        i++;
    }
    cout << endl;
    return 0;
}
```

**Rule of thumb:** Use `for` when you know how many times to loop. Use `while` when you're waiting for something to happen.

## The Danger: Infinite Loops

If the condition *never* becomes false, the loop runs forever. This is called an **infinite loop**, and it will freeze your program!

```cpp
// DON'T run this -- it would never stop!
int x = 1;
while (x > 0) {
    cout << x << endl;
    x++;  // x just keeps getting bigger, so x > 0 is always true!
}
```

Always make sure something inside your loop changes so the condition will eventually be false.

## Do-While: Check After

A regular `while` loop checks the condition *before* running. A `do-while` loop runs the code *first*, then checks. This means it always runs **at least once**.

This is perfect for things like a menu where you want to show it at least one time.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 1;

    do {
        cout << "Number is: " << number << endl;
        number *= 2;  // double it
    } while (number <= 100);

    cout << "Stopped because " << number << " is over 100!" << endl;
    return 0;
}
```

Notice the semicolon after `while (number <= 100);` -- the `do-while` is the only loop that needs that.

## Break: Emergency Exit

Sometimes you need to bail out of a loop early. The `break` statement immediately exits the loop.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Searching for the number 7 in a countdown
    cout << "Searching..." << endl;
    int n = 20;

    while (n > 0) {
        if (n == 7) {
            cout << "Found 7! Stopping search." << endl;
            break;  // exit the loop immediately
        }
        cout << n << " is not 7." << endl;
        n -= 3;
    }

    cout << "Loop ended." << endl;
    return 0;
}
```

When `break` is hit, the program jumps straight to the line after the loop's closing brace.

## Continue: Skip This One

The `continue` statement skips the rest of the *current* round and jumps back to the condition check. It's like saying "never mind this one, move on."

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Printing numbers 1-10, but skipping multiples of 3:" << endl;

    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;  // skip this iteration
        }
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

When `i` is 3, 6, or 9, `continue` skips the `cout` and goes back to the top of the loop.

## A Guessing Game

Here's a fun example that combines `while`, `break`, and counting. Imagine a number guessing game where the player keeps guessing until they're right.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int secret = 42;
    int guesses[] = {10, 50, 30, 42};  // pretend player guesses
    int numGuesses = 4;

    int attempt = 0;
    while (attempt < numGuesses) {
        int guess = guesses[attempt];
        cout << "Guess: " << guess;

        if (guess == secret) {
            cout << " -- Correct! You got it in " << attempt + 1 << " tries!" << endl;
            break;
        } else if (guess < secret) {
            cout << " -- Too low!" << endl;
        } else {
            cout << " -- Too high!" << endl;
        }
        attempt++;
    }
    return 0;
}
```

The while loop keeps going through guesses, and `break` stops it when the right answer is found.

<!-- exercise -->
### Your Turn: Halving Game

Start with the number 1000. Keep dividing it by 2 (using integer division) while it's greater than 1. Print each value on a new line. How many steps does it take to reach 1?

Expected output starts with:
```
1000
500
250
125
...
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 1000;
    int steps = 0;

    // Use a while loop to keep halving the number
    // Print the number each time
    // Count the steps

    cout << "It took " << steps << " steps to reach 1." << endl;
    return 0;
}
```
<!-- hint: Inside the while loop: cout the number, then divide by 2 (number = number / 2 or number /= 2), and increment steps. The condition is while (number > 1). -->
<!-- /exercise -->

## What You Learned

- `while` loops repeat as long as a condition is true
- `do-while` loops always run at least once, then check the condition
- Use `for` when you know the count, `while` when you're waiting for a condition
- `break` exits a loop immediately
- `continue` skips to the next iteration
- Always make sure your loop condition will eventually become false to avoid infinite loops

Next up, we'll put loops *inside* other loops to create amazing patterns!
