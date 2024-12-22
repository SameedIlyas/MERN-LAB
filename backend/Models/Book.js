module.exports = (booksDB) => {
    const Schema = require('mongoose').Schema;
  
    let bookSchema = new Schema({
      title: {
        type: String,
        required: true
      },
      isbn: {
        type: String,
        required: true
      },
      pageCount: {
        type: Number
      },
      publishedDate: {
        type: Date
      },
      thumbnailUrl: {
        type: String
      },
      shortDescription: {
        type: String
      },
      longDescription: {
        type: String
      },
      status: {
        type: String,
        enum: ['PUBLISH', 'DRAFT', 'ARCHIVED'], // Add more statuses if needed
        default: 'PUBLISH'
      },
      authors: [
        {
          type: String
        }
      ],
      categories: [
        {
          type: String
        }
      ]
    }, {
      collection: 'books'
    });
  
    // Use the booksDB connection
    return booksDB.model('Book', bookSchema);
  };
