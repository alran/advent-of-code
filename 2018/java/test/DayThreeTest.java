import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DayThreeTest {
  @Test
  public void testDayThreePartOne() {
    Path filepath = new File("../inputs/day-3.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayThree().PartOne(input);
      assertEquals(result, 111485);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayThreePartTwo() {
    Path filepath = new File("../inputs/day-3.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayThree().PartTwo(input);
      assertEquals(result, 113);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}
