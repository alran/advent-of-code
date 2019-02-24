import java.util.ArrayList;
import java.util.Arrays;

public class DayEight {
  public int partOne(String input) {
    MetadataProcessor mp = new MetadataProcessor(this.cleanData(input), false);
    mp.addAllMetadata(0);

    return mp.totalMetadata;
  }

  public int partTwo(String input) {
    MetadataProcessor mp = new MetadataProcessor(this.cleanData(input), true);
    mp.addAllMetadata(0);

    return mp.topChild;
  }

  public int[] cleanData(String input) {
    return Arrays.stream(input.split(" ")).mapToInt(Integer::parseInt).toArray();
  }

  public class MetadataProcessor {
    public int totalMetadata;
    int visitedSpaces;
    int[] data;
    boolean withChildren;
    int topChild;
    Boolean[] seen;

    public MetadataProcessor(int[] input, boolean withChildren) {
      this.data = input;
      this.totalMetadata = 0;
      this.seen = new Boolean[input.length];
      Arrays.fill(this.seen, false);
      this.withChildren = withChildren;
      this.visitedSpaces = 0;
    }

    public void addOneSeen(int idx) {
      this.seen[idx] = true;
      this.visitedSpaces++;
    }

    public int findNextUnseen(int startIdx) {
      int firstUnseen = -1;

      for (int i = startIdx; firstUnseen < 0; i++) {
        if (!this.seen[i]) {
          firstUnseen = i;
        }
      }

      return firstUnseen;
    }

    public int addAllMetadata(int idx) {
      this.addOneSeen(idx);
      this.addOneSeen(idx + 1);

      int numChildren = this.data[idx];
      int numMetadata = this.data[idx + 1];

      int childrenCovered = 0;
      ArrayList<Integer> childData = new ArrayList<>();
      while (childrenCovered < numChildren) {
        int data = this.addAllMetadata(this.findNextUnseen(idx));
        childData.add(data);
        childrenCovered++;
      }

      int metadata = this.processMetadata(numMetadata, this.findNextUnseen(idx), childData);
      this.totalMetadata += metadata;

      if (idx == 0) {
        this.topChild = metadata;
      }

      return metadata;
    }

    public int processMetadata(int numMetadata, int metadataCountIdx, ArrayList<Integer> childData) {
      int total = 0;
      int metadataStartIdx = this.findNextUnseen(metadataCountIdx);

      for (int i = metadataStartIdx; i < metadataStartIdx + numMetadata; i++) {
        int metadata = this.data[i];

        if (this.withChildren && childData.size() > 0) {
          if (metadata <= childData.size()) {
            total += childData.get(metadata - 1);
          }
        } else {
          total += metadata;
        }

        this.addOneSeen(i);
      }

      return total;
    }
  }
}
