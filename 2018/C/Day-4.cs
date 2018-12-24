using System;
using System.Collections.Generic;

class Day4
{
    public class Entry
    {
        public DateTime date;
        public string activity;
        public int guardId;
        public Entry(string unprocessedInput)
        {
            string[] dateString = unprocessedInput.Substring(1, 16).Split(" ");
            string[] date = dateString[0].Split("-");
            string[] time = dateString[1].Split(":");
            this.date = new DateTime(
                Convert.ToInt32(date[0]), 
                Convert.ToInt32(date[1]), 
                Convert.ToInt32(date[2]), 
                Convert.ToInt32(time[0]), 
                Convert.ToInt32(time[1]), 
                0
            );
            this.activity = unprocessedInput.Substring(19);

            this.guardId = 0;
            if (this.activity.Contains("Guard #"))
                this.guardId = Convert.ToInt32(this.activity.Split(" ")[1].Substring(1));
        }
    }

    public List<Entry> SortByDate(string[] input)
    {
        List<Entry> entries = new List<Entry>();
        foreach (string row in input)
        {
            entries.Add(new Entry(row));
        }
        entries.Sort((a, b) => a.date.CompareTo(b.date));
        return entries;
    }

    public int PartOne(string[] input)
    {
        Dictionary<int, int> guards = new Dictionary<int, int>();
        List<Entry> sorted = this.SortByDate(input);
        int currentGuard = 0;
        int timeWhenFellAsleep = 0;

        foreach (Entry entry in sorted)
        {
            if (entry.guardId != 0)
            {
                currentGuard = entry.guardId;
                if (!guards.ContainsKey(currentGuard))
                {
                    guards.Add(currentGuard, 0);
                }
            }
            else if (entry.activity == "falls asleep")
            {
                timeWhenFellAsleep = entry.date.Minute;
            }
            else if (entry.activity == "wakes up")
            {
                guards[currentGuard] += (entry.date.Minute - Convert.ToInt32(timeWhenFellAsleep) - 1);
                timeWhenFellAsleep = 0;
            }
        }

        int maxGuard = this.GetMax(guards);
        int mostCommonMinute = this.MostCommonMinuteAsleep(sorted, maxGuard);
        return mostCommonMinute * maxGuard;
    }

    public int GetMax(Dictionary<int, int> d)
    {
        int max = 0;
        int maxElem = 0;

        foreach (var pair in d)
        {
            if (pair.Value > max)
            {
                max = pair.Value;
                maxElem = pair.Key;
            }
        }

        return maxElem;
    }

    public int MostCommonMinuteAsleep(List<Entry> input, int id)
    {
        Dictionary<int, int> minutesAsleep = new Dictionary<int, int>();
        bool currentGuard = false;
        int timeWhenFellAsleep = 0;

        foreach (Entry entry in input)
        {
            if (entry.guardId == id)
                currentGuard = true;
            else if (currentGuard && entry.activity == "falls asleep")
                timeWhenFellAsleep = entry.date.Minute;
            else if (currentGuard && entry.activity == "wakes up")
            {
                for (int count = timeWhenFellAsleep; count < entry.date.Minute; count++) 
                {
                    if (minutesAsleep.ContainsKey(count))
                        minutesAsleep[count]++;
                    else 
                        minutesAsleep.Add(count, 1);
                }
                timeWhenFellAsleep = 0;
            }
            else
                currentGuard = false;
        }

        return this.GetMax(minutesAsleep);
    }

    public int GuardWithMostCommonMinuteAsleep(List<Entry> input)
    {
        Dictionary<int, Dictionary<int, int>> guardsMinutesAsleep = new Dictionary<int, Dictionary<int, int>>();
        int currentGuard = 0;
        int timeWhenFellAsleep = 0;

        foreach (Entry entry in input)
        {
            if (entry.guardId != 0)
            {
                currentGuard = entry.guardId;
                if (!guardsMinutesAsleep.ContainsKey(entry.guardId))
                {
                    guardsMinutesAsleep.Add(entry.guardId, new Dictionary<int, int>());
                }
            }
            else if (currentGuard != 0 && entry.activity == "falls asleep")
                timeWhenFellAsleep = entry.date.Minute;
            else if (currentGuard != 0 && entry.activity == "wakes up")
            {
                for (int count = timeWhenFellAsleep; count < entry.date.Minute; count++) 
                {
                    if (guardsMinutesAsleep[currentGuard].ContainsKey(count))
                        guardsMinutesAsleep[currentGuard][count]++;
                    else 
                        guardsMinutesAsleep[currentGuard].Add(count, 1);
                }
                timeWhenFellAsleep = 0;
            }
            else
                currentGuard = 0;
        }

        int winningGuard = 0;
        int winningMax = 0;
        int winningMinute = 0;
        foreach (var guardPair in guardsMinutesAsleep)
        {
            int maxElem = this.GetMax(guardPair.Value);
            
            int max;
            guardPair.Value.TryGetValue(maxElem, out max);

            if (max > winningMax)
            {
                winningMax = max;
                winningMinute = maxElem;
                winningGuard = guardPair.Key;
            }
        }

        return winningGuard * winningMinute;
    }

    public int PartTwo(string[] input)
    {
        List<Entry> sorted = this.SortByDate(input);
        return this.GuardWithMostCommonMinuteAsleep(sorted);
    }
}
