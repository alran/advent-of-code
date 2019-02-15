import java.util.HashSet;
import java.util.Set;
import java.util.List;

public class DayOne {
  public int PartOne(List<String> input) {
    int total = 0;
    for (String current : input) {
      total = total + Integer.parseInt(current);
    }

    return total;
  }

  public int PartTwo(List<String> input) {
    int total = 0;
    Set<Integer> totals = new HashSet<>();
    boolean looking = true;

    while (looking) {
      for (int i = 0; i < input.size() && looking; i++) {
        total = total + Integer.parseInt(input.get(i));

        if (totals.contains(total)) {
          looking = false;
        } else {
          totals.add(total);
        }
      }
    }

    return total;
  }
}
