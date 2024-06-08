import { useState } from 'react';

const Books = (props) => {
  const [filter, setFilter] = useState(null);

  if (!props.show) {
    return null;
  }

  const books = filter
    ? props.books.filter((book) => book.genres.includes(filter))
    : props.books;

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
