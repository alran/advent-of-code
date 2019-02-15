import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class DayThree {
  private HashMap<List<Integer>, Integer> squares;

  public int PartOne(List<String> input) {
    int numSquares = 0;
    HashMap<List<Integer>, Integer> squares = new HashMap<>();

    for (String claimString : input) {
      Claim claim = new Claim(claimString);

      for (int rowIdx = claim.topStart; rowIdx < claim.topStart + claim.height; rowIdx++) {
        for (int colIdx = claim.leftStart; colIdx < claim.leftStart + claim.width; colIdx++) {
          List<Integer> coordinates = Arrays.asList(colIdx, rowIdx);
          int count = squares.getOrDefault(coordinates, 0);
          squares.put(coordinates, ++count);

          if (count == 2) {
            numSquares++;
          }
        }
      }
    }

    this.squares = squares;
    return numSquares;
  }

  public int PartTwo(List<String> input) {
    this.PartOne(input);

    for (String claimString : input) {
      int squaresWithOverlap = 0;
      Claim claim = new Claim(claimString);

      for (int rowIdx = claim.topStart; rowIdx < claim.topStart + claim.height; rowIdx++) {
        for (int colIdx = claim.leftStart; colIdx < claim.leftStart + claim.width; colIdx++) {
          List<Integer> coordinates = Arrays.asList(colIdx, rowIdx);
          int count = this.squares.getOrDefault(coordinates, 0);

          if (count > 1) {
            squaresWithOverlap++;
          }
        }
      }

      if (squaresWithOverlap == 0) {
        return claim.id;
      }
    }

    return 0;
  }

  public class Claim {
    public int leftStart;
    public int topStart;
    public int width;
    public int height;
    public int id;

    public Claim(String claimString) {
      String[] claimParts = claimString.split(" ");
      String[] startLocations = claimParts[2].split(",");
      String[] dimensions = claimParts[3].split("x");

      this.leftStart = Integer.parseInt(startLocations[0]);
      this.topStart = Integer.parseInt(startLocations[1].substring(0, startLocations[1].length() - 1));
      this.width = Integer.parseInt(dimensions[0]);
      this.height = Integer.parseInt(dimensions[1]);
      this.id = Integer.parseInt(claimParts[0].substring(1));
    }
  }
}
