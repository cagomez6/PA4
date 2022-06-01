import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
        id: null,
        title: "",
        category: "Men",
        color: "",
        price: 0,
        rating: 1, 
        url: "",
	
	submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
        title: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
        category: e.target.value
    });
  }

  onChangeColor(e) {
    this.setState({
        color: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
        price: parseFloat(e.target.value)
    });
  }

  onChangeRating(e) {
    this.setState({
        rating: parseInt(e.target.value)
    });
  }

  onChangeUrl(e) {
    this.setState({
        url: e.target.value
    });
  }

  saveProduct() {
    var data = {
        title: this.state.title,
        category: this.state.category,
        color: this.state.color,
        price: this.state.price,
        rating: this.state.rating,
        url: this.state.url
    };

    ProductDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                category: response.data.category,
                color: response.data.color,
                price: response.data.price,
                rating: response.data.rating,
                url: response.data.url,
                
                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  newProduct() {
    this.setState({
        id: null,
        title: "",
        category: "",
        color: "",
        price: 0,
        rating: 0, 
        url: "",

        submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                />
            </div>

            <div className="form-group">
                <label htmlfor="category">Category</label>
                <select 
                    class="form-control"
                    value={this.state.category} 
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
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    required
                    value={this.state.color}
                    onChange={this.onChangeColor}
                    name="color"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    required
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    name="price"
                />
            </div>

            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select 
                    class="form-control"
                    value={this.state.rating} 
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
                    value={this.state.url}
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

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
