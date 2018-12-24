using System;
using NUnit.Framework;

namespace advent_of_code_2018
{
    [TestFixture]
    public class UnitTests
    {
        [Test]
        public void TestDay1Part1()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-1.txt");
            int frequency = new Day1().GetFrequency(input);
            Assert.AreEqual(402, frequency);
        }

        [Test]
        public void TestDay1Part2()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-1.txt");
            int frequency = new Day1().ReachesSameFrequency(input);
            Assert.AreEqual(481, frequency);
        }

        [Test]
        public void TestDay2Part1()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-2.txt");
            int answer = new Day2().PartOne(input);
            Assert.AreEqual(5976, answer);
        }

        [Test]
        public void TestDay2Part2()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-2.txt");
            string answer = new Day2().PartTwo(input);
            Assert.AreEqual("xretqmmonskvzupalfiwhcfdb", answer);
        }

        [Test]
        public void TestDay3Part1()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-3.txt");
            int answer = new Day3().PartOne(input);
            Assert.AreEqual(111485, answer);
        }

        [Test]
        public void TestDay3Part2()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-3.txt");
            int answer = new Day3().PartTwo(input);
            Assert.AreEqual(113, answer);
        }
        
                [Test]
        public void TestDay4Part1()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-4.txt");
            int answer = new Day4().PartOne(input);
            Assert.AreEqual(87681, answer);
        }

        [Test]
        public void TestDay4Part2()
        {
            string[] input = System.IO.File.ReadAllLines("../../../../inputs/day-4.txt");
            int answer = new Day4().PartTwo(input);
            Assert.AreEqual(136461, answer);
        }
    }
}
