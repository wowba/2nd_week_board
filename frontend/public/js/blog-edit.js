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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "title": document.getElementById("title").value,
    "writer": document.getElementById("writer").value,
    "content": document.getElementById("content").value
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