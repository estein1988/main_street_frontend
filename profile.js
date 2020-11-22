const baseURL = 'https://main-street-valuations.herokuapp.com/'
const profileURL = `${baseURL}/profile`
const financialURL = `${baseURL}/financials`
const bannerText = document.querySelector('#bannerText')
const form = document.querySelector('#financials-form')
const dashBoardButton = document.querySelector('#dashBoardButton')

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

fetch(profileURL, {headers})
    .then(response => response.json())
    .then(business => {

        const welcomeMessage = document.createElement('h4')
        welcomeMessage.textContent = `Welcome back ${business.first_name}`
        bannerText.append(welcomeMessage)

        form.addEventListener('submit', submitForm)
    })
        
    function submitForm(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const year = formData.get('year')
        const sales_revenue = parseInt(formData.get('sales_revenue'))
        const service_revenue = parseInt(formData.get('service_revenue'))
        const advertising = parseInt(formData.get('advertising'))
        const cogs = parseInt(formData.get('cogs'))
        const employee_benefits = parseInt(formData.get('employee_benefits'))
        const equipment = parseInt(formData.get('equipment'))
        const insurance = parseInt(formData.get('insurance'))
        const maintenance = parseInt(formData.get('maintenance'))
        const office_supplies = parseInt(formData.get('office_supplies'))
        const rent = parseInt(formData.get('rent'))
        const r_and_d = parseInt(formData.get('r_and_d'))
        const salaries = parseInt(formData.get('salaries'))
        const software = parseInt(formData.get('software'))
        const travel = parseInt(formData.get('travel'))
        const utilities = parseInt(formData.get('utilities'))
        const website = parseInt(formData.get('website'))
        const other_expense = parseInt(formData.get('other_expense'))
        const interest = parseInt(formData.get('interest'))
        const taxes = parseInt(formData.get('taxes'))
        const ammoritization = parseInt(formData.get('ammoritization'))
        const depreciation = parseInt(formData.get('depreciation'))
        const business_id = parseInt(formData.get('business_id'))
        const financial = {year, sales_revenue, service_revenue, advertising, cogs, employee_benefits, equipment, insurance, maintenance, office_supplies, rent, r_and_d, salaries, software, travel, utilities, website, other_expense, interest, taxes, ammoritization, depreciation, business_id}
    

fetch(financialURL, {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify( {financial} )
    })
    .then(response => response.json())
    .then(appendMessage)

    function appendMessage(messages) {
        if (Array.isArray(messages)) {
            messages.forEach(message => {
                const previousErrorMessage = form.querySelector('p')  
                if (previousErrorMessage) {
                    previousErrorMessage.remove()
                }
                const errorMessage = document.createElement('p')
                errorMessage.textContent = message
                errorMessage.classList.add('.error-message')
                form.appendChild(errorMessage)
            });
        } else {   
            const previousSuccessMessage = form.querySelector('p')
                if (previousSuccessMessage) {
                    previousSuccessMessage.remove()
                }
            const successMessage = document.createElement('p')
            successMessage.textContent = "Financial Statement Successfully Entered"
            form.appendChild(successMessage)     
        }
    }
}

fetch(profileURL, {headers})
    .then(response => response.json())
    .then(business => {
        const businessField = document.querySelector('#business_id')
        const businessOption = document.createElement('option')
        
        businessOption.value = business.id
        businessOption.textContent = business.business_name 

        businessField.appendChild(businessOption)
    })

dashBoardButton.addEventListener('click', goToDashBoard)

function goToDashBoard(event){
    window.location.href = '/dashboard.html'
}