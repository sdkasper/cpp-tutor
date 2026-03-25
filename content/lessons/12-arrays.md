---
title: 'Arrays'
slug: arrays
sort_order: 12
concepts: [arrays, indexing]
summary: 'Store lists of things using arrays.'
estimated_minutes: 12
prev_lesson: functions-advanced
next_lesson: arrays-2d
---

## What's an Array?

Imagine a row of mailboxes at an apartment building. Each mailbox is numbered (0, 1, 2, 3...) and can hold one piece of mail. An **array** in C++ works exactly like that -- it's a row of boxes, each holding one value, and each box has a number so you can find it.

Instead of creating five separate variables like `score1`, `score2`, `score3`... you create one array that holds all five scores in a neat row.

## Declaring an Array

Here's how you create an array of 5 integers:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5] = {95, 87, 72, 100, 68};

    cout << "First score: " << scores[0] << endl;
    cout << "Second score: " << scores[1] << endl;
    cout << "Last score: " << scores[4] << endl;

    return 0;
}
```

A few things to notice:

- **`int scores[5]`** creates 5 mailboxes that each hold an `int`.
- **`{95, 87, 72, 100, 68}`** fills the mailboxes with values.
- The number inside `[]` when you access an element is called the **index**.

## Indexes Start at 0!

This is the most important thing to remember about arrays: **counting starts at 0, not 1**. Think of it like floors in a building in some countries -- the ground floor is floor 0.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    string friends[4] = {"Alice", "Bob", "Carlos", "Diana"};

    cout << "Index 0: " << friends[0] << endl;
    cout << "Index 1: " << friends[1] << endl;
    cout << "Index 2: " << friends[2] << endl;
    cout << "Index 3: " << friends[3] << endl;

    // There is NO index 4! The array only goes from 0 to 3.
    return 0;
}
```

An array with 4 elements has indexes **0, 1, 2, 3**. The last valid index is always the size minus 1.

## Changing Values in an Array

You can change what's in any mailbox by using its index:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int temperatures[5] = {20, 22, 19, 25, 23};

    cout << "Wednesday was: " << temperatures[2] << " degrees" << endl;

    // Oops, we made a mistake! Wednesday was actually 21 degrees.
    temperatures[2] = 21;

    cout << "Fixed! Wednesday was: " << temperatures[2] << " degrees" << endl;

    return 0;
}
```

## Looping Through an Array

This is where arrays become really powerful. Instead of writing `scores[0]`, `scores[1]`, `scores[2]`... you can use a **for loop** to visit every element automatically:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[6] = {88, 92, 75, 100, 67, 95};
    int total = 0;

    for (int i = 0; i < 6; i++) {
        cout << "Score " << i << ": " << scores[i] << endl;
        total = total + scores[i];
    }

    cout << "Total: " << total << endl;
    cout << "Average: " << total / 6 << endl;

    return 0;
}
```

The variable `i` goes from 0 to 5, and `scores[i]` grabs each score one by one. This works the same whether you have 6 scores or 6,000!

## Finding the Biggest Value

A common task is searching through an array to find the maximum value. You start by assuming the first element is the biggest, then check every other element:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5] = {78, 95, 63, 88, 91};
    int highest = scores[0];

    for (int i = 1; i < 5; i++) {
        if (scores[i] > highest) {
            highest = scores[i];
        }
    }

    cout << "The highest score is: " << highest << endl;

    return 0;
}
```

## Keeping Track of Array Size

It's a good habit to store the array size in a variable or constant. That way, if you change the number of elements, you only have to update one place:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    const int SIZE = 4;
    string pets[SIZE] = {"dog", "cat", "hamster", "fish"};

    cout << "My pets:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "  " << (i + 1) << ". " << pets[i] << endl;
    }

    return 0;
}
```

Using `const int SIZE` makes your code easier to read and less likely to have bugs.

<!-- exercise -->
### Exercise: Class Grade Report

Write a program that stores 7 student grades in an array, then loops through to find and print the highest grade, the lowest grade, and the average.

```cpp
#include <iostream>
using namespace std;

int main() {
    int grades[7] = {85, 92, 78, 95, 88, 70, 100};

    // TODO: Find the highest grade

    // TODO: Find the lowest grade

    // TODO: Calculate the average

    // TODO: Print all three results

    return 0;
}
```
<!-- hint: Start with int highest = grades[0]; and int lowest = grades[0]; then loop through and update them with if statements. For the average, add all grades into a total variable and divide by 7. -->
<!-- /exercise -->

<!-- exercise -->
### Exercise: Reverse Printer

Print the elements of an array in reverse order (last to first). The output should be: 50 40 30 20 10

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};

    // TODO: Use a for loop that counts backwards
    // to print the array in reverse order

    return 0;
}
```
<!-- hint: Start your loop at i = 4 and go down to 0. Use i-- instead of i++ and the condition i >= 0. -->
<!-- /exercise -->

## What You Learned

- An **array** stores multiple values of the same type in a row, like numbered mailboxes.
- Array indexes start at **0**, not 1.
- You access elements with `arrayName[index]` and change them the same way.
- A **for loop** is the perfect partner for arrays -- it lets you visit every element.
- Always keep track of your array's size to avoid going out of bounds.

Next up, we'll level up to **2D arrays** -- arrays of arrays that let you work with grids and tables!
