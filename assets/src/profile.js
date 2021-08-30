const loginModal = document.getElementById('enter-modal');
const logoutBtn = document.getElementById('header-btn');
const backdrop = document.getElementById('backdrop');
const cancelBtn = loginModal.querySelector('.btn--passive');
const loginBtn = cancelBtn.nextElementSibling;
const password = document.getElementById('password');
const insertBtn = document.getElementById("btn1");
const showBtn = document.querySelector('.btn-show');
const dbRequest = indexedDB.open("ourStorage", 2);
const avatar = document.getElementById('avatar');
const namee = document.getElementById('name');
const phone = document.getElementById('phone');
let db,objStore;
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

  function toggleBackdrop (){
    backdrop.classList.toggle("visible");
}

cancelBtn.addEventListener('click',()=>{
    location.assign('http://127.0.0.1:5500/index.html');
});

loginBtn.addEventListener('click',()=>{
    const pass = password.value;
    const users = db.transaction('users','readwrite').objectStore('users');
    const request = users.get(pass);
    request.onsuccess=()=>{
        console.log(request.result);
        if (request.result === undefined) {
            alert('sorry there is no match in our database for this password please try again.');
            return;
        }
        const result = request.result;
        avatar.setAttribute('src',result.avatar);
        namee.innerText = 'Hi ' + result.name;
        phone.innerText = 'Phone : ' + result.phone;
        closeModal();
    }
});

logoutBtn.addEventListener('click',()=>{
  location.assign('http://127.0.0.1:5500/index.html');
});

function closeModal(){
    loginModal.classList.remove('visible');
    toggleBackdrop();
}

loginModal.classList.add('visible');
toggleBackdrop();