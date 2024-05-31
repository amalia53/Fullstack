const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");

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
    allBooks: async (root, args) => Book.find({}).populate("author"),
    //   {
    //   let res =
    //     args.author === undefined
    //       ? books
    //       : books.filter((book) => book.author === args.author);
    //   res =
    //     args.genre === undefined
    //       ? res
    //       : res.filter((book) => book.genres.includes(args.genre));
    //   return res;
    // }
  },
  Author: {
    bookCount: async (root) =>
      Book.find({}).filter((book) => book.author === root.name).length,
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
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            e,
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
          code: "BAD_USER_INPUT",
          invalidArgs: args,
          e,
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      // const authorToEdit = authors.find((author) => author.name === args.name);
      const authorToEdit = await Author.findOne({ name: args.name });
      authorToEdit.born = args.setBornTo;
      return authorToEdit.save();
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
