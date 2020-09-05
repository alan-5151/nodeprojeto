const express = require('express');
const router = express.Router();



router.get('/', (req, res)=>{
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
		teste:'<strong>Testando negrito</strong>'

	}; 

	res.render('home', obj);

})


module.exports = router;