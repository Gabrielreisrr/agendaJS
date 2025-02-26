const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    res.render('login');
};
exports.register = async (req, res) => {
    try{
        console.log("Entrou no register");
    
        const login = new Login(req.body);
        await login.register();
        
        console.log("Login errors:", login.errors);
    
        if (login.errors.length > 0) {
            console.log("Erros encontrados, salvando sessão...");
            req.flash('errors', login.errors);
            req.session.save(() => {
                console.log("Sessão salva, redirecionando para /login/index...");
                
                return res.redirect('/login/index'); 
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(() => {    
            return res.redirect('/login/index'); 
    }catch(e){
        console.log(e);
        return res.render('404');
    }
   
};