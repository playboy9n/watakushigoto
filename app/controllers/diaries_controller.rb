class DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_diary, only: [:show, :edit, :update, :destroy]
  def index
    @diaries = Diary.all.reverse_order
  end

  def show
  end

  def new
    @diary = Diary.new
  end

  def edit
    @diary = Diary.find_by(id: params[:id])
  end

  def create
    @diary = Diary.new(diary_params)
    @diary.user = current_user
    if @diary.save
      @diary.point_system
      flash[:notice] = '保存完了！'
      redirect_to diaries_path
    else
      render :new
    end
  end

  def update
      if @diary.update(diary_params)
        flash[:notice] = '日記をアプデート！'
        redirect_to diaries_path
      else
        render :edit
    end
  end

  def destroy
    if@diary.destroy
      flash[:danger] = '削除しました><！'
      redirect_to diaries_path
    else
      render :index
   end
  end

  private
    def set_diary
      @diary = Diary.find(params[:id])
    end

    def diary_params
      params.require(:diary).permit(:diary_title, :diary_body, :diary_image_id)
    end
end
