const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const User=require("./db/models/users");

const bcrypt = require("bcrypt");
const rounds = 10;
// passportjsrequire
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
// passportjscode
// app.use(session({
//     secret:"this is my secret",
//     resave:false,
//     saveUninitialized:false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passportjscode

const temp = path.join(__dirname,"../templates/views");
const static = path.join(__dirname,"../public");

app.set('view engine', 'ejs');
app.set('views',temp);
app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/pro1",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.get("/",function(req,res){
   res.render("land");
});
app.get("/register",function(req,res){
    res.render("register");
 });
 app.get("/login",function(req,res){
    res.render("login");
 });
app.post("/register",function(req,res){
    bcrypt.hash(req.body.password,rounds,function(err,hash){


    });
    
     const pattern = /^[A-Za-z0-9]{1,}@[a-z]{5}\.[a-z]{2,}$/;
     const pattern2 = /[a-zA-Z0-9]{8,}/;
     const email = req.body.email;
     const pass = req.body.password;
     const cpass  = req.body.confirmpass;
     
     if (pattern.test(email)){

        User.findOne({email:email},function(err,founduser){

            if(founduser){
              
              res.redirect("/login");
               
            }
            else {
                if(pass===cpass){
                    bcrypt.hash(pass,rounds,function(err,hash){
                        const user = new User({
                            name : req.body.name,
                            email : email,
                            password : hash,
                            
            
                        });
                        user.save();

                    });
                    // const user = new User({
                    //     name : req.body.name,
                    //     email : email,
                    //     password : pass,
                    //     confirmpass : cpass,
        
                    // });
                    // user.save();
                    
                }
                else{
                    console.log("wrong pass");
                }
            }
        })
        
     }
     else{
        
        console.log("Enter email correctly")
        
     }

});

app.post("/login",function(req,res){
    const email = req.body.email;
     const pass = req.body.password;
     User.findOne({email:email},function(err,founduser){

        if(founduser){
            bcrypt.compare(pass,founduser.password,function(err,result){
                if (result===true && founduser.email===email){
                    
                    console.log("hello");
                }
                else{
                    res.redirect("/register");
                  }
            });
         
        }
        else{
            res.redirect("/register");
        }
    })
})

app.listen("3000",function(){
   console.log("connected sucessfully");
});