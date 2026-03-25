---
title: 'Nested Loops'
slug: nested-loops
sort_order: 9
concepts: [loops, nested-loops]
summary: 'Put loops inside loops to create patterns and grids.'
estimated_minutes: 12
prev_lesson: while-loops
next_lesson: functions
---

## Loops Inside Loops

You already know how to use a single loop. But what happens when you put a loop *inside* another loop? The inner loop runs **completely** for each step of the outer loop. It's like a clock: the minute hand (inner loop) goes around 60 times for every one tick of the hour hand (outer loop).

## Your First Nested Loop

Let's start simple and see how the two loops work together:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int outer = 1; outer <= 3; outer++) {
        for (int inner = 1; inner <= 4; inner++) {
            cout << "(" << outer << "," << inner << ") ";
        }
        cout << endl;
    }
    return 0;
}
```

The outer loop runs 3 times. Each time, the inner loop runs all 4 of its rounds. So we get 3 rows with 4 items each -- that's 12 pairs total (3 x 4).

## Drawing a Rectangle

Nested loops are perfect for drawing shapes. The outer loop handles the rows, and the inner loop handles the columns.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int rows = 4;
    int cols = 10;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

Think of it like filling a grid: go across the first row, then start the next row, go across again, and so on. The `endl` after the inner loop moves us to the next line.

## Drawing a Triangle

Here's where it gets fun. To make a triangle, the inner loop should print a *different* number of stars on each row. The trick is to make the inner loop depend on the outer loop's variable.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int height = 6;

    for (int row = 1; row <= height; row++) {
        for (int star = 0; star < row; star++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

On row 1, the inner loop runs 1 time. On row 2, it runs 2 times. On row 6, it runs 6 times. That's what creates the triangle shape!

## A Centered Triangle (Pyramid)

To make a proper pyramid, you need spaces before the stars. This uses two inner loops -- one for spaces and one for stars.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int height = 5;

    for (int row = 1; row <= height; row++) {
        // First: print spaces
        for (int s = 0; s < height - row; s++) {
            cout << " ";
        }
        // Then: print stars
        for (int star = 0; star < 2 * row - 1; star++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

On each row, the number of spaces goes down and the number of stars goes up. Together they create the centered pyramid.

## Multiplication Table

Here's a practical use of nested loops -- a multiplication table! The outer loop is one number, the inner loop is the other.

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "    ";
    for (int i = 1; i <= 5; i++) {
        cout << i << "\t";
    }
    cout << endl;
    cout << "   -------------------------" << endl;

    for (int row = 1; row <= 5; row++) {
        cout << row << " | ";
        for (int col = 1; col <= 5; col++) {
            cout << row * col << "\t";
        }
        cout << endl;
    }
    return 0;
}
```

Each cell in the table is `row * col`. The `\t` (tab) keeps things lined up neatly.

## How to Think About Nested Loops

Picture a seating chart in a movie theater. The outer loop picks which row you're in. The inner loop picks which seat in that row. Together, they visit every single seat.

Here's another way to think about it:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // Imagine 3 boxes, each with 4 items inside
    for (int box = 1; box <= 3; box++) {
        cout << "Opening box " << box << ":" << endl;
        for (int item = 1; item <= 4; item++) {
            cout << "  Item " << item << endl;
        }
    }
    return 0;
}
```

You open each box (outer loop), and for each box, you look at every item inside it (inner loop).

## A Checkerboard Pattern

Let's combine nested loops with an `if` statement to make a pattern:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int size = 8;
    for (int row = 0; row < size; row++) {
        for (int col = 0; col < size; col++) {
            if ((row + col) % 2 == 0) {
                cout << "# ";
            } else {
                cout << ". ";
            }
        }
        cout << endl;
    }
    return 0;
}
```

By checking if `row + col` is even or odd, we alternate between two characters to create a checkerboard.

<!-- exercise -->
### Your Turn: Draw a Hollow Box

Draw a box that is 6 wide and 4 tall using `*` characters, but make it **hollow** -- only the border should have stars, the inside should be spaces.

Expected output:
```
******
*    *
*    *
******
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int width = 6;
    int height = 4;

    // Outer loop for rows
    // Inner loop for columns
    // Print '*' if on the border, otherwise print ' '

    return 0;
}
```
<!-- hint: A character is on the border if it's in the first or last row (row == 0 or row == height-1) or the first or last column (col == 0 or col == width-1). Use an if-else inside the inner loop. -->
<!-- /exercise -->

<!-- exercise -->
### Bonus: Number Triangle

Print this number triangle using nested loops:

```
1
12
123
1234
12345
```

```cpp
#include <iostream>
using namespace std;

int main() {
    // Outer loop for rows 1 to 5
    // Inner loop prints numbers from 1 up to the row number

    return 0;
}
```
<!-- hint: The outer loop goes from row = 1 to 5. The inner loop goes from num = 1 to row. Print num (not a star) in the inner loop. -->
<!-- /exercise -->

## What You Learned

- A nested loop is a loop inside another loop
- The inner loop runs completely for each step of the outer loop
- Total iterations = outer count x inner count
- Outer loop controls rows, inner loop controls columns
- You can make the inner loop depend on the outer loop's variable for shapes like triangles
- Nested loops can draw rectangles, triangles, pyramids, tables, and checkerboards

Next up, we'll learn about **functions** -- how to organize your code into reusable, named blocks!
