const baseURL = 'https://main-street-valuations.herokuapp.com/'
const businessesURL = 'https://main-street-valuations.herokuapp.com/businesses'
const loginURL = 'https://main-street-valuations.herokuapp.com/login/'
const loginForm = document.querySelector('.login-form')
const newUser = document.querySelector('#new-user')
const getUsers = document.querySelector('#get-users')

loginForm.addEventListener('submit', loginUser)
newUser.addEventListener('click', createNewUser)
getUsers.addEventListener('click', retrieveUsers)

function loginUser(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    const user = { username, password }

    fetch(loginURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(parseJSON)
    .then(result => {
        if (result.status === "unauthorized") {
            const errorMessage = document.querySelector('#error-message')
            errorMessage.textContent = `Invalid credentials`
        } else {
            {localStorage.setItem('token', result.token)}

            const previousErrorMessage = document.querySelector('#error-message')  
            if (previousErrorMessage) {
                previousErrorMessage.remove()
            }
            const successMessage = document.querySelector('#success-message')
            successMessage.textContent = 'Success, please continue to Financials Page'
        }
    })
}

function retrieveUsers(event) {
    fetch(businessesURL, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(response => {
        if(response.ok) {
            window.location.href = '/profile.html'
        } else {
            const errorMessage = document.querySelector('#error-message')
            errorMessage.textContent = `Invalid credentials`
        }
    })
}

function createNewUser(event){
    window.location.href = '/new_business_form.html'
}

function parseJSON(response){
    return response.json()
}