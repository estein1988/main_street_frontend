const searchParams = new URLSearchParams(window.location.search)
const businessId = searchParams.get('business.id')

const ownerName = document.querySelector('#ownerName')
const expenses2019card = document.querySelector('#expense2019')
const revenue2019card = document.querySelector('#revenue2019')
const ebita2019card = document.querySelector(`#ebita2019`)
const profit2019card = document.querySelector('#profit2019')
// const businesValution = document.querySelector('#businessValuation')

fetch(`http://localhost:3000/businesses/${businessId}`)
    .then(handleResponse)
    .then(renderCards)

function renderCards(business) {
    ownerName.textContent = `${business.first_name} ${business.last_name}`

    business.financials.map(financial => {
        if (financial.year === '2019') {
            let revenue2019sum = financial.sales_revenue + financial.service_revenue
            let expenses2019sum = financial.advertising + financial.cogs + financial.employee_benefits + financial.equipment + financial.insurance + financial.maintenance + financial.office_supplies + financial.rent + financial.r_and_d + financial.salaries + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense + financial.interest + financial.taxes + financial.ammoritization + financial.depreciation
            let ebita2019sum = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense
            let profit2019sum = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation
            let valuation = ebita2019sum * 3.5
            let arr = Object.values(financial)
            let arr2 = arr.splice(4, 19)
            let max = Math.max(...arr2)

            revenue2019card.textContent = `$${revenue2019sum}`
            expenses2019card.textContent = `$${expenses2019sum}`
            ebita2019card.textContent = `$${ebita2019sum}`
            profit2019card.textContent = `$${profit2019sum}`
            businessValuation.textContent = `$${valuation}`
            valuationText.textContent = `We value your business at $${valuation}, 3.5x your 2019 EBITA. But remember, ${business.first_name}, you are your company's greatest asset so keep working hard!`
            sellBusiness.textContent = `It's a buyer's market right now. A Main Street agent will contact you shortly at ${business.business_phone}.`
            hireHelp.innerHTML = `<a href='https://www.ziprecruiter.com'>ZipRecruiter</a>`
            highestExpense.textContent = `$${max}`
            highestText.textContent = `placeholder`
        }
    })
}

fetch(`http://localhost:3000/businesses/${businessId}`)
    .then(handleResponse)
    .then(drawChart)

function drawChart(business){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        if (business.financials.length >=2) {
            let year1 = business.financials[0].year
            let year2 = business.financials[1].year
            let revenueYear1 = business.financials[0].sales_revenue + business.financials[0].service_revenue
            let revenueYear2 = business.financials[1].sales_revenue + business.financials[1].service_revenue
            let expensesYear1 = business.financials[0].advertising
            let expensesYear2 = business.financials[1].advertising
            let profitYear1 = business.financials[0].cogs
            let profitYear2 = business.financials[1].cogs

        var data = google.visualization.arrayToDataTable([
            ['Year',    'Sales',        'Expenses',     'Profit'],
            [year1,    revenueYear1,   expensesYear1,   profitYear1],  
            [year2,    revenueYear2,   expensesYear2,   profitYear2]
        ]);

        var options = {
            chart: {
            title: 'Last Two Years of Company Performance',
            subtitle: `Sales, Expenses, and Profit: ${year2}-${year1}`,
            }
        };

            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }
}

const revenue2019incomeStatement = document.querySelector('#revenue2019income')
const expense2019incomeStatement = document.querySelector('#expense2019income')
const ebita2019incomeStatement = document.querySelector('#ebita2019income')
const profit2019incomeStatement = document.querySelector('#profit2019income')

const revenue2018incomeStatement = document.querySelector('#revenue2018income')
const expense2018incomeStatement = document.querySelector('#expense2018income')
const ebita2018incomeStatement = document.querySelector('#ebita2018income')
const profit2018incomeStatement = document.querySelector('#profit2018income')

