---
title: Robot 4
difficulty: medium
sort_order: 26
lang: en
concepts: [2d-arrays, loops, conditions, file-io]
hints:
  - >-
    A label is correct if it has both even and odd digits, with the odd digits
    in ascending order followed by the even digits in descending order.
    Separate the digits into even and odd, sort them, and compare.
  - >-
    For repair: extract the odd digits (sort ascending), then the even digits
    (sort descending), and concatenate them. Special cases: no odd digits --
    replace the largest even digit with 9; no even digits -- replace the
    smallest odd digit with 0.
  - >-
    For task 1, calculate the total time: at the first stand the robot spends
    v (or v+r if incorrect). Between stands add t seconds. Convert the total
    seconds into hour:minute:second format.
  - >-
    Watch out for time conversion: add the seconds to (h, m, s), then
    propagate carries (60 seconds = 1 minute, 60 minutes = 1 hour).
    The robot finishes on the same day.
starter_code: |
  #include <fstream>
  #include <cstring>
  using namespace std;

  ifstream fin("robot4.in");
  ofstream fout("robot4.out");

  int main() {
      int C, N, h, m, s, t, v, r;
      fin >> C >> N >> h >> m >> s >> t >> v >> r;

      char eticheta[501][10];
      for (int i = 0; i < N; i++)
          fin >> eticheta[i];

      if (C == 1) {
          // Calculate the finish time (hf, mf, sf) after checking/repairing all
      }

      if (C == 2) {
          // Repair incorrect labels and output all labels
      }

      return 0;
  }
solution_notes: >-
  Check each label: separate the digits into even and odd, verify that both
  categories are present and the order is correct (odd ascending + even
  descending). For repair, reconstruct the label from sorted digits. Special
  cases: no odd digits (largest even -> 9) or no even digits (smallest odd
  -> 0). For task 1, accumulate time (v per stand + r if incorrect + t between
  stands) and convert to h:m:s.
---

Vlad invented a new game. The game contains `N` stands arranged in a straight line. Each stand has a label with a natural number written on it. A label is considered correct if the number satisfies the following two conditions:

- it contains both even and odd digits;
- it starts with the odd digits arranged in ascending order, followed by the even digits in descending order.

For example, the label `137860` is correct, but the labels `23541`, `135`, `64`, and `3146` are not correct.

For his game, Vlad built a repair robot that knows how to check numbers and repair them if necessary. The repair robot moves in a straight line and stops in turn at each of the `N` stands. At each stand, the robot checks the label and if it is not correct, it "repairs" it. To repair a label, the robot arranges the odd digits in ascending order, then, continuing, arranges the even digits in descending order; if the label contains no odd digit, it replaces the largest even digit with `9`; if the label contains no even digit, it replaces the smallest odd digit with `0`. Moving from one stand to another takes `t` seconds, checking a stand's label takes `v` seconds, and repairing it takes `r` seconds. The robot's run ends after it has checked all `N` stands and repaired the incorrect labels.

## Task

Write a program that reads the number `N` of stands, the time (hour `h`, minute `m`, second `s`) when the robot arrives at the first stand, the times `t`, `v`, and `r` with the meaning from the statement, and the labels of the stands, and solves the following tasks:

1. Calculate and output the time (hour, minute, and second) when the robot has finished checking all `N` stands and repairing the incorrect labels;
2. Repair (where necessary) the stand labels and output the labels of all `N` stands at the end.

## Input Data

The input file `robot4.in` contains on the first line the number `C`, representing the task to be solved (`1` or `2`). On the second line are the natural numbers `N`, `h`, `m`, `s`, and on the third line the natural numbers `t`, `v`, `r`, with the meaning from the statement. Numbers on the same line are separated by spaces. On the following `N` lines are the stand labels, in the order they are arranged, one label per line.

## Output Data

If `C=1`, the output file `robot4.out` will contain a single line with 3 natural numbers separated by spaces `hf mf sf`, representing the hour, minute, and second when the robot finishes the repairs.

If `C=2`, the output file `robot4.out` will contain `N` lines with the stand labels, in the order they are arranged, after the robot has finished checking and repairing, one label per line.

## Constraints and Notes

- `2 <= N <= 500`
- Stand labels have at least two and at most nine digits
- The robot starts and finishes on the same day; `0 <= h, hf < 24`; `0 <= m, mf, s, sf < 60`
- For correctly solving task 1, 40 points are awarded
- For correctly solving task 2, 60 points are awarded

## Example 1

`robot4.in`

```
1
3 11 20 50
7 5 15
376572
3564
123
```

`robot4.out`

```
11 21 49
```

### Explanation

Task is 1. There are `3` stands. The robot arrives at the first stand at `11:20:50`. The first stand has label `376572`, which is incorrect, so the robot repairs it. It spends `5` seconds for checking and `15` seconds for repair, so it leaves at `11:21:10`. It arrives at the second stand at `11:21:17`; its label `3564` is correct so the robot does not modify it; it spends `5` seconds for checking and leaves at `11:21:22`. It arrives at the third stand at `11:21:29`. The third stand has incorrect label `123`, the robot repairs it, spending `5+15=20` seconds, and the time when it finishes is `11:21:49`.

## Example 2

`robot4.in`

```
2
3 11 20 50
7 5 15
376572
3564
113
```

`robot4.out`

```
357762
3564
130
```

### Explanation

Task is 2. There are `3` stands. The first stand has label `376572`, which is incorrect; the robot repairs it and it becomes `357762`. The second stand's label `3564` is correct, so the robot does not modify it. The third stand has incorrect label `113`; the robot repairs it and it becomes `130`.
