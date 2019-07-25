class UsersController < ApplicationController
before_action :authenticate_user!,except: [:update]

PER = 11
  def calendar
  end

  def index
    @user = User.all
  end

  def show
    @user = current_user
    @task = Task.new
    @tasks = Task.where(user_id: current_user.id).where( 'limit_date >= ?', Date.today  ).order(created_at: :asc).page(params[:page]).per(PER)
    @events = Event.new
    @event = current_user
    @point = current_user.point
    @level = Level.find_by(user_id: current_user.id)
    p Task.where(user_id: current_user.id).first
    @top = Task.where(user_id: current_user.id).where.not(top_task: nil).where( 'created_at between ? and ?', Time.current.beginning_of_day, Time.current.end_of_day).first
  end

   def edit
    @user = User.find(params[:id])
  end
  def update
    @user = User.find(current_user.id)
    if admin_signed_in? || @user.id == current_user.id
      if @user.update(user_params)
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

  def point_eat
    @user = User.find(current_user.id)
    point = @user.point
    point -= 5

    @user.point = point
    @user.save!
      respond_to do |format|
        format.html {redirect_to user_path(current_user.id)}
        format.json { render json: @user}
      end
  end

private
  def user_params
    params.require(:user).permit(:nick_name, :user_name, :email, :family_name, :my_name, :k_family_name, :k_my_name, :gender, :phone_number,:profile_image,:bd, :biography)
  end
end