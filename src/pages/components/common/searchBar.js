import Router from 'next/router';
import { useState } from 'react';

function SearchBar() {
      const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');

      const onChangeInput = (event) => {
            setSearchTerm(event.target.value);
      }

      const searchOnSubmit = (e) => {
            e.preventDefault();
            Router.push({ pathname: '/search', query: { q: searchTerm } });
      }

      const searchOpenHandler = () => {
            setIsSearchOpen(!isSearchOpen);
      }

      return (
            <>
                  <div className={`searchicon ${isSearchOpen ? 'search-active' : ''}`} onClick={searchOpenHandler}></div>
                  <div className={`searchform ${isSearchOpen ? 'searchform-active' : ''}`}>
                        <form id='searchform' action="/search" method="get" onSubmit={searchOnSubmit}>
                              <input type="text" name="s" id='search' value={searchTerm} placeholder='Search...' className='search-input' required autoFocus="autofocus" onChange={onChangeInput} />
                              <input type="submit" value="" id="search-btn" className="search-btn" />
                        </form>
                  </div>
            </>
       );
}

export default SearchBar;