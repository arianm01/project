const category = document.getElementById("category");
const rating = document.getElementById("rating");
const avatar = document.getElementById("avatar");
const title = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const count = document.getElementById('count');

loadData();

function loadData(){
    let xhr = new XMLHttpRequest();
    let id = localStorage.getItem('product');
    xhr.open("GET", `https://fakestoreapi.com/products/${id}`, true);
    xhr.onload = function () {
        const product = JSON.parse(this.responseText);
        category.innerText = product.category;
        rating.innerText = product.rating.rate + "/5 Stars";
        avatar.setAttribute('src',product.image);
        title.innerText = product.title;
        price.innerText = product.price;
        description.innerText = product.description;
        count.innerText = product.rating.count; 
    }
    xhr.send();
}