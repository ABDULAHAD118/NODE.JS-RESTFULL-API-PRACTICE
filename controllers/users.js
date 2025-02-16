const User = require('../models/users')

const handleAllUser = async (req, res) => {
    // const allUsers = await User.find({});
    return res.json({ message: "Working Good" })
}

const handleSearchUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
}

const handleEditUser = async (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    } else {
        const dbUser = await User.findOne({ email: updatedUser.email })
        if (dbUser) {
            return res.json({ message: "Email Already Used!" })
        }
        else {
            const result = await User.updateOne({
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                job_title: updatedUser.job_title
            })
            return res.json({ id: result._id, message: "User Updated Successfully!" })
        }
    }
}

const handelDeleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    } else {
        return res.json({ message: 'User deleted' })
    }
}

const handleAddUser = async (req, res) => {
    const body = req.body;
    if (body.first_name && body.last_name && body.email && body.gender && body.job_title) {
        const dbUser = await User.findOne({ email: body.email })
        if (dbUser) {
            return res.json({ message: "Email Already Used!" })
        }
        else {
            const result = await User.create({
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                gender: body.gender,
                job_title: body.job_title
            })
            return res.status(201).json({ id: result._id, message: 'User created Successfully!' })
        }
    }
    else {
        return res.json({ message: "Send all required fields!" })
    }
}

module.exports = {
    handleAllUser,
    handleSearchUser,
    handleEditUser,
    handelDeleteUser,
    handleAddUser
}