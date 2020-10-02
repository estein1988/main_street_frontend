const baseURL = 'http://localhost:3000/'
const businessesURL = 'http://localhost:3000/businesses'
const loginURL = 'http://localhost:3000/login'
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
    .then(response => response.json())
    .then(result => {
        {localStorage.setItem('token', result.token)}
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