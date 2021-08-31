const nameIn = document.getElementById("name");
const codeIn = document.getElementById("code");
const priceIn = document.getElementById("price");
const descriptionIn = document.getElementById("description");
const submit = document.getElementById('submit');
const header = document.querySelector('h1');
const dbRequest = indexedDB.open("ourStorage", 3);
let objStore, db;
dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    objStore = db.createObjectStore("products", {
      keyPath: "code",
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
  submit.addEventListener("click", () => {
    const name = nameIn.value.trim();
    const code = codeIn.value.trim();
    const price = priceIn.value.trim();
    const description = descriptionIn.value.trim();
    if (valid(name, code, price, description)){
      var database = db.transaction(["products"], "readwrite").objectStore("products");
    database.add({
      code: code,
      name: name,
      price: price,
      description: description,
      author:localStorage.getItem('user')
    });
    console.log('succeed');
    location.assign("http://127.0.0.1:5500/showProduct.html");
    }  
});
  function valid(name, code, price, decription) {
    if (name === "" || code === "" || price === "" || decription === "") {
      alert("please fill out all fields");
      return false;
    }
    if (code.length < 3 || /^\d+$/.test(code)) {
      alert(
        "use stronger code :) \nHint : it must incluse a character"
      );
      return false;
    }
    if (!(/^\d+$/.test(price))) {
      alert("this isn't a valid price for products");
      return false;
    }
    return true;
  }
  header.addEventListener('click',()=>{
    location.assign("http://127.0.0.1:5500/profile.html");
  });