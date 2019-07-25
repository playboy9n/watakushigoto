class Admins::UsersController < ApplicationController
  before_action :login_check
  PER = 20

  def index
    query = { user_name_cont: params[:q] }
    @users = User.where(decline: false).page(params[:page]).reverse_order
    q = User.where(decline: false).ransack(query)
    if params[:q]
      @users = q.result(decline: true).page(params[:page]).reverse_order
    end
  end
  def decline_index
    @users = User.where(decline: true).page(params[:page]).reverse_order
    query = { user_name_cont: params[:q] }
    q = User.where(decline: true).ransack(query)
    if params[:q]
      @users = q.result(decline: false).page(params[:page]).reverse_order
    end
  end
  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if@user.update(users_params)
      flash[:notice] = "#{@user.user_name}さんを編集しました"
      redirect_to admins_user_path(@user.id)
    else
      render :edit
    end
  end

  def decline
    @user = User.find(params[:id])
    if @user.decline == false
      @user.update(
      decline: true,
      decline_at: Time.current)
    flash[:danger] = "ユーザーを退会させました！"
    redirect_to admins_users_path
    else
      @user.update(
      decline: false,
      decline_at: Time.current)
      flash[:warning] = "ユーザが戻ってきました！"
      redirect_to admins_users_path
    end
  end

  private
  def users_params
    params.require(:user).permit(:user_id, :nick_name, :user_name, :email, :family_name, :my_name, :k_family_name, :k_my_name, :gender, :phone_number,:profile_image,:bd,:description)
  end
end
