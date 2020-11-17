# Main Street Valuations. Money sleeps at night.

An interactive tool to better manage your small business revenue, expenses and profit.

## Backend Repo
https://github.com/estein1988/main_street_backend

## Setup

To run Main Street Valuations, install it locally by cloning this GitHub repository and run:
```
BE:
bundle install
rails db:migrate
rails db:seed
Open Rails on local host

FE:
Open index.html on lite-server

```

### General Info
The app Main Street Valuations allows new users to enter their basic business information, authenticate users to restrict access to only their business, enter business' financials and view analytics in regards to the business structure. The user dashboard allows users to see their last year's revenue, expenses, ebita and profit, as well as renders the majority of this information to charts and a table (in the form of an Income Statement). Finally, the app gives a couple of options for advice to the business owner, including a valuation range and what they would receive for an offer on the business. 
 
### Demo Video
https://www.youtube.com/watch?v=GYPZSd82-UE&t=1s

### Technologies Used -
* Ruby 2.6.1
* Rails 6.0.3
* Sqlite3 1.4
* Puma 4.1
* Bcrypt
* JWT
* Rack-cors
* HTML5, CSS3, JavaScript
* Bootstrap 4
* Google Charts


### Code Examples

BE authentication structure:

```
class AuthenticationController < ApplicationController

    skip_before_action :authenticate, only: [:login]

    def login
        @business = Business.find_by(username: params[:username])

        if !@business
            render json: { message: 'That user does not exist', status: :unauthorized }
        else

            if !@business.authenticate(params[:password]) 
                render json: { message: 'Bad password' }, status: :unauthorized
            else
                payload = { business_id: @business.id }
                secret = 'ill never tell. anyone.'
                token = JWT.encode(payload, secret)

                render json: { token: token }, status: :ok
            end
        end
    end 
end
```
Base structure for FE User Dashboard
```
const ownerName = document.querySelector('#ownerName')
...
const baseURL = 'http://localhost:3000/'
const profileURL = `${baseURL}/profile`

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

fetch(profileURL, {headers})
    .then(handleResponse)
    .then(business => {

    ownerName.textContent = `${business.first_name} ${business.last_name}`
    businessName.textContent = business.business_name
```

### Admin Dashboard Documentation
I relied on the following video for the HTML/CSS for the base structure of the user dashboard: https://www.youtube.com/watch?v=XK-H0kQW54Y&list=TLPQMjcwOTIwMjAkxQ0LzeCAnw&index=1. The video provided a step-by-step instructional walk-through on how to create a user dashboard using Bootstrap 4. It was a great tutorial that allowed me to follow and code along while the instructor provided more clarity on Bootstrap grid structure. The video only provided instruction on the HTML and CSS and does not include any instructions on any of the JavaScript within the app.

### Features
* First-time users for the app are only authenticated for the home page and new business form page. New users can enter their basic user information in a form, including creating a username and password.
![Alt Text](https://media.giphy.com/media/QWBKr7MynQ1Dvy1YoR/giphy.gif)<br></br>
* After creating a username and password, users can login and access their initial user profile page.
* On the profile page, users can entire in their financials (mostly an income statement), and this automatically attaches to their business profile. Restrictions are built in to restrict users from altering other people's financials (or seeing other financials).
![Alt Text](https://media.giphy.com/media/u4bgzBcbq6dCvCMFhZ/giphy.gif)<br></br>
* Strong parameters are in-place on the backend to avoid users from submitting non-integers, and every value has to be submitted to avoid dividing by zero on some locations on the front-end.
* Following submitting financials, users can view their dashboard, which has all sort of information in regards to their current business financial position. 
![Alt Text](https://media.giphy.com/media/FJNH0HI91Ts9trOgsY/giphy.gif)<br></br>
* Pop-up windows are placed on all the cards to display more information on business terms the user may or may not be familiar with.
<iframe src="https://giphy.com/embed/HEOyigs40Y7S83hvCe" width="480" height="292" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/HEOyigs40Y7S83hvCe">via GIPHY</a></p>
* A logout button is placed on the upper-right of the dashboard, which clears the user's auth token and directs them back to the home page.

_Additional Options for Features_
* Build in functionality for the financials class to be based on the company's industry. As of now, all financials are generic for small businesses. 
* Additional logic to avoid rendering null values or blank charts to admin page. 
* Deploy the app via Heroku and Firebase so external users can us its functionality.

### Inspiration
The COVID-19 pandemic has forced almost all businesses to take a real, hard, look at their finances. A family friend of ours, who owns 5280 Skin Care, was not excluded from businesses which were told their shut their doors for a prolonged period in the spring and summer of 2020. I hope this app can help her look at where money is coming in and out of to better provide for more financial stability. 

### Status
App is fully functioning with option to grow with additional features. App is not currently deployed but is forthcoming.

### Contact
Created by **[Elliott Stein](https://www.linkedin.com/in/steinelliott/)**
Please feel free to contact me if you would like to learn more about this project!!
