// npm으로 express 설치 후 사용 가능
const express = require('express')

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    return res.sendFile("C:/Users/user/Desktop/2nd_week_board/frontend/public/blog-list.html")
});

app.get('/create', (req, res) => {
    return res.sendFile("C:/Users/user/Desktop/2nd_week_board/frontend/public/blog-write.html")
});

app.get('/edit', (req, res) => {
    return res.sendFile("C:/Users/user/Desktop/2nd_week_board/frontend/public/blog-edit.html")
});

// express는 절대경로를 사용하기에 상대경로를 사용하는 파일들은 static folder를 사용해 넣어준다.
app.use(express.static('public'));

app.listen(PORT)