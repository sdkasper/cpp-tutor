---
title: 'Advanced Functions'
slug: functions-advanced
sort_order: 11
concepts: [functions, void, overloading]
summary: 'Level up your functions with default values and overloading.'
estimated_minutes: 12
prev_lesson: functions
next_lesson: arrays
---

## Ready for More?

You know the basics of functions -- defining them, passing parameters, and returning values. Now let's learn some tricks that make functions even more flexible and powerful.

## Default Parameter Values

Sometimes a function has a "usual" value for a parameter. Instead of making the caller always specify it, you can set a **default**.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

int main() {
    greet("Alex");              // uses default greeting
    greet("Sam", "Hey there");  // overrides the default
    greet("Jordan", "Yo");
    return 0;
}
```

When you call `greet("Alex")`, the `greeting` parameter automatically becomes `"Hello"`. But you can still provide your own value if you want. Default parameters must come **last** in the parameter list.

## Multiple Defaults

You can have several default parameters. Just remember they fill in from right to left:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void drawLine(int length = 10, char symbol = '-') {
    for (int i = 0; i < length; i++) {
        cout << symbol;
    }
    cout << endl;
}

int main() {
    drawLine();           // 10 dashes (both defaults)
    drawLine(5);          // 5 dashes (default symbol)
    drawLine(20, '=');    // 20 equals signs (no defaults)
    return 0;
}
```

You can skip parameters from the right, but not from the middle. So `drawLine()` and `drawLine(5)` work, but you can't skip `length` and only set `symbol`.

## Function Overloading

In C++, you can have **multiple functions with the same name** as long as they take different types or numbers of parameters. The compiler figures out which one to call based on what you pass in.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << "add(3, 4) = " << add(3, 4) << endl;          // calls int version
    cout << "add(1.5, 2.7) = " << add(1.5, 2.7) << endl;  // calls double version
    cout << "add(1, 2, 3) = " << add(1, 2, 3) << endl;    // calls three-int version
    return 0;
}
```

This is called **overloading**. It's like how the word "run" means different things in "run a race" and "run a program" -- same name, different behavior depending on context.

## Pass by Value vs Pass by Reference

This is an important concept. Normally, when you pass a variable to a function, the function gets a **copy**. Changing the copy doesn't change the original. This is called **pass by value**.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void tryToChange(int x) {
    x = 999;
    cout << "Inside function: x = " << x << endl;
}

int main() {
    int myNumber = 42;
    tryToChange(myNumber);
    cout << "After function call: myNumber = " << myNumber << endl;
    // myNumber is still 42!
    return 0;
}
```

The function changed its own copy `x`, but `myNumber` in `main` stayed the same. It's like giving someone a photocopy of a document -- they can scribble all over it, but your original is untouched.

## Pass by Reference (The & Trick)

If you want a function to **actually change** the original variable, add `&` after the type. This is called **pass by reference** -- instead of a copy, the function works with the real variable.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void doubleIt(int &x) {    // notice the &
    x = x * 2;
}

void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int num = 5;
    cout << "Before: " << num << endl;
    doubleIt(num);
    cout << "After doubleIt: " << num << endl;

    int x = 10, y = 20;
    cout << "Before swap: x=" << x << " y=" << y << endl;
    swap(x, y);
    cout << "After swap: x=" << x << " y=" << y << endl;
    return 0;
}
```

The `&` is the key difference. With it, the function can reach back and modify the original variable. Without it, changes stay inside the function.

## Scope: Where Variables Live

Variables only exist inside the block (the curly braces `{}`) where they're created. This is called **scope**.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int stars = 5;  // global variable -- available everywhere

void showStars() {
    cout << "Global stars: " << stars << endl;
    int bonus = 3;  // local to this function
    cout << "Bonus: " << bonus << endl;
}

int main() {
    cout << "In main, stars = " << stars << endl;
    showStars();

    // This would cause an error:
    // cout << bonus;  // bonus doesn't exist here!

    int stars = 99;  // local variable "shadows" the global one
    cout << "Local stars = " << stars << endl;
    return 0;
}
```

The global `stars` is visible everywhere, but the local `stars` in `main` temporarily hides it. As a general rule, avoid global variables -- they can make your code confusing. Keep variables local whenever possible.

## Putting It All Together

Here's a mini program that uses several of these concepts:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

void printHeader(string title, char border = '=') {
    int width = title.length() + 4;
    for (int i = 0; i < width; i++) cout << border;
    cout << endl;
    cout << border << " " << title << " " << border << endl;
    for (int i = 0; i < width; i++) cout << border;
    cout << endl;
}

int power(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int power(int base) {   // overloaded: default squares
    return base * base;
}

int main() {
    printHeader("Powers Calculator");
    cout << endl;

    for (int n = 1; n <= 5; n++) {
        cout << n << " squared = " << power(n) << endl;
        cout << n << " cubed = " << power(n, 3) << endl;
    }

    cout << endl;
    printHeader("Done!", '-');
    return 0;
}
```

This program uses default parameters (`border`), function overloading (two versions of `power`), and clean function organization.

<!-- exercise -->
### Your Turn: Clamp Function

Write a function called `clamp` that takes three integers: a value, a minimum, and a maximum. It should return the value if it's within range, the minimum if it's too low, or the maximum if it's too high. Give `min` a default of 0 and `max` a default of 100.

For example: `clamp(50)` returns 50, `clamp(-10)` returns 0, `clamp(200)` returns 100, `clamp(15, 10, 20)` returns 15.

```cpp
#include <iostream>
using namespace std;

// Write your clamp function here

int main() {
    cout << "clamp(50) = " << clamp(50) << endl;
    cout << "clamp(-10) = " << clamp(-10) << endl;
    cout << "clamp(200) = " << clamp(200) << endl;
    cout << "clamp(15, 10, 20) = " << clamp(15, 10, 20) << endl;
    cout << "clamp(5, 10, 20) = " << clamp(5, 10, 20) << endl;
    return 0;
}
```
<!-- hint: int clamp(int value, int minVal = 0, int maxVal = 100). Use if statements: if value < minVal return minVal, if value > maxVal return maxVal, otherwise return value. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Swap with References

Write a function called `sortTwo` that takes two integers **by reference** and makes sure the first one is smaller than the second. If they're in the wrong order, swap them.

```cpp
#include <iostream>
using namespace std;

// Write your sortTwo function here (use & for references)

int main() {
    int a = 8, b = 3;
    cout << "Before: a=" << a << " b=" << b << endl;
    sortTwo(a, b);
    cout << "After: a=" << a << " b=" << b << endl;

    int x = 1, y = 9;
    cout << "Before: x=" << x << " y=" << y << endl;
    sortTwo(x, y);
    cout << "After: x=" << x << " y=" << y << endl;
    return 0;
}
```
<!-- hint: void sortTwo(int &a, int &b). Inside: if (a > b), swap them using a temp variable: int temp = a; a = b; b = temp; -->
<!-- /exercise -->

## What You Learned

- Default parameters let you skip arguments that usually have the same value
- Function overloading lets you create multiple functions with the same name but different parameters
- Pass by value gives the function a copy (original stays unchanged)
- Pass by reference (`&`) lets the function modify the original variable
- Variables have **scope** -- they only exist inside their `{}` block
- Global variables are visible everywhere, but local variables are preferred

Next up, we'll learn about **arrays** -- how to store a whole list of values in one variable!
