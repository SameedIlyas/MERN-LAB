// EditBook.js
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onChangeBookISBN = this.onChangeBookISBN.bind(this);
    this.onChangeBookPageCount = this.onChangeBookPageCount.bind(this);
    this.onChangeBookAuthors = this.onChangeBookAuthors.bind(this);
    this.onChangeBookCategories = this.onChangeBookCategories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      isbn: "",
      pageCount: "",
      authors: "",
      categories: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/books/edit-book/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          pageCount: res.data.pageCount,
          authors: res.data.authors.join(", "),
          categories: res.data.categories.join(", "),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeBookTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeBookISBN(e) {
    this.setState({ isbn: e.target.value });
  }

  onChangeBookPageCount(e) {
    this.setState({ pageCount: e.target.value });
  }

  onChangeBookAuthors(e) {
    this.setState({ authors: e.target.value });
  }

  onChangeBookCategories(e) {
    this.setState({ categories: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookObject = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: this.state.pageCount,
      authors: this.state.authors.split(",").map((author) => author.trim()),
      categories: this.state.categories
        .split(",")
        .map((category) => category.trim()),
    };

    axios
      .put(
        "http://localhost:4000/books/update-book/" +
          this.props.match.params.id,
        bookObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Book successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    this.props.history.push("/book-list");
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeBookTitle}
            />
          </Form.Group>

          <Form.Group controlId="ISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={this.state.isbn}
              onChange={this.onChangeBookISBN}
            />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              value={this.state.pageCount}
              onChange={this.onChangeBookPageCount}
            />
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.authors}
              onChange={this.onChangeBookAuthors}
            />
          </Form.Group>

          <Form.Group controlId="Categories">
            <Form.Label>Categories (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.categories}
              onChange={this.onChangeBookCategories}
            />
          </Form.Group>

          <Button
            variant="primary"
            size="lg"
            block="block"
            type="submit"
          >
            Update Book
          </Button>
        </Form>
      </div>
    );
  }
}
