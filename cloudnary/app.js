const express = require('express');
const uploadRoute = require('./routes/upload');
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/' ,  (req , res)=>{
    res.render('index');
})


// Upload route for handling file uploads
app.use('/api', uploadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});