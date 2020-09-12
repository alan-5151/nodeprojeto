const User = require("../models/User");
const crypto = require("crypto");
const mailHandler = require("../handlers/mailHandler");

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
			console.log("Falha ao cadastrar-se:" + error);
			res.redirect("/users/register");
			return;
		}
		req.flash("success", "Registro efetuado com sucesso. Faça o login");
		res.redirect("/users/login");
		return;
	});
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect("/");
	return;
};

exports.profile = (req, res) => {
	res.render("profile");
};

exports.profileAction = async (req, res) => {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ name: req.body.name, email: req.body.email },
			{ new: true, runValidators: true }
		);
	} catch (e) {
		req.flash("error", "Dados inválidos: " + e.message);
	}

	req.flash("success", "Dados alterados com sucesso");
	res.redirect("/");
	return;
};

exports.forget = (req, res) => {
	res.render("forget");
};

exports.forgetAction = async (req, res) => {
	// 1. Verificar se o usuário realmente existe no sistema.
	const user = await User.findOne({ email: req.body.email }).exec();
	if (!user) {
		req.flash("error", "Email não encontrado.");
		res.redirect("/users/forget");
		return;
	}

	// 2. Gerar um token (com data de xpiração) e salvar no banco de dados.
	user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
	user.resetPasswordExpires = Date.now() + 1800000; // meia hora
	await user.save();

	// 3. Gerar link (com o token) para trocar senha.
	const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

	// 4. Enviar o link via email para o usuário.
	const to = `${user.name} <${user.email}>`;
	const html = `Acesse o link para alterar sua senha:<br /> <a href="${resetLink}">Alterar sua senha</a>`;
	const text = `Acesse o link para alterar sua senha: ${resetLink}`;

	mailHandler.send({
		to,
		subject: "nossosite.com - Alterar sua senha",
		html,
		text,
	});

	req.flash(
		"success",
		"Um email foi enviado com instruções, verifique sua caixa postal."
	);
	res.redirect("/users/login");
	return;

	// 5. Usuário vai acessar e ser autorizado á trocar a senha.
};

exports.forgetToken = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	}).exec();

	if (!user) {
		req.flash("error", "Token expirado");
		res.redirect("/users/forget");
		return;
	}
	res.render("forgetPassword");
};

exports.forgetTokenAction = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	}).exec();

	if (!user) {
		req.flash("error", "Token expirado");
		res.redirect("/users/forget");
		return;
	}

	// 1. Confirmar que as senhas batem
	if (req.body.password != req.body["password-confirm"]) {
		req.flash("error", "Senhas devem ser iguais");
		res.redirect("back");
		return;
	}

	// 2. Trocar senha do usuário logado.
	user.setPassword(req.body.password, async () => {
		await user.save();

		req.flash("success", " Senha alterada com sucesso.");
		res.redirect("/");
		return;
	});
};
