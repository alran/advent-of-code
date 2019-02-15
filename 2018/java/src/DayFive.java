public class DayFive {
  public String PartOne(String input) {
    StringBuilder finalStr = new StringBuilder(input);

    for (int i = 0; i < finalStr.length() - 1; i++) {
      char curr = finalStr.charAt(i);

      if (i > 0 && this.causeReaction(curr, finalStr.charAt(i - 1))) {
        finalStr.delete(i - 1, i + 1);
        i -= 2;
      } else if (this.causeReaction(curr, finalStr.charAt(i + 1))) {
        finalStr.delete(i, i + 2);
        i--;
      }
    }

    return finalStr.toString();
  }

  public int PartTwo(String input) {
    int shortest = Integer.MAX_VALUE;

    for (char c = 'a'; c <= 'z'; c++) {
      String inputMinusLetter = input.replaceAll("[" + Character.toLowerCase(c) + Character.toUpperCase(c) + "]", "");
      String scanned = this.PartOne(inputMinusLetter);

      if (scanned.length() < shortest) {
        shortest = scanned.length();
      }
    }

    return shortest;
  }

  public boolean causeReaction(char c1, char c2) {
    boolean diffCases = (Character.isUpperCase(c1) && Character.isLowerCase(c2)) || (Character.isLowerCase(c1) && Character.isUpperCase(c2));
    return diffCases && Character.toLowerCase(c1) == Character.toLowerCase(c2);
  }
}

