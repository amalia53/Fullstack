import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS_OF_GENRE } from '../queries';

const Books = (props) => {
  const [filter, setFilter] = useState(null);

  const bookRes = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre: filter },
  });

  if (!props.show) {
    return null;
  }

  const books = filter && bookRes.data ? bookRes.data.allBooks : props.books;

  let genres = [];
  for (const book of props.books) {
    for (const genre of book.genres) {
      if (!genres.includes(genre)) genres = genres.concat(genre);
    }
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button key={'all'} onClick={() => setFilter(null)}>
        all genres
      </button>
    </div>
  );
};

export default Books;
