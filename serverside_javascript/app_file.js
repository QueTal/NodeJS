var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false}));
app.set('views','./views_file');
app.set('view engine', 'jade');
// 템플릿에 줄바꿈을 해줌
app.locals.pretty = true;

app.listen(3000, ()=>{
    //3000 번 포트에 연결되면 연결되었다고 알려줄 수 있는 문구를 넣자!
    console.log('Connected 3000 port!');
});

app.get('/topic/new', (req, res)=>{
    fs.readdir('data', (err, files)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    }) 
});

app.get(['/topic','/topic/:id'], (req, res)=>{
    fs.readdir('data', (err, files)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){ 
            // id 값이 있을 때
            fs.readFile('data/'+id, 'utf-8', (err, data)=>{
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {title:id, topics:files, description:data});
             })
        }
        else{
            // id 값이 없을 때
            // jade에서 받는 이름 : 여기서 보내는 이름
            res.render('view', {topics: files, title:'Welcome', description:'Hello server side Javascript'});
        }      
    })
});

app.post('/topic', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, (err)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });  
});

