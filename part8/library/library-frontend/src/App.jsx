import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';

import { gql, useQuery } from '@apollo/client';

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
      author {
        name
      }
      published
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const authorRes = useQuery(ALL_AUTHORS);
  const bookRes = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  if (authorRes.loading || bookRes.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </div>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorRes.data.allAuthors}
        token={token}
      />

      <Books show={page === 'books'} books={bookRes.data.allBooks} />

      <Login show={page === 'login'} setToken={setToken} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
