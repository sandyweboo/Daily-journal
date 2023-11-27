const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var _ = require('lodash');
const { default: mongoose } = require("mongoose");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.set('view engine', 'ejs');
const connection = require("mongoose")
connection.connect("mongodb://localhost:27017/personalblog").then((result)=>{
    console.log("DB Connceted")
}).catch((error)=>{
    console.log(error)
})


const blogPosts = [];
const blogs = [];

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  });
  
  const Post = mongoose.model('Post', postSchema);


const homePost = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget justo nec nisi sollicitudin aliquam. Nullam fringilla auctor nisi, ac rhoncus urna dignissim id. Suspendisse potenti. Sed eu augue vitae lacus efficitur viverra. Integer id urna vel eros commodo vulputate. Vivamus vel turpis ut orci placerat ultricies.";

const about = "Welcome to [Your Company/Personal Name]! We are dedicated to [briefly describe your mission or purpose]. With a passionate team of experts, we strive to [mention a key goal or achievement]. Join us on this exciting journey as we continue to [highlight a unique aspect of your business or mission].";

const contact ="Have a question or feedback? We're here to help! Feel free to reach out to us via the contact form or directly at [Your Email Address]. Your input is valuable to us, and we look forward to connecting with you. For urgent inquiries, you can also reach us by phone at [Your Phone Number].";


app.get("/",(req, res)=>{

    Post.find().exec()
    .then((result)=>{
      //console.log(result)
      res.render("home",{content :homePost, article : result });
    })
    .catch((error)=>{console.log(error)})

    
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
app.post("/compose",async(req,res)=>{
  
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody,
      });
      try {
        post.save()
      } catch (error) {
        console.log(error)
      }

res.redirect('/');   
})
app.get("/post/:postId",(req,res)=>{

const fullPostId =(req.params.postId);
  Post.findOne({_id :fullPostId}).exec()
  .then((result)=>{
   res.render("post",{article : result});
  })
  .catch((error)=>{
    console.log(error)
  })

});




app.listen(process.env.port || 3000,()=>{
    console.log("app is runnig on port 3000");
})