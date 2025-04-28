// Wait until the page content has fully loaded
document.addEventListener("DOMContentLoaded", () =>
{
    // Fetch competitor and our prices from a JSON file
    fetch('competitorPrices.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data =>
        {
            const tableBody = document.getElementById('comparison-table'); // Select the table body where rows will be inserted

            // Loop through each item from the JSON data
            data.forEach(item =>
            {
                const row = document.createElement('tr'); // Create a new table row

                // Create a cell for the item name
                const itemCell = document.createElement('td');
                itemCell.textContent = item.item;

                // Create a cell for our price
                const ourPriceCell = document.createElement('td');
                ourPriceCell.textContent = `$${item.ourPrice.toFixed(2)}`;

                // Create a cell for the competitor's price
                const competitorPriceCell = document.createElement('td');
                competitorPriceCell.textContent = `$${item.competitorPrice.toFixed(2)}`;

                // Create a cell to indicate who has the better deal
                const betterDealCell = document.createElement('td');
                if (item.ourPrice < item.competitorPrice)
                {
                    // Our price is better
                    betterDealCell.innerHTML = "<span style='color: green;'>Us ✅</span>";
                }
                else if (item.ourPrice > item.competitorPrice)
                {
                    // Competitor's price is better
                    betterDealCell.innerHTML = "<span style='color: red;'>Competitor ❌</span>";
                }
                else
                {
                    // Prices are the same
                    betterDealCell.textContent = "Same Price";
                }

                // Append all cells to the row
                row.appendChild(itemCell);
                row.appendChild(ourPriceCell);
                row.appendChild(competitorPriceCell);
                row.appendChild(betterDealCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch(error =>
        {
            // Log any errors that occur during the fetch
            console.error('Error fetching price comparison data:', error);
        });
});
