using System;
using System.Collections.Generic;

class Day2
{
    public int PartOne(string[] input)
    {
        int twos = 0;
        int threes = 0;

        foreach (string str in input)
        {
            Dictionary<char, int> counts = new Dictionary<char, int>();

            foreach (char letter in str)
            {
                int value;
                if (counts.TryGetValue(letter, out value))
                    counts[letter] = value + 1;
                else
                    counts[letter] = 1;
            }

            if (counts.ContainsValue(2))
                twos++;

            if (counts.ContainsValue(3))
                threes++;
        }

        return threes * twos;
    }

    public string PartTwo(string[] input)
    {
        foreach (string str in input)
        {
            foreach (string nextStr in input)
            {
                int numDifferences = 0;
                string same = "";

                for (int charIdx = 0; charIdx < str.Length; charIdx++)
                {
                    if (str[charIdx] != nextStr[charIdx])
                        numDifferences++;
                    else
                        same += str[charIdx];
                }

                if (numDifferences == 1)
                    return same;
            }
        }

        return "";
    }
}
