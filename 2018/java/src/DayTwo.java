import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.StringBuilder;

public class DayTwo {
  public int PartOne(List<String> input) {
    int twos = 0;
    int threes = 0;

    for (String str : input) {
      Map<Character, Integer> counts = new HashMap<>();

      for (int i = 0; i < str.length(); i++) {
        char letter = str.charAt(i);
        int prevValue = counts.getOrDefault(letter, 0);
        counts.put(letter, ++prevValue);
      }

      if (counts.containsValue(2)) {
        twos++;
      }

      if (counts.containsValue(3)) {
        threes++;
      }
    }

    return threes * twos;
  }

  public String PartTwo(List<String> input) {
    boolean looking = true;
    StringBuilder finalStr = new StringBuilder();

    for (int strIdx = 0; strIdx < input.size() && looking; strIdx++) {
      String str = input.get(strIdx);
      int lastDiffIdx = 0;

      for (int nextIdx = 0; nextIdx < str.length() && looking; nextIdx++) {
        int numDifferences = 0;
        String nextStr = input.get(nextIdx);

        for (int charIdx = 0; charIdx < str.length() && looking; charIdx++) {
          if (str.charAt(charIdx) != nextStr.charAt(charIdx)) {
            numDifferences++;
            lastDiffIdx = charIdx;
          }
        }

        if (numDifferences == 1) {
          looking = false;

          finalStr.append(str);
          finalStr.deleteCharAt(lastDiffIdx);
        }
      }
    }
    return finalStr.toString();
  }
}
