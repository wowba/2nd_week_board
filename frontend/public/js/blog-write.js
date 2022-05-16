function moveToList() {
    location.replace("/")
}

let encodedBase64;
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        console.log(reader.result)
        encodedBase64 = reader.result
        const thumb = document.getElementById("thumb")
        thumb.src = reader.result
        thumb.style = "width:400px; height:400px;"
    }
    reader.readAsDataURL(file);
}

function createBoard() {
    const title = document.getElementById("title").value;
    const writer = document.getElementById("writer").value;
    const content = document.getElementById("content").value;

// ------------------------------------------- canvas ??

    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");

    // canvas.width = imageFile.width;
    // canvas.height = imageFile.height;

    // ctx.drawImage(imageFile, 0, 0);
    // var base64 = canvas.toDataURL("image/*");
    // const strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "")
    // console.log(strImage)
// ------------------------------------------- 

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (title == "" || writer == "" || content == "") {
        return alert("제목, 내용 및 작성자는 반드시 작성하셔야 합니다.")
    }

    var raw = JSON.stringify({
    "writer": writer,
    "content": content,
    "title": title,
    "image": encodedBase64
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