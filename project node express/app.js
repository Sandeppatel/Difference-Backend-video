


const express = require('express');
const app = express();

const fs =  require('fs');
const { title } = require('process');

app.set('view engine' ,'ejs');

app.get('/' , (req , res)=>{
    fs.readdir('folder' , (err , file)=>{

      
        res.render('index' , {file});
            
        })
})

app.get('/new' , (req , res)=>{

    res.render('new');
})

app.get('/create' , (req , res)=>{
    const title =  req.query.title; 
    const discription = req.query.discription;

    fs.writeFile(`./folder/${title}.txt` , discription , (err)=>{

    res.redirect('/');

    })
})

app.get('/show/:title' , (req , res)=>{
    const title = req.params.title;
    fs.readFile(`./folder/${title}` , 'utf-8' , (err , data)=>{
       
        res.render('show' , {
            title : title ,
            discription : data

        });
    })
})


app.get('/delete/:title' , (req , res)=>{
    const title = req.params.title ;
    console.log(title);
    
    fs.unlink(`./folder/${title}` , (err)=>{
        res.redirect('/');
    })
    
})

app.get('/edit/:title' , (req , res)=>{
     const title = req.params.title;

    fs.readFile(`./folder/${title}` , 'utf-8' , (err , data)=>{
       
        res.render('edit' , {
            title : title ,
            discription : data

        });
    })
    
})
app.get('/note-pade/:name' , (req , res)=>{
   const name = req.params.name ;
   const title =  req.query.title ; 
   const discription = req.query.discription  ;
   
   fs.rename(`./folder/${name}`, `./folder/${title}`, (err) => {
      fs.writeFile(`./folder/${title}` , discription , (err)=>{
         res.redirect('/');
      })
  }); 
    
    
    
})

app.get('/priorty' , (req , res)=>{
    res.render('priorty');
})

app.listen(3000);

