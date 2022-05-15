getBoardList();

function moveToWrite() {
    location.replace("/create");
}

function moveToEdit(boardId) {
    location.replace(`/edit?boardId=${boardId}`);
}

function getBoardList() {
    const searchParam = new URLSearchParams(location.search);
    let currentPage = searchParam.get("page");
    if (currentPage == null) {
        currentPage = 1;
    }
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
                            class="btn btn-sm btn-outline-warning" onclick="return moveToEdit(${boardId})">수정</button>
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
            createFooter(currentPage, lastPage);
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

var Modal = document.getElementById('myModal')
Modal.addEventListener('hidden.bs.modal', function (event) {
  const content = document.querySelector("#modalContent")
  content.innerText = ""
})

function createFooter(currentPage, lastPage) {
    const numberSize = parseInt((currentPage - 1) / 5)
    console.log(numberSize)
    console.log(lastPage)

    if(numberSize != 0) {
        const left = document.createElement("li");
        left.classList.add("page-item");
        left.innerHTML = `
            <a class="page-link" href="/?page=${numberSize * 5}" aria-label="Previous">
                <span aria-hidden="true">«</span>
            </a>
        `
        document.querySelector(`.pagination`).appendChild(left);
    } else {
        const left = document.createElement("li");
        left.classList.add("page-item");
        left.classList.add("disabled");
        left.innerHTML = `
            <a class="page-link" href="/?page=${numberSize * 5}" aria-label="Previous">
                <span aria-hidden="true">«</span>
            </a>
        `
        document.querySelector(`.pagination`).appendChild(left);
    }

    for(let i = 1; i < 6; i++) {
        if(numberSize * 5 + i > lastPage) {
            break;
        }
        const pageBlock = document.createElement("li");
        pageBlock.classList.add("page-item");
        if(numberSize * 5 + i == currentPage) {
            pageBlock.classList.add("active")
        }
        pageBlock.innerHTML = `
            <a class="page-link" href="/?page=${numberSize * 5 + i}">${numberSize * 5 + i}</a>
        `
        document.querySelector(`.pagination`).appendChild(pageBlock);
    }

    if(lastPage < numberSize * 5 + 6) {
        const right = document.createElement("li");
        right.classList.add("page-item");
        right.classList.add("disabled");
        right.innerHTML = `
            <a class="page-link" href="/?page=${numberSize * 5 + 6}" aria-label="Previous">
                <span aria-hidden="true">»</span>
            </a>
        `
        document.querySelector(`.pagination`).appendChild(right);
    } else {
        const right = document.createElement("li");
        right.classList.add("page-item");
        right.innerHTML = `
            <a class="page-link" href="/?page=${numberSize * 5 + 6}" aria-label="Previous">
                <span aria-hidden="true">»</span>
            </a>
        `
        document.querySelector(`.pagination`).appendChild(right);
    }
}