const businessesURL = 'http://localhost:3000/businesses'

fetch (businessesURL)
    .then(response => response.json())
    .then(handleBusinesses)

function handleBusinesses(businesses) {
    businesses.forEach(business => {
        const businessName = document.createElement('p')
        businessName.innerHTML = `<a href='dashboard.html?business.id=${business.id}'>${business.business_name}</a>`
        document.body.append(businessName)
    })
}