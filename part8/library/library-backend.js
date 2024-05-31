const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");
const { graphql } = require("graphql");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    ): Book!
  }
  type Mutation {
    editAuthor(
    name: String!
    setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      let res =
        args.author === undefined
          ? books
          : books.filter((book) => book.author.name === args.author);
      res =
        args.genre === undefined
          ? res
          : res.filter((book) => book.genres.includes(args.genre));
      return res;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author");
      const booksByAuthor = books.filter(
        (book) => book.author.name === root.name
      );
      return booksByAuthor.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorFound = await Author.findOne({ name: args.author });
      const author = authorFound
        ? authorFound
        : new Author({ name: args.author, id: uuid() });
      if (!authorFound) {
        try {
          console.log("adding new author: ", author);
          await author.save();
        } catch (e) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              e,
            },
          });
        }
      }
      const book = new Book({
        ...args,
        author: author,
      });
      try {
        await book.save();
      } catch (e) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            e,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name });
      authorToEdit.born = args.setBornTo;
      try {
        await authorToEdit.save();
      } catch (error) {
        throw new GraphQLError("Editing failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
