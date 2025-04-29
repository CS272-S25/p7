document.addEventListener("DOMContentLoaded", () => {
    const fruits = [
        {
            name: "Honeycrisp Apples",
            price: 0.50,
            img: "images/honeycrispApples.jpeg",
            description: "Sweet and crunchy apples perfect for snacking and munching."
        },
        {
            name: "Bananas",
            price: 0.50,
            img: "images/bananas.jpg",
            description: "Rich in potassium and perfect for on-the-go busy people."
        },
        {
            name: "Navel Oranges",
            price: 0.75,
            img: "images/navelOranges.webp",
            description: "Juicy and seedless citrus delight."
        },
        {
            name: "Red Seedless Grapes",
            price: 2.25,
            img: "images/redSeedlessGrapes.jpeg",
            description: "Sweet, crisp, and easy to eat."
        },
        {
            name: "Strawberries",
            price: 2.50,
            img: "images/strawberries.webp",
            description: "Bright red berries packed with flavor."
        },
        {
            name: "Blueberries",
            price: 2.00,
            img: "images/blueberries.webp",
            description: "Antioxidant-rich and great in cereal or smoothies."
        },
        {
            name: "Mangoes",
            price: 1.75,
            img: "images/mangoes.jpg",
            description: "Delicious tropical treat with vibrant flavor."
        },
        {
            name: "Cherries",
            price: 2.75,
            img: "images/cherries.webp",
            description: "Perfectly tart and sweet for summer snacking."
        },
        {
            name: "Pineapples",
            price: 3.00,
            img: "images/pineapples.jpeg",
            description: "Sweet, juicy, and packed with vitamin C."
        }
    ];

    const fruitList = document.getElementById("fruit-list");

    fruits.forEach(fruit => {
        const safeId = fruit.name.replace(/\s+/g, "-");

        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";
        card.innerHTML = `
            <div class="card h-100 p-3 d-flex flex-column">
                <img src="${fruit.img}" class="card-img-top mb-2" alt="${fruit.name}">
                <h3>${fruit.name}</h3>
                <p>${fruit.description}</p>

                <div class="mt-auto">
                    <label class="form-label mb-1" for="qty-${safeId}">
                        Already in cart: <span id="qty-display-qty-${safeId}">0</span> × $${fruit.price.toFixed(2)} =
                        $<span id="total-display-${safeId}">0.00</span>
                    </label>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span>Quantity:</span>
                        <input
                            type="number"
                            id="qty-${safeId}"
                            data-name="${fruit.name}"
                            class="form-control item-qty"
                            min="1"
                            value="1"
                            style="max-width: 100px;">
                    </div>

                    <small id="qty-error-qty-${safeId}" class="text-danger d-none">Quantity must be greater than 0</small>

                    <button
                        class="btn btn-success w-100 mb-2 add-to-cart"
                        data-name="${fruit.name}"
                        data-price="${fruit.price}">
                        Add to Cart ($${fruit.price.toFixed(2)})
                    </button>


                    <button
                        class="btn btn-danger w-100 remove-from-cart"
                        data-name="${fruit.name}"
                        data-price="${fruit.price}">
                        Remove from Cart
                    </button>
                </div>
            </div>
        `;
        fruitList.appendChild(card);
    });

    if (typeof initializeCart === "function") {
        initializeCart();
    }
});
