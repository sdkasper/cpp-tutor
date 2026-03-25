---
title: 'File I/O'
slug: file-io
sort_order: 16
concepts: [file-io, ifstream, ofstream]
summary: 'Read from and write to files so your programs can save data.'
estimated_minutes: 12
prev_lesson: structs
next_lesson: null
---

## Why File I/O?

Every program you've written so far forgets everything when it stops running. Variables disappear, scores are lost, and high scores vanish. **File I/O** (Input/Output) lets your programs save data to files and load it back later -- like giving your program a notebook to write in.

File I/O is also essential for **competitive programming** problems (like the Romanian problems in this app), where your program reads input from a file and writes answers to a file.

> **Note about the Run button:** The code runner in this app (Wandbox) can't actually create or read files on disk. The examples below show you the correct C++ syntax and explain what would happen, but file operations won't produce visible results when you click Run. To practice for real, run these programs on your own computer! You can still click Run to check that the code compiles without errors.

## Writing to a File with ofstream

`ofstream` stands for "output file stream" -- it's like `cout`, but instead of printing to the screen, it writes to a file:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // On your computer, this would create a file called "scores.txt"
    // ofstream outFile("scores.txt");
    // outFile << "Alice 95" << endl;
    // outFile << "Bob 87" << endl;
    // outFile << "Carlos 92" << endl;
    // outFile.close();

    // Let's show the same concept using cout (this works in the browser!)
    cout << "If we wrote to scores.txt, it would contain:" << endl;
    cout << "---" << endl;
    cout << "Alice 95" << endl;
    cout << "Bob 87" << endl;
    cout << "Carlos 92" << endl;
    cout << "---" << endl;
    cout << "The syntax is just like cout, but with ofstream!" << endl;

    return 0;
}
```

The key steps for writing to a file:

1. **Include `<fstream>`** -- this gives you file tools.
2. **Create an `ofstream` object** with the filename: `ofstream outFile("scores.txt");`
3. **Use `<<`** to write, exactly like `cout`.
4. **Close the file** with `.close()` when you're done.

## Reading from a File with ifstream

`ifstream` stands for "input file stream" -- it's like `cin`, but reads from a file:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // On your computer, this would read from "scores.txt"
    // ifstream inFile("scores.txt");
    // string name;
    // int score;
    // while (inFile >> name >> score) {
    //     cout << name << " scored " << score << endl;
    // }
    // inFile.close();

    // Let's demonstrate the logic using arrays (works in the browser!)
    string names[] = {"Alice", "Bob", "Carlos"};
    int scores[] = {95, 87, 92};

    cout << "Reading from a file would look like this:" << endl;
    for (int i = 0; i < 3; i++) {
        cout << names[i] << " scored " << scores[i] << endl;
    }

    return 0;
}
```

The `>>` operator reads one word or number at a time, just like `cin >>`. The `while` loop keeps reading until there's nothing left in the file.

## Checking if a File Opened Successfully

What if the file doesn't exist? Always check before reading:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Demonstrating the pattern for checking file open
    // ifstream inFile("data.txt");
    // if (!inFile) {
    //     cout << "Error: Could not open file!" << endl;
    //     return 1;
    // }

    // The pattern is simple:
    cout << "Always check if your file opened!" << endl;
    cout << endl;
    cout << "ifstream inFile(\"data.txt\");" << endl;
    cout << "if (!inFile) {" << endl;
    cout << "    cout << \"Error!\" << endl;" << endl;
    cout << "    return 1;" << endl;
    cout << "}" << endl;
    cout << endl;
    cout << "The ! operator checks if the file failed to open." << endl;
    cout << "return 1 means 'something went wrong' (0 means success)." << endl;

    return 0;
}
```

If the file doesn't exist or can't be opened, `!inFile` will be true. Returning `1` from `main` signals that something went wrong.

## Reading Line by Line with getline

Sometimes data has spaces in it (like full names). Use `getline()` to read entire lines:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // On your computer:
    // ifstream inFile("names.txt");
    // string line;
    // int lineNumber = 1;
    // while (getline(inFile, line)) {
    //     cout << "Line " << lineNumber << ": " << line << endl;
    //     lineNumber++;
    // }
    // inFile.close();

    // Simulating reading lines from a file:
    string lines[] = {
        "Alice Johnson",
        "Bob Smith",
        "Carlos Garcia"
    };

    cout << "Reading line by line (with getline):" << endl;
    for (int i = 0; i < 3; i++) {
        cout << "Line " << (i + 1) << ": " << lines[i] << endl;
    }

    cout << endl;
    cout << "getline reads the WHOLE line, including spaces." << endl;
    cout << ">> only reads one word at a time." << endl;

    return 0;
}
```

Use `getline(inFile, line)` when your data has spaces. Use `inFile >> variable` when reading individual words or numbers.

## The Complete Pattern: Write Then Read

