const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


router.get('/', auth, (req, res) => {
    return res.send({message: 'Tudo ok com o método GET da raiz!'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método POST da raiz!'});
});

module.exports = router;

