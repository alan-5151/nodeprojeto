exports.defaultPageTitle = "nossosite.com";

exports.menu = [
	{ name: "Home", slug: "/", guest: true, logged: true },
	{ name: "Login", slug: "/users/login", guest: true, logged: false },
	{ name: "Cadastro", slug: "/users/register", guest: true, logged: false },
	{ name: "Adicionar post", slug: "/post/add", guest: false, logged: true },
	{ name: "Perfil", slug: "/users/profile", guest: false, logged: true },
	{ name: "Sair", slug: "/users/logout", guest: false, logged: true },
];
