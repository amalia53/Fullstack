import { useQuery } from '@apollo/client';
import { FAVORITE_GENRE } from '../queries';

const Recommendations = (props) => {
  const res = useQuery(FAVORITE_GENRE);
  if (!props.show) {
    return null;
  }

  const favGenre = res.data.me.favoriteGenre;

  const recs = props.books.filter((book) => book.genres.includes(favGenre));

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
