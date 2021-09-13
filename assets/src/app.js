const nameIn = document.getElementById("name");
const loginModal = document.getElementById('enter-modal');
const phoneIn = document.getElementById("phone");
const passIn = document.getElementById("password");
const profileIn = document.getElementById("profilePic");
const signUp = document.getElementById("submit");
const backdrop = document.getElementById('backdrop');
const password = document.getElementById('password');
const dbRequest = indexedDB.open("ourStorage", 3);
let objStore, db;

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

signUp.addEventListener("click", () => {
  const name = nameIn.value.trim();
  const phone = phoneIn.value.trim();
  const password = passIn.value.trim();
  const profile = profileIn.value.trim();
  if (valid(name, phone, password, profile))
    var database = db.transaction(["users"], "readwrite").objectStore("users");
  database.add({
    id: password.toString(),
    name: name,
    phone: phone,
    password: password,
    avatar: profile,
  });
  localStorage.removeItem('password');
  localStorage.setItem('password',password);
  location.assign("http://127.0.0.1:5500/profile.html");
});

function valid(name, phone, password, pic) {
  if (name === "" || phone === "" || password === "" || pic === "") {
    alert("please fill out all fields");
    return false;
  }
  if (password.length < 8 || /^\d+$/.test(password)) {
    alert(
      "use stronger passwords this is predictable :) \nHint : it must incluse a character"
    );
    return false;
  }
  if (!(phone.startsWith("+98") || phone.startsWith("09"))) {
    alert("this isn't a valid phone number for Iran");
    return false;
  }
  return true;
}

// loginBtn.addEventListener('click',()=>{
//     const pass = password.value;
//     const users = db.transaction('users','readwrite').objectStore('users');
//     const request = users.get(pass);
//     request.onsuccess=()=>{
//         console.log(request.result);
//         if (request.result === undefined) {
//             alert('sorry there is no match in our database for this password please try again.');
//             return;
//         }
//         const result = request.result;
//         nm=result.name;
//         avatar.setAttribute('src',result.avatar);
//         namee.innerText = 'Hi ' + result.name;
//         phone.innerText = 'Phone : ' + result.phone;
//         // closeModal();
//         localStorage.setItem('password',result.password);
//     }
// });

function closeModal(){
      loginModal.classList.remove('visible');
      toggleBackdrop();
  }

  function toggleBackdrop (){
    backdrop.classList.toggle("visible");
}
    loginModal.classList.add('visible');
    toggleBackdrop();
    setTimeout(renderData,2000);
    function renderData (){
    toggleBackdrop();
    loginModal.classList.remove('visible');
    if (localStorage.getItem('loggedIn') == 'true') {
      location.assign("http://127.0.0.1:5500/profile.html");
    }
  } 
   
nameIn.innerText = '';
phoneIn.innerText = '';
passIn.innerText = '';
profileIn.innerText = '';