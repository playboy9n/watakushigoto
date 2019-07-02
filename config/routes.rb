Rails.application.routes.draw do
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :admins, controllers: {
  sessions:      'admins/sessions',
  passwords:     'admins/passwords',
  registrations: 'admins/registrations'
}
  devise_for :users, controllers: {
  sessions:      'users/sessions',
  passwords:     'users/passwords',
  registrations: 'users/registrations'
}

  resources :users, except: [:index]
  root 'users#index'
  get '/top' => 'admins/top#top'
  get '/about' => 'about#top'
  get '/monday' => 'about#monday'

  namespace :admins do
    resources :users, only: [:index, :show, :edit, :update]
  end
end
