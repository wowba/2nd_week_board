getBoardList();

function moveToWrite() {
    location.replace("/create");
}

function moveToEdit(boardId) {
    location.replace(`/edit?boardId=${boardId}`);
}

function checkAllButton() {
    const checkBoxes = document.getElementsByClassName("form-check-input me-1")
    const allButton = document.getElementById("allButton")

    if (allButton.checked === false) {
        for(let i=0; i<checkBoxes.length; i++){
                checkBoxes[i].checked = false
        }
    } else {
        for(let i=0; i<checkBoxes.length; i++){
            checkBoxes[i].checked = true
    }
    }
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
                const image = boardList[i].image;

                const temp_html = 
                `
                    <div class="list-left-content">
                        <div class="list-checkbox">
                            <input class="form-check-input me-1" type="checkbox" id=${boardId}
                                value="" aria-label="...">
                        </div>
                        <div class="list-thumb">
                            <img src="${image}" alt="">
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
                            data-bs-target="#exampleModal" onclick="return createBoardDeleteFunction(${boardId})">삭제</button>
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
    const left = document.createElement("li");
    left.classList.add("page-item");
    left.innerHTML = `
        <a class="page-link" href="/?page=${numberSize * 5}" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
        `
    document.querySelector(`.pagination`).appendChild(left);

    if(numberSize == 0) {
        left.classList.add("disabled");
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

    const right = document.createElement("li");
    right.classList.add("page-item");
    right.innerHTML = `
        <a class="page-link" href="/?page=${numberSize * 5 + 6}" aria-label="Previous">
            <span aria-hidden="true">»</span>
        </a>
        `
    document.querySelector(`.pagination`).appendChild(right);

    if(lastPage < numberSize * 5 + 6) {
        right.classList.add("disabled");
    }
}

function createBoardDeleteFunction(boardId) {
    document.getElementById("deleteButton").setAttribute("onclick", `deleteBoard(${boardId})`)
}

function deleteBoard(boardId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "boardIdList": `${boardId}`
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8080/api/board", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    location.replace("/")
}

function createCheckBoardDeleteFunction() {
    let boardIdList = "";
    const checkBoxes = document.getElementsByClassName("form-check-input me-1")
    for(let i=0; i<checkBoxes.length; i++){
        if(checkBoxes[i].checked == true) {
            console.log(i)
            boardIdList += `${checkBoxes[i].id},`
        }
    }
    boardIdList = boardIdList.substring(0, boardIdList.length - 1)
    document.getElementById("deleteButton").setAttribute("onclick", `deleteBoard([${boardIdList}])`)
}