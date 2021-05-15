const ws = new WebSocket("ws://localhost:3000");
const http = new XMLHttpRequest()
ws.onmessage = (msg) => {

  http.open("GET", "http://localhost:3000/chat/api/messages/", true);
  http.send();
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      let status = http.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        var myArr = JSON.parse(http.response);
        renderMessages(myArr)
      }
    };
  }
};

const renderMessages = (data) => {
  console.log(data)
  const html = data.map((item) => {
    try {
      return `<p><b>${item.author}:</b> ${item.message}</p>`;
    } catch (error) { }
  })
    .join(" ");;
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  document.getElementById("error").innerHTML = "";
  const messageIn = document.getElementById("message");
  const authorIn = document.getElementById("author");
  const msg = {
    message: messageIn.value,
    author: authorIn.value,
  };
  const post = JSON.stringify(msg);
  http.open("POST", "http://localhost:3000/chat/api/messages/");
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(post);
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      let status = http.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        ws.send(post);
        messageIn.value = ""
      }
    };


    ///
  };
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
