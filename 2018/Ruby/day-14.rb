def calculateScores(targetEnd)
  final = [3, 7]
  targetEnd = targetEnd.to_s
  one = 0
  two = 1

  count = 2

  while true
    oneVal = final[one]
    twoVal = final[two]
    sum = oneVal + twoVal
    newNums = sum.to_s.split('')

    newNums.each do |num|
      final.push(num.to_i)
      count += 1;

      i = 1
      while i <= targetEnd.length
        if final[final.length - i] != targetEnd[targetEnd.length - i].to_i
          break
        elsif i === targetEnd.length
          puts 'finished'
          puts count - targetEnd.length
          return count - targetEnd.length
        end
        i += 1
      end
    end

    one = (oneVal + 1 + one) % final.length
    two = (twoVal + 1 + two) % final.length
  end
end
