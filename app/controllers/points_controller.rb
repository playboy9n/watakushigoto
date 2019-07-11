class PointsController < ApplicationController

  def create
    @point = current_user.points.new(points_id: points.id)
    points.save
    redirect_to user_path(current_user.id)
  end

  def update
    @point = Point.find_by(params[id])
    points.update
    redirect_to user_path(current_user.id)
  end

  def destroy
  end

end
