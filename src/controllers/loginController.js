const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    res.render('login');
};
exports.register = (req, res) => {
    const login = new Login(req.body);
    login.register()
    res.send(req.body) //req.body passa os dados de um form enviado
};