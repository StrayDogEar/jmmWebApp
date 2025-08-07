const scriptURL = "YOUR_APPSCRIPT_URL";

// SHA-256 hashing
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// REGISTER
async function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const hashed = await hashPassword(password);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "register", email, password: hashed }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(txt => {
      document.getElementById("result").innerText = txt;
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
