import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DayFourTest {
  @Test
  public void testDayFourPartOne() {
    Path filepath = new File("../inputs/day-4.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayFour().PartOne(input);
      assertEquals(result, 87681);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayFourPartOneSimple() {
    Path filepath = new File("../inputs/day-4-simple.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayFour().PartOne(input);
      assertEquals(result, 240);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayFourPartTwo() {
    Path filepath = new File("../inputs/day-4.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayFour().PartTwo(input);
      assertEquals(result, 136461);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}
