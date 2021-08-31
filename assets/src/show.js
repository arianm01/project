const header = document.querySelector('h1');
const entryText = document.getElementById("entry-text");
const dbRequest = indexedDB.open("ourStorage", 3);
let objStore, db;
const products = [];

dbRequest.onupgradeneeded = (event) => {
  db = event.target.result;
  objStore = db.createObjectStore("users", {
    keyPath: "id",
  });
};

dbRequest.onsuccess = (event) => {
  db = event.target.result;
};

dbRequest.onerror = (event) => {
  alert(
    "sorry there is some problem with our database :( \n please try later."
  );
  console.error(event);
};
setTimeout(c,15);
function c (){
    const users = db.transaction('products','readwrite').objectStore('products');
    console.log('hi');
    const request = users.getAll();
    request.onsuccess=()=>{
        console.log(request.result);
        for (const product of request.result) {
            addProductHandler(product);
        }
        // if (request.result === undefined) {
        //     alert('sorry there is no match in our database for this password please try again.');
        //     return;
        // }
        // const result = request.result;
        // nm=result.name;
        // avatar.setAttribute('src',result.avatar);
        // namee.innerText = 'Hi ' + result.name;
        // phone.innerText = 'Phone : ' + result.phone;
        // localStorage.setItem('password',result.password);
    }
  };
function renderNewProduct(code, name, price, author, description) {
    const newProduct = document.createElement("div");
    newProduct.className = "product";
    newProduct.innerHTML = `
    <div class="text-box">
      <h2 class="item">Device : ${name}</h2>
      <h4 class='description'>${code}</h4>
      <h3 class="price">Price : ${price}</h3>
      <p class="description">${description}</p>

      `;
    const listRoot = document.getElementById("listing-section");
    listRoot.append(newProduct);
  }
  
  function addProductHandler(product) {
    const name = product.name;
    const code = product.code;
    const description = product.description;
    const author = product.author;
    const price = product.price;
  
    const newProduct = {
      code: code,
      name: name,
      price: price,
      description: description,
      author:author
    };
    products.push(newProduct);
    renderNewProduct(newProduct.code, newProduct.name, newProduct.price, newProduct.author, newProduct.description);
    updateUI();
  }
  function updateUI() {
    if (products.length === 0) {
      entryText.style.display = "block";
    } else {
      entryText.style.display = "none";
    }
  }
  header.addEventListener('click',()=>{
    location.assign("http://127.0.0.1:5500/profile.html");
  });