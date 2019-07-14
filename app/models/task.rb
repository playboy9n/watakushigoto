class Task < ApplicationRecord
  #belongs_to :user
   def point_system
    @user = User.find(current_user.id)
    # if task.done == true
    #   point = 0;
    #   0.upto(10000) do |up|
    #     point + up
    #   end
    # end
    point = @user.point
    if task.done == true
      point + 1
    end
    return point
  end

# currentuser＆＆今日のものだけを表示ってしたいどうすれば良い
  # def method_name
  #   require "date"   #Dateクラスを使えるようにする
  #   now = Date.today  #Date.today(今日の日付)
  #   puts now
  # end


end
