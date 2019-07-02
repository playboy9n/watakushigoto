class UsersController < ApplicationController
before_action :authenticate_user!
  def index
    @user = User.all
  end

  def show
    @user = User.find(params[:id])
  end

   def edit
    @user = User.find(params[:id])
  end
  def update
    @user = User.find(params[:id])
    if @user.update(users_params)
      flash[:notice] = "#{@user.user_name}さんをupdate!"
      sign_in(@user, bypass: true) if current_user.id == @user.id
      redirect_to user_path(@user.id)
    else
      render :edit
    end
  end

private
  def users_params
    params.require(:user).permit(:nick_name, :user_name, :email, :family_name, :my_name, :k_family_name, :k_my_name, :gender, :phone_number,:profile_image)
  end
end