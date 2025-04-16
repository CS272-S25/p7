const cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () =>
{
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button =>
    {
        button.addEventListener("click", () =>
        {
            const itemName = button.getAttribute("data-name");
            cart.push(itemName);
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(`${itemName} added to cart.`);
            console.log("Current cart:", cart);
        });
    });
});
