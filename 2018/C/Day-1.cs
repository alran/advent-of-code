using System;
using System.Collections.Generic;

class Day1
{
    public int GetFrequency(string[] input)
    {
        int total = 0;
        foreach (string frequency in input)
        {
            total += Convert.ToInt32(frequency);
        }

        return total;
    }

    public int ReachesSameFrequency(string[] input)
    {
        HashSet<int> totals = new HashSet<int>();
        int total = 0;

        while (true)
        {
            foreach (string frequency in input)
            {
                total += Convert.ToInt32(frequency);
                if (totals.Contains(total)) 
                {
                    return total;
                }
                totals.Add(total);
            }
        }
    }
}
