---
title: 'Structs'
slug: structs
sort_order: 15
concepts: [structs, struct]
summary: 'Create your own custom data types to group related information.'
estimated_minutes: 12
prev_lesson: strings
next_lesson: file-io
---

## Why Structs?

Imagine you're building a student database. Each student has a name, age, and grade. You could use three separate arrays:

```
string names[30];
int ages[30];
double grades[30];
```

But that's messy. If you sort the names, you have to remember to rearrange the ages and grades too. What if you could bundle all the info about one student into a single package? That's exactly what a **struct** does.

## Defining a Struct

A struct is like a blueprint for a custom data type. You define what pieces of information it holds:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double grade;
};

int main() {
    Student alice;
    alice.name = "Alice";
    alice.age = 14;
    alice.grade = 92.5;

    cout << "Name: " << alice.name << endl;
    cout << "Age: " << alice.age << endl;
    cout << "Grade: " << alice.grade << endl;

    return 0;
}
```

Let's break that down:

- **`struct Student { ... };`** creates a new type called `Student`. Don't forget the semicolon after the closing `}`!
- Each variable inside the struct (like `name`, `age`, `grade`) is called a **member**.
- **`Student alice;`** creates a variable of type `Student`, just like `int x;` creates an integer.
- **`alice.name`** uses the **dot operator** (`.`) to access a member.

## Initializing a Struct

You can fill in all the members at once when you create the struct:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Pet {
    string name;
    string species;
    int age;
};

int main() {
    Pet myPet = {"Buddy", "dog", 3};
    Pet friendsPet = {"Whiskers", "cat", 7};

    cout << myPet.name << " is a " << myPet.age
         << "-year-old " << myPet.species << endl;

    cout << friendsPet.name << " is a " << friendsPet.age
         << "-year-old " << friendsPet.species << endl;

    return 0;
}
```

The values inside `{ }` must be in the same order as the members in the struct definition.

## Structs in Real Life: Game Characters

Structs shine when you're modeling real-world things. Here's a game character with multiple stats:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int health;
    int attack;
    int defense;
    int level;
};

int main() {
    Character hero = {"Knight", 100, 25, 15, 1};
    Character monster = {"Dragon", 200, 40, 20, 5};

    cout << "=== BATTLE ===" << endl;
    cout << hero.name << " (Lv." << hero.level << ")"
         << " HP:" << hero.health
         << " ATK:" << hero.attack << endl;

    cout << monster.name << " (Lv." << monster.level << ")"
         << " HP:" << monster.health
         << " ATK:" << monster.attack << endl;

    // Hero attacks monster
    int damage = hero.attack - monster.defense;
    if (damage < 0) damage = 0;
    monster.health -= damage;

    cout << endl << hero.name << " deals " << damage << " damage!" << endl;
    cout << monster.name << " HP is now " << monster.health << endl;

    return 0;
}
```

Without structs, you'd need separate variables for `heroName`, `heroHealth`, `heroAttack`... it would get out of hand fast.

## Arrays of Structs

Here's where structs really prove their worth. You can make an **array of structs** to store a whole list of structured data:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int grade;
};

int main() {
    const int SIZE = 4;
    Student classRoom[SIZE] = {
        {"Alice", 95},
        {"Bob", 82},
        {"Carlos", 91},
        {"Diana", 88}
    };

    // Find the top student
    int bestIndex = 0;
    for (int i = 1; i < SIZE; i++) {
        if (classRoom[i].grade > classRoom[bestIndex].grade) {
            bestIndex = i;
        }
    }

    cout << "Class grades:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "  " << classRoom[i].name << ": " << classRoom[i].grade;
        if (i == bestIndex) cout << " <-- Top student!";
        cout << endl;
    }

    return 0;
}
```

Each element in the array is a complete `Student` with all their info bundled together. So much cleaner than parallel arrays!

## Passing Structs to Functions

You can pass structs to functions just like any other variable:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Rectangle {
    double width;
    double height;
};

double area(Rectangle r) {
    return r.width * r.height;
}

double perimeter(Rectangle r) {
    return 2 * (r.width + r.height);
}

void printInfo(Rectangle r) {
    cout << "Width: " << r.width << ", Height: " << r.height << endl;
    cout << "Area: " << area(r) << endl;
    cout << "Perimeter: " << perimeter(r) << endl;
}

int main() {
    Rectangle room = {5.5, 4.0};
    Rectangle garden = {12.0, 8.5};

    cout << "Room:" << endl;
    printInfo(room);

    cout << endl << "Garden:" << endl;
    printInfo(garden);

    return 0;
}
```

The function receives a copy of the struct and can read all its members using the dot operator.

## Functions That Return Structs

Functions can also create and return structs:

<!-- run -->
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Point {
    double x;
    double y;
};

Point midpoint(Point a, Point b) {
    Point mid;
    mid.x = (a.x + b.x) / 2;
    mid.y = (a.y + b.y) / 2;
    return mid;
}

int main() {
    Point start = {0.0, 0.0};
    Point end = {10.0, 6.0};

    Point middle = midpoint(start, end);

    cout << "Start: (" << start.x << ", " << start.y << ")" << endl;
    cout << "End: (" << end.x << ", " << end.y << ")" << endl;
    cout << "Midpoint: (" << middle.x << ", " << middle.y << ")" << endl;

    return 0;
}
```

<!-- exercise -->
### Exercise: Contact Book

Create a `Contact` struct with `name` (string), `phone` (string), and `age` (int). Make an array of 3 contacts, then write a loop that prints only the contacts who are 18 or older.

```cpp
#include <iostream>
#include <string>
using namespace std;

// TODO: Define a Contact struct with name, phone, and age

int main() {
    // TODO: Create an array of 3 contacts:
    // "Alice", "555-1234", 15
    // "Bob", "555-5678", 21
    // "Carlos", "555-9012", 18

    cout << "Contacts aged 18+:" << endl;
    // TODO: Loop through the array and print only contacts with age >= 18

    return 0;
}
```
<!-- hint: Define struct Contact { string name; string phone; int age; }; then create Contact contacts[3] = { {"Alice", "555-1234", 15}, ... }; and loop with an if checking contacts[i].age >= 18. -->
<!-- /exercise -->

## What You Learned

- A **struct** bundles related variables together into one custom data type.
- You define a struct with `struct Name { members };` (don't forget the semicolon!).
- Access members using the **dot operator**: `variable.member`.
- You can initialize all members at once with `{ }`.
- **Arrays of structs** keep structured data organized and easy to work with.
- Structs can be **passed to** and **returned from** functions just like any other type.

In the next lesson, you'll learn about **file I/O** -- how to make your programs read from and write to files so they can save data!
