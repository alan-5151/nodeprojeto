exports.isLogged = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash("error", "Você não está logado no sistema.");
		res.redirect("/users/login");
		return;
	}
	next();
};

exports.changePassword = (req, res) => {
	// 1. Confirmar que as senhas batem
	if (req.body.password != req.body["password-confirm"]) {
		req.flash("error", "Senhas devem ser iguais");
		res.redirect("/users/profile");
		return;
	}

	// 2. Trocar senha do usuário logado.
	req.user.setPassword(req.body.password, async () => {
		await req.user.save();

		req.flash("success", " Senha alterada com sucesso.");
		res.redirect("/");
		return;
	});
};
