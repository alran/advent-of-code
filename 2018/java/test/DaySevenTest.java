import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DaySevenTest {
  @Test
  public void testDaySevenPartOne() {
    Path filepath = new File("../inputs/day-7.txt").toPath();

    try {
      List<String> input = Files.readAllLines(filepath, Charset.defaultCharset());
      String result = new DaySeven().partOne(input);
      assertEquals(result, "GJKLDFNPTMQXIYHUVREOZSAWCB");
    } catch(Exception e) {
      e.printStackTrace();
    }
  }
}
