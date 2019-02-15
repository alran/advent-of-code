import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collections;
import static java.util.Comparator.comparing;

import java.util.HashMap;
import java.util.List;

public class DayFour {
  public int PartOne(List<String> input) {
    HashMap<Integer, Integer> guards = new HashMap<>();
    List<Entry> sorted = this.SortByDate(input);
    int currentGuard = 0;
    int timeWhenFellAsleep = 0;

    for (Entry entry : sorted) {
      if (entry.guardId != 0) {
        currentGuard = entry.guardId;
        if (!guards.containsKey(currentGuard)) {
          guards.put(currentGuard, 0);
        }
      } else if (entry.activity.contains("falls asleep")) {
        timeWhenFellAsleep = entry.date.getMinute();
      } else if (entry.activity.contains("wakes up")) {
        int current = guards.get(currentGuard);
        guards.put(currentGuard, current + entry.date.getMinute() - timeWhenFellAsleep - 1);
        timeWhenFellAsleep = 0;
      }
    }

    int maxGuard = this.GetMax(guards);
    int mostCommonMinute = this.MostCommonMinuteAsleep(sorted, maxGuard);
    return maxGuard * mostCommonMinute;
  }

  public int PartTwo(List<String> input) {
    List<Entry> sortedEntries = this.SortByDate(input);
    HashMap<Integer, HashMap<Integer, Integer>> guardsMinutesAsleep = this.GuardMinutesAsleep(sortedEntries);
    return this.calculateWinningTotal(guardsMinutesAsleep);
  }

  public List<Entry> SortByDate(List<String> input) {
    List<Entry> entries = new ArrayList<>();
    for (String row : input) {
      entries.add(new Entry(row));
    }
    Collections.sort(entries, comparing(Entry::getDate));
    return entries;
  }

  public int GetMax(HashMap<Integer, Integer> guards) {
    int max = 0;
    int maxElem = 0;

    for (HashMap.Entry<Integer, Integer> entry : guards.entrySet()) {
      if (entry.getValue() > max) {
        max = entry.getValue();
        maxElem = entry.getKey();
      }
    }

    return maxElem;
  }

  public int MostCommonMinuteAsleep(List<Entry> input, int id) {
    HashMap<Integer, Integer> minutesAsleep = new HashMap<>();
    boolean currentGuard = false;
    int timeWhenFellAsleep = 0;

    for (Entry entry : input) {
      if (entry.guardId == id) {
        currentGuard = true;
      } else if (currentGuard && entry.activity.contains("falls asleep")) {
        timeWhenFellAsleep = entry.date.getMinute();
      } else if (currentGuard && entry.activity.contains("wakes up")) {
        for (int count = timeWhenFellAsleep; count < entry.date.getMinute(); count++) {
          int prevValue = minutesAsleep.getOrDefault(count, 0);
          minutesAsleep.put(count, ++prevValue);
        }
        timeWhenFellAsleep = 0;
      } else {
        currentGuard = false;
      }
    }

    return this.GetMax(minutesAsleep);
  }

  public HashMap<Integer, HashMap<Integer, Integer>> GuardMinutesAsleep(List<Entry> input) {
    HashMap<Integer, HashMap<Integer, Integer>> guardsMinutesAsleep = new HashMap<>();
    int currentGuard = 0;
    int timeWhenFellAsleep = 0;

    for (Entry entry : input) {
      if (entry.guardId != 0) {
        currentGuard = entry.guardId;
        if (!guardsMinutesAsleep.containsKey(currentGuard)) {
          guardsMinutesAsleep.put(currentGuard, new HashMap<>());
        }
      } else if (currentGuard != 0 && entry.activity.contains("falls asleep")) {
        timeWhenFellAsleep = entry.date.getMinute();
      } else if (currentGuard != 0 && entry.activity.contains("wakes up")) {
        for (int count = timeWhenFellAsleep; count < entry.date.getMinute(); count++) {
          int prevValue = guardsMinutesAsleep.get(currentGuard).getOrDefault(count, 0);
          guardsMinutesAsleep.get(currentGuard).put(count, ++prevValue);
        }

        timeWhenFellAsleep = 0;
      } else {
        currentGuard = 0;
      }
    }

    return guardsMinutesAsleep;
  }

  public int calculateWinningTotal(HashMap<Integer, HashMap<Integer, Integer>> guardsMinutesAsleep) {
    int winningGuard = 0;
    int winningMax = 0;
    int winningMinute = 0;

    for (HashMap.Entry<Integer, HashMap<Integer, Integer>> guardPair : guardsMinutesAsleep.entrySet()) {
      int maxElem = this.GetMax(guardPair.getValue());
      int max = guardPair.getValue().getOrDefault(maxElem, 0);

      if (max > winningMax) {
        winningMax = max;
        winningMinute = maxElem;
        winningGuard = guardPair.getKey();
      }
    }

    return winningGuard * winningMinute;
  }

  public class Entry {
    public LocalDateTime date;
    public String activity;
    public int guardId = 0;

    public LocalDateTime getDate() {
      return this.date;
    }

    public Entry(String input) {
      String[] dateString = input.substring(1, 17).split(" ");
      String[] date = dateString[0].split("-");
      String[] time = dateString[1].split(":");

      this.date = LocalDateTime.of (
          Integer.parseInt(date[0]),           // int year
          Month.of(Integer.parseInt(date[1])), // Month month
          Integer.parseInt(date[2]),           // int dayOfMonth
          Integer.parseInt(time[0]),           // int hour
          Integer.parseInt(time[1])            // int minute
      );

      this.activity = input.substring(19);
      if (this.activity.contains("Guard #")) {
        this.guardId = Integer.parseInt(this.activity.split(" ")[1].substring(1));
      }
    }
  }
}
