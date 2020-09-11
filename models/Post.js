const mongoose = require("mongoose");
const slug = require("slug");

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
	oldSlug: String,
	photo: String,
	title: {
		type: String,
		trim: true,
		required: "Campo obrigatório!",
	},
	slug: String,
	body: {
		type: String,
		trim: true,
		required: "Campo orbigatório!",
	},
	tags: [String],
});

postSchema.pre("save", function (next) {
	if (this.isModified("title")) {
		this.slug = slug(this.title + "-" + `${Date.now()}`, { lower: true });
	}
	next();
});

postSchema.statics.getTagsList = function () {
	return this.aggregate([
		{ $unwind: "$tags" },
		{ $group: { _id: "$tags", count: { $sum: 1 } } },
		{ $sort: { count: -1 } },
	]);
};

module.exports = mongoose.model("Post", postSchema);
