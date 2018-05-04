const express = require('express');
const hbs =require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('error while appending');
		}
		
	});
	next();
});

hbs.registerHelper('getCurrentYear' , ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
	//res.send('<h1>Hello welcome to sai server<h1>');
	res.render('template.hbs',{
		pageTitle:"Home"
	});
});
app.get('/bad',(req,res)=>{
	res.send({
		error_message:"unable to handle request"
	});
})
app.get('/about',(req,res)=>{
	res.render('template.hbs',{
		pageTitle: "About"
	});
});
app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle: "Projects"
	});
});
app.listen(	port, () =>{
	console.log(`server is up and running at ${port}`);
});
