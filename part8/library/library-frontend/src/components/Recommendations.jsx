import { useQuery } from '@apollo/client';
import { FAVORITE_GENRE, ALL_BOOKS_OF_GENRE } from '../queries';

const Recommendations = (props) => {
  const genreRes = useQuery(FAVORITE_GENRE);

  const favGenre = genreRes.data ? genreRes.data.me.favoriteGenre : null;

  const booksRes = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre: favGenre },
  });

  if (!props.show) {
    return null;
  }

  const recs = booksRes.data.allBooks;

  return (
    <div>
      <h2>Recommended for you</h2>
      <p>
        Books in your favorite genre <b>{favGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recs.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
