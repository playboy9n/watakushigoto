class Level < ApplicationRecord
  belongs_to :user
  has_many :tasks

  def leveling(level,task)
    exp = level.exp

    if level.exp >= level.exp_box
      level.lv += 1
      level.exp_box = level.exp_box + (level.lv * 100)
    end

    # if task.done == true
    #   exp += 25
    # end

    if task.done == true
      level.exp += 5
    end
    level.save
  end

end