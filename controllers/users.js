const users = require('../MOCK_DATA.json')
// const User = require('../models/user')
const fs = require('fs');

const handleAllUser = async (req, res) => {
    return res.json(users)
}

const handleSearchUser = async (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
}

const handleEditUser = async (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    } else {
        const updatedUser = req.body;
        users[users.indexOf(user)] = { id: user.id, ...updatedUser }
        fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                console.log(err)
            }
            return res.json({ message: 'Updated user' })
        })
    }
}

const handelDeleteUser = async (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    } else {
        users.splice(users.indexOf(user), 1)
        fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                console.log(err)
            }
            return res.json({ message: 'Deleted user' })
        })
    }
}

const handleAddUser = async (req, res) => {
    const user = req.body;
    console.log(user);
    users.push({ id: users.length + 1, ...user });
    fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            console.log(err)
        }
        return res.status(201).json({ id: users.length, message: 'User created' })
    })
}

module.exports = {
    handleAllUser,
    handleSearchUser,
    handleEditUser,
    handelDeleteUser,
    handleAddUser
}