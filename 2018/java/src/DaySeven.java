import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class DaySeven {
  public String partOne(List<String> input) {
    Graph g = new Graph();

    for (String line : input) {
      g.addEdge(line.charAt(5), line.charAt(36));
    }

    return g.sort();
  }

  public class DirectedEdge {
    public char v;
    public char w;

    public DirectedEdge(char v, char w) {
      this.v = v;
      this.w = w;
    }

    public char from() {
      return this.v;
    }

    public char to() {
      return this.w;
    }
  }

  public class Graph {
    public HashMap<Character, CopyOnWriteArrayList<DirectedEdge>> graph;
    public HashMap<Character, Integer> degrees;

    public Graph() {
      this.graph = new HashMap<>();
      this.degrees = new HashMap<>();

      for (char letter = 'A'; letter <= 'Z'; letter++) {
        this.graph.put(letter, new CopyOnWriteArrayList<>());
        this.degrees.put(letter, 0);
      }
    }

    public char getZeroDegreeElement() {
      ArrayList<Character> zeroDegreeElements = new ArrayList<>();

      for (char letter = 'A'; letter <= 'Z'; letter++) {
        if (this.degrees.get(letter) == 0) {
          zeroDegreeElements.add(letter);
        }
      }

      Collections.sort(zeroDegreeElements);
      return zeroDegreeElements.get(0);
    }

    public DirectedEdge addEdge(char v, char w) {
      DirectedEdge newEdge = new DirectedEdge(v, w);

      CopyOnWriteArrayList<DirectedEdge> prevEdges = this.graph.get(v);
      prevEdges.add(newEdge);

      this.graph.put(v, prevEdges);

      int prev = this.degrees.get(w);
      this.degrees.put(w, ++prev);

      return newEdge;
    }

    public CopyOnWriteArrayList<DirectedEdge> removeEdge(DirectedEdge edge) {
      CopyOnWriteArrayList<DirectedEdge> edges = this.graph.get(edge.from());

      edges.remove(edges.indexOf(edge));

      int prev = this.degrees.get(edge.to());
      this.degrees.put(edge.to(), --prev);
      this.graph.put(edge.from(), edges);

      return edges;
    }

    public void removeRelatedEdges(char v) {
      for (char letter = 'A'; letter <= 'Z'; letter++) {
        List<DirectedEdge> edges = this.graph.get(letter);

        for (DirectedEdge edge : edges) {
          if (edge.from() == v || edge.to() == v) {
            this.removeEdge(edge);
          }
        }
      }
    }

    public String sort() {
      int alphabetLength = 26;
      StringBuilder result = new StringBuilder();

      while (result.length() < alphabetLength) {
        // find zero degree element
        char zeroDegreeElement = this.getZeroDegreeElement();

        // remove anywhere that includes it as an edge
        this.removeRelatedEdges(zeroDegreeElement);
        this.degrees.put(zeroDegreeElement, -1);

        // add it to the final order
        result.append(zeroDegreeElement);
      }

      return result.toString();
    }
  }
}

