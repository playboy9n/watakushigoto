class Task < ApplicationRecord
  belongs_to :user
  belongs_to :level

  # validates :user_id, {
  #   uniqueness: {
  #     scope: :top_task,
  #     conditions: -> { where('created_at >= ?', 1.days.ago) },
  #   }
  # }


  def point_system
    point = user.point
    if done == true
      point += 1
    end
    # if top_done == true
    #   point += 6
    # end
    user.point = point
    user.save!
  end
end