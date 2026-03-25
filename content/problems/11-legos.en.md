---
title: Legos
difficulty: medium
sort_order: 11
lang: en
concepts: [loops, arithmetic, conditions, file-io]
hints:
  - >-
    For task 1, a foundation is a square with side length at least 3. You need
    to find the largest perfect square that fits in P pieces. What mathematical
    operation helps?
  - >-
    Find the largest L such that L*L <= P and L >= 3. You can use sqrt(P) and
    adjust the result.
  - >-
    For task 2, a tower with h floors and side L has: (h+1) square floors
    (L*L each) + h sets of 4 pillars. Total = (h+1)*L*L + h*4. Try each
    L >= 3 and maximize h.
  - >-
    For task 3, count how many rectangles with sides a >= 3 and b >= 3 have
    area exactly P. Iterate through divisors of P from 3 to sqrt(P) and check
    if P/d >= 3.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("legos.in");
  ofstream fout("legos.out");

  int main() {
      int C;
      long long P;
      fin >> C >> P;

      if (C == 1) {
          // Determine the number of pieces in the largest foundation
      }

      if (C == 2) {
          // Determine the number of pieces in the tallest tower
      }

      if (C == 3) {
          // Determine the number of legoball fields
      }

      return 0;
  }
solution_notes: >-
  Task 1: largest L with L*L <= P and L >= 3, answer = L*L. Task 2: for each L
  from 3 to sqrt(P), compute max h from (h+1)*L*L + h*4 <= P, keep the max h
  and at equal h, the max pieces. Task 3: count pairs (a, b) with a*b = P,
  a >= 3, b >= 3; each pair with a != b counts twice.
---
A lego set has `P` pieces that are identical cubes. Dorel plays with them to build various toys, but he needs your help.

## Tasks

Given the number of pieces `P` he has, Dorel wants to know:
1) The number of pieces needed to build the largest foundation. A foundation has the shape of a square and has a side length of at least 3 pieces (as in figure 1).
2) The number of pieces in the tallest tower that can be built. Dorel builds a tower from lego pieces as follows: first, he makes a square which he calls the ground floor (or floor 0). On top of it, he places 4 pieces in the corners, which he calls pillars. Then, on top of the pillars, he places a new square which he calls floor 1. On top of this, he places pillars again, then floor 2. And he continues until the last floor. On top of the last floor, he does **not** place pillars. All built floors have the same number of pieces and are square-shaped with a side of at least 3 pieces. The height of a tower is given by the number of floors. Pillars are **not** considered floors; they are part of the tower structure. If multiple towers of the same height can be built, Dorel wants to know the number of pieces in the tower with the most pieces. (See figure 2).
3) The number of legoball fields that can be built using **all** the lego pieces. A legoball field has the shape of a rectangle where each side is made up of at least 3 pieces (as in figure 3).

*Figure 1: A square foundation (example: 5x5 = 25 pieces).*

*Figure 2: A tower made of square floors and corner pillars between floors.*

*Figure 3: A legoball field in the shape of a rectangle (example: 3x6 = 18 pieces).*

## Input Data

The input file `legos.in` contains two non-zero natural numbers `C` and `P`, separated by a single space, representing the task and the number of lego pieces Dorel has, respectively.

## Output Data

For each of the 3 tasks, the file `legos.out` will contain a single number representing the answer to that task.

## Constraints and Notes

- `1 ≤ C ≤ 3`
- `1 ≤ P ≤ 1,000,000,000`
- For task 2, a tower can consist of just the ground floor, but cannot consist of the ground floor and pillars (since that would have pillars on top of the last floor).
- For 31 points, `C = 1`
- For 33 points, `C = 2`
- For 36 points, `C = 3`

## Example 1:

`legos.in`

```
1 29
```

`legos.out`

```
25
```

### Explanation

Task 1 is solved. There are `29` lego pieces. The largest foundation that can be built has dimensions `5 x 5` and is made of 25 pieces.

## Example 2:

`legos.in`

```
2 19
```

`legos.out`

```
16
```

### Explanation

Task 2 is solved. There are `19` lego pieces. The tallest tower that can be made consists of just the ground floor. There are two such towers: one has `9` pieces and the other `16`. The one with more pieces is the tower with `16` pieces.

## Example 3:

`legos.in`

```
3 18
```

`legos.out`

```
2
```

### Explanation

Task 3 is solved. There are two ways to build a legoball field. They have dimensions `3 x 6` and `6 x 3`, respectively.
