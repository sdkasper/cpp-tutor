---
title: 'Variables: Storing Information'
slug: variables
sort_order: 2
concepts: [variables, int, double, string, char]
summary: 'Store and use information in your programs with variables.'
estimated_minutes: 12
prev_lesson: output
next_lesson: input
---

## What Are Variables?

Imagine you have a bunch of **labeled boxes**. One box says "age" and you put the number 12 inside. Another box says "name" and you put your name inside. That's exactly what variables are in programming -- labeled boxes that store information!

Your program can look inside these boxes, change what's in them, and use them whenever it needs to.

## Your First Variable

Let's create a variable that stores a number:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 12;
    cout << "I am " << age << " years old" << endl;
    return 0;
}
```

Here's what happened: we created a box called `age`, told C++ it holds a whole number (`int`), and put `12` inside. Then we printed it!

## Types of Variables

Not all boxes hold the same kind of stuff. C++ has different **types** for different kinds of information:

| Type | What It Stores | Example |
|------|---------------|---------|
| `int` | Whole numbers (no decimals) | `42`, `-7`, `0` |
| `double` | Numbers with decimals | `3.14`, `99.5` |
| `string` | Text (words and sentences) | `"Hello"`, `"Pizza"` |
| `char` | A single character | `'A'`, `'z'`, `'!'` |

Notice that `string` values use **double quotes** `" "` and `char` values use **single quotes** `' '`. This is important!

Let's see all four types in action:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int lives = 3;
    double score = 98.5;
    string playerName = "Alex";
    char grade = 'A';

    cout << "Player: " << playerName << endl;
    cout << "Grade: " << grade << endl;
    cout << "Lives: " << lives << endl;
    cout << "Score: " << score << endl;
    return 0;
}
```

We added `#include <string>` at the top because `string` needs its own toolbox. The other types (`int`, `double`, `char`) are built right into C++.

## Changing What's in the Box

You can change a variable's value at any time. Just use `=` again:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int pizzaSlices = 8;
    cout << "We start with " << pizzaSlices << " slices" << endl;

    pizzaSlices = 6;
    cout << "After eating 2: " << pizzaSlices << " slices left" << endl;

    pizzaSlices = 0;
    cout << "After the party: " << pizzaSlices << " slices left" << endl;
    return 0;
}
```

The box stays the same, but the stuff inside changes. That's why they're called **variables** -- they can vary!

## Declaring vs Assigning

There are two things you can do with variables:

- **Declare** -- create the box and give it a label (`int score;`)
- **Assign** -- put something inside (`score = 100;`)

You can do both at once, or separately:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare and assign at the same time
    int health = 100;

    // Declare first, assign later
    string weapon;
    weapon = "Diamond Sword";

    cout << "Health: " << health << endl;
    cout << "Weapon: " << weapon << endl;
    return 0;
}
```

Most of the time, it's easier to declare and assign on the same line.

## Using Variables Together

Variables become really powerful when you combine them:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string food = "pizza";
    int slices = 4;
    double pricePerSlice = 2.50;
    double total = slices * pricePerSlice;

    cout << "You ordered " << slices << " slices of " << food << endl;
    cout << "Each slice costs $" << pricePerSlice << endl;
    cout << "Total: $" << total << endl;
    return 0;
}
```

We even used one variable (`total`) to store a calculation based on other variables. Cool, right?

<!-- exercise -->
### Your Turn: Character Card

Create variables to describe a game character: their name (string), level (int), health points as a decimal (double), and their class initial like 'W' for Warrior (char). Print everything out in a nice format.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Create your character's variables here

    // Print the character card
    cout << "=== CHARACTER CARD ===" << endl;
    // Print name, level, health, and class initial

    return 0;
}
```
<!-- hint: Try something like: string name = "Shadow"; int level = 5; double hp = 87.5; char classInitial = 'W'; Then print each one with cout. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Swap the Values

You have two variables. Can you swap their values so `a` ends up with 20 and `b` ends up with 10? You'll need a third variable to help!

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 20;

    cout << "Before: a = " << a << ", b = " << b << endl;

    // Swap the values of a and b here
    // Hint: you might need a temporary variable!

    cout << "After: a = " << a << ", b = " << b << endl;
    return 0;
}
```
<!-- hint: Create a variable like int temp = a; then set a = b; then set b = temp; -->
<!-- /exercise -->

## What You Learned

- Variables are like **labeled boxes** that store information
- `int` stores whole numbers, `double` stores decimals, `string` stores text, `char` stores a single character
- You **declare** a variable with its type and name, and **assign** a value with `=`
- You can change a variable's value anytime and use variables together in `cout`

Awesome work! Now that you know how to store information, let's learn how to let the **user** type information into your program using **input**.
