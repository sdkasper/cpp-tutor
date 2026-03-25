---
title: Ktlon
difficulty: medium
sort_order: 7
lang: en
concepts: [arrays, loops, for-loop, file-io, conditions]
hints:
  - >-
    Think about how to determine the winner of a round. What condition must be
    met for a player to be "better" than all opponents?
  - >-
    Sort the scores of each team in descending order. Then compare the maximum
    of one team with the maximum of the other to determine M.
  - >-
    For task 2, once you have determined M, the sum of the top M scores of the
    winning team minus the sum of the top M scores of the other team gives you
    the number of stars.
  - >-
    Use a sorted array (descending) for each team. Compare the elements from the
    top of each array to count how many players of the winner exceeded all
    opponent scores.
starter_code: |
  #include <fstream>
  using namespace std;

  ifstream fin("ktlon.in");
  ofstream fout("ktlon.out");

  int main() {
      int C, n, k;
      fin >> C >> n >> k;

      if (C == 1) {
          // Determine the number of rounds won by team R
      }

      if (C == 2) {
          // Determine the number of stars of the winning team
      }

      return 0;
  }
solution_notes: >-
  For each round, sort the scores in descending order. Determine the maximum of
  each team; the team whose player exceeds all opponent scores wins the round.
  M = the number of players of the winner with a score strictly greater than the
  opponent's maximum. Stars = sum of top M winner - sum of top M loser.
---
Two teams, **F** and **R**, each consisting of `n` players, participated in the new edition of ktlon with `k` rounds. After each round, `2*n` values were recorded in the ktlon register: the first `n` represent the points scored in that round by team F's players, and the next `n` represent the points scored by team R's players. For a team to win a round, at least one of its players must score strictly more points than each of the other team's players' scores. The winning team of a round receives a number of stars. To determine the number of stars awarded, first the number `M` of players who scored strictly more points than each of the other team's players' scores is determined. Then the winning team receives a number of stars equal to the difference between the sum of the top `M` scores of the winning team's players and the sum of the top `M` scores of the other team's players.

For example, if the players of the two teams scored `(8, 5, 8, 3, 9, 7)` and `(5, 7, 5, 4, 5, 1)`, then `M = 3` because three of team F's scores `(8, 8, 9)` are greater than all of team R's scores. Team F wins the round and receives `8 stars = (9 + 8 + 8) - (7 + 5 + 5)`. If no player of either team scores strictly more than all scores of the other team's players, the round ends in a draw and no team receives any stars (`M = 0`).

The competition is won by the team that accumulates the maximum number of stars at the end of all rounds.

## Task

Given `n` -- the number of players in each team, `k` -- the number of rounds, and the scores obtained by the `2 * n` players in each round, determine:

1\. the number of rounds won by team R;
2\. the number of stars obtained by the winning team.

## Input Data

The input file `ktlon.in` contains on the first line a number `C` representing the task to be solved (`1` or `2`). On the second line, there are two natural numbers `n` and `k`, representing the number of players on each team and the number of rounds, respectively. On each of the next `k` lines, there are `2 * n` natural numbers: the first `n` represent the points scored in the current round by team F's players, and the next `n` represent the points scored by team R's players. Numbers on the same line are separated by spaces.

## Output Data

If `C = 1`, the output file `ktlon.out` will contain the number of rounds won by team R. If `C = 2`, the output file will contain the number of stars obtained by the winning team.

## Constraints and Notes

- `1 ≤ C ≤ 2`
- `1 ≤ n ≤ 10,000`
- `1 ≤ k ≤ 50`
- Player scores are natural numbers between `0` and `200,000` inclusive.

## Example 1:

`ktlon.in`

```
1
3 4
6 8 3 7 7 6
1 2 3 4 5 3
1 5 3 4 5 2
1 5 3 4 5 2
```

`ktlon.out`

```
1
```

### Explanation

Task `1` is solved. The first round is won by team F because there is a player who scored more points (`8`) than each of team R's players (`7`, `7`, `6`). The second round is won by team R because there are two players who scored more points (`4` and `5`) than each of team F's players (`1`, `2`, `3`). The third round ended in a draw because no player of either team scored strictly more than all the scores of the other team's players. The fourth round also ended in a draw, since all players scored exactly the same as in the third round. The answer is `1` because team R won exactly one round.

## Example 2:

`ktlon.in`

```
2
3 3
8 8 5 7 7 7
1 2 3 3 5 3
4 1 2 6 5 1
```

`ktlon.out`

```
7
```

### Explanation

Task `2` is solved. Team F wins the first round and receives `2` stars (`M = 2`, `(8 + 8) - (7 + 7) = 2`).
Team R wins the second round and receives `2` stars (`M = 1`, `5 - 3 = 2`). Team R wins the third round and receives `5` stars (`M = 2`, `(6 + 5) - (4 + 2) = 5`). In total, team F received `2` stars and team R received `7` stars. The competition is won by team R with `7` stars.
