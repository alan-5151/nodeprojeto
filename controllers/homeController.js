const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.userMiddleware = (req, res, next) => {
	let info = { name: "Edmilson", id: 123 };
	req.userInfo = info;
	next();
};

exports.index = async (req, res) => {
	let obj = {
		nome: req.query.nome,
		cidade: req.query.cidade,
		estado: req.query.estado,
		mostrar: true,
		ingredientes: [
			{ nome: "Farinha", Qt: "300g" },
			{ nome: "Açucar", Qt: "200g" },
			{ nome: "Baunilha", Qt: "50g" },
			{ nome: "Azeitona", Qt: "1 dúzia" },
		],
		interesses: ["node", "js", "php", "react"],
		teste: "<strong>Testando negrito</strong>",
		pageTitle: " | HOME",
		userInfo: req.userInfo,
		posts: [],
		tags: [],
		tag: "",
		edita: [],
		edit: false,
	};

	// console.log(req.user);

	obj.tag = req.query.t;
	const postFilter = typeof obj.tag != "undefined" ? { tags: obj.tag } : {};

	const tagsPromise = Post.getTagsList();
	const postsPromise = Post.find(postFilter).populate("author");
	const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

	for (let i in tags) {
		if (tags[i]._id == obj.tag) {
			tags[i].class = "selected";
		}
	}

	if (req.query._id && req.query._id == req.query.author._id) {
		edit: true;
		obj.edit = edit;
	}

	obj.tags = tags;
	obj.posts = posts;

	if (req.isAuthenticated()) {
		for (let i in posts) {
			if (posts[i].author._id.toString() == req.user._id.toString()) {
				posts[i].canEdit = true;
			}
		}
	}

	res.render("home", obj);
};
