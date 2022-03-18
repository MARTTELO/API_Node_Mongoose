const router = require('express').Router();
const Person = require('../models/Person')

//CREATE
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }
    //VALIDAÇÃO DA REQUISIÇÃO
    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório' })
        return
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//READ - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const people = await Person.findOne({ _id: id })

        if (!people) {
            res.status(422).json({ Message: "O usuário não foi encontrado" })
            return
        }
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// UPDATE - atualização de dados (PUT (espera alterar tudo ), PATCH(atualiza apenas o que for alterado))
router.patch('/:id', async (req, res) => {
    {
        const id = req.params.id
        const { name, salary, approved } = req.body

        const person = {
            name,
            salary,
            approved
        }

        try {
            const updatedPerson = await Person.updateOne({ _id: id }, person)
            if (updatedPerson.matchedCount === 0) {
                res.status(422).json({ Message: "O usuário não foi encontrado" })
                return
            }
            res.status(200).json({message: "Pessoa atualizada com Sucesso"});
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
})


//DELETE - deletar dados

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const people = await Person.findOne({ _id: id })

    if (!people) {
        res.status(422).json({ Message: "O usuário não foi encontrado" })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário removido com sucesso" })
    } catch (error) {
        res.status(500).json({ error: error })
    }


})

module.exports = router