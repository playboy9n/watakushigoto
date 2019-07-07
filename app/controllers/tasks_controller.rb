class TasksController < ApplicationController

  def  show
    @task = Task.new
    @tasks  = Task.order(created_at: :asc)
    @events = Event.where(user_id: current_user)
  end
  def create
    @task = Task.new(task_params)
    if @task.save
      respond_to do |format|
        format.html { redirect_to user_path(current_user.id) }
        format.json { render json: @task}
      end
    else
      render :json, alert: 'Todoを入力してください'
    end
  end

  def edit
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find(current_user.id)
    if user.update(task_params)
      flash[:notice]='タスクを更新！'
        # respond_to do |foromat|
        #   format.html { redirect_to :show }
        #   format.json { render json: @task }
        # end
    else
      render :show
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to user_path(current_user.id)
  end

  private
  def task_params
    params.require(:task).permit(:state,:task_body,:limit_date)
    # .merge(user_id: current_user.id)

  end
end