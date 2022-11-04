const express = require('express');
const multer = require('multer');
const app = express();

const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server is listenig on port ${PORT}`)
})