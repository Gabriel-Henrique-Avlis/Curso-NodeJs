const express = require('express');
const router = express.Router();
const Itens = require("../model/itens");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { query } = require('express');

//Funções Auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, {expiresIn: config.jwt_expires_in });
}

router.get('/:categId', async (req, res) => {
    //Código refatorado com async/await
    let categ = req.params.categId;
    try{
        const itens = await Itens.find({categId: categ});
        return res.status(201).send(itens);
    }
    catch (err){
        return res.status(500).send({error: "Erro na consulta de itens! "});
    }
});

router.post('/create', async (req, res) => {
    const {categId, itemId, description} = req.body;

    if(!categId || !itemId || !description) return res.status(400).send({error: "Dados insuficientes! "});

    try{
        if(await Itens.findOne({ categId, itemId })) return res.status(400).send({ error:"Item já registrado!"})

        const itens = await Itens.create(req.body);
        return res.status(201).send({itens});
    }
    catch(err){
        return res.status(500).send({ error: 'Erro ao cadastrar item' });
    }
})

router.post("/auth", async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ error: "Dados insuficientes!" });

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({ error: 'Usuário não registrado!'})
        
        const pass_ok = await bcrypt.compare(user.password, password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário! '});

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    }
    catch(err){
        return res.status(500).send({ error: "Usuário não registrado!" });
    }
})

module.exports = router;

