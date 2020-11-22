const businessesURL = 'https://main-street-valuations.herokuapp.com/businesses'
const form = document.querySelector('#business-form')

form.addEventListener('submit', submitForm)

function submitForm(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const first_name = formData.get('first_name')
    const last_name = formData.get('last_name')
    const username = formData.get('username')
    const password = formData.get('password')
    const business_name = formData.get('business_name')
    const business_street = formData.get('business_street')
    const business_city = formData.get('business_city')
    const business_state = formData.get('business_state')
    const business_zip = formData.get('business_zip')
    const business_phone = formData.get('business_phone')
    const email = formData.get('email')
    const website = formData.get('website')
    const industry = formData.get('industry')
    const business = {first_name, last_name, username, password, business_name, business_street, business_city, business_state, business_zip, business_phone, email, website, industry}

    fetch(businessesURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {business} )
    })
    .then(response => response.json())
    .then(appendMessage)

    function appendMessage(event) {
        const successMessage = document.querySelector('#success-message')
        successMessage.textContent = 'Account Created Succesfully!'
    }
}