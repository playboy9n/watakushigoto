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
  get '/week' =>  'about#week'
  get '2019/05/01/co' => 'about#secret', as: 'secret'

  resources :level, only: [:create, :update]
  resources :tasks

    post 'tasks/top' => 'tasks#top_task_create', as:'task_top'
    patch 'tasks/:id/top' => 'tasks#top_task_update', as:'to'


  namespace :admins do
    resources :users, only: [:index, :edit, :show, :update]
    patch '/:id/decline' => 'users#decline', as:'user_decline'
    get '/decline' => 'users#decline_index'
  end
end
