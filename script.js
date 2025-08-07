const scriptURL = "https://script.google.com/macros/s/AKfycby2zIiOhd5_lk0oD1mDod6zGT2WFBA_AUAO4_4HVV4V_yi7ATDzdDYgYvdhEp1ALDR8/exec";

// SHA-256 hashing
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// REGISTER
function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const formData = new URLSearchParams();
  formData.append("action", "register");
  formData.append("email", email);
  formData.append("password", password);

  fetch("https://script.google.com/macros/s/AKfycby2zIiOhd5_lk0oD1mDod6zGT2WFBA_AUAO4_4HVV4V_yi7ATDzdDYgYvdhEp1ALDR8/exec", {
    method: "POST",
    body: formData, // NOT JSON!
    // ❌ Don't set headers manually — browser will default to safe type
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("result").innerText = data;
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("result").innerText = "Network error";
  });
}


// LOGIN
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const hashed = await hashPassword(password);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "login", email, password: hashed }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(txt => {
      document.getElementById("result").innerText = txt;
    });
}

// FORM TOGGLE
function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.getElementById("form-title").innerText = "Register";
  document.getElementById("result").innerText = "";
}

function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("form-title").innerText = "Login";
  document.getElementById("result").innerText = "";
}




