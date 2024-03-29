const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Product
    const product = {
        title: req.body.title,
        category: req.body.category,
        color: req.body.color,
        price: req.body.price,
        rating: req.body.rating,
        url: req.body.url
    };

    // Save Product in the database
    Product.create(product)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition1 = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const rating = req.query.rating;
    var condition2 = rating ? { rating: { [Op.eq]: rating } } : null;

    const min = req.query.min;
    const max = req.query.max
    var condition3 = (min && max) ? { price: { [Op.between]: [min, max] } } : null;

    Product.findAll({ where: { [Op.and]: [condition1, condition2, condition3] } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Product with id=" + id
        });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product with id=" + id
        });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Product with id=" + id
        });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all products."
        });
    });
};

exports.upload = (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
  
    const file = req.files.file;

    var path = require('path');
  
    file.mv(path.join(__dirname, '../../../react/public/sources/' + file.name), function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
};
