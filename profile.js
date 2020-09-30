const baseURL = 'http://localhost:3000/'
const profileURL = `${baseURL}/profile`

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

fetch(profileURL, {headers})
    .then(response => response.json())
    .then(business => {
        const welcomeMessage = document.createElement('h2')
        welcomeMessage.textContent = `Hello ${business.first_name}`
        document.body.appendChild(welcomeMessage)

        const businessName = document.createElement('p')
        businessName.innerHTML = `<a href='dashboard.html?business.id=${business.id}'>${business.business_name}</a>`
        document.body.appendChild(businessName)
    })