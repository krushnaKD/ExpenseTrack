const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cd(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Data.now()}-${file.originalname}`);

    },
})

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/jpeg','image/png','image/jpeg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else {
        cb(new Error('Only.jpeg,.jpeg,.png and .png formats are allowed'),false);
    }
};

const upload = multer({storage,fileFilter});

module.exports = upload;