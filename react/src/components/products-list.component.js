import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class productsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchRating = this.onChangeSearchRating.bind(this);

    this.onChangeSearchMinPrice = this.onChangeSearchMinPrice.bind(this);
    this.onChangeSearchMaxPrice = this.onChangeSearchMaxPrice.bind(this);
    this.searchFilters = this.searchFilters.bind(this);

    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);

    this.state = {
        products: [],
        currentProduct: null,
        currentIndex: -1,
        searchTitle: "",
        searchRating: null,
        searchMinPrice: null,
        searchMaxPrice: null
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    ProductDataService.getAll()
    .then(response => {
        this.setState({
            products: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
        currentProduct: null,
        currentIndex: -1
    });
  }

  setActiveProduct(product, index) {
    this.setState({
        currentProduct: product,
        currentIndex: index
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
    .then(response => {
        console.log(response.data);
        this.refreshList();
    })
    .catch(e => {
        console.log(e);
    });
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
        searchTitle: searchTitle
    });
  }

  onChangeSearchRating(e) {
    const searchRating = parseInt(e.target.value);

    this.setState({
        searchRating: searchRating
    });
  }

  onChangeSearchMinPrice(e) {
    const searchMinPrice = parseFloat(e.target.value);

    this.setState({
        searchMinPrice: searchMinPrice
    });
  }

  onChangeSearchMaxPrice(e) {
    const searchMaxPrice = parseFloat(e.target.value);

    this.setState({
        searchMaxPrice: searchMaxPrice
    });
  }

  searchFilters() {
    this.setState({
        currentProduct: null,
        currentIndex: -1
    });

    ProductDataService.findByFilters(this.state.searchTitle, this.state.searchRating, this.state.searchMinPrice, this.state.searchMaxPrice)
        .then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }


  render() {
    const { products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                onChange={this.onChangeSearchTitle}
            />
            </div>
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by rating"
                onChange={this.onChangeSearchRating}
            />
            </div>
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by min price"
                onChange={this.onChangeSearchMinPrice}
            />
            <input
                type="text"
                className="form-control"
                placeholder="Search by max price"
                onChange={this.onChangeSearchMaxPrice}
            />
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFilters}
              >
                Search
              </button>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Product List</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProduct.title}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentProduct.category}
              </div>
              <div>
                <label>
                  <strong>Color:</strong>
                </label>{" "}
                {currentProduct.color}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                ${currentProduct.price}
              </div>
              <div>
                <label>
                  <strong>rating:</strong>
                </label>{" "}
                {currentProduct.rating} Stars
              </div>

              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>

              <div className="mt-2">
                <img src={"../sources/" + currentProduct.url} class="img-thumbnail"/>
              </div>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
