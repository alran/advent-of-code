import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DayTwoTest {
  @Test
  public void testDayTwoPartOne() {
    Path filepath = new File("../inputs/day-2.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      int result = new DayTwo().PartOne(input);
      assertEquals(result, 5976);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testDayTwoPartTwo() {
    Path filepath = new File("../inputs/day-2.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      String result = new DayTwo().PartTwo(input);
      assertEquals(result, "xretqmmonskvzupalfiwhcfdb");
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}