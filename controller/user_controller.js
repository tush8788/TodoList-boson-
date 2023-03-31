
//sign up page
module.exports.signup = function(req,res){
    return res.render('signup',{
        title:"Signup"
    })
}

module.exports.signin = function(req,res){
    return res.render('signin',{
        title:"Signin"
    })
}