const ownerName = document.querySelector('#ownerName')
const businessName = document.querySelector('#businessName')
const expenses2019card = document.querySelector('#expense2019')
const revenue2019card = document.querySelector('#revenue2019')
const ebita2019card = document.querySelector(`#ebita2019`)
const profit2019card = document.querySelector('#profit2019')

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

    business.financials.map(financial => {
        if (financial.year === '2019') {
            let revenue2019sum = financial.sales_revenue + financial.service_revenue
            let expenses2019sum = financial.advertising + financial.cogs + financial.employee_benefits + financial.equipment + financial.insurance + financial.maintenance + financial.office_supplies + financial.rent + financial.r_and_d + financial.salaries + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense
            let ebita2019sum = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense
            let profit2019sum = financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation
            
            if (ebita2019sum <250000) {
                valuation = `${ebita2019sum * 2} - $${ebita2019sum * 3}`
                offer = ebita2019sum * 3.5
            } else {
                valuation = `${ebita2019sum * 3} - $${ebita2019sum * 4}`
                offer = ebita2019sum * 4.5
            }

            let arr = Object.values(financial)
            let arr2 = arr.splice(4, 19)
            let max = Math.max(...arr2)

            revenue2019card.textContent = `$${revenue2019sum}`
            expenses2019card.textContent = `$${expenses2019sum}`
            ebita2019card.textContent = `$${ebita2019sum}`
            profit2019card.textContent = `$${profit2019sum}`
            businessValuation.textContent = `$${valuation}`

            if (ebita2019sum <250000) {
                valuationText.textContent = `Seeing ${business.business_name} had less than $250k in EBITA, Main Street values your business between: $${valuation}, ~2-3x your 2019 EBITA.`
            } else {
                valuationText.textContent = `Seeing ${business.business_name} more than $250k in EBITA, Main Street values your business between: $${valuation}, ~3-4x your 2019 EBITA.`
            }

            if (ebita2019sum <250000) {
                sellBusiness.textContent = `Main Street is prepared to solicit ${business.business_name} an offer of: $${offer}, 3.5x your last year's EBITA. This offer is non-binding. A Main Street agent will contact you shortly at ${business.business_phone}.`
            } else {
                sellBusiness.textContent = `Main Street is prepared to solicit ${business.business_name} an offer of: $${offer}, 4.5x your last year's EBITA. This offer is non-binding. A Main Street agent will contact you shortly at ${business.business_phone}.`
            }

            hireHelp.innerHTML = `<a href='https://www.ziprecruiter.com'>ZipRecruiter</a>`
            highestExpense.textContent = `$${max}`
            highestText.textContent = `Review Income Statement to try to reduce this cost.`
        }
    })
})

fetch(profileURL, {headers})
    .then(handleResponse)
    .then(drawChart)

function drawChart(business){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        if (business.financials.length >=2) {

            let year1 = business.financials[0].year
            let year2 = business.financials[1].year
            let year3 = business.financials[2].year

            let revenueYear1 = business.financials[0].sales_revenue + business.financials[0].service_revenue
            let revenueYear2 = business.financials[1].sales_revenue + business.financials[1].service_revenue
            let revenueYear3 = business.financials[2].sales_revenue + business.financials[2].service_revenue
            
            let expensesYear1 = business.financials[0].advertising + business.financials[0].cogs + business.financials[0].employee_benefits + business.financials[0].equipment + business.financials[0].insurance + business.financials[0].maintenance + business.financials[0].office_supplies + business.financials[0].rent + business.financials[0].r_and_d + business.financials[0].salaries + business.financials[0].software + business.financials[0].travel + business.financials[0].utilities + business.financials[0].website + business.financials[0].other_expense + business.financials[0].interest + business.financials[0].taxes + business.financials[0].ammoritization + business.financials[0].depreciation
            let expensesYear2 = business.financials[0].advertising + business.financials[1].cogs + business.financials[1].employee_benefits + business.financials[1].equipment + business.financials[1].insurance + business.financials[1].maintenance + business.financials[1].office_supplies + business.financials[1].rent + business.financials[1].r_and_d + business.financials[1].salaries + business.financials[1].software + business.financials[1].travel + business.financials[1].utilities + business.financials[1].website + business.financials[1].other_expense + business.financials[1].interest + business.financials[1].taxes + business.financials[1].ammoritization + business.financials[1].depreciation
            let expensesYear3 = business.financials[0].advertising + business.financials[2].cogs + business.financials[2].employee_benefits + business.financials[2].equipment + business.financials[2].insurance + business.financials[2].maintenance + business.financials[2].office_supplies + business.financials[2].rent + business.financials[2].r_and_d + business.financials[2].salaries + business.financials[2].software + business.financials[2].travel + business.financials[2].utilities + business.financials[2].website + business.financials[2].other_expense + business.financials[2].interest + business.financials[2].taxes + business.financials[2].ammoritization + business.financials[2].depreciation

            let profitYear1 = revenueYear1 - expensesYear1
            let profitYear2 = revenueYear2 - expensesYear2
            let profitYear3 = revenueYear3 - expensesYear3

            var data = google.visualization.arrayToDataTable([
            ['Year',   'Total Revenue',   'Total Expenses',     'Net Profit'],
            [year1,    revenueYear1,        expensesYear1,      profitYear1],  
            [year2,    revenueYear2,        expensesYear2,      profitYear2],
            [year3,    revenueYear3,        expensesYear3,      profitYear3]
        ]);
        var options = {
            chart: {
            title: 'Last Three Years of Company Performance',
            subtitle: `Sales, Expenses, and Profit: ${year3}-${year1}`,
            }, 
            hAxis: {
                title: 'Year',
                titleTextStyle: {
                color: "#000",
                fontName: "sans-serif",
                fontSize: 22,
                bold: true,
                italic: false
                }
            },
            vAxis: {
                title: 'Amount',
                titleTextStyle: {
                color: "#000",
                fontName: "sans-serif",
                fontSize: 22,
                bold: true,
                italic: false
                }
            },
            annotations: {
                alwaysOutside: true,
                textStyle: {
                fontSize: 22,
                auraColor: 'none'
                }
            }
        };
            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }
}

