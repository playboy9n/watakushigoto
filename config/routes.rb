Rails.application.routes.draw do
  resources :diaries
  resources :events
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
  root 'users#show'
  get '/top' => 'admins/top#top'
  get '/about' => 'about#top'
  get '/saturday' =>  'about#saturday'
  get '/monday' => 'about#monday'
  get '/tuesday' => 'about#tuesday'
  get '/wednesday' => 'about#wednesday'
  get '/thursday' =>  'about#thursday'
  get '/friday' => 'about#friday'

  resources :tasks
  resources :points, only: [:create, :update, :destroy]

  namespace :admins do
    resources :users, only: [:index, :edit, :show, :update]
    patch '/:id/decline' => 'users#decline', as:'user_decline'
    get '/decline' => 'users#decline_index'
  end
end
