const scriptURL = "https://script.google.com/macros/s/AKfycbylNvB720XgMyIF6n4eILazoKuALiaLVteGUZ72KvFOXvr0OoGX8ZDx8E7EL_HyqD_x/exec";

// Hash password using SHA-256
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

async function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const hashedPassword = await hashPassword(password);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "register",
      email: email,
      password: hashedPassword
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(txt => {
      document.getElementById("result").innerText = txt;
    });
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const hashedPassword = await hashPassword(password);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      email: email,
      password: hashedPassword
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(txt => {
      document.getElementById("result").innerText = txt;
    });
}


