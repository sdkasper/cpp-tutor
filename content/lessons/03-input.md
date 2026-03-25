---
title: 'Getting Input from the User'
slug: input
sort_order: 3
concepts: [input, cin]
summary: 'Let the user type things into your program with cin.'
estimated_minutes: 10
prev_lesson: variables
next_lesson: math
---

## Making Programs Interactive

So far, our programs just print stuff and stop. That's like a TV show with no remote -- you can't change anything! Let's fix that by letting the user **type things in**.

The magic word is `cin` (say it like "see-in"). It's the opposite of `cout` -- instead of sending stuff out, it reads stuff in.

## Reading a Number

Here's how to ask the user for their age:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "How old are you? ";
    cin >> age;
    cout << "Cool! You are " << age << " years old." << endl;
    return 0;
}
```

Notice the arrows! `cout` uses `<<` (pushing stuff **out** to the screen) and `cin` uses `>>` (pulling stuff **in** from the keyboard). Think of the arrows as pointing in the direction the data flows.

When your program hits `cin >> age;`, it **pauses** and waits for the user to type something and press Enter.

## Reading Text

You can also read words using `string`:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "What is your name? ";
    cin >> name;
    cout << "Welcome to C++, " << name << "!" << endl;
    return 0;
}
```

There's one catch -- `cin >>` with a string only reads **one word**. If you type "Luke Skywalker", it would only store "Luke". We'll learn how to read full lines later!

## Reading Multiple Things

You can ask for several pieces of information, one after another:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string favoriteFood;
    int timesPerWeek;

    cout << "What is your favorite food? ";
    cin >> favoriteFood;

    cout << "How many times a week do you eat it? ";
    cin >> timesPerWeek;

    cout << "You eat " << favoriteFood << " about "
         << timesPerWeek << " times a week!" << endl;
    cout << "That's about " << timesPerWeek * 52
         << " times a year!" << endl;
    return 0;
}
```

Each `cin >>` pauses the program and waits for the user to type something. Your program becomes a conversation!

## Building a Mini Program

Let's put `cin` and `cout` together to build something fun -- a personalized greeting generator:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    string color;

    cout << "=== Profile Builder ===" << endl;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Enter your age: ";
    cin >> age;
    cout << "Enter your favorite color: ";
    cin >> color;

    cout << endl;
    cout << "=== Your Profile ===" << endl;
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Favorite color: " << color << endl;
    cout << "In 10 years you'll be " << age + 10 << "!" << endl;
    return 0;
}
```

Now your programs can actually interact with the person using them. That's way more fun than just printing the same thing every time!

<!-- exercise -->
### Your Turn: Pet Introduction

Write a program that asks the user for their pet's name and their pet's age (as a whole number). Then print a fun message using both pieces of information. For example: "Buddy is 3 years old. In dog years, that's about 21!"

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Create variables for the pet's name and age

    // Ask the user for the pet's name

    // Ask the user for the pet's age

    // Print a fun message (try multiplying the age by 7 for dog years!)

    return 0;
}
```
<!-- hint: Use string petName and int petAge. Read them with cin. Then print: cout << petName << " is " << petAge << " years old." << endl; and cout << "In dog years, that's " << petAge * 7 << "!" << endl; -->
<!-- /exercise -->

<!-- exercise -->
### Bonus Challenge: Rectangle Calculator

Ask the user for the width and height of a rectangle (as whole numbers). Then print both the **area** (width times height) and the **perimeter** (2 times width plus 2 times height).

```cpp
#include <iostream>
using namespace std;

int main() {
    // Declare variables for width and height

    // Ask for width and height

    // Calculate and print the area and perimeter

    return 0;
}
```
<!-- hint: int width, height; then cin >> width; and cin >> height; Area is width * height. Perimeter is 2 * width + 2 * height. -->
<!-- /exercise -->

## What You Learned

- `cin >>` reads input from the keyboard and stores it in a variable
- `cout` uses `<<` arrows, `cin` uses `>>` arrows -- data flows in the direction of the arrows
- You can read numbers (`int`, `double`) and single words (`string`)
- Combining `cin` and `cout` makes your programs interactive

Great job! Your programs can now have real conversations with the user. Next, let's learn how to do **math** in your code!
