getBoardList();

function moveToWrite() {
    location.replace("/blog-write.html")
}

function getBoardList() {
    const currentPage = document.getElementById("currentPage").text;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/api/board?page=${currentPage}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const lastPage = result.data.allPage
            const boardList = result.data.boardResponseDtoList

            for(let i = 0; i < boardList.length; i++) {
                const boardId = boardList[i].boardId;
                const writer = boardList[i].writer;
                const title = boardList[i].title;
                const createdAt = boardList[i].createdAt;

                const temp_html = 
                `
                    <div class="list-left-content">
                        <div class="list-checkbox">
                            <input class="form-check-input me-1" type="checkbox"
                                value="" aria-label="...">
                        </div>
                        <div class="list-thumb">
                            <img src="images/sample.png" alt="">
                        </div>
                        <div class="list-text-wrap">
                            <h5 class="list-title mb-1"><a data-bs-toggle="modal" data-bs-target="#myModal" href="#myModal" onclick="return getBoardData(${boardId})")>${title}</a></h5>
                            <p class="list-info">
                                <span class="content-author">${writer} </span>
                                <span class="content-date">${createdAt}</span>
                            </p>
                        </div>
                    </div>
                    <div class="list-right-content">
                        <button
                            class="btn btn-sm btn-outline-warning">수정</button>
                        <button
                            class="btn btn-sm btn-outline-danger" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">삭제</button>
                    </div>
                `
                const newBoard = document.createElement('li');
                newBoard.classList.add("list-group-item");
                newBoard.classList.add("list-group-item-action");
                newBoard.classList.add("content-list");
                newBoard.id = boardId
                newBoard.innerHTML = temp_html;
                document.querySelector(`#boardList`).appendChild(newBoard);
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

function getBoardData(boardId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/api/board/${boardId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const content = result.data.content;
            
            const board = document.createElement("span");
            board.id = "modalContent"
            board.innerText = content;
            document.querySelector(`#modalBody`).appendChild(board);

            console.log(result)
        })
        .catch(error => console.log('error', error));
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  const content = document.querySelector("#modalContent")
  content.innerText = ""
})