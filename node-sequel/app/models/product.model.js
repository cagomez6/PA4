module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      rating: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false
      });
  
    return Product;
  };