function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const data = new URLSearchParams();
  data.append("action", "login");
  data.append("email", email);
  data.append("password", password);

  fetch("https://script.google.com/macros/s/AKfycbyr_Gmn_gsS-5U6UkKLOrlhmCoBFUS63w-34cDsjcaiLppUBl0nb2CPqjBWU4foNsAW/exec", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("login-result").innerText = msg;
  })
  .catch(err => {
    console.error(err);
    document.getElementById("login-result").innerText = "Login failed.";
  });
}
