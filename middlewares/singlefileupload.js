const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = async (req, res, next) => {
  await upload.single("img")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ Fromfileupload: err.message });
    }

    const files = req.file;
    req.file = files;
    next();
  });
};

module.exports = uploadMiddleware;
