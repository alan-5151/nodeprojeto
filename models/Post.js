const mongoose = require('mongoose');
const slug = require('slug');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
	title:{
		type:String,
		trim:true,
		required:'Campo obrigatório!'
	},
	slug:String,
	body:{
		type:String,
		trim:true,
		required:'Campo orbigatório!'
	},
	tags:[String]
});

postSchema.pre('save', function(next){
	if (this.isModified('title')) {
		this.slug = slug(this.title, {lower:true});
	}
	next();
});
 
module.exports = mongoose.model('Post', postSchema); 

