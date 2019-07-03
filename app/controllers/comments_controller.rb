class CommentsController < ApplicationController
  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:user_id, :comment_body)
  end
end
