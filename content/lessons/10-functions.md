---
title: 'Functions'
slug: functions
sort_order: 10
concepts: [functions, parameters, return]
summary: 'Organize your code into reusable pieces called functions.'
estimated_minutes: 14
prev_lesson: nested-loops
next_lesson: functions-advanced
---

## Why Functions?

Imagine you're baking cookies. You follow a recipe: mix ingredients, shape the dough, bake for 12 minutes. Now imagine you had to rewrite the entire recipe every single time you wanted cookies. That would be exhausting!

Functions are like recipes for your code. You write the instructions once, give them a name, and then use that name whenever you need to run those instructions. This saves time and keeps your code organized.

## Your First Function

Let's start with a simple function that says hello:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

// Define the function
void sayHello() {
    cout << "Hello there!" << endl;
    cout << "Welcome to C++!" << endl;
}

// Use (call) the function
int main() {
    sayHello();
    cout << "---" << endl;
    sayHello();
    return 0;
}
```

We wrote the greeting code once in `sayHello()`, but we used it twice! The word `void` means this function doesn't send back any value -- it just does something.

## Functions with Parameters

Functions become really powerful when you give them **parameters** -- information they need to do their job. It's like telling a chef what flavor of cake to make.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void greet(string name) {
    cout << "Hey " << name << "! Nice to see you!" << endl;
}

int main() {
    greet("Alex");
    greet("Sam");
    greet("Jordan");
    return 0;
}
```

The function `greet` takes one parameter called `name`. Each time we call it, we pass in a different name, and the function uses it.

## Multiple Parameters

You can give a function as many parameters as it needs, separated by commas:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void introduce(string name, int age, string hobby) {
    cout << "Hi, I'm " << name << "!" << endl;
    cout << "I'm " << age << " years old." << endl;
    cout << "I love " << hobby << "!" << endl;
    cout << "---" << endl;
}

int main() {
    introduce("Alex", 12, "coding");
    introduce("Sam", 11, "drawing");
    return 0;
}
```

When calling the function, you must pass the values in the same order they're defined.

## Return Values: Getting Answers Back

Sometimes you don't just want a function to *do* something -- you want it to *give you an answer*. That's what `return` is for. Instead of `void`, you write the type of value it returns.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int sum = add(15, 27);
    cout << "15 + 27 = " << sum << endl;

    int product = multiply(6, 7);
    cout << "6 x 7 = " << product << endl;

    // You can also use the result directly
    cout << "3 + 4 + 5 = " << add(add(3, 4), 5) << endl;
    return 0;
}
```

The `int` before the function name means "this function returns an integer." The `return` statement sends that value back to wherever the function was called.

## Building a Mini Calculator

Let's put several functions together to build something useful:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        cout << "Error: can't divide by zero!" << endl;
        return 0;
    }
    return a / b;
}

int square(int n) {
    return n * n;
}

bool isEven(int n) {
    return n % 2 == 0;
}

int main() {
    cout << "10 / 3 = " << divide(10, 3) << endl;
    cout << "5 squared = " << square(5) << endl;

    for (int i = 1; i <= 6; i++) {
        cout << i << " is " << (isEven(i) ? "even" : "odd") << endl;
    }
    return 0;
}
```

Notice how each function has a clear job. `divide` returns a `double` (decimal number), `square` returns an `int`, and `isEven` returns a `bool` (true or false).

## Void Functions: Just Do Something

Not every function needs to return a value. `void` functions perform an action without sending anything back. They're great for printing or drawing.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void drawLine(int length, char symbol) {
    for (int i = 0; i < length; i++) {
        cout << symbol;
    }
    cout << endl;
}

void drawBox(int width, int height) {
    for (int row = 0; row < height; row++) {
        drawLine(width, '*');
    }
}

int main() {
    drawLine(20, '=');
    cout << "  My Program" << endl;
    drawLine(20, '=');
    cout << endl;
    drawBox(8, 3);
    return 0;
}
```

See how `drawBox` calls `drawLine`? Functions can call other functions! This is how you build complex programs from simple building blocks.

## Where Functions Go

A function must be **defined** (or at least **declared**) before it's used. That's why we write our functions above `main()`. If you call a function that the compiler hasn't seen yet, you'll get an error.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

// This is called a "function declaration" or "prototype"
int doubleIt(int n);

int main() {
    // We can use doubleIt here because we declared it above
    cout << "Double 8 is " << doubleIt(8) << endl;
    return 0;
}

// The full definition can come after main
int doubleIt(int n) {
    return n * 2;
}
```

The declaration at the top tells the compiler "trust me, this function exists." The full definition comes later. This is optional but useful for organizing larger programs.

<!-- exercise -->
### Your Turn: Temperature Converter

Write a function called `celsiusToFahrenheit` that takes a `double` temperature in Celsius and returns it in Fahrenheit. The formula is: **F = C x 9/5 + 32**

Then call it from `main()` to convert these temperatures: 0, 20, 37, and 100.

```cpp
#include <iostream>
using namespace std;

// Write your celsiusToFahrenheit function here

int main() {
    cout << "0 C = " << celsiusToFahrenheit(0) << " F" << endl;
    cout << "20 C = " << celsiusToFahrenheit(20) << " F" << endl;
    cout << "37 C = " << celsiusToFahrenheit(37) << " F" << endl;
    cout << "100 C = " << celsiusToFahrenheit(100) << " F" << endl;
    return 0;
}
```
<!-- hint: The function signature is: double celsiusToFahrenheit(double celsius). Inside, return celsius * 9.0 / 5.0 + 32; -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Max of Three

Write a function called `maxOfThree` that takes three integers and returns the largest one. Test it with a few different sets of numbers.

```cpp
#include <iostream>
using namespace std;

// Write your maxOfThree function here

int main() {
    cout << "Max of 3, 7, 5 is: " << maxOfThree(3, 7, 5) << endl;
    cout << "Max of 10, 2, 8 is: " << maxOfThree(10, 2, 8) << endl;
    cout << "Max of 4, 4, 4 is: " << maxOfThree(4, 4, 4) << endl;
    return 0;
}
```
<!-- hint: One approach: use if-else to compare. Start with int result = a; then if (b > result) result = b; then if (c > result) result = c; return result; -->
<!-- /exercise -->

## What You Learned

- Functions let you name and reuse blocks of code
- Parameters pass information *into* a function
- `return` sends a value *back* to the caller
- `void` functions perform actions without returning a value
- Functions must be defined or declared before they're called
- You can call functions from inside other functions to build complex behavior from simple parts

Next up, we'll explore **advanced functions** -- default parameters, overloading, and how to change variables from inside a function!
