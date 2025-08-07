document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  fetch("https://script.google.com/macros/s/AKfycbylNvB720XgMyIF6n4eILazoKuALiaLVteGUZ72KvFOXvr0OoGX8ZDx8E7EL_HyqD_x/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(res => alert("Submitted: " + res))
  .catch(err => alert("Error: " + err));
});

