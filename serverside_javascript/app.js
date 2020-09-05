var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('views','./views');
app.set('view engine','jade');
app.use(express.static('public'));
// public 은 정적인 파일이 존재하는 디렉토리로 하겠다는 의미

app.use(bodyParser.urlencoded({ extended: false}))
// bodyparser => middleware 사용자 요청이 미들웨어로 통과하고 라우팅됨.

app.get('/', (req, res)=>{ // 약속된 parameter
    res.send('hello home page');
});
app.get('/template', (req, res)=>{
    res.render('temp', {time:Date()});
});
app.get('/topic/:id', (req, res)=>{
    var topics = [
        'Javascript is ...',
        'NodeJs is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">NodeJs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
})
// query string 으로 접근할 때는 /topic 와 req.query.id
// semantic url로 접근할 때는 /topic/:id 와 req.params.id

app.get('/topic/:id/:mode', (req, res)=>{
    res.send(req.params.id + ',' + req.params.mode);
})

app.get('/form', (req, res)=>{
    res.render('form'); 
})
app.get('/form_receiver', (req, res)=>{
    // jade의 변수들은 query를 통해 받아올 수 있음
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);

})

app.post('/form_receiver', (req, res)=>{
    //res.send('hello post');
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+' , '+description);
})

app.get('/dynamic', (req, res)=>{
    var time = Date();
    var lis = '';
    for(var i = 0; i < 5; i++){
        lis = lis+'coding';
    }
    var output=`<html>
	<head>
	  <meta charset = "utf-8">
	</head>
	<body>
        Hello dynamic!
        <ul>
            ${lis}
        </ul>
        ${time}
	</body>
</html>`;
    res.send(output);
});
app.get('/uluru', (req,res)=>{
    res.send('hello uluru <img src="/pic.jpg">')
});
app.get('/login', (req, res)=>{
    res.send('login please');
    // res.send('<h1>login please</h1>');
    // 이렇게 html로도 가능함
})
app.listen(3000, ()=>{
    console.log('connected 3000 port!');
});
// url 치고 들어오는 사용자는 get 방식으로 접근한 것
// post 방식은 어떻게 들어오는 거지
// 사용자가 home으로 접속했을 때는 '/' 
// ex) '/name' -> 홈페이지의 name 페이지 (경로임)
// get은 라우터. get이 하는 것은 라우팅

app.get('/topic', (req, res)=>{
    var topics = [
        'Javascript is ...',
        'NodeJs is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">NodeJs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
    `
    res.send(output);
})