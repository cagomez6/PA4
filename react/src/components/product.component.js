import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
        currentProduct: {
            id: null,
            title: "",
            category: "",
            color: "",
            price: 0,
            rating: 0, 
            url: ""
      },
      message: ""
    };
  }

  componentDidMount() {
      this.getProduct(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            title: title
        }
    }));
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            category: category
        }
    }));
  }

  onChangeColor(e) {
    const color = e.target.value;

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            color: color
        }
    }));
  }

  onChangePrice(e) {
    const price = parseFloat(e.target.value);

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            price: price
        }
    }));
  }

  onChangeRating(e) {
    const rating = parseInt(e.target.value);

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            rating: rating
        }
    }));
  }

  onChangeUrl(e) {
    const url = e.target.value;

    this.setState(prevState => ({
        currentProduct: {
            ...prevState.currentProduct,
            url: url
        }
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
    .then(response => {
        this.setState({
            currentProduct: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }

  updateProduct() {
    ProductDataService.update(
        this.state.currentProduct.id,
        this.state.currentProduct
    )
    .then(response => {
        console.log(response.data);
        this.setState({
            message: "The product was updated successfully!"
        });
    })
    .catch(e => {
        console.log(e);
    });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
    .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
    })
    .catch(e => {
        console.log(e);
    });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentProduct.title}
                        onChange={this.onChangeTitle}
                        name="title"
                    />
                </div>

                <div className="form-group">
                    <label htmlfor="category">Category</label>
                    <select 
                        class="form-control"
                        value={currentProduct.category} 
                        onChange={this.onChangeCategory}
                        name="category" 
                        id="category"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        required
                        value={currentProduct.price}
                        onChange={this.onChangePrice}
                        name="price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select 
                        class="form-control"
                        value={currentProduct.rating} 
                        onChange={this.onChangeRating}
                        name="rating" 
                        id="rating"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="url">Url</label>
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        required
                        value={currentProduct.url}
                        onChange={this.onChangeUrl}
                        name="url"
                    />
                </div>

                <form
                    action='http://localhost:8080/api/products/upload' 
                    method='post' 
                    encType="multipart/form-data"
                    class="form-inline">
                    <div class="form-group">
                        <input type="file" class="form-control-file" name="file"/>
                        <button type="submit" className="btn btn-primary mt-2">Upload</button>
                    </div>
                </form> 

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}
