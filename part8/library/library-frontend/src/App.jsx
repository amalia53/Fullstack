import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const authorRes = useQuery(ALL_AUTHORS);
  const bookRes = useQuery(ALL_BOOKS);

  if (authorRes.loading || bookRes.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authorRes.data.allAuthors} />

      <Books show={page === "books"} books={bookRes.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
