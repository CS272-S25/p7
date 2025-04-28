document.addEventListener("DOMContentLoaded", () =>
{
    fetch('competitorPrices.json')
        .then(response => response.json())
        .then(data =>
        {
            const tableBody = document.getElementById('comparison-table');

            data.forEach(item =>
            {
                const row = document.createElement('tr');

                const itemCell = document.createElement('td');
                itemCell.textContent = item.item;

                const ourPriceCell = document.createElement('td');
                ourPriceCell.textContent = `$${item.ourPrice.toFixed(2)}`;

                const competitorPriceCell = document.createElement('td');
                competitorPriceCell.textContent = `$${item.competitorPrice.toFixed(2)}`;

                const betterDealCell = document.createElement('td');
                if (item.ourPrice < item.competitorPrice)
                {
                    betterDealCell.innerHTML = "<span style='color: green;'>Us ✅</span>";
                }
                else if (item.ourPrice > item.competitorPrice)
                {
                    betterDealCell.innerHTML = "<span style='color: red;'>Competitor ❌</span>";
                }
                else
                {
                    betterDealCell.textContent = "Same Price";
                }

                row.appendChild(itemCell);
                row.appendChild(ourPriceCell);
                row.appendChild(competitorPriceCell);
                row.appendChild(betterDealCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error =>
        {
            console.error('Error fetching price comparison data:', error);
        });
});
