const notes = require('./notes')
const { nanoid } = require('nanoid')

const getAll = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { notes }
    })
}

const create = (req, res) => {
    const { title, tags, body } = req.body
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    notes.push({
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt
    })

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if (isSuccess) {
        return res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })
    }

    return res.status(500).json({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    })
}

const getOne = (req, res) => {
    const { id } = req.params

    const note = notes.filter((note) => note.id === id)[0]

    if (!note) {
        res.status(404).json({
            status: 'fail',
            message: 'Catatan tidak ditemukan'
        })
    }

    res.status(200).json({
        status: 'success',
        data: { note }
    })
}

const update = (req, res) => {
    const { id } = req.params
    const { title, tags, body } = req.body
    const updatedAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        res.status(201).json({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        })
    }

    res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    })
}

const remove = (req, res) => {
    const { id } = req.params

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)

        return res.status(200).json({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
    }
    return res.status(404).json({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan'
    })
}

module.exports = { getAll, create, getOne, update, remove }
