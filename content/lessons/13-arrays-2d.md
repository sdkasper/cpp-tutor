---
title: '2D Arrays'
slug: arrays-2d
sort_order: 13
concepts: [arrays, 2d-arrays, matrix]
summary: 'Work with grids and tables using 2D arrays.'
estimated_minutes: 12
prev_lesson: arrays
next_lesson: strings
---

## From Rows to Grids

In the last lesson, you learned about arrays -- a single row of mailboxes. But what if you need a **grid**, like a spreadsheet, a chessboard, or a tic-tac-toe board? That's where **2D arrays** come in.

A 2D array is like an array of arrays. Think of it as a table with **rows** and **columns**. To find any cell, you need two numbers: which row and which column.

## Declaring a 2D Array

Here's a 2D array with 3 rows and 4 columns -- like a mini spreadsheet of student grades:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    // 3 students, 4 test scores each
    int grades[3][4] = {
        {88, 92, 75, 80},   // Student 0
        {95, 87, 91, 100},  // Student 1
        {70, 65, 82, 78}    // Student 2
    };

    cout << "Student 1, Test 2: " << grades[1][2] << endl;
    cout << "Student 0, Test 0: " << grades[0][0] << endl;
    cout << "Student 2, Test 3: " << grades[2][3] << endl;

    return 0;
}
```

The syntax is `arrayName[row][col]`. Just like regular arrays, both row and column indexes start at **0**.

## Visualizing Rows and Columns

It helps to picture the array as a table. Here's what `grades[3][4]` looks like:

|           | Col 0 | Col 1 | Col 2 | Col 3 |
|-----------|-------|-------|-------|-------|
| **Row 0** | 88    | 92    | 75    | 80    |
| **Row 1** | 95    | 87    | 91    | 100   |
| **Row 2** | 70    | 65    | 82    | 78    |

So `grades[1][2]` means row 1, column 2 = **91**.

## Nested Loops: The Key to 2D Arrays

To visit every cell in a 2D array, you use **two loops** -- one inside the other. The outer loop goes through rows, the inner loop goes through columns:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 4; col++) {
            cout << grid[row][col] << "\t";
        }
        cout << endl;  // New line after each row
    }

    return 0;
}
```

The `\t` (tab character) keeps the columns nicely aligned. The outer loop picks a row, then the inner loop prints every column in that row.

## Filling a 2D Array with a Pattern

You can use nested loops to fill a 2D array with calculated values, like a multiplication table:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int table[5][5];

    // Fill the multiplication table
    for (int row = 0; row < 5; row++) {
        for (int col = 0; col < 5; col++) {
            table[row][col] = (row + 1) * (col + 1);
        }
    }

    // Print it with a header
    cout << "  x |  1   2   3   4   5" << endl;
    cout << "----+-------------------" << endl;
    for (int row = 0; row < 5; row++) {
        cout << "  " << (row + 1) << " |";
        for (int col = 0; col < 5; col++) {
            if (table[row][col] < 10) cout << "  ";
            else cout << " ";
            cout << table[row][col];
        }
        cout << endl;
    }

    return 0;
}
```

## A Tic-Tac-Toe Board

2D arrays are perfect for board games! Here's a tic-tac-toe board stored as characters:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    char board[3][3] = {
        {'X', 'O', 'X'},
        {'.', 'X', 'O'},
        {'O', '.', 'X'}
    };

    // Print the board
    cout << "  0 1 2" << endl;
    for (int row = 0; row < 3; row++) {
        cout << row << " ";
        for (int col = 0; col < 3; col++) {
            cout << board[row][col] << " ";
        }
        cout << endl;
    }

    // Count X's and O's
    int xCount = 0, oCount = 0;
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            if (board[row][col] == 'X') xCount++;
            if (board[row][col] == 'O') oCount++;
        }
    }

    cout << endl;
    cout << "X has " << xCount << " marks" << endl;
    cout << "O has " << oCount << " marks" << endl;
}
```

The `.` characters represent empty spaces on the board.

## Summing Rows or Columns

Sometimes you need to add up a single row (one student's total) or a single column (one test's total):

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    int grades[3][4] = {
        {88, 92, 75, 80},
        {95, 87, 91, 100},
        {70, 65, 82, 78}
    };

    // Average for each student (sum across columns)
    for (int row = 0; row < 3; row++) {
        int total = 0;
        for (int col = 0; col < 4; col++) {
            total += grades[row][col];
        }
        cout << "Student " << row << " average: " << total / 4 << endl;
    }

    cout << endl;

    // Average for each test (sum down rows)
    for (int col = 0; col < 4; col++) {
        int total = 0;
        for (int row = 0; row < 3; row++) {
            total += grades[row][col];
        }
        cout << "Test " << col << " average: " << total / 3 << endl;
    }

    return 0;
}
```

Notice how summing a **row** loops over columns, and summing a **column** loops over rows.

<!-- exercise -->
### Exercise: Tic-Tac-Toe Diagonal Check

Given a tic-tac-toe board, check if the main diagonal (top-left to bottom-right) is all the same character. Print "Diagonal win!" if it is, or "No diagonal win" if it isn't.

```cpp
#include <iostream>
using namespace std;

int main() {
    char board[3][3] = {
        {'X', 'O', '.'},
        {'O', 'X', '.'},
        {'.', 'O', 'X'}
    };

    // Print the board first
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            cout << board[row][col] << " ";
        }
        cout << endl;
    }

    // TODO: Check if board[0][0], board[1][1], and board[2][2]
    // are all the same and not '.'
    // Print "Diagonal win!" or "No diagonal win"

    return 0;
}
```
<!-- hint: Check if board[0][0] == board[1][1] AND board[1][1] == board[2][2] AND board[0][0] != '.' using an if statement. -->
<!-- /exercise -->

## What You Learned

- A **2D array** is a grid (table) of values with rows and columns.
- You declare them with two sizes: `int grid[rows][cols]`.
- Access cells with `grid[row][col]` -- both indexes start at 0.
- **Nested loops** (a loop inside a loop) let you visit every cell in the grid.
- 2D arrays are great for tables, game boards, maps, and spreadsheet-like data.

Next, we'll learn about **strings** -- how to work with text in C++!
