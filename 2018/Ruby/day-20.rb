require 'set'

regex = File.read('../inputs/day-20.txt').chomp[1..-2]

class Room
  attr_accessor :north, :south, :east, :west, :distance

  def initialize
    @north = nil
    @south = nil
    @east  = nil
    @west  = nil
    @distance = nil
  end

  def neighbors
    [@north, @south, @east, @west].compact
  end

  def set_distance(new_distance)
    @distance = (@distance.nil? || new_distance < @distance) ? new_distance : @distance
  end
end

first_room = Room.new
first_room.set_distance(0)
ALL_ROOMS = Set.new
ALL_ROOMS << first_room

def crawl(room, regex, i, j)
  k = i
  current_room = room
  while k <= j
    case
    when regex[k] == ?N
      current_room.north ||= Room.new
      current_room.north.set_distance(current_room.distance + 1)
      ALL_ROOMS << current_room.north
      current_room.north.south = current_room
      current_room = current_room.north
    when regex[k] == ?S
      current_room.south ||= Room.new
      current_room.south.set_distance(current_room.distance + 1)
      ALL_ROOMS << current_room.south
      current_room.south.north = current_room
      current_room = current_room.south
    when regex[k] == ?E
      current_room.east ||= Room.new
      current_room.east.set_distance(current_room.distance + 1)
      ALL_ROOMS << current_room.east
      current_room.east.west = current_room
      current_room = current_room.east
    when regex[k] == ?W
      current_room.west ||= Room.new
      current_room.west.set_distance(current_room.distance + 1)
      ALL_ROOMS << current_room.west
      current_room.west.east = current_room
      current_room = current_room.west
    else
      raise "Unexpected char during crawl: #{regex[k]}"
    end

    k += 1
  end

  current_room
end

def find_closing_paren(regex, i)
  paren_count = 1
  while paren_count != 0
    case
    when regex[i] == ?(
      paren_count += 1
    when regex[i] == ?)
      paren_count -= 1
    end
    i += 1
  end
  i - 1
end

def has_branch?(regex, i, j)
  paren_count = 0
  k = i
  while k <= j
    case
    when regex[k] == ?(
      paren_count += 1
    when regex[k] == ?)
      paren_count -= 1
    when regex[k] == ?|
      if paren_count == 0
        return k
      end
    end

    k += 1
  end

  nil
end

def process_branch(room, regex, i, j)
  if (i > j)
    return [room]
  end
  if branch_index = has_branch?(regex, i, j)
    return process_branch(room, regex, i, branch_index - 1).concat(process_branch(room, regex, branch_index + 1, j)).uniq
  end

  k = i
  while k <= j
    if regex[k] == ?(
      room = crawl(room, regex, i, k - 1)
      closing_index = find_closing_paren(regex, k + 1)
      branches = process_branch(room, regex, k + 1, closing_index - 1)
      rooms = []
      branches.each do |branch|
        rooms.concat(process_branch(branch, regex, closing_index + 1, j))
      end
      return rooms.uniq
    end

    k += 1
  end

  return [crawl(room, regex, i, j)]
end

process_branch(first_room, regex, 0, regex.length - 1)

puts ALL_ROOMS.map { |room| room.distance }.max
puts ALL_ROOMS.count { |room| room.distance >= 1000 }
