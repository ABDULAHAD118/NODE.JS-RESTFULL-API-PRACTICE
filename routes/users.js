const express = require('express');
const { handleSearchUser, handleEditUser, handelDeleteUser, handleAddUser, handleAllUser } = require('../controllers/users');
const router = express.Router();


router.route('/')
    .get(handleAllUser)
    .post(handleAddUser)

router.route('/:id')
    .get(handleSearchUser)
    .patch(handleEditUser)
    .delete(handelDeleteUser)


module.exports = router
