function testAlert() {
    alert("hi");
}

function testGetBoardData() {
    fetch("http://localhost:8080/api/board/1")
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log("Fetch Error", err)
        })
}

function testCreateBoard() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "writer": "영욱쓰",
    "content": "테스트",
    "title": "테스트입니다~"
    });

    var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    };

    fetch("http://localhost:8080/api/board", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function testEditBoard() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "title": "백설공주",
    "writer": "왕자",
    "content": "신데렐라"
    });

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8080/api/board/1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function testDeleteBoard() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "boardIdList": "1"
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8080/api/board", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}