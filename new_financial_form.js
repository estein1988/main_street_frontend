const financialsURL = 'http://localhost:3000/financials'
const businessesURL = 'http://localhost:3000/businesses'

const form = document.querySelector('#financials-form')

form.addEventListener('submit', submitForm)

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

    fetch(financialsURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {financial} )
    })
    .then(response => response.json())
    .then(appendMessage)
    
    function appendMessage(messages) {
        if (Array.isArray(messages)) {
            messages.forEach(message => {
            const errorMessage = document.createElement('p')
            errorMessage.textContent = message
            document.body.appendChild(errorMessage)
            })
        } else {   
            const successMessage = document.createElement('h2')
            successMessage.textContent = "Financial Statement Successfully Entered"
            document.body.append(successMessage)     
        }
    }
}

fetch(businessesURL)
    .then(response=>response.json())
    .then(businesses => {
        const businessField = document.querySelector('#business_id')

        businesses.map (business => {
            const businessOption = document.createElement('option')
        
            businessOption.value = business.id 
            businessOption.textContent = business.business_name 

            businessField.appendChild(businessOption)
    })
})