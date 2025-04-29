document.addEventListener("DOMContentLoaded", () => {
    const meats = [
        { name: "Beef", price: 5.00, img: "images/beef.webp", description: "Rich and hearty cuts for grilling or roasting." },
        { name: "Pork", price: 4.00, img: "images/pork.jpg", description: "Flavorful cuts perfect for roasting and barbecues." },
        { name: "Lamb", price: 10.00, img: "images/lamb.jpeg", description: "Tender and flavorful for special meals." },
        { name: "Chicken", price: 9.50, img: "images/chicken.webp", description: "Versatile and perfect for many dishes." },
        { name: "Turkey", price: 28.50, img: "images/turkey.jpeg", description: "Lean and flavorful option for roasts and sandwiches." }
    ];

    const meatList = document.getElementById("meat-list");

    meats.forEach(meat => {
        const safeId = meat.name.replace(/\s+/g, "-");

        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";

        card.innerHTML = `
            <div class="card h-100 p-3 d-flex flex-column">
                <img src="${meat.img}" class="card-img-top mb-2" alt="${meat.name}">
                <h3>${meat.name} ${meat.name === "Chicken" || meat.name === "Turkey" ? "(Full)" : "(1lb)"}</h3>
                <p>${meat.description}</p>

                <div class="mt-auto">
                    <label class="form-label mb-1" for="qty-${safeId}">
                        Already in cart: <span id="qty-display-qty-${safeId}">0</span> × $${meat.price.toFixed(2)} =
                        $<span id="total-display-${safeId}">0.00</span>
                    </label>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span>Quantity:</span>
                        <input
                            type="number"
                            id="qty-${safeId}"
                            data-name="${meat.name}"
                            class="form-control item-qty"
                            min="1"
                            value="1"
                            style="max-width: 100px;">
                    </div>

                    <small id="qty-error-qty-${safeId}" class="text-danger d-none">Quantity must be greater than 0</small>

                    <button
                        class="btn btn-success w-100 mb-2 add-to-cart"
                        data-name="${meat.name}"
                        data-price="${meat.price}">
                        Add to Cart ($${meat.price.toFixed(2)})
                    </button>

                    <button
                        class="btn btn-danger w-100 remove-from-cart"
                        data-name="${meat.name}"
                        data-price="${meat.price}">
                        Remove from Cart
                    </button>
                </div>
            </div>
        `;

        meatList.appendChild(card);
    });

    if (typeof initializeCart === "function") {
        initializeCart();
    }
});
