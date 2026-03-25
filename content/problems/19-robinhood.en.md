---
title: Robin Hood
difficulty: medium
sort_order: 19
lang: en
concepts: [arrays, loops, conditions, arithmetic, file-io]
hints:
  - >-
    Simulate the movement of each archer. Robin starts at target 1 heading
    toward n, then turns back. John starts at target n heading toward 1, then
    turns back. Each second, each advances one position. How do you determine
    the position at time t?
  - >-
    The movement is periodic with period 2*(n-1). If Robin shoots every p
    seconds, his position at time t*p is computed from t*p modulo 2*(n-1).
    The same applies for John with interval q.
  - >-
    For task 1, simulate the shots of both archers updating a frequency array.
    The contest ends when all targets have been hit at least once. Check after
    each shot whether all targets are covered.
  - >-
    For tasks 2 and 3, use the frequency array built during the simulation.
    Task 2: count the targets with frequency 1. Task 3: find the maximum
    frequency and output all targets with that frequency.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("robinhood.in");
  ofstream fout("robinhood.out");

  int main() {
      int C, n, p, q;
      fin >> C >> n >> p >> q;

      if (C == 1) {
          // Simulate the shots and determine the time t
          // when all targets have been hit
      }

      if (C == 2) {
          // Output the targets hit exactly once, in ascending order
      }

      if (C == 3) {
          // Output the maximum number of arrows in a target
          // and the respective targets
      }

      return 0;
  }
solution_notes: >-
  Simulate the movement of both archers using periodic positions with period
  2*(n-1). At each multiple of p (Robin) or q (John) seconds, increment the
  frequency of the current target. The simulation continues until all n targets
  have nonzero frequency. Then answer the task from the frequency array.
---

Robin Hood and Little John decided to determine who is the best archer. For this they built `n` targets arranged in a straight line and numbered from `1` to `n`. They then established the shooting distance. The two move in front of the targets in a straight line at the agreed-upon distance.

They try to hit all `n` targets proceeding as follows: Robin starts in front of target `1` and moves toward target `n`, then turns back toward target `1` and so on... John starts in front of target `n` and moves toward target `1`, then turns back toward target `n` and so on... Each of the two contestants traverses the space between two consecutive targets in one second. Robin shoots once every `p` seconds, and John shoots once every `q` seconds, each aiming at the target they are currently in front of.

The two can shoot simultaneously at the same target or at one that has already been hit. The contest ends the moment every target has been hit at least once.

## Task

1. Determine the time at which the contest ends.
2. Which targets were hit exactly once during the contest.
3. Which targets were hit the most times during the contest.

## Input Data

The input file `robinhood.in` contains on the first line a natural number `C`, representing the task. On the second line of the input file there is a natural number `n`, representing the number of targets, and on the third line two natural numbers `p` `q`, separated by a space, representing the time intervals at which the two archers shoot.

## Output Data

If the task is `1`, the output file `robinhood.out` contains on the first line a natural number `t`, representing the time at which the two archers hit all targets. If the task is `2`, the first line of the output file will contain, in ascending order, separated by spaces, the numbers of the targets hit exactly once. If no target was hit exactly once, the value `0` is output. If the task is `3`, the first line of the output file will contain a natural number representing the maximum number of arrows that hit a target, and the next line will contain, in ascending order, separated by spaces, the numbers of the respective targets.

## Constraints and Notes

- `1 <= C <= 3`
- `3 <= n <= 10,000`
- `1 <= p, q <= 500`
- For all tests a solution exists
- For 53 points, `C = 1`
- For 21 points, `C = 2`
- For 26 points, `C = 3`

## Example 1

`robinhood.in`

```
1
5
2 3
```

`robinhood.out`

```
9
```

### Explanation

With 5 targets and shooting intervals of 2 and 3 seconds, the contest ends at time 9.

## Example 2

`robinhood.in`

```
2
5
2 3
```

`robinhood.out`

```
1 2 4 5
```

### Explanation

The targets that were hit with exactly one arrow are targets `1`, `2`, `4`, and `5`.

## Example 3

`robinhood.in`

```
3
5
2 3
```

`robinhood.out`

```
3
3
```

### Explanation

Target `3` was hit `3` times: `2` times by Robin and once by John.
