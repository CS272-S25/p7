const cart = JSON.parse(localStorage.getItem("cart")) || [];

function toSafeId(name)
{
    return name.replace(/\s+/g, "-");
}

document.addEventListener("DOMContentLoaded", () =>
{
    const itemCounts = {};

    // Tally current cart quantities
    cart.forEach(item =>
    {
        if (!itemCounts[item.name])
        {
            itemCounts[item.name] = 0;
        }
        itemCounts[item.name] += item.quantity;
    });

    const qtyInputs = document.querySelectorAll(".item-qty");
    qtyInputs.forEach(input =>
    {
        const id = input.id; // already safe
        const itemName = input.getAttribute("data-name");
        const displaySpan = document.getElementById("qty-display-" + id);
        const errorMsg = document.getElementById("qty-error-" + id);

        // Set initial 'Already in cart' value
        if (displaySpan && itemCounts[itemName])
        {
            displaySpan.textContent = itemCounts[itemName];
        }
        else if (displaySpan)
        {
            displaySpan.textContent = "0";
        }

        // Live validation
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

    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button =>
    {
        button.addEventListener("click", () =>
        {
            const itemName = button.getAttribute("data-name");
            const safeId = toSafeId(itemName);
            const qtyInput = document.getElementById("qty-" + safeId);
            const displaySpan = document.getElementById("qty-display-qty-" + safeId) || document.getElementById("qty-display-" + safeId);
            const quantity = parseInt(qtyInput?.value);

            if (!quantity || quantity <= 0)
            {
                qtyInput.classList.add("border-danger");
                const errorMsg = document.getElementById("qty-error-" + qtyInput.id);
                if (errorMsg) errorMsg.classList.remove("d-none");
                return;
            }

            cart.push({name: itemName, quantity});
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update display
            if (displaySpan)
            {
                const current = parseInt(displaySpan.textContent) || 0;
                displaySpan.textContent = current + quantity;
            }

            console.log(`${itemName} x${quantity} added to cart.`);
        });
    });
});
