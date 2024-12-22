// CreateBook.js
import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onChangeBookIsbn = this.onChangeBookIsbn.bind(this);
    this.onChangeBookPageCount = this.onChangeBookPageCount.bind(this);
    this.onChangeBookAuthors = this.onChangeBookAuthors.bind(this);
    this.onChangeBookCategories = this.onChangeBookCategories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      isbn: '',
      pageCount: '',
      authors: '',
      categories: ''
    };
  }

  onChangeBookTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeBookIsbn(e) {
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
      authors: this.state.authors.split(','),
      categories: this.state.categories.split(',')
    };

    axios.post('http://localhost:4000/books/create-book', bookObject)
      .then(res => console.log(res.data));

    this.setState({
      title: '',
      isbn: '',
      pageCount: '',
      authors: '',
      categories: ''
    });

    this.props.history.push('/book-list');
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={this.state.title} onChange={this.onChangeBookTitle} />
          </Form.Group>

          <Form.Group controlId="ISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" value={this.state.isbn} onChange={this.onChangeBookIsbn} />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control type="number" value={this.state.pageCount} onChange={this.onChangeBookPageCount} />
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors (comma-separated)</Form.Label>
            <Form.Control type="text" value={this.state.authors} onChange={this.onChangeBookAuthors} />
          </Form.Group>

          <Form.Group controlId="Categories">
            <Form.Label>Categories (comma-separated)</Form.Label>
            <Form.Control type="text" value={this.state.categories} onChange={this.onChangeBookCategories} />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create Book
          </Button>
        </Form>
      </div>
    );
  }
}
