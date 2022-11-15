Rails.application.routes.draw do
  
  resources :assignments, except: [:new, :show, :edit]
  resources :students, except: [:new, :show, :edit]
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/usersignup", to: "users#create"
  get "/auth", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
