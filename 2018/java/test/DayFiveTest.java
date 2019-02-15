import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DayFiveTest {
  @Test
  public void testDayFivePartOne() {
    Path filepath = new File("../inputs/day-5.txt").toPath();

    try {
      String input = Files.readAllLines(filepath, Charset.defaultCharset()).get(0);
      String result = new DayFive().PartOne(input);
      assertEquals(result.length(), 10708);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayFivePartTwo() {
    Path filepath = new File("../inputs/day-5.txt").toPath();

    try {
      String input = Files.readAllLines(filepath, Charset.defaultCharset()).get(0);
      int result = new DayFive().PartTwo(input);
      assertEquals(result, 5330);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}
