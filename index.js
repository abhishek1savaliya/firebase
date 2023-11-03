const express = require('express');
const app = express();
const multer = require('multer')
const firebase = require('firebase/app')
const { getStorage, ref,uploadBytes } = require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyACj_x6qe8eTE3cbqdtIbrx0C5MvKTF4zo",
    authDomain: "upload-file-99b1e.firebaseapp.com",
    projectId: "upload-file-99b1e",
    storageBucket: "upload-file-99b1e.appspot.com",
    messagingSenderId: "387763028184",
    appId: "1:387763028184:web:892ebb34bce328707517ad",
    measurementId: "G-6M6XZRX3Q7"
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() })

app.get("/", (req, res) => {
    res.json("Firebase Storage")
})

app.post("/", upload.single("filename"), (req, res) => {
    const storageRef = ref(storage,`files/${req.file.originalname}`)
    uploadBytes(storageRef,req.file.buffer).then((snapshot)=>{
        console.log("File uploaded")
    })
    console.log(req.file);

})

app.listen(5000);