class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def login_check
    unless admin_signed_in?
      redirect_to root_path
    end
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys:[:nick_name, :user_name, :email, :family_name, :my_name, :k_family_name, :k_my_name, :gender, :phone_number, :profile_image])
  end

def after_sign_in_path_for(resource_or_scope)
    if resource_or_scope.is_a?(Admin)
      top_path
    else
      stored_location_for(resource_or_scope) || super
    end
  end

  def after_sign_out_path_for(resource)
    if resource.is_a?(Admin)
      new_admin_session_path
    else
      new_admin_registration_path
    end
  end

end
