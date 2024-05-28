// cargar la conexion del grupo MySQL
const pool = require('../data/config');
const bcrypt = require('bcrypt');

// Ruta de la app
const router = app => {
    // Mostrar mensaje de bienvenida de root
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API!'
        });
    });

    // Mostrar todos los usuarios
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Mostrar un solo usuario por ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Agregar un nuevo usuario con contraseña encriptada
    app.post('/users', async (request, response) => {
        const { username, password } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query('INSERT INTO users SET ?', { username, password: hashedPassword }, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Actualizar un usuario existente
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully.');
        });
    });

    // Eliminar un usuario
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });

//********************************************************************************* */
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query('INSERT INTO users SET ?', { username, password: hashedPassword }, (error, result) => {
        if (error) return res.status(500).send({ message: 'Ocurrio un error al crear al usuario' });
        res.status(201).send({ message: 'User created' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    pool.query('SELECT * FROM users WHERE username = ?', username, async (error, results) => {
        if (error) return res.status(500).send({ message: 'Error logging in' });

        if (results.length === 0) {
            return res.status(401).send({ message: 'Contraseña o usuario incorrectos' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({ message: 'Contraseña o usuario incorrectos' });
        }

        res.status(200).send({ message: 'Ingresando' });
    });
});
//********************************************************************************** */

};

// Exportar el router
module.exports = router;
