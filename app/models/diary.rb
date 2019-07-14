class Diary < ApplicationRecord
  belongs_to :user
  attachment :diary_image

  validates :diary_body, length: { minimum: 3 }

 def point_system
    point = user.point
    diary_body_size = diary_body.size
    if diary_body_size > 3 && diary_body_size <= 10
      point += 3
    elsif diary_body_size > 10 && diary_body_size <= 25
      point += 5
    elsif diary_body_size > 25 && diary_body_size <= 40
      point += 7
    elsif diary_body_size > 40 && diary_body_size <= 60
      point += 9
    elsif diary_body_size > 60 && diary_body_size <= 100
      point += 12
    elsif diary_body_size > 100 && diary_body_size <= 160
      point += 15
    else
      point += 20
    end
    user.point = point
    user.save!
  end
end

