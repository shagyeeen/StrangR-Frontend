const socket = io("https://strangr-backend-5gbp.onrender.com");

let username = "";
let connected = false;

function start() {
  document.getElementById("messages").innerHTML = "";

  username = document.getElementById("username").value.trim();
  if (username.length < 3) {
    alert("Username must be at least 3 characters");
    return;
  }

  document.getElementById("join").style.display = "none";
  document.getElementById("chat").style.display = "block";

  socket.emit("join");
}

function nextStranger() {
  connected = false;
  document.getElementById("messages").innerHTML = "";
  socket.emit("next");
}

function send() {
  if (!connected) return;

  const msg = document.getElementById("msg").value.trim();
  if (!msg) return;

  socket.emit("message", { username, msg });
  document.getElementById("msg").value = "";
}

function report() {
  alert("Report sent (demo)");
}

socket.on("message", (data) => {
  const div = document.createElement("div");

  if (data.username === "StrangR") {
    div.style.color = "gray";
    div.style.fontStyle = "italic";

    if (data.msg.includes("chatting")) connected = true;
    if (data.msg.includes("Waiting")) connected = false;
  }

  div.textContent = `${data.username}: ${data.msg}`;
  document.getElementById("messages").appendChild(div);
  div.scrollIntoView();
});
