import React, { useState } from 'react'
import Cuisines from './Cuisines'
import './search.css'
import { FaSearch } from 'react-icons/fa'

// Search page: live, case-insensitive filtering of cuisines/foods
const Search = () => {
  const [query, setQuery] = useState('')

  return (
    <div className='searchPage'>
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search For Restaurant and Foods'
          aria-label="Search foods"
        />
        <div className="searchIcon"><FaSearch/></div>
      </div>
      <h3 className='res'>Popular Cuisines</h3>
      <Cuisines query={query} />
    </div>
  )
}

export default Search