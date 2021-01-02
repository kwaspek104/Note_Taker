const express = require("express");
const router = express();

const apiRoutes = require("./routes/apiRoutes")(router);
const htmlRoutes = require("./routes/htmlRoutes")(router);

const PORT = process.env.PORT || 8000;

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));
router.use('/api', apiRoutes)
router.use('/', htmlRoutes)


router.listen(PORT, () => 
console.log(`App listening on PORT: ${PORT}`));

