class TasksController < ApplicationController

  def index
    @q = Task.where(user_id: current_user.id).ransack(params[:q])
    @tasks = @q.result
  end

  def show
    @task = Task.new
    @tasks  = Task.order(created_at: :asc)
    @events = Event.where(user_id: current_user.id)
  end

  def create
    if Level.exists?(user_id: current_user.id)
      @level = Level.find_by(user_id: current_user.id)
    else
      @level = Level.create(user_id: current_user.id)
    end
    @task = Task.new(task_params)
    @taskk = Task.new(top_task_params)
    @task.user_id = current_user.id
    @task.level_id = @level.id
    if @task.save
      respond_to do |format|
        format.html { redirect_to root_path(current_user.id) }
        format.json { render json: @task }
      end
    else
    render :json, alert: 'taskを入力してください'
  end
end

def top_task_create
    if Level.exists?(user_id: current_user.id)
       @level = Level.find_by(user_id: current_user.id)
    else
      @level = Level.create(user_id: current_user.id)
    end
    unless Task.where('created_at between ? and ?', Time.current.beginning_of_day, Time.current.end_of_day).where.not(top_task: nil).exists?(user_id: current_user.id)
      @task = Task.new(top_task_params)
      @task.user_id = current_user.id
      @task.level_id = @level.id
      if @task.save
        # respond_to do |format|
        #   format.html { redirect_to root_path(current_user.id) }
        #   format.json { render json: @task }
        # end
      else
        render :json, alert: '失敗だ〜〜'
      end
    end
  end

  def top_task_update
    @task = Task.find(params[:id])
    if @task.update(top_update_params)
      level = current_user.levels.first
      level.leveling(level, @task)
      @task.point_system
       respond_to do |format|
        format.html { redirect_to user_path(current_user.id) }
        format.json { render json: @task}
        end
      flash[:notice] = ' ^_^ いいね！'
    else
      render :json, alert: '失敗だぞ'
    end
  end


  def edit
    @task = Task.find_by(id: params[:id])
  end

  def update
    task = Task.find_by(id: params[:id])
    task.user = current_user
    level = Level.find_by(user_id: current_user.id)
    if task.update(task_update_params)
      level.leveling(level,task)
      task.point_system
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
    params.require(:task).permit(:state, :task_body, :limit_date)
  end
  def task_update_params
    params.require(:task).permit(:done)
  end
  def top_task_params
    params.require(:task).permit(:top_task)
  end
  def top_update_params
    params.require(:task).permit(:top_btn)
  end

end