---
title: 'Strings'
slug: strings
sort_order: 14
concepts: [strings, string-methods]
summary: 'Work with text — combine, search, and transform strings.'
estimated_minutes: 12
prev_lesson: arrays-2d
next_lesson: structs
---

## Text in C++

So far you've used `string` to store names and words. In this lesson, we'll really dig into what you can do with strings -- combining them, searching inside them, pulling out pieces, and more.

A **string** is basically an array of characters with superpowers. Unlike a regular `char` array, C++ strings automatically grow and shrink, and they come with lots of built-in tools.

## Creating and Combining Strings

You can glue strings together using the **`+`** operator. This is called **concatenation** (a fancy word for "joining together"):

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string firstName = "Alex";
    string lastName = "Johnson";

    string fullName = firstName + " " + lastName;
    cout << "Full name: " << fullName << endl;

    // You can also add onto an existing string
    string greeting = "Hello";
    greeting += ", ";
    greeting += fullName;
    greeting += "!";
    cout << greeting << endl;

    return 0;
}
```

The `+=` operator is a shortcut for "add this onto the end." It's like taping extra letters onto the end of a word.

## String Length

Use `.length()` or `.size()` (they do the same thing) to find out how many characters a string has:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "dinosaur";
    cout << "'" << word << "' has " << word.length() << " letters" << endl;

    string sentence = "C++ is fun!";
    cout << "'" << sentence << "' has " << sentence.length() << " characters" << endl;

    // Spaces and punctuation count as characters!
    string empty = "";
    cout << "An empty string has " << empty.length() << " characters" << endl;

    return 0;
}
```

Remember: spaces, punctuation, and symbols all count as characters.

## Accessing Individual Characters

You can grab a single character using `[]` (just like arrays) or `.at()`:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "PIZZA";

    cout << "First letter: " << word[0] << endl;
    cout << "Third letter: " << word[2] << endl;
    cout << "Last letter: " << word[word.length() - 1] << endl;

    // You can also change individual characters
    word[0] = 'L';
    cout << "Changed first letter: " << word << endl;

    // Loop through every character
    cout << "Spelling it out: ";
    for (int i = 0; i < word.length(); i++) {
        cout << word[i] << "-";
    }
    cout << endl;

    return 0;
}
```

Since indexes start at 0, the last character is always at position `length() - 1`.

## Getting a Piece of a String with substr()

The `.substr()` method lets you copy a piece of a string. You tell it where to start and how many characters to take:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string date = "2026-03-25";

    string year = date.substr(0, 4);     // Start at 0, take 4 characters
    string month = date.substr(5, 2);    // Start at 5, take 2 characters
    string day = date.substr(8, 2);      // Start at 8, take 2 characters

    cout << "Year: " << year << endl;
    cout << "Month: " << month << endl;
    cout << "Day: " << day << endl;

    string greeting = "Hello World";
    cout << "First word: " << greeting.substr(0, 5) << endl;

    return 0;
}
```

Think of `substr(start, count)` like saying "start at this position and grab this many characters."

## Finding Text Inside a String

The `.find()` method searches for text inside a string and tells you where it starts. If it can't find it, it returns a special value called `string::npos`:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string sentence = "I love eating pizza and pasta";

    int pos = sentence.find("pizza");
    if (pos != string::npos) {
        cout << "Found 'pizza' at position " << pos << endl;
    }

    pos = sentence.find("pasta");
    if (pos != string::npos) {
        cout << "Found 'pasta' at position " << pos << endl;
    }

    pos = sentence.find("sushi");
    if (pos == string::npos) {
        cout << "'sushi' was NOT found" << endl;
    }

    return 0;
}
```

This is super useful when you need to check if a word appears in a sentence.

## Reading Strings with Spaces

There's an important gotcha with `cin >>`. It stops reading at the first space! To read a whole line (including spaces), use `getline()`:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Simulating what would happen with different inputs
    string word = "Hello";
    string full = "Hello World";

    // cin >> word would only get "Hello" from "Hello World"
    cout << "cin >> gets one word: " << word << endl;

    // getline gets the whole line
    cout << "getline gets everything: " << full << endl;

    // Example of getline in a real program:
    // string name;
    // cout << "What's your full name? ";
    // getline(cin, name);
    // cout << "Hi, " << name << "!" << endl;

    // Let's show getline with a name that has spaces
    string name = "Ada Lovelace";
    cout << "Full name: " << name << endl;
    cout << "Name length: " << name.length() << endl;

    return 0;
}
```

Remember: use `cin >>` for single words, `getline(cin, variable)` for full lines with spaces.

## Comparing Strings

You can compare strings using `==`, `!=`, `<`, and `>`. The comparison works alphabetically:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";
    string c = "apple";

    if (a == c) {
        cout << "\"apple\" equals \"apple\" - true!" << endl;
    }

    if (a != b) {
        cout << "\"apple\" does not equal \"banana\" - true!" << endl;
    }

    // < and > compare alphabetically
    if (a < b) {
        cout << "\"apple\" comes before \"banana\" alphabetically" << endl;
    }

    // Careful: uppercase letters come before lowercase!
    string upper = "Zebra";
    string lower = "apple";
    if (upper < lower) {
        cout << "\"Zebra\" < \"apple\" because uppercase comes first!" << endl;
    }

    return 0;
}
```

One surprise: uppercase letters are "less than" lowercase letters in C++. So `"Zebra"` comes before `"apple"` in string comparison.

<!-- exercise -->
### Exercise: Word Analyzer

Write a program that takes a word and prints: its length, its first character, its last character, and the word in reverse.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "programming";

    // TODO: Print the length of the word

    // TODO: Print the first character

    // TODO: Print the last character

    // TODO: Print the word backwards (use a loop that goes from the end to the start)

    return 0;
}
```
<!-- hint: For the last character use word[word.length() - 1]. For reversing, loop from i = word.length() - 1 down to 0 and print word[i] each time. -->
<!-- /exercise -->

<!-- exercise -->
### Exercise: Email Finder

Check if a string contains the "@" symbol. If it does, print "Looks like an email!" and show everything before the @ and everything after it.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "alex@school.com";

    // TODO: Use .find("@") to check if @ exists
    // If found, use .substr() to get the part before and after @
    // Print: "Username: alex"
    // Print: "Domain: school.com"
    // If not found, print: "Not an email address"

    return 0;
}
```
<!-- hint: Use int pos = text.find("@"). The username is text.substr(0, pos). The domain is text.substr(pos + 1). Remember pos + 1 skips past the @ symbol. -->
<!-- /exercise -->

## What You Learned

- Strings hold text and can grow and shrink automatically.
- **`+`** and **`+=`** join strings together (concatenation).
- **`.length()`** tells you how many characters a string has.
- **`[]`** or **`.at()`** access individual characters (starting at index 0).
- **`.substr(start, count)`** extracts a piece of a string.
- **`.find(text)`** searches for text and returns its position (or `string::npos` if not found).
- **`getline(cin, variable)`** reads a whole line including spaces.
- Strings can be compared with `==`, `!=`, `<`, `>` (alphabetical order).

Next lesson, we'll learn about **structs** -- how to create your own custom data types!
