const express = require('express');
const cors = require('cors');
const ApiError = require('./api-error');

const app = express();
const contactController = require('./controllers/contact.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
    });
app.route('/api/contacts')
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);
app.route('/api/contacts/favorite').get(contactController.findAllFavorite);
app.route('/api/contacts/:id')
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.delete);

// Handle 404 response.
app.use((req, res, next) => {
    // Handler for unknown route.
    // Call next() to pass to the error handling middleware.
    return next(new ApiError(404, 'Resource not found'));
    });
    // Define error-handling middleware last, after other app.use() and routes
    calls.
    app.use((error, req, res) => {
        return res.status(error.statusCOde || 500).json({
            message: error.message || 'Internal Server Error',
        });
    });

module.exports = app;
