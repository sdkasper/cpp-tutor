---
title: 'Your First Program'
slug: output
sort_order: 1
concepts: [output, cout, endl]
summary: 'Make the computer say things! Learn how to print text to the screen.'
estimated_minutes: 10
prev_lesson: null
next_lesson: variables
---

## Welcome!

You're about to write your very first C++ program. By the end of this lesson, you'll be able to make the computer print anything you want to the screen.

## The "Hello, World!" Program

Every programmer starts here. Here's the simplest C++ program that actually does something:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Click **Run** and see what happens! The computer should print `Hello, World!` in the output below.

## What Does Each Line Mean?

Let's break it down piece by piece:

- **`#include <iostream>`** -- This tells C++ "I want to use input and output." Think of it like opening a toolbox before you start building.
- **`using namespace std;`** -- This is a shortcut so we can write `cout` instead of the longer `std::cout`. Don't worry about it too much for now.
- **`int main()`** -- This is where your program starts running. Every C++ program needs a `main` function. It's like the front door of your program.
- **`cout << "Hello, World!" << endl;`** -- This is the fun part! `cout` (say it like "see-out") sends text to the screen. `endl` adds a new line at the end.
- **`return 0;`** -- This tells the computer "I'm done, everything went fine."

## Printing Multiple Lines

You can use `cout` more than once to print multiple lines:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "My name is C++ Tutor" << endl;
    cout << "I can print anything!" << endl;
    cout << "Even numbers: " << 42 << endl;
    return 0;
}
```

Notice how each `cout` statement prints on its own line because of `endl`.

## Printing Without a New Line

What if you want to print things on the **same line**? Just leave out `endl`:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello ";
    cout << "World ";
    cout << "!" << endl;
    return 0;
}
```

Everything stays on one line until you add `endl`.

## Special Characters

Sometimes you need to print things like quotes or tabs. You use a **backslash** `\` for these:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "She said \"hello\"" << endl;
    cout << "Line 1\nLine 2\nLine 3" << endl;
    cout << "Name:\tAge:" << endl;
    cout << "Alex\t12" << endl;
    return 0;
}
```

- `\"` prints a quote mark
- `\n` starts a new line (like `endl` but inside a string)
- `\t` adds a tab space

Here's an example of ASCII art -- click **Run** to see what it prints:

<!-- run -->
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "   /\\" << endl;
    cout << "  /  \\" << endl;
    cout << " /    \\" << endl;
    cout << "|------|" << endl;
    cout << "|      |" << endl;
    cout << "|      |" << endl;
    cout << "--------" << endl;
    return 0;
}
```

<!-- exercise -->
### Your Turn: Make Your Own ASCII Art

Now try making your own picture using `cout`! It could be a tree, a rocket, a face, or anything you like.

```cpp
#include <iostream>
using namespace std;

int main() {
    // Draw something cool with cout!
    // Use spaces, slashes, dashes, pipes, and other characters.

    return 0;
}
```
<!-- hint: Try a simple shape first, like a triangle: cout << "  *" << endl; cout << " ***" << endl; cout << "*****" << endl; -->
<!-- /exercise -->

## What You Learned

- `cout` sends text to the screen
- `endl` moves to a new line
- You can print text, numbers, and special characters
- Every C++ program needs `#include <iostream>` and `int main()`

Great job making it through your first lesson! Next up, we'll learn about **variables** -- how to store and remember information in your programs.