Here's a full example that writes data and reads it back. This is the pattern you'll use most often:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // === WRITING (what you'd do on your computer) ===
    // ofstream outFile("game_scores.txt");
    // outFile << 3 << endl;           // Number of players
    // outFile << "Alice 1500" << endl;
    // outFile << "Bob 2300" << endl;
    // outFile << "Carlos 1800" << endl;
    // outFile.close();
    // cout << "Scores saved!" << endl;

    // === READING (what you'd do on your computer) ===
    // ifstream inFile("game_scores.txt");
    // int count;
    // inFile >> count;
    // for (int i = 0; i < count; i++) {
    //     string name;
    //     int score;
    //     inFile >> name >> score;
    //     cout << name << ": " << score << " points" << endl;
    // }
    // inFile.close();

    // === Demo version (works in browser) ===
    cout << "=== Saving Game Scores ===" << endl;
    string names[] = {"Alice", "Bob", "Carlos"};
    int scores[] = {1500, 2300, 1800};
    int count = 3;

    cout << "Writing to game_scores.txt..." << endl;
    cout << "Saved " << count << " players." << endl;
    cout << endl;

    cout << "=== Loading Game Scores ===" << endl;
    int highScore = 0;
    string champion = "";
    for (int i = 0; i < count; i++) {
        cout << names[i] << ": " << scores[i] << " points" << endl;
        if (scores[i] > highScore) {
            highScore = scores[i];
            champion = names[i];
        }
    }
    cout << endl << "Champion: " << champion << " with " << highScore << " points!" << endl;

    return 0;
}
```

A common pattern is to write the **count** first (how many items follow), then the items. This makes reading much easier because you know exactly how many lines to expect.

## File I/O for Competitive Programming

In Romanian competitive programming (like the problems in this app), programs read from an input file and write to an output file. Here's the standard pattern:

<!-- run -->
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Standard competitive programming pattern:
    // ifstream fin("problem.in");
    // ofstream fout("problem.out");
    //
    // int n;
    // fin >> n;  // Read how many numbers
    //
    // int sum = 0;
    // for (int i = 0; i < n; i++) {
    //     int x;
    //     fin >> x;
    //     sum += x;
    // }
    //
    // fout << sum << endl;  // Write the answer
    //
    // fin.close();
    // fout.close();

    // Demo: solving a "sum of numbers" problem
    cout << "Competitive programming file I/O pattern:" << endl;
    cout << endl;

    // Simulating reading from problem.in
    int numbers[] = {10, 20, 30, 40, 50};
    int n = 5;

    cout << "Input file (problem.in) contains:" << endl;
    cout << n << endl;
    for (int i = 0; i < n; i++) {
        cout << numbers[i] << " ";
    }
    cout << endl << endl;

    // Solving the problem
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += numbers[i];
    }

    cout << "Output file (problem.out) would contain:" << endl;
    cout << sum << endl;

    return 0;
}
```

The convention is to use `fin` and `fout` as short variable names for the input and output file streams.

<!-- exercise -->
### Exercise: Student File Pattern

Write the C++ code that would save 4 student names and their scores to a file, then read them back and find the highest score. Use `cout` to show what the file would contain, then show the result of reading it.

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Student data
    string names[] = {"Alice", "Bob", "Carlos", "Diana"};
    int scores[] = {88, 95, 72, 91};
    int count = 4;

    // Show what we would WRITE to the file
    cout << "=== File contents (students.txt) ===" << endl;
    cout << count << endl;  // First line: how many students
    // TODO: Loop and print each name and score on its own line
    //       Format: "Alice 88" (name space score)

    cout << endl;

    // Show what we would READ back and find the highest
    cout << "=== Reading back ===" << endl;
    // TODO: Loop through the data, print each student,
    //       and track the highest score and who got it
    // TODO: Print "Top student: [name] with [score] points"

    return 0;
}
```
<!-- hint: For writing, loop and print: cout << names[i] << " " << scores[i] << endl; For finding the highest, use int best = 0; and check if scores[i] > scores[best] to update best. -->
<!-- /exercise -->

## Quick Reference

Here's a cheat sheet for file I/O that you can come back to:

| Task | Code |
|------|------|
| Include file tools | `#include <fstream>` |
| Open file for writing | `ofstream outFile("name.txt");` |
| Write to file | `outFile << "text" << endl;` |
| Open file for reading | `ifstream inFile("name.txt");` |
| Read word/number | `inFile >> variable;` |
| Read whole line | `getline(inFile, stringVar);` |
| Check if file opened | `if (!inFile) { ... }` |
| Close file | `inFile.close();` |

## What You Learned

- **`ofstream`** writes to files (like `cout` but to a file).
- **`ifstream`** reads from files (like `cin` but from a file).
- Always **check if the file opened** before using it.
- Use **`>>`** to read words/numbers and **`getline()`** to read full lines.
- Always **close your files** when done with `.close()`.
- For competitive programming, the pattern is: `ifstream fin("problem.in")` and `ofstream fout("problem.out")`.
- The code runner in this app can't create real files, but you'll need this skill for the competitive programming problems and real-world programs!

Congratulations on making it this far! You now have a solid foundation in C++ -- from variables and loops to arrays, strings, structs, and file I/O. Keep practicing with the problems in this app to sharpen your skills!
