const express = require('express')
const Book = require('../models/Book')
const router = express.Router()

router.post('/', async (req, res) => {
  const { title, author, publishYear } = req.body
  try {
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields, please!',
      })
    }
    const book = await Book.create({ title, publishYear, author })
    return res.status(201).send(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ msg: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find({})
    return res.status(200).json({ allBooks })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    res.status(200).json({ book: book })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, publishYear } = req.body
  try {
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields, please!',
      })
    }
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true, // return the new values
      runValidators: true, // run model validator
    })
    if (!book) {
      return res.status(404).send({
        message: 'book not found',
      })
    }
    return res.status(200).send(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ msg: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findByIdAndRemove(id)
    if (!book) {
      return res.status(404).json({
        message: 'book not found',
      })
    }
    return res.status(200).json({ msg: 'book deleted successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ msg: error.message })
  }
})

module.exports = router
