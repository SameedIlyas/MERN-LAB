// BookTableRow.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class BookTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
  }

  deleteBook() {
    axios
      .delete("http://localhost:4000/books/delete-book/" + this.props.obj._id)
      .then((res) => {
        console.log("Book successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.isbn}</td>
        <td>{this.props.obj.pageCount}</td>
        <td>{this.props.obj.authors.join(", ")}</td>
        <td>{this.props.obj.categories.join(", ")}</td>
        <td>
          <Link
            className="edit-link"
            to={"/edit-book/" + this.props.obj._id}
          >
            Edit
          </Link>
          <Button onClick={this.deleteBook} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
