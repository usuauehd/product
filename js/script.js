const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let buttonMod = "create";
let temp;

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------calculate Total------------------------------------------------
// --------------------------------------------------------------------------------------------------------
function calculateTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value;
    result = result - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#c40d2bc5";
  }
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------create product------------------------------------------------
// --------------------------------------------------------------------------------------------------------

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.addEventListener("click", createProduct);

function createProduct() {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count <= 100
  ) {
    if (buttonMod === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[temp] = newProduct;
      buttonMod = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearInputs();
  } else {
    alert(`
            Error maybe in the title field or price field
            or category field or the count of products is greater than 100
            `);
  }
  localStorage.setItem("product", JSON.stringify(dataProduct));
  showProducts();
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------clear inputs------------------------------------------------
// --------------------------------------------------------------------------------------------------------

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------show products on table-----------------------------------------
// --------------------------------------------------------------------------------------------------------

function showProducts() {
  calculateTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick = "deleteProduct (${i})" id="delete">delete</button></td>
        </tr>
        `;
    document.getElementById("tbody").innerHTML = table;

    let deleteBtn = document.getElementById("delete-all-btn");
    if (dataProduct.length > 0) {
      deleteBtn.innerHTML = `
            <button onclick="deleteAll()">Delete All (${i + 1})</button>
            `;
    } else {
      deleteBtn.innerHTML = "";
    }
  }
}

showProducts();

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------delete one product-----------------------------------------
// --------------------------------------------------------------------------------------------------------

function deleteProduct(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showProducts();
  window.location.reload();
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------delete all product-----------------------------------------
// --------------------------------------------------------------------------------------------------------

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showProducts();
  window.location.reload();
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------Update Product-----------------------------------------
// --------------------------------------------------------------------------------------------------------

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  taxes.value = dataProduct[i].taxes;
  calculateTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";
  buttonMod = "update";
  temp = i;
  scroll({
    top: 0,
  });
}

// --------------------------------------------------------------------------------------------------------
// -----------------------------------------Search By Title And Category-----------------------------------------
// --------------------------------------------------------------------------------------------------------
let sMode = "title";
function getSearchMod(id) {
  const searchInput = document.getElementById("search");
  searchInput.focus();
  if (id == "search-title") {
    sMode = "title";
    searchInput.placeholder = "search by title";
  } else {
    sMode = "category";
    searchInput.placeholder = "search by category";
  }
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (sMode == "title") {
      if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
                            <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteProduct (${i})" id="delete">delete</button></td>
                            </tr>
                        `;
      }
    } else {
      if (dataProduct[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
                            <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteProduct (${i})" id="delete">delete</button></td>
                            </tr>
                        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// -------------------------------------SWITCH-MODE----------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

const switchBtn = document.getElementById("change-btn");
let darkMode = localStorage.getItem("darkmode");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkmode", null);
};

if (darkMode === "active") {
  enableDarkMode();
} else {
  disableDarkMode();
}

switchBtn.addEventListener("click", () => {
  switchBtn.classList.toggle("active");
  darkMode = localStorage.getItem("darkmode");
  darkMode !== "active" ? enableDarkMode() : disableDarkMode();
});
