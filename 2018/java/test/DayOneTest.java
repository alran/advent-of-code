import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class DayOneTest {
  @Test
  public void testDayOnePartOne() {
    Path filepath = new File("../inputs/day-1.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayOne().PartOne(input);
      assertEquals(result, 402);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayOnePartTwo() {
    Path filepath = new File("../inputs/day-1.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayOne().PartTwo(input);
      assertEquals(result, 481);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

}