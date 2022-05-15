getEditBoardData();

function getEditBoardData() {
    const searchParam = new URLSearchParams(location.search);
    const boardId = searchParam.get("boardId");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/api/board/${boardId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const title = result.data.title;
            const content = result.data.content;
            const writer = result.data.writer;

            document.getElementById("title").value = `${title}`
            document.getElementById("content").value = `${content}`
            document.getElementById("writer").value = `${writer}`

            console.log(result)
        })
        .catch(error => console.log('error', error));
}

function editBoard() {
    const searchParam = new URLSearchParams(location.search);
    const boardId = searchParam.get("boardId");

    const title = document.getElementById("title").value;
    const writer = document.getElementById("writer").value;
    const content = document.getElementById("content").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (title == "" || writer == "" || content == "") {
        return alert("제목, 내용 및 작성자는 반드시 작성하셔야 합니다.")
    }

    var raw = JSON.stringify({
    "title": title,
    "writer": writer,
    "content": content
    });

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/board/${boardId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    location.replace("/")
}

function moveToList() {
    location.replace("/")
}