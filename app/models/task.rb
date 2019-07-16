class Task < ApplicationRecord
  belongs_to :user

  def point_system
    point = user.point
    if done == true
      point += 1
    end
    user.point = point
    user.save!
  end

  def level_system
    level = user.level
    done_size = done.size
    if done == true
      # if
      #   # レベルが上がるごとにdone==trueの数を増やす
      #   # 次のレベルに行くのに毎回*2 とかで計算していってもらう式を書く
      #   done.count
      # end
    end
  end

end


