---
title: 'Siruri de caractere'
slug: strings
sort_order: 14
lang: ro
concepts: [strings, string-methods]
summary: 'Lucreaza cu text — combina, cauta si transforma siruri de caractere.'
estimated_minutes: 12
prev_lesson: arrays-2d
next_lesson: structs
---

## Textul in C++

Pana acum ai folosit `string` ca sa stochezi nume si cuvinte. In aceasta lectie, vom explora cu adevarat ce poti face cu sirurile de caractere -- combinarea lor, cautarea in interiorul lor, extragerea de bucati si multe altele.

Un **sir de caractere** (string) este practic un tablou de caractere cu superputeri. Spre deosebire de un tablou `char` obisnuit, sirurile din C++ cresc si se micsoreaza automat si vin cu o multime de instrumente incorporate.

## Crearea si combinarea sirurilor

Poti lipi siruri impreuna folosind operatorul **`+`**. Asta se numeste **concatenare** (un cuvant sofisticat pentru "imbinare"):

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

Operatorul `+=` este o prescurtare pentru "adauga asta la sfarsit." E ca si cum ai lipi litere suplimentare la sfarsitul unui cuvant.

## Lungimea unui sir

Foloseste `.length()` sau `.size()` (fac acelasi lucru) ca sa afli cate caractere are un sir:

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

Retine: spatiile, semnele de punctuatie si simbolurile se numara toate ca si caractere.

## Accesarea caracterelor individuale

Poti lua un singur caracter folosind `[]` (la fel ca tablourile) sau `.at()`:

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

Deoarece indexurile incep de la 0, ultimul caracter este intotdeauna la pozitia `length() - 1`.

## Extragerea unei parti dintr-un sir cu substr()

Metoda `.substr()` iti permite sa copiezi o bucata dintr-un sir. Ii spui de unde sa inceapa si cate caractere sa ia:

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

Gandeste-te la `substr(start, numar)` ca la "incepe de la aceasta pozitie si ia atatea caractere."

## Cautarea textului intr-un sir

Metoda `.find()` cauta text in interiorul unui sir si iti spune unde incepe. Daca nu il gaseste, returneaza o valoare speciala numita `string::npos`:

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

Asta e super util cand trebuie sa verifici daca un cuvant apare intr-o propozitie.

## Citirea sirurilor cu spatii

Exista o capcana importanta cu `cin >>`. Se opreste din citit la primul spatiu! Ca sa citesti o linie intreaga (inclusiv spatiile), foloseste `getline()`:

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

Retine: foloseste `cin >>` pentru cuvinte singulare, `getline(cin, variabila)` pentru linii intregi cu spatii.

## Compararea sirurilor

Poti compara siruri folosind `==`, `!=`, `<` si `>`. Comparatia functioneaza alfabetic:

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

O surpriza: literele mari sunt "mai mici" decat literele mici in C++. Deci `"Zebra"` vine inainte de `"apple"` in comparatia de siruri.

<!-- exercise -->
### Exercitiu: Analizator de cuvinte

Scrie un program care ia un cuvant si afiseaza: lungimea sa, primul caracter, ultimul caracter si cuvantul inversat.

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
<!-- hint: Pentru ultimul caracter foloseste word[word.length() - 1]. Pentru inversare, parcurge de la i = word.length() - 1 in jos pana la 0 si afiseaza word[i] de fiecare data. -->
<!-- /exercise -->

<!-- exercise -->
### Exercitiu: Gasitor de email

Verifica daca un sir contine simbolul "@". Daca da, afiseaza "Looks like an email!" si arata tot ce e inainte de @ si tot ce e dupa.

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
<!-- hint: Foloseste int pos = text.find("@"). Username-ul este text.substr(0, pos). Domeniul este text.substr(pos + 1). Retine ca pos + 1 sare peste simbolul @. -->
<!-- /exercise -->

## Ce ai invatat

- Sirurile de caractere stocheaza text si pot creste si se micsora automat.
- **`+`** si **`+=`** lipesc siruri impreuna (concatenare).
- **`.length()`** iti spune cate caractere are un sir.
- **`[]`** sau **`.at()`** acceseaza caractere individuale (incepand de la indexul 0).
- **`.substr(start, numar)`** extrage o bucata dintr-un sir.
- **`.find(text)`** cauta text si returneaza pozitia lui (sau `string::npos` daca nu e gasit).
- **`getline(cin, variabila)`** citeste o linie intreaga inclusiv spatiile.
- Sirurile pot fi comparate cu `==`, `!=`, `<`, `>` (ordine alfabetica).

In lectia urmatoare, vom invata despre **structuri** -- cum sa iti creezi propriile tipuri de date personalizate!
