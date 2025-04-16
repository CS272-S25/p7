const cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () =>
{
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button =>
    {
        button.addEventListener("click", () =>
        {
            const itemName = button.getAttribute("data-name");
            const qtyInput = button.closest(".card").querySelector(".item-qty");
            const quantity = parseInt(qtyInput?.value) || 1;

            cart.push({name: itemName, quantity});
            localStorage.setItem("cart", JSON.stringify(cart));

            console.log(`${itemName} x${quantity} added to cart.`);
            console.log("Current cart:", cart);
        });
    });
});

document.addEventListener("DOMContentLoaded", () =>
{
    const qtyInputs = document.querySelectorAll(".item-qty");

    qtyInputs.forEach(input =>
    {
        input.addEventListener("input", () =>
        {
            const id = input.id;
            const displaySpan = document.getElementById("qty-display-" + id);
            if (displaySpan)
            {
                displaySpan.textContent = input.value;
            }
        });
    });
});

