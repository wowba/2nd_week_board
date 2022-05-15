function moveToList() {
    location.replace("/")
}

function createBoard() {
    const title = document.getElementById("title").value;
    const writer = document.getElementById("writer").value;
    const content = document.getElementById("content").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (title == "" || writer == "" || content == "") {
        return alert("제목, 내용 및 작성자는 반드시 작성하셔야 합니다.")
    }

    var raw = JSON.stringify({
    "writer": writer,
    "content": content,
    "title": title
    });

    var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    };

    fetch("http://localhost:8080/api/board", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    location.replace("/")
}