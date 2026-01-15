const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    // Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message);
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Sequelize unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Resource already exists' });
    }

    // Sequelize foreign key constraint errors
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ error: 'Invalid reference to related resource' });
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
