require('dotenv').config()
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT
const users = require('./MOCK_DATA.json')

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <ul>
        ${users.map(user => `<li> User ID ${user.id}</li>
            <li>User Name ${user.first_name} ${user.last_name}</li>
            <li>User Email ${user.email}</li>`).join('')}
        </ul>
        `);
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.route('/api/user/:id')
    .get((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    })
    .patch((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            const updatedUser = req.body;
            users[users.indexOf(user)] = { id: user.id, ...updatedUser }
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
                if (err) {
                    console.log(err)
                }
                return res.json({ message: 'Updated user' })
            })
        }
    })
    .delete((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            users.splice(users.indexOf(user), 1)
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
                if (err) {
                    console.log(err)
                }
                return res.json({ message: 'Deleted user' })
            })
        }
    })

app.post('/api/user', (req, res) => {
    const user = req.body;
    users.push({ id: users.length + 1, ...user });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            console.log(err)
        }
        return res.json({ id: users.length, message: 'User created' })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`)
})