import { useState } from 'react';
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';

/* eslint-disable react/prop-types */
const Authors = (props) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      console.log(error);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return { allAuthors: allAuthors.concat(response.data.editAuthor) };
      });
    },
    // refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();
    const setBornTo = birthyear;
    updateAuthor({ variables: { name, setBornTo } });

    setName('');
    setBirthyear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <div>
          <h3>set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
              <select onChange={({ target }) => setName(target.value)}>
                {authors.map((author) => (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                type='number'
                value={birthyear}
                onChange={({ target }) => setBirthyear(Number(target.value))}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
