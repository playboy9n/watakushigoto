class Admins::UsersController < ApplicationController
  before_action :login_check
  def index
    @users = User.all
  end
  def show
    @user = User.find(params[:id])
  end
end