fetch(profileURL, {headers})
    .then(handleResponse)
    .then(drawPieChart)

function drawPieChart(business){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawPieChart);

    function drawPieChart() {
        let expensesPieChart = (business.financials[0].cogs + business.financials[0].employee_benefits + business.financials[0].equipment + business.financials[0].insurance + business.financials[0].maintenance + business.financials[0].office_supplies + business.financials[0].rent + business.financials[0].r_and_d + business.financials[0].salaries + business.financials[0].software + business.financials[0].travel + business.financials[0].utilities + business.financials[0].website + business.financials[0].other_expense + business.financials[0].interest + business.financials[0].taxes + business.financials[0].ammoritization + business.financials[0].depreciation)
        let cogsPieChart = (business.financials[0].cogs) / (expensesPieChart)
        let benefitsPieChart = (business.financials[0].employee_benefits) / (expensesPieChart)
        let equipmentPieChart = (business.financials[0].equipment) / (expensesPieChart)
        let insurancePieChart = (business.financials[0].insurance) / (expensesPieChart)
        let maintenancePieChart = (business.financials[0].maintenance) / (expensesPieChart)
        let rentPieChart = (business.financials[0].rent) / (expensesPieChart)
        let salariesPieChart = (business.financials[0].salaries) / (expensesPieChart)
        let remainingPieChart = (business.financials[0].office_supplies + business.financials[0].r_and_d + business.financials[0].software + business.financials[0].travel + business.financials[0].utilities + business.financials[0].website + business.financials[0].other_expense) / (expensesPieChart)

        var data = google.visualization.arrayToDataTable([

        ['Expense',             'Type'],
        ['COGs',                cogsPieChart],
        ['Employee Benefits',   benefitsPieChart],
        ['Equipment',           equipmentPieChart],
        ['Insurance',           insurancePieChart],
        ['Maintenance',         maintenancePieChart],
        ['Rent',                rentPieChart],
        ['Salares',             salariesPieChart],
        ['Remaining Op Ex',     remainingPieChart]
        ]);

        var options = {
        title: '2019 Distribution of Operating Expeneses',
        is3D: true,
        titleFontSize: 28,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }
}

const revenue2019incomeStatement = document.querySelector('#revenue2019incomeStatement')
const revenue2018incomeStatement = document.querySelector('#revenue2018incomeStatement')
const revenue2017incomeStatement = document.querySelector('#revenue2017incomeStatement')

const cogs2019incomeStatement = document.querySelector('#cogs2019incomeStatement')
const cogs2018incomeStatement = document.querySelector('#cogs2018incomeStatement')
const cogs2017incomeStatement = document.querySelector('#cogs2017incomeStatement')

const employeeBenefits2019incomeStatement = document.querySelector('#employeeBenefits2019incomeStatement')
const employeeBenefits2018incomeStatement = document.querySelector('#employeeBenefits2018incomeStatement')
const employeeBenefits2017incomeStatement = document.querySelector('#employeeBenefits2017incomeStatement')

