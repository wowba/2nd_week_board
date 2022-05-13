function moveToWrite() {
    location.replace("/blog-write.html")
}

function getBoardList(page) {
    const currentPage = document.getElementById("currentPage").text;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/api/board?page=${currentPage}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}