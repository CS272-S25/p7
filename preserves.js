document.addEventListener("DOMContentLoaded", () => {
    const preserves = [
        { name: "Strawberry Jam", price: 3.50, img: "images/strawberryJam.jpeg", description: "Classic sweet jam made from fresh strawberries." },
        { name: "Blueberry Jam", price: 3.75, img: "images/blueberryJam.jpeg", description: "Sweet and tart, perfect for toast and muffins." },
        { name: "Peach Preserve", price: 4.00, img: "images/peachPreserves.jpeg", description: "Chunks of sweet peaches preserved to perfection." },
        { name: "Raspberry Preserve", price: 4.25, img: "images/rasberryPreserves.jpeg", description: "Bright and flavorful preserve with a tart kick." },
        { name: "Apricot Jam", price: 3.80, img: "images/apricotJam.webp", description: "Sweet and tangy jam made from ripe apricots." }
    ];

    const preserveList = document.getElementById("preserves-list");

    preserves.forEach(preserve => {
        const safeId = preserve.name.replace(/\s+/g, "-");

        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";

        card.innerHTML = `
            <div class="card h-100 p-3 d-flex flex-column">
                <img src="${preserve.img}" class="card-img-top mb-2" alt="${preserve.name}">
                <h3>${preserve.name}</h3>
                <p>${preserve.description}</p>

                <div class="mt-auto">
                    <label class="form-label mb-1" for="qty-${safeId}">
                        Already in cart: <span id="qty-display-qty-${safeId}">0</span> × $${preserve.price.toFixed(2)} =
                        $<span id="total-display-${safeId}">0.00</span>
                    </label>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span>Quantity:</span>
                        <input
                            type="number"
                            id="qty-${safeId}"
                            data-name="${preserve.name}"
                            class="form-control item-qty"
                            min="1"
                            value="1"
                            style="max-width: 100px;">
                    </div>

                    <small id="qty-error-qty-${safeId}" class="text-danger d-none">Quantity must be greater than 0</small>

                    <button
                        class="btn btn-success w-100 mb-2 add-to-cart"
                        data-name="${preserve.name}"
                        data-price="${preserve.price}">
                        Add to Cart ($${preserve.price.toFixed(2)})
                    </button>

                    <button
                        class="btn btn-danger w-100 remove-from-cart"
                        data-name="${preserve.name}"
                        data-price="${preserve.price}">
                        Remove from Cart
                    </button>
                </div>
            </div>
        `;

        preserveList.appendChild(card);
    });

    // Re-attach cart logic after items are inserted
    if (typeof initializeCart === "function") {
        initializeCart();
    }
});
