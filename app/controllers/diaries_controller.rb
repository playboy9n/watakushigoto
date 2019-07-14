class DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_diary, only: [:show, :edit, :update, :destroy]
  def index
    @diaries = Diary.all
  end

  def show
    # @task = current_user.task.all
  end

  def new
    @diary = Diary.new
  end

  def edit
    diary = Diary.find_by(id: params[:id])
  end

  def create
    diary = Diary.new(diary_params)
    diary.user = current_user
    if diary.save
      diary.point_system
      flash[:notice] = '保存完了！'
      redirect_to diaries_path
    else
      rendar :new
    end
  end

  def update
      if @diary.update(diary_params)
        flash[:notice] = '日記をアプデート！'
        redirect_to diaries_path
      else
        rendar :edit
    end
  end

  def destroy
    if@diary.destroy
      redirect_to diaries_path
    else
      rendar :new
   end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_diary
      @diary = Diary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def diary_params
      params.require(:diary).permit(:diary_title, :diary_body, :diary_image_id)
    end
end
