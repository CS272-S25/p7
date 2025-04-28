/**
 * Shopping cart management script
 * Handles cart initialization, item quantity validation, and updates to the UI
 * Cart data is persisted in localStorage as a JSON string
 */

document.addEventListener("DOMContentLoaded", () =>
{
    // Retrieve the cart from localStorage or initialize an empty array if not found
    function getCart()
    {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    // Save the updated cart back to localStorage
    function setCart(cart)
    {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Helper to generate safe element IDs by replacing spaces with hyphens
    function toSafeId(name)
    {
        return name.replace(/\s+/g, "-");
    }

    // Objects to keep track of item quantities and totals for display
    const itemCounts = {};
    const itemTotals = {};

    // Load the cart from localStorage
    const cart = getCart();

    // Populate itemCounts and itemTotals based on the cart contents
    cart.forEach(item =>
    {
        if (!itemCounts[item.name]) itemCounts[item.name] = 0;
        if (!itemTotals[item.name]) itemTotals[item.name] = 0;

        itemCounts[item.name] += item.quantity;
        itemTotals[item.name] += item.quantity * item.price;
    });

    // Set up validation and quantity/total display for each quantity input field
    document.querySelectorAll(".item-qty").forEach(input =>
    {
        const itemName = input.getAttribute("data-name");
        const safeId = toSafeId(itemName);
        const displayQty = document.getElementById("qty-display-qty-" + safeId);
        const displayTotal = document.getElementById("total-display-" + safeId);
        const errorMsg = document.getElementById("qty-error-qty-" + safeId);

        // Initialize displayed quantity and total price for the item
        if (displayQty) displayQty.textContent = itemCounts[itemName] || 0;
        if (displayTotal) displayTotal.textContent = (itemTotals[itemName] || 0).toFixed(2);

        // Validate user input on quantity fields
        input.addEventListener("input", () =>
        {
            const value = parseInt(input.value, 10);

            // If the value is invalid (not a positive integer), show error
            if (isNaN(value) || value <= 0)
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

    // Set up click event handlers for all "Add to Cart" buttons
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

            const quantity = parseInt(qtyInput?.value, 10);

            // Validate quantity before proceeding
            if (isNaN(quantity) || quantity <= 0)
            {
                qtyInput?.classList.add("border-danger");
                const errorMsg = document.getElementById("qty-error-qty-" + safeId);
                if (errorMsg) errorMsg.classList.remove("d-none");
                return;
            }

            // Add the item to the cart in localStorage
            const updatedCart = getCart();
            updatedCart.push({name: itemName, quantity, price});
            setCart(updatedCart);

            // Update the displayed quantity and total for the item
            const currentQty = parseInt(displayQty?.textContent, 10) || 0;
            const newQty = currentQty + quantity;
            const newTotal = newQty * price;

            if (displayQty) displayQty.textContent = newQty;
            if (displayTotal) displayTotal.textContent = newTotal.toFixed(2);
        });
    });
});
