---
title: 'Citirea datelor de la utilizator'
slug: input
sort_order: 3
concepts: [input, cin]
summary: 'Lasă utilizatorul să tasteze lucruri în programul tău cu cin.'
estimated_minutes: 10
prev_lesson: variables
next_lesson: math
lang: ro
---

## Programe interactive

Până acum, programele noastre doar afișează lucruri și se opresc. E ca un serial TV fără telecomandă -- nu poți schimba nimic! Hai să rezolvăm asta lăsând utilizatorul să **tasteze lucruri**.

Cuvântul magic este `cin` (se citește "si-in"). E opusul lui `cout` -- în loc să trimită lucruri afară, citește lucruri înăuntru.

## Citirea unui număr

Iată cum ceri utilizatorului vârsta:

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

Observă săgețile! `cout` folosește `<<` (împingând lucruri **afară** pe ecran) și `cin` folosește `>>` (trăgând lucruri **înăuntru** de la tastatură). Gândește-te la săgeți ca și cum arată direcția în care curg datele.

Când programul ajunge la `cin >> age;`, se **oprește** și așteaptă ca utilizatorul să tasteze ceva și să apese Enter.

## Citirea textului

Poți citi și cuvinte folosind `string`:

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

E o mică problemă -- `cin >>` cu un string citește doar **un singur cuvânt**. Dacă tastezi "Luke Skywalker", ar stoca doar "Luke". Vom învăța cum să citim linii întregi mai târziu!

## Citirea mai multor lucruri

Poți cere mai multe informații, una după alta:

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

Fiecare `cin >>` oprește programul și așteaptă ca utilizatorul să tasteze ceva. Programul tău devine o conversație!

## Construirea unui mini-program

Hai să punem `cin` și `cout` împreună pentru a construi ceva distractiv -- un generator de salut personalizat:

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

Acum programele tale pot interacționa cu persoana care le folosește. E mult mai distractiv decât să afișezi același lucru de fiecare dată!

<!-- exercise -->
### Rândul tău: Prezentarea animalului de companie

Scrie un program care cere utilizatorului numele animalului de companie și vârsta lui (ca număr întreg). Apoi afișează un mesaj distractiv folosind ambele informații. De exemplu: "Buddy are 3 ani. În ani de câine, asta înseamnă cam 21!"

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
<!-- hint: Folosește string petName și int petAge. Citește-le cu cin. Apoi afișează: cout << petName << " are " << petAge << " ani." << endl; și cout << "In ani de caine, asta inseamna " << petAge * 7 << "!" << endl; -->
<!-- /exercise -->

<!-- exercise -->
### Provocare bonus: Calculator de dreptunghi

Cere utilizatorului lățimea și înălțimea unui dreptunghi (ca numere întregi). Apoi afișează **aria** (lățime ori înălțime) și **perimetrul** (de 2 ori lățimea plus de 2 ori înălțimea).

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
<!-- hint: int width, height; apoi cin >> width; și cin >> height; Aria este width * height. Perimetrul este 2 * width + 2 * height. -->
<!-- /exercise -->

## Ce ai învățat

- `cin >>` citește input de la tastatură și îl stochează într-o variabilă
- `cout` folosește săgeți `<<`, `cin` folosește săgeți `>>` -- datele curg în direcția săgeților
- Poți citi numere (`int`, `double`) și cuvinte singure (`string`)
- Combinând `cin` și `cout` programele tale devin interactive

Bravo! Programele tale pot acum avea conversații reale cu utilizatorul. În continuare, hai să învățăm cum să facem **matematică** în codul tău!
