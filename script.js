document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  fetch("YOUR_APPSCRIPT_WEBAPP_URL", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(res => alert("Submitted: " + res))
  .catch(err => alert("Error: " + err));
});
