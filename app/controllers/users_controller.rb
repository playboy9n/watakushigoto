class UsersController < ApplicationController
before_action :authenticate_user!,except: [:update]
  def calendar
  end

  def index
    @user = User.all
  end

  def show
    @user = User.find(current_user.id)
    @task = Task.new
    @tasks = Task.where(user_id: current_user.id).order(created_at: :asc)
    @events= Event.where(user_id: current_user.id)
    @event = Event.find_by(id: params[:id])
  end

   def edit
    @user = User.find(params[:id])
  end
  def update
    @user = User.find(params[:id])
    if admin_signed_in? || @user.id == current_user.id
      if @user.update(users_params)
        flash[:notice] = "#{@user.user_name}さんをupdate!"
        if admin_signed_in?
          redirect_to admins_user_path(@user.id)
        else
          sign_in(@user, bypass: true) if current_user.id == @user.id
          redirect_to user_path(@user.id)
        end
      else
        render :edit
      end
    else
        redirect_to user_path(@user.id)
    end
  end

private
  def users_params
    params.require(:user).permit(:nick_name, :user_name, :email, :family_name, :my_name, :k_family_name, :k_my_name, :gender, :phone_number,:profile_image,:bd, :description)
  end
end