const equipment2019incomeStatement = document.querySelector('#equipment2019incomeStatement')
const equipment2018incomeStatement = document.querySelector('#equipment2018incomeStatement')
const equipment2017incomeStatement = document.querySelector('#equipment2017incomeStatement')

const insurance2019incomeStatement = document.querySelector('#insurance2019incomeStatement')
const insurance2018incomeStatement = document.querySelector('#insurance2018incomeStatement')
const insurance2017incomeStatement = document.querySelector('#insurance2017incomeStatement')

const maintenance2019incomeStatement = document.querySelector('#maintenance2019incomeStatement')
const maintenance2018incomeStatement = document.querySelector('#maintenance2018incomeStatement')
const maintenance2017incomeStatement = document.querySelector('#maintenance2017incomeStatement')

const rent2019incomeStatement = document.querySelector('#rent2019incomeStatement')
const rent2018incomeStatement = document.querySelector('#rent2018incomeStatement')
const rent2017incomeStatement = document.querySelector('#rent2017incomeStatement')

const salaries2019incomeStatement = document.querySelector('#salaries2019incomeStatement')
const salaries2018incomeStatement = document.querySelector('#salaries2018incomeStatement')
const salaries2017incomeStatement = document.querySelector('#salaries2017incomeStatement')

const otherExpenses2019incomeStatement = document.querySelector('#otherExpenses2019incomeStatement')
const otherExpenses2018incomeStatement = document.querySelector('#otherExpenses2018incomeStatement')
const otherExpenses2017incomeStatement = document.querySelector('#otherExpenses2017incomeStatement')

const ebita2019incomeStatement = document.querySelector('#ebita2019incomeStatement')
const ebita2018incomeStatement = document.querySelector('#ebita2018incomeStatement')
const ebita2017incomeStatement = document.querySelector('#ebita2017incomeStatement')

const interest2019incomeStatement = document.querySelector('#interest2019incomeStatement')
const interest2018incomeStatement = document.querySelector('#interest2018incomeStatement')
const interest2017incomeStatement = document.querySelector('#interest2017incomeStatement')

const taxes2019incomeStatement = document.querySelector('#taxes2019incomeStatement')
const taxes2018incomeStatement = document.querySelector('#taxes2018incomeStatement')
const taxes2017incomeStatement = document.querySelector('#taxes2017incomeStatement')

const ammoritzation2019incomeStatement = document.querySelector('#ammoritzation2019incomeStatement')
const ammoritzation2018incomeStatement = document.querySelector('#ammoritzation2018incomeStatement')
const ammoritzation2017incomeStatement = document.querySelector('#ammoritzation2017incomeStatement')

const depreciation2019incomeStatement = document.querySelector('#depreciation2019incomeStatement')
const depreciation2018incomeStatement = document.querySelector('#depreciation2018incomeStatement')
const depreciation2017incomeStatement = document.querySelector('#depreciation2017incomeStatement')

const profit2019incomeStatement = document.querySelector('#profit2019incomeStatement')
const profit2018incomeStatement = document.querySelector('#profit2018incomeStatement')
const profit2017incomeStatement = document.querySelector('#profit2017incomeStatement')

fetch(profileURL, {headers})
    .then(handleResponse)
    .then(renderIncomeStatement)

