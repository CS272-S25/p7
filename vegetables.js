document.addEventListener("DOMContentLoaded", () => {
    const vegetables = [
        { name: "Broccoli", price: 1.25, img: "images/broccoli.jpg", description: "Crunchy and nutrient-packed green veggie." },
        { name: "Carrots", price: 0.80, img: "images/carrots.jpg", description: "Bright orange and great for eyesight." },
        { name: "Cauliflower", price: 1.40, img: "images/cauliflower.jpg", description: "White florets, perfect for roasting or rice." },
        { name: "Cherry Tomatoes", price: 2.20, img: "images/cherryTomatoes.jpg", description: "Juicy red bites perfect for snacking or salads." },
        { name: "Cucumbers", price: 1.00, img: "images/cucumber.jpeg", description: "Cool, crisp, and refreshing slices of green." },
        { name: "Red Bell Peppers", price: 1.30, img: "images/redBellPeppers.png", description: "Sweet and crunchy with vivid red color." },
        { name: "Green Beans", price: 1.00, img: "images/greenBeans.jpg", description: "Perfectly snappy and delicious steamed or roasted." },
        { name: "Spinach", price: 2.20, img: "images/spinach.jpg", description: "Leafy green rich in iron and nutrients." },
        { name: "Sweet Corn", price: 1.60, img: "images/sweetCorn.jpg", description: "Golden kernels that scream summer sweetness." },
        { name: "Zucchini", price: 1.15, img: "images/zucchini.jpg", description: "Versatile squash for grilling, sautéing, or baking." }
    ];

    const vegetableList = document.getElementById("vegetable-list");

    vegetables.forEach(vegetable => {
        const safeId = vegetable.name.replace(/\s+/g, "-");

        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";
        card.innerHTML = `
            <div class="card h-100 p-3 d-flex flex-column">
                <img src="${vegetable.img}" class="card-img-top mb-2" alt="${vegetable.name}">
                <h3>${vegetable.name}</h3>
                <p>${vegetable.description}</p>

                <div class="mt-auto">
                    <label class="form-label mb-1" for="qty-${safeId}">
                        Already in cart: <span id="qty-display-qty-${safeId}">0</span> × $${vegetable.price.toFixed(2)} =
                        $<span id="total-display-${safeId}">0.00</span>
                    </label>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span>Quantity:</span>
                        <input
                            type="number"
                            id="qty-${safeId}"
                            data-name="${vegetable.name}"
                            class="form-control item-qty"
                            min="1"
                            value="1"
                            style="max-width: 100px;">
                    </div>

                    <small id="qty-error-qty-${safeId}" class="text-danger d-none">Quantity must be greater than 0</small>

                    <button
                        class="btn btn-success w-100 mb-2 add-to-cart"
                        data-name="${vegetable.name}"
                        data-price="${vegetable.price}">
                        Add to Cart ($${vegetable.price.toFixed(2)})
                    </button>

                    <button
                        class="btn btn-danger w-100 remove-from-cart"
                        data-name="${vegetable.name}"
                        data-price="${vegetable.price}">
                        Remove from Cart
                    </button>
                </div>
            </div>
        `;
        vegetableList.appendChild(card);
    });

    // After cards are added, initialize cart functionality
    if (typeof initializeCart === "function") {
        initializeCart();
    }
});
