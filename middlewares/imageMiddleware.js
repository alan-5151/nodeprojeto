const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage:multer.memoryStorage(),
	fileFilter:(req, file, next) => {
		const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
		if (allowed.includes(file.mimetype)) {
			next(null, true);

		} else {
			next({message:'Formato de arquivo não permitido'}, false);
		}
	}
};
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	if (!req.file) {
		next();
		return;
	}

	const ext = req.file.mimetype.split('/')[1];
	let filename = `${uuid.v4()}.${ext}`;
	req.body.photo = filename;

	const photo = await jimp.read(req.file.buffer);
	await photo.resize(700, jimp.AUTO);
	await photo.quality(50);
	await photo.write(`./public/media/${filename}`);
	next();
};