function renderIncomeStatement(business) {
    business.financials.map(financial => {
        if (financial.year === '2019') {
            revenue2019incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue}`
            cogs2019incomeStatement.textContent = `$${financial.cogs}`
            employeeBenefits2019incomeStatement.textContent = `$${financial.employee_benefits}`
            equipment2019incomeStatement.textContent = `$${financial.equipment}`
            insurance2019incomeStatement.textContent = `$${financial.insurance}`
            maintenance2019incomeStatement.textContent = `$${financial.maintenance}`
            rent2019incomeStatement.textContent = `$${financial.rent}`
            salaries2019incomeStatement.textContent = `$${financial.salaries}`
            otherExpenses2019incomeStatement.textContent = `$${financial.office_supplies + financial.r_and_d + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense}`
            ebita2019incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense}`
            interest2019incomeStatement.textContent = `$${financial.interest}`
            taxes2019incomeStatement.textContent = `$${financial.taxes}`
            ammoritzation2019incomeStatement.textContent = `$${financial.ammoritization}`
            depreciation2019incomeStatement.textContent = `$${financial.depreciation}`
            profit2019incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation}`
        }
        if (financial.year === '2018') {
            revenue2018incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue}`
            cogs2018incomeStatement.textContent = `$${financial.cogs}`
            employeeBenefits2018incomeStatement.textContent = `$${financial.employee_benefits}`
            equipment2018incomeStatement.textContent = `$${financial.equipment}`
            insurance2018incomeStatement.textContent = `$${financial.insurance}`
            maintenance2018incomeStatement.textContent = `$${financial.maintenance}`
            rent2018incomeStatement.textContent = `$${financial.rent}`
            salaries2018incomeStatement.textContent = `$${financial.salaries}`
            otherExpenses2018incomeStatement.textContent = `$${financial.office_supplies + financial.r_and_d + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense}`
            ebita2018incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense}`
            interest2018incomeStatement.textContent = `$${financial.interest}`
            taxes2018incomeStatement.textContent = `$${financial.taxes}`
            ammoritzation2018incomeStatement.textContent = `$${financial.ammoritization}`
            depreciation2018incomeStatement.textContent = `$${financial.depreciation}`
            profit2018incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation}`
        }
        if (financial.year === '2017') {
            revenue2017incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue}`
            cogs2017incomeStatement.textContent = `$${financial.cogs}`
            employeeBenefits2017incomeStatement.textContent = `$${financial.employee_benefits}`
            equipment2017incomeStatement.textContent = `$${financial.equipment}`
            insurance2017incomeStatement.textContent = `$${financial.insurance}`
            maintenance2017incomeStatement.textContent = `$${financial.maintenance}`
            rent2017incomeStatement.textContent = `$${financial.rent}`
            salaries2017incomeStatement.textContent = `$${financial.salaries}`
            otherExpenses2017incomeStatement.textContent = `$${financial.office_supplies + financial.r_and_d + financial.software + financial.travel + financial.utilities + financial.website + financial.other_expense}`
            ebita2017incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense}`
            interest2017incomeStatement.textContent = `$${financial.interest}`
            taxes2017incomeStatement.textContent = `$${financial.taxes}`
            ammoritzation2017incomeStatement.textContent = `$${financial.ammoritization}`
            depreciation2017incomeStatement.textContent = `$${financial.depreciation}`
            profit2017incomeStatement.textContent = `$${financial.sales_revenue + financial.service_revenue - financial.advertising - financial.cogs - financial.employee_benefits - financial.equipment - financial.insurance - financial.maintenance - financial.office_supplies - financial.rent - financial.r_and_d - financial.salaries - financial.software - financial.travel - financial.utilities - financial.website - financial.other_expense - financial.interest - financial.taxes - financial.ammoritization - financial.depreciation}`
        }
    })
}

const revenueModal = document.querySelector("#revenueModal");
const revenueBtn = document.querySelector("#revenueBtn");

const expensesModal = document.querySelector("#expensesModal");
const expensesBtn = document.querySelector("#expensesBtn");

const ebitaBtn = document.querySelector("#ebitaBtn");
const ebitaModal = document.querySelector("#ebitaModal");

const profitBtn = document.querySelector("#profitBtn");
const profitModal = document.querySelector("#profitModal");

const valuationModal = document.querySelector("#valuationModal");
const valuationBtn = document.querySelector("#valuationBtn");

const sellModal = document.querySelector("#sellModal");
const sellBtn = document.querySelector("#sellBtn");

const hireBtn = document.querySelector("#hireBtn");
const hireModal = document.querySelector("#hireModal");

const highestBtn = document.querySelector("#highestBtn");
const highestModal = document.querySelector("#highestModal");

const span = document.getElementsByClassName("close")[0];

revenueBtn.onclick = function() {
    revenueModal.style.display = "block";
}

expensesBtn.onclick = function() {
    expensesModal.style.display = "block";
}

ebitaBtn.onclick = function() {
    ebitaModal.style.display = "block";
}

profitBtn.onclick = function() {
    profitModal.style.display = "block";
}

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
    revenueModal.style.display = "none";
    expensesModal.style.display = "none";
    ebitaModal.style.display = "none";
    profitModal.style.display = "none";
}

span.onclick = function() {
    valuationModal.style.display = "none";
    sellModal.style.display = "none";
    hireModal.style.display = "none";
    highestModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == revenueModal) {
        revenueModal.style.display = "none";
    }
    if (event.target == expensesModal) {
        expensesModal.style.display = "none";
    }
    if (event.target == ebitaModal) {
        ebitaModal.style.display = "none";
    }
    if (event.target == profitModal) {
        profitModal.style.display = "none";
    }
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

function handleResponse(response){
    return response.json()
}

const logoutButton = document.querySelector('#logoutButton')
logoutButton.addEventListener('click', logoutApp)

function logoutApp(event) {
    localStorage.clear()
    window.location.href = '/index.html'
}