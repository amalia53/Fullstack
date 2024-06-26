import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (name !== "") {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          setCountry(response);
          setFound(true);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setFound(false);
          }
        });
    }
  }, [name]);
  if (!country) {
    return null;
  }

  return { country, found };
};

const Country = ({ country, found }) => {
  if (!found) {
    console.log("not found");
    return <div>not found...</div>;
  }

  if (!country) {
    return null;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, found } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} found={found} />
    </div>
  );
};

export default App;
