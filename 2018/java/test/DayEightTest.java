import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DayEightTest {
  @Test
  public void testDayEightPartOneSimple() {
    try {
      String input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";
      int result = new DayEight().partOne(input);
      assertEquals(result, 138);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayEightPartOne() {
    Path filepath = new File("../inputs/day-8.txt").toPath();

    try {
      String input = Files.readAllLines(filepath, Charset.defaultCharset()).get(0);
      int result = new DayEight().partOne(input);
      assertEquals(result, 44893);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayEightPartTwoSimple() {
    try {
      String input = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";
      int result = new DayEight().partTwo(input);
      assertEquals(result, 66);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }


  @Test
  public void testDayEightPartTwo() {
    Path filepath = new File("../inputs/day-8.txt").toPath();

    try {
      String input = Files.readAllLines(filepath, Charset.defaultCharset()).get(0);
      int result = new DayEight().partTwo(input);
      assertEquals(result, 27433);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}
