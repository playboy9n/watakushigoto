class Task < ApplicationRecord
  belongs_to :user
  belongs_to :level

  def point_system
    point = user.point
    if done == true
      point += 1
    end
    user.point = point
    user.save!
  end
end
