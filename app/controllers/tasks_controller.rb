class TasksController < ApplicationController
  def  show
    @task = Task.new
    @tasks  = Task.order(created_at: :asc)
    @events = Event.where(user_id: current_user)
  end
  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id
    if @task.save
      respond_to do |format|
        format.html { redirect_to user_path(current_user.id) }
        format.json { render json: @task}
      end
    else
      render :json, alert: 'taskを入力してください'
    end
  end

  def edit
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find_by(id: params[:id])
    if @task.update(task_update_params)
       respond_to do |format|
        format.html { redirect_to user_path(current_user.id) }
        format.json { render json: @task}
      end
    else
      render :json
    end
  end

  def destroy
    p params
    @task = Task.find_by(id: params[:id])
      if @task.destroy
        redirect_to user_path(current_user.id)
      else
        render :json
      end
  end

  private
  def task_params
    params.require(:task).permit(:state,:task_body,:limit_date)
  end
  def task_update_params
    params.require(:task).permit(:done)
  end

end