const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (req, res, next) => {
	let info = {name:'Edmilson', id:123};
	req.userInfo = info;
	next();
}

exports.index = async (req, res)=>{
	let obj = {
		nome:req.query.nome,
		cidade:req.query.cidade,
		estado:req.query.estado,
		mostrar:true,
		ingredientes:[
		{nome:'Farinha', Qt: '300g'},
		{nome:'Açucar', Qt: '200g'},
		{nome:'Baunilha', Qt: '50g'},
		{nome:'Azeitona', Qt: '1 dúzia'}
		],
		interesses:['node','js','php','react'],
		teste:'<strong>Testando negrito</strong>',
		pageTitle: ' | HOME',
		userInfo:req.userInfo,
		posts:[]

	};  

const posts = await Post.find();
obj.posts = posts;

	res.render('home', obj);
}  