---
title: Gifts 1
difficulty: medium
sort_order: 21
lang: en
concepts: [arrays, loops, conditions, file-io]
hints:
  - >-
    The boxes are distributed in order, consecutively. If each child receives
    exactly D boxes, you can distribute N boxes to at most N/D children. But
    you can skip at most one box. What are the possible values for D?
  - >-
    For task 1, you want the maximum number of children, so D should be
    minimum (D >= 2). Try D = 2: you can distribute N boxes to N/2 children
    (or (N-1)/2 if you skip one). Check which box is optimal to remove.
  - >-
    Think about all values of D that divide N or N-1. For each valid D,
    calculate how many children receive boxes and which box is best to
    remove (the one with the fewest candies).
  - >-
    For task 2, you want to maximize the number of candies a child receives.
    Fix D (the number of boxes per child) and calculate the maximum sum over
    a block of D consecutive boxes, with the possibility of skipping one box.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("cadouri.in");
  ofstream fout("cadouri.out");

  int main() {
      int C, N;
      fin >> C >> N;

      long long a[100001];
      for (int i = 1; i <= N; i++)
          fin >> a[i];

      if (C == 1) {
          // Determine the maximum number of children and the kept box
      }

      if (C == 2) {
          // Determine the maximum number of candies per child and the kept box
      }

      return 0;
  }
solution_notes: >-
  The boxes are distributed consecutively, D to each child, with the option to
  remove at most one box. For task 1, maximize the number of children (minimum
  D = 2), checking if N or N-1 is divisible by D and choosing the removed box
  to maximize the total. For task 2, iterate over possible values of D and
  compute the maximum sum per child, optimally choosing the box to remove.
---

Before the Easter holiday, at school, gifts were received for the 5th grade students. There are `N` boxes of candies and the number of candies in each box is known. The number of candy boxes received by each child must be the same. This number must be greater than or equal to `2`. The candy boxes will be given in the order they were received: the first boxes to the first child, the next boxes to the second child, the next boxes to the third child, etc.

The goal is to distribute the candy boxes to as many children as possible. Additionally, there is one more condition: either all boxes must be distributed to children, or at most one box may remain ungiven. If the decision is made that one box will not be given to any child, it is kept by the teacher to treat the students when they return to school, and the remaining candy boxes are placed on the desk in the order they were received, without the students knowing about the kept one. The choice of this box must be made so that the total number of candies distributed is as large as possible.

## Task

1) What is the maximum number of children who will receive gifts?
2) What is the maximum possible number of candies that a child can receive under the conditions described above?

For both tasks, the number of candies in the box that is possibly kept must also be determined.

## Input Data

The input file `cadouri.in` contains on the first line a number `C`, indicating the task. On the second line there is a number `N`, representing the number of candy boxes received at school. On the third line there are `N` numbers, separated by spaces, representing the number of candies in each box, in the order they were received.

## Output Data

The output file `cadouri.out` will contain two natural numbers, separated by a single space, with the following meaning: for `C = 1` the first value is the maximum number of children who receive gifts and the second is the number of candies in the kept box; for `C = 2` the first value is the maximum number of candies received by a child and the second represents the number of candies in the kept box. If no box is kept, the second value written in the output file will be `0` (for both task 1 and task 2).

## Constraints and Notes

- `2 <= N <= 100,000`
- The numbers on the third line are natural, nonzero, with at most `9` digits
- For 23 points, `C = 1`
- For 77 points, `C = 2`

## Example 1

`cadouri.in`

```
1
5
2 7 4 1 2
```

`cadouri.out`

```
2 1
```

### Explanation

Task 1 is solved. Two children receive gifts. The box with one candy is not given to any child.

## Example 2

`cadouri.in`

```
2
5
2 7 4 1 2
```

`cadouri.out`

```
9 1
```

### Explanation

Task 2 is solved. Two children receive gifts, the first child gets the boxes with `2` and `7` candies, and the second child gets the boxes with `4` and `2` candies. So the first child receives the maximum number of candies, `9`. The box with one candy is not given to any child.