const revenue2017incomeStatement = document.querySelector('#revenue2017income')
const expense2017incomeStatement = document.querySelector('#expense2017income')
const ebita2017incomeStatement = document.querySelector('#ebita2017income')
const profit2017incomeStatement = document.querySelector('#profit2017income')

fetch(`http://localhost:3000/businesses/${businessId}`)
    .then(handleResponse)
    .then(renderIncomeStatement)

function renderIncomeStatement(business) {
    business.financials.map(financial => {
        if (financial.year === '2019') {
            let revenue2019income = financial.sales_revenue + financial.service_revenue
            let expense2019income = financial.advertising + financial.cogs + financial.employee_benefits + financial.equipment + financial.insurance + financial.maintenance + financial.office_supplies + financial.rent + financial.r_and_d + financial.salaries + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense + financial.interest + financial.taxes + financial.ammoritization + financial.depreciation
            let ebita2019income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense
            let profit2019income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation

            revenue2019incomeStatement.textContent = `$${revenue2019income}`
            expense2019incomeStatement.textContent = `$${expense2019income}`
            ebita2019incomeStatement.textContent = `$${ebita2019income}`
            profit2019incomeStatement.textContent = `$${profit2019income}`
        }
        if (financial.year === '2018') {
            let revenue2018income = financial.sales_revenue + financial.service_revenue
            let expense2018income = financial.advertising + financial.cogs + financial.employee_benefits + financial.equipment + financial.insurance + financial.maintenance + financial.office_supplies + financial.rent + financial.r_and_d + financial.salaries + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense + financial.interest + financial.taxes + financial.ammoritization + financial.depreciation
            let ebita2018income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense
            let profit2018income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation

            revenue2018incomeStatement.textContent = `$${revenue2018income}`
            expense2018incomeStatement.textContent = `$${expense2018income}`
            ebita2018incomeStatement.textContent = `$${ebita2018income}`
            profit2018incomeStatement.textContent = `$${profit2018income}`
        }
        if (financial.year === '2017') {
            let revenue2017income = financial.sales_revenue + financial.service_revenue
            let expense2017income = financial.advertising + financial.cogs + financial.employee_benefits + financial.equipment + financial.insurance + financial.maintenance + financial.office_supplies + financial.rent + financial.r_and_d + financial.salaries + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense + financial.interest + financial.taxes + financial.ammoritization + financial.depreciation
            let ebita2017income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense
            let profit2017income = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation

            revenue2017incomeStatement.textContent = `$${revenue2017income}`
            expense2017incomeStatement.textContent = `$${expense2017income}`
            ebita2017incomeStatement.textContent = `$${ebita2017income}`
            profit2017incomeStatement.textContent = `$${profit2017income}`
        }
    })
}

function handleResponse(response){
    return response.json()
}

const valuationModal = document.querySelector("#valuationModal");
const valuationBtn = document.querySelector("#valuationBtn");

const sellModal = document.querySelector("#sellModal");
const sellBtn = document.querySelector("#sellBtn");

const hireBtn = document.querySelector("#hireBtn");
const hireModal = document.querySelector("#hireModal");

const highestBtn = document.querySelector("#highestBtn");
const highestModal = document.querySelector("#highestModal");

const span = document.getElementsByClassName("close")[0];

valuationBtn.onclick = function() {
    valuationModal.style.display = "block";
}

sellBtn.onclick = function() {
    sellModal.style.display = "block";
}

hireBtn.onclick = function() {
    hireModal.style.display = "block";
}

highestBtn.onclick = function() {
    highestModal.style.display = "block";
}

span.onclick = function() {
    valuationModal.style.display = "none";
    sellModal.style.display = "none";
    hireModal.style.display = "none";
    highestModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == valuationModal) {
        valuationModal.style.display = "none";
    }
    if (event.target == sellModal) {
        sellModal.style.display = "none";
    }
    if (event.target == hireModal) {
        hireModal.style.display = "none";
    }
    if (event.target == highestModal) {
        highestModal.style.display = "none";
    }
}