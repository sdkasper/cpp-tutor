---
title: Figure Skating
difficulty: hard
sort_order: 13
lang: en
concepts: [2d-arrays, loops, nested-loops, file-io]
hints:
  - >-
    First step: compute the value of each coach, girl, and boy as the digit sum
    of their number. You can do this with a while loop that extracts digits.
  - >-
    A valid team (coach, girl, boy) requires VM - Vm <= 1, where VM and Vm are
    the maximum and minimum of the three values. Think about what value
    combinations are possible.
  - >-
    Group people by values. For a valid team, all 3 values must be equal, or
    exactly 2 distinct consecutive values (v and v+1). Count how many people
    have each value.
  - >-
    For task 1, at each value v, form teams from people with values v and v+1
    (greedy matching). For task 2, find the coach with the maximum value who
    has at least one compatible (girl, boy) pair.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("patinaj.in");
  ofstream fout("patinaj.out");

  int sumaCifre(long long x) {
      int s = 0;
      while (x > 0) {
          s += x % 10;
          x /= 10;
      }
      return s;
  }

  int main() {
      int C, N;
      fin >> C >> N;

      // Read encodings for coaches, girls, boys
      // Compute the values (digit sums) for each

      if (C == 1) {
          // Determine NP -- the maximum number of teams
      }

      if (C == 2) {
          // Determine V and NV -- the maximum value of a coach
          // with a valid pair and the number of variants
      }

      return 0;
  }
solution_notes: >-
  Compute digit sums for all. Group by values (0..81 max for 9 digits). Task 1:
  for each value v, form teams from people with values v or v+1 respecting the
  condition VM-Vm <= 1, maximizing the number of teams. Task 2: iterate coaches
  in descending order by value, check if at least one compatible (girl, boy)
  pair exists, count the combinations.
---
The SEPI Sports Club also has a figure skating section. The club management has set out to participate in the pairs event at the next Olympics and has some decisions to make regarding the teams they can enter.

Each team participating in the Olympics must consist of a pair of skaters (a girl and a boy) and a coach. Additionally, the values of team members must be as close as possible. The value of an athlete or a coach is calculated based on results from previous competitions. These are encoded as a single number with at most `9` digits. Each digit of the number represents a previous result, and the **sum of the digits represents the value of the athlete or coach**. For example, the number `18305` encodes the results `1`, `8`, `3`, `0`, `5` obtained at the last `5` competitions, which corresponds to the value `17 (= 1 + 8 + 3 + 0 + 5)`.

At the Olympics, each athlete and each coach can be part of at most one registered team. Additionally, for each team, if we denote by `VM` the maximum of the values of the coach, girl, and boy, and by `Vm` the minimum of the values of the coach, girl, and boy, registration in the competition is allowed only if `VM - Vm ≤ 1`.

## Task

Given the numbers encoding the results of coaches, girls, and boys, write a program that determines:
1) The maximum number of teams, `NP`, that the SEPI Sports Club can register for the Olympics while respecting the rules above.
2) The maximum value, `V`, of a club coach who can coach a pair of skaters (girl, boy) that can be registered for the Olympics according to the rules above, and the number of variants `NV` in which a team can be chosen that can be coached by a coach of value `V`.

## Input Data

The input file `patinaj.in` contains:

- on the first line, the natural number `C` representing the task number, which can be `1` or `2`;
- on the second line, a natural number `N`, representing both the number of coaches employed and the number of girls and boys registered at the club;
- on each of the next three lines, `N` values separated by spaces. On the third line, these represent the result encodings of the `N` coaches; on the fourth line, they represent the result encodings of the `N` girls; and the values on the fifth line represent the result encodings of the `N` boys.

## Output Data

The text file `patinaj.out` will display:

- for task `1`: the maximum number of teams `NP` that can be registered for the Olympics according to the rules specified above;
- for task `2`: two natural numbers, `V` and `NV`, separated by a space, representing the maximum value of a club coach **for which at least one pair exists that can be coached** and the number of variants in which the club can choose a team coached by a coach of value `V`, if solving task `2`. If the club cannot register any pair, a **single number** is displayed: `-1`.

## Constraints and Notes

- `1 ≤ N ≤ 100,000`
- each of the numbers read from the third, fourth, and fifth lines is a natural number with at most 9 digits.
- For 51 points, `C = 1`
- For 49 points, `C = 2`

## Example 1:

`patinaj.in`

```
1
4
8093 18305 20009 188
1803 3303331 909 91995
8017 20009 0 8017
```

`patinaj.out`

```
2
```

### Explanation

At most `2` teams can be formed. The first could consist of the girl with encoding `1803` and the boy with encoding `20009`, coached by the coach with encoding `20009`. The second could consist of the girl `3303331`, boy `8017`, coached by coach `18305`.

## Example 2:

`patinaj.in`

```
2
4
8093 18305 20009 188
1803 3303331 909 91995
8017 20009 0 8017
```

`patinaj.out`

```
17 4
```

### Explanation

The club has `4` coaches with values `20=8+0+9+3`, `17=1+8+3+0+5`, `11=2+0+0+0+9`, and `17=1+8+8`. The maximum value is `20`, but no pair exists that can be coached by the coach with value `20` according to the imposed rules. However, a coach with value `17` could coach a pair registered for the Olympics. There are `4` variants for choosing a team coached by a coach of value `17`. These could include the girl `3303331` and one of the two boys with result encoding `8017`. Such a pair could be coached by coach `18305` or `188`.
