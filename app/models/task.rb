class Task < ApplicationRecord
  belongs_to :user
  belongs_to :level

  validates :task_body, presence: true

  def point_system
    point = user.point
    if done == true
      point += 1
    end
    if top_done == true
      point += 6
    user.point = point
    user.save!
  end
end
