exports.index = (req, res)=>{
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
		pageTitle: ' | HOME' 

	}; 

	res.render('home', obj);
}