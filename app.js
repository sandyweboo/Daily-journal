const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var _ = require('lodash');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.set('view engine', 'ejs');

const blogPosts = [];
const blogs = [];

const homePost = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget justo nec nisi sollicitudin aliquam. Nullam fringilla auctor nisi, ac rhoncus urna dignissim id. Suspendisse potenti. Sed eu augue vitae lacus efficitur viverra. Integer id urna vel eros commodo vulputate. Vivamus vel turpis ut orci placerat ultricies.";

const about = "Welcome to [Your Company/Personal Name]! We are dedicated to [briefly describe your mission or purpose]. With a passionate team of experts, we strive to [mention a key goal or achievement]. Join us on this exciting journey as we continue to [highlight a unique aspect of your business or mission].";

const contact ="Have a question or feedback? We're here to help! Feel free to reach out to us via the contact form or directly at [Your Email Address]. Your input is valuable to us, and we look forward to connecting with you. For urgent inquiries, you can also reach us by phone at [Your Phone Number].";


app.get("/",(req, res)=>{

   
    res.render("home",{content :homePost, article : blogPosts });
});

app.get("/about",(req,res)=>{
   
    res.render("about",{content :about})
   
})
app.get("/contact",(req,res)=>{
    res.render("contact",{content :contact })
})
app.get("/compose",(req,res)=>{
    res.render("compose",{ })
  
})
app.post("/compose",(req,res)=>{
  
const  post ={ 
    title : req.body.postTitle,
    content : req.body.postBody
}

blogPosts.push(post);
res.redirect('/');   
})
app.get("/post/:postName",(req,res)=>{

const usrTitle =_.lowerCase(req.params.postName);

blogPosts.forEach(post => {
   const postTitle = _.lowerCase(post.title);
   const postBody = post.content;

   const singlePost ={
    title : postTitle,
    content : postBody
   }

   if(usrTitle === postTitle){
      
     res.render("post",{article : singlePost});
   }else{
    res.render("404");
   }
    
});

})


app.listen(process.env.port || 3000,()=>{
    console.log("app is runnig on port 3000");
})