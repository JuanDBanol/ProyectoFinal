const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        loginError.textContent = "Todos los campos son obligatorios";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        loginError.textContent = "Formato de correo inválido";
        return;
    }

    loginError.textContent = "";

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "flex";
});


function showDashboard() {
    document.getElementById("homeView").style.display = "block";
    document.getElementById("productsView").style.display = "none";
}

function showProducts() {
    document.getElementById("homeView").style.display = "none";
    document.getElementById("productsView").style.display = "block";
}

function logout() {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}


let products = [];

const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

productForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const stock = document.getElementById("productStock").value;

    if (!name || !price || !stock) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const product = {
        id: Date.now(),
        name,
        price,
        stock
    };

    products.push(product);
    renderProducts();
    productForm.reset();
});

function renderProducts() {
    productTable.innerHTML = "";

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    });

    updateDashboard();
}

function updateDashboard() {
    const totalProducts = products.length;

    const totalStock = products.reduce((acc, product) => {
        return acc + Number(product.stock);
    }, 0);

    const totalValue = products.reduce((acc, product) => {
        return acc + (Number(product.price) * Number(product.stock));
    }, 0);

    document.getElementById("totalProducts").textContent = totalProducts;
    document.getElementById("totalStock").textContent = totalStock;
    document.getElementById("totalValue").textContent = "$" + totalValue.toLocaleString();
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}