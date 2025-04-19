/**
 * Shopping cart management script
 * Handles cart initialization, item quantity validation, and updates to the UI
 * Cart data is persisted in localStorage as a JSON string
 */

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function toSafeId(name)
{
    return name.replace(/\s+/g, "-");
}

document.addEventListener("DOMContentLoaded", () =>
{
    const itemCounts = {};
    const itemTotals = {};

    // Tally current cart items
    cart.forEach(item =>
    {
        if (!itemCounts[item.name]) itemCounts[item.name] = 0;
        if (!itemTotals[item.name]) itemTotals[item.name] = 0;

        itemCounts[item.name] += item.quantity;
        itemTotals[item.name] += item.quantity * item.price;
    });

    document.querySelectorAll(".item-qty").forEach(input =>
    {
        const itemName = input.getAttribute("data-name");
        const safeId = toSafeId(itemName);
        const displayQty = document.getElementById("qty-display-qty-" + safeId);
        const displayTotal = document.getElementById("total-display-" + safeId);
        const errorMsg = document.getElementById("qty-error-qty-" + safeId);

        // Init quantity & total
        if (displayQty) displayQty.textContent = itemCounts[itemName] || 0;
        if (displayTotal) displayTotal.textContent = (itemTotals[itemName] || 0).toFixed(2);

        input.addEventListener("input", () =>
        {
            const value = parseInt(input.value);
            if (value <= 0 || isNaN(value))
            {
                input.classList.add("border-danger");
                if (errorMsg) errorMsg.classList.remove("d-none");
            }
            else
            {
                input.classList.remove("border-danger");
                if (errorMsg) errorMsg.classList.add("d-none");
            }
        });
    });

    document.querySelectorAll(".add-to-cart").forEach(button =>
    {
        button.addEventListener("click", () =>
        {
            const itemName = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const safeId = toSafeId(itemName);
            const qtyInput = document.getElementById("qty-" + safeId);
            const displayQty = document.getElementById("qty-display-qty-" + safeId);
            const displayTotal = document.getElementById("total-display-" + safeId);
            const quantity = parseInt(qtyInput?.value);

            if (!quantity || quantity <= 0)
            {
                qtyInput.classList.add("border-danger");
                const errorMsg = document.getElementById("qty-error-qty-" + safeId);
                if (errorMsg) errorMsg.classList.remove("d-none");
                return;
            }

            cart.push({name: itemName, quantity, price});
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update display
            const currentQty = parseInt(displayQty?.textContent) || 0;
            const newQty = currentQty + quantity;
            const newTotal = newQty * price;

            if (displayQty) displayQty.textContent = newQty;
            if (displayTotal) displayTotal.textContent = newTotal.toFixed(2);
        });
    });
});
