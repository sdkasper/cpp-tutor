---
title: 'Switch Statements'
slug: switch
sort_order: 6
concepts: [switch, case]
summary: 'Handle multiple choices cleanly with switch statements.'
estimated_minutes: 8
prev_lesson: if-else
next_lesson: for-loops
---

## Too Many If-Else Blocks?

In the last lesson, we used `if`, `else if`, and `else` to handle multiple choices. That works great, but when you have a **lot** of specific values to check, it can get messy. That's where `switch` comes in -- it's like a vending machine. You put in a number, and it gives you exactly what matches.

## Your First Switch

Let's say you're building a menu for a game:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int choice;
    cout << "=== Game Menu ===" << endl;
    cout << "1. Start Game" << endl;
    cout << "2. Load Game" << endl;
    cout << "3. Settings" << endl;
    cout << "4. Quit" << endl;
    cout << "Pick an option: ";
    cin >> choice;

    switch (choice) {
        case 1:
            cout << "Starting new game..." << endl;
            break;
        case 2:
            cout << "Loading saved game..." << endl;
            break;
        case 3:
            cout << "Opening settings..." << endl;
            break;
        case 4:
            cout << "Goodbye!" << endl;
            break;
        default:
            cout << "Invalid choice! Pick 1-4." << endl;
            break;
    }
    return 0;
}
```

Here's how it works:

- **`switch (choice)`** -- "Look at the value of `choice`"
- **`case 1:`** -- "If it's 1, do this"
- **`break;`** -- "Stop here, don't fall through to the next case"
- **`default:`** -- "If nothing matched, do this" (like `else`)

## Don't Forget Break!

Here's a common mistake. Watch what happens if you leave out `break`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int day = 3;

    cout << "Without break (whoops!):" << endl;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
        case 2:
            cout << "Tuesday" << endl;
        case 3:
            cout << "Wednesday" << endl;
        case 4:
            cout << "Thursday" << endl;
        case 5:
            cout << "Friday" << endl;
    }

    cout << endl << "With break (correct!):" << endl;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        case 4:
            cout << "Thursday" << endl;
            break;
        case 5:
            cout << "Friday" << endl;
            break;
    }
    return 0;
}
```

Without `break`, the code "falls through" and keeps running the cases below. It's like falling down stairs -- once you start, you don't stop until you hit the bottom! Always use `break` unless you specifically want fall-through behavior.

## Switch with Char

Switch works great with `char` values too. Let's build a simple calculator:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;

    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter operator (+, -, *, /): ";
    cin >> op;
    cout << "Enter second number: ";
    cin >> b;

    switch (op) {
        case '+':
            cout << a << " + " << b << " = " << a + b << endl;
            break;
        case '-':
            cout << a << " - " << b << " = " << a - b << endl;
            break;
        case '*':
            cout << a << " * " << b << " = " << a * b << endl;
            break;
        case '/':
            if (b != 0) {
                cout << a << " / " << b << " = " << a / b << endl;
            } else {
                cout << "Error: can't divide by zero!" << endl;
            }
            break;
        default:
            cout << "Unknown operator: " << op << endl;
            break;
    }
    return 0;
}
```

Notice we even put an `if` inside one of the cases to check for division by zero. You can mix `switch` and `if` however you need!

## When to Use Switch vs If-Else

Here's a quick guide:

| Use **switch** when... | Use **if-else** when... |
|----------------------|----------------------|
| Checking one variable against specific values | Comparing ranges (like `score >= 90`) |
| You have 3 or more exact matches | You need `&&` or `\|\|` conditions |
| The values are `int` or `char` | You're comparing `string` or `double` |

**Important:** `switch` only works with `int`, `char`, and similar whole-number types. You can't use it with `string` or `double`.

## A Fun Example: Magic 8 Ball

Let's combine `switch` with `%` to pick a random-ish answer:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string question;
    int luckyNumber;

    cout << "=== Magic 8 Ball ===" << endl;
    cout << "Ask a yes/no question: ";
    cin >> question;
    cout << "Now pick a number between 1 and 100: ";
    cin >> luckyNumber;

    int answer = luckyNumber % 5;

    switch (answer) {
        case 0:
            cout << "Definitely yes!" << endl;
            break;
        case 1:
            cout << "Hmm, probably not." << endl;
            break;
        case 2:
            cout << "Ask again later..." << endl;
            break;
        case 3:
            cout << "Absolutely!" << endl;
            break;
        case 4:
            cout << "I wouldn't count on it." << endl;
            break;
    }
    return 0;
}
```

We used `% 5` to convert any number into a value from 0 to 4, then used `switch` to pick a response. Neat trick!

<!-- exercise -->
### Your Turn: Day Planner

Write a program that asks the user for a day number (1-7, where 1 is Monday). Use a `switch` to print what activity they should do that day. For example: Monday = "School", Saturday = "Video games", Sunday = "Family time". Don't forget `default` for invalid numbers!

```cpp
#include <iostream>
using namespace std;

int main() {
    int day;
    cout << "Enter day number (1=Monday, 7=Sunday): ";
    cin >> day;

    // Use a switch to print the activity for each day

    return 0;
}
```
<!-- hint: switch (day) { case 1: cout << "School" << endl; break; case 2: ... and so on. Use default: for numbers outside 1-7. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Grade to Stars

Ask the user for a letter grade as a character: A, B, C, D, or F. Use a `switch` on the `char` to print that many stars. A = 5 stars, B = 4 stars, C = 3 stars, D = 2 stars, F = 0 stars.

```cpp
#include <iostream>
using namespace std;

int main() {
    char grade;
    cout << "Enter your grade (A/B/C/D/F): ";
    cin >> grade;

    // Use switch to print the right number of stars for the grade
    // Example output: "Grade B: ****"

    return 0;
}
```
<!-- hint: switch (grade) { case 'A': cout << "Grade A: *****" << endl; break; case 'B': ... Remember to use single quotes around char values like 'A'. -->
<!-- /exercise -->

## What You Learned

- `switch` checks one variable against multiple specific values -- cleaner than long if-else chains
- Each `case` needs a `break;` or the code falls through to the next case
- `default` catches anything that doesn't match (like `else`)
- Use `switch` for `int` and `char` values; use `if-else` for ranges, strings, and complex conditions

Great job finishing this lesson! You now know two ways to make decisions in your code. Next, we'll learn about **loops** -- how to make your program repeat things without writing the same code over and over!
