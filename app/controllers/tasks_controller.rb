class TasksController < ApplicationController

  def create
    @task = Todo.new(task_params)
    if @task.save
      respond_to do |foromat|
        format.html { redirect_to :root }
        format.json { render json: @todo }
      end
    else
      render :index
    end
  end

  # def update
  # end

  # def destroy
  # end

  private
  def task_params
    params.require(:tasks).permit(:state,:task_title,:task_body,:limit_date)
  end
end