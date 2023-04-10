import React from 'react'
import './pagination.css'
const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <div className='pagination'>
          {pageNumbers.map(number => (
              <button className={number ==currentPage?"active":""} key={number} onClick={() => paginate(number)} >
                {number}
              </button>
            
          ))}
        </div>
      </nav>
    );
}

export default Pagination
