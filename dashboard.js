const searchParams = new URLSearchParams(window.location.search)
const businessId = searchParams.get('business.id')

fetch(`http://localhost:3000/businesses/${businessId}`)
    .then(handleResponse)
    .then(drawChart)

function drawChart(business){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        if (business.financials.length >=2) {
        var data = google.visualization.arrayToDataTable([
            [       'Year',                                 'Sales',                            'Expenses'],
            [business.financials[0].year,    business.financials[0].sales_revenue,   business.financials[0].taxes],
            [business.financials[1].year,    business.financials[1].sales_revenue,   business.financials[1].taxes],
    ]);


    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
        };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
    }}
    business.financials.map(displayFinancial)
}

function displayFinancial(financial) {
    if (financial.year === '2019') {
        const sales = document.createElement('p')
        const taxes = document.createElement('p')
        sales.textContent = `Total Revenue: ${financial.sales_revenue + financial.service_revenue}`
        taxes.textContent = `Taxes: ${financial.taxes}`
    
        document.body.append(sales, taxes)
    }
}

function handleResponse(response){
    return response.json()
}