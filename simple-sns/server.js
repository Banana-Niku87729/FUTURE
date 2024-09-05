const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 投稿を保存するエンドポイント
app.post('/submit', (req, res) => {
    const { username, content } = req.body;

    if (username && content) {
        const post = `${username}: ${content}\n`;
        fs.appendFile('posts.txt', post, (err) => {
            if (err) {
                console.error('Failed to save post:', err);
                res.status(500).send('Failed to save post');
            } else {
                res.status(200).send('Post saved');
            }
        });
    } else {
        res.status(400).send('Invalid input');
    }
});

// 投稿内容を取得するエンドポイント
app.get('/posts', (req, res) => {
    fs.readFile('posts.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read posts:', err);
            res.status(500).send('Failed to read posts');
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
