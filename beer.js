// Define the API URL
const apiUrl = 'https://api.punkapi.com/v2/beers?beer_name=ipa';

// Function to fetch and render beers
function fetchAndRenderBeers() {
    $.get(apiUrl, function (data) {
        // Store the list of beers for future reference
        const beers = data;

        // Render the table
        const tableBody = $('#tbl1');
        tableBody.empty();

        beers.forEach(beer => {
            const row = $('<tr>');
            row.append(`<td>${beer.name}</td>`);
            row.append(`<td>${beer.tagline}</td>`);
            row.append(`<td>${beer.abv}</td>`);
            row.append(`<td>${beer.ibu}</td>`);
            tableBody.append(row);
        });
    });
}

// Function to filter beers by ABV
function filterBeersByABV(abvThreshold) {
    const tableRows = $('#tbl1 tr');
    tableRows.each(function () {
        const abvValue = parseFloat($(this).find('td:nth-child(3)').text());
        if (isNaN(abvValue) || abvValue < abvThreshold) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

// Load beers when the page initially loads
fetchAndRenderBeers();

// Attach a click event handler to the "Show only beers with ABV above" button
$('#abv-btn').click(function () {
    const abvThreshold = parseFloat($('#filter-abv').val());
    if (!isNaN(abvThreshold)) {
        filterBeersByABV(abvThreshold);
    }
});
