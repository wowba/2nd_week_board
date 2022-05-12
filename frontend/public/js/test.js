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