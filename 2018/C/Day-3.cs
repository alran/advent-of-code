using System;
using System.Collections.Generic;

class Day3
{
    public class Claim
    {
        public int width, height, leftStart, topStart, id;
        public Claim(string claim)
        {
            string[] separatedClaim = claim.Split(' ');
            this.leftStart = Convert.ToInt32(separatedClaim[2].Split(',')[0]);
            string stringStart = separatedClaim[2].Split(',')[1];
            this.topStart = Convert.ToInt32(stringStart.Substring(0, stringStart.Length - 1));
            string[] widthHeight = separatedClaim[3].Split('x');
            this.width = Convert.ToInt32(widthHeight[0]);
            this.height = Convert.ToInt32(widthHeight[1]);
            this.id = Convert.ToInt32(separatedClaim[0].Substring(1));
        }
    }

    public int PartOne(string[] input)
    {
        Dictionary<string, int> squares = new Dictionary<string, int>();
        int numSquares = 0;

        foreach (string unprocessedClaim in input)
        {
            Claim claim = new Claim(unprocessedClaim);

            for (int rowIdx = claim.topStart; rowIdx < claim.topStart + claim.height; rowIdx++)
            {
                for (int colIdx = claim.leftStart; colIdx < claim.leftStart + claim.width; colIdx++)
                {
                    string coords = $"{ colIdx }, ${ rowIdx }";

                    int value;
                    if (squares.TryGetValue(coords, out value))
                    {
                        int newValue = value + 1;
                        squares[coords] = newValue;
                    }
                    else
                        squares[coords] = 1;

                    if (squares[coords] == 2)
                        numSquares++;
                }
            }
        }

        return numSquares;
    }

    public int PartTwo(string[] input)
    {
        Dictionary<string, int> squares = new Dictionary<string, int>();
        List<Claim> claims = new List<Claim>();

        foreach (string unprocessedClaim in input)
        {
            Claim claim = new Claim(unprocessedClaim);
            claims.Add(claim);

            for (int rowIdx = claim.topStart; rowIdx < claim.topStart + claim.height; rowIdx++)
            {
                for (int colIdx = claim.leftStart; colIdx < claim.leftStart + claim.width; colIdx++)
                {
                    string coords = $"{ colIdx }, { rowIdx }";

                    int value;
                    if (squares.TryGetValue(coords, out value))
                        squares[coords] = value + 1;
                    else
                        squares[coords] = 1;
                }
            }
        }

        foreach (Claim claim in claims)
        {
            int squaresWithOverlap = 0;
            for (int rowIdx = claim.topStart; rowIdx < claim.topStart + claim.height; rowIdx++)
            {
                for (int colIdx = claim.leftStart; colIdx < claim.leftStart + claim.width; colIdx++)
                {
                    string coords = $"{ colIdx }, { rowIdx }";
                    if (squares[coords] > 1)
                    {
                        squaresWithOverlap++;
                    }
                }
            }

            if (squaresWithOverlap == 0)
            {
                return claim.id;
            }
        }

        return -1;
    }
}
