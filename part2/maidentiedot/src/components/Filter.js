const Filter = (countries, search) => {
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase()))
  return filtered
}

export default Filter