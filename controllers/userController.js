const User = require("../models/User");

exports.login = (req, res) => {
	let obj = { pageTitle: " | LOGIN" };
	res.render("login", obj);
};

exports.loginAction = (req, res) => {
	const auth = User.authenticate();

	auth(req.body.email, req.body.password, (error, result) => {
		if (!result) {
			req.flash("error", "Dados incorretos");
			res.redirect("/users/login");
			return;
		}

		req.login(result, () => {});

		req.flash("success", "Logado com sucesso");
		res.redirect("/");
		return;
	});
};

exports.register = (req, res) => {
	let obj = { pageTitle: " | CADASTRO" };
	res.render("register", obj);
};

exports.registerAction = (req, res) => {
	//res.json(req.body);
	const newUser = new User(req.body);
	User.register(newUser, req.body.password, (error) => {
		if (error) {
			req.flash("error", "Ocorreu um erro, tente novamente");
			res.redirect("/users/register");
			return;
		}
		req.flash("success", "Registro efetuado com sucesso. Faça o login");
		res.redirect("/users/login");
		return;
	});
};
