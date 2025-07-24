import React from 'react';
import './BooksPage.css';

const BooksPage = () => {
  const books = [
    {
      title: "Portraits of Courage: A Commander in Chief's Tribute to America's Warriors",
      image: "https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/Decision%20Points_High%20Res.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:776,h:388,cg:true",
      description: "A vibrant collection of oil paintings and stories by President George W. Bush honoring the sacrifice and courage of America's military veterans. President Bush has painted the portraits of 98 warriors who have served our nation with honor since 9/11, and whom he has come to know personally.",
      link: "https://www.amazon.com/Portraits-Courage-Commander-Americas-Warriors/dp/0804189765"
    },
    {
      title: "Out of Many, One: Portraits of America's Immigrants",
      image: "https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/Decision%20Points_High%20Res.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:776,h:388,cg:true",
      description: "In this powerful collection of oil paintings and stories, President George W. Bush spotlights the inspiring journeys of America's immigrants and the positive contributions they make to the life and prosperity of our nation.",
      link: "https://www.amazon.com/Out-Many-One-Portraits-Immigrants/dp/0593136969"
    },
    {
      title: "Decision Points",
      image: "https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/Decision%20Points_High%20Res.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:776,h:388,cg:true",
      description: "Decision Points is the extraordinary memoir of America's 43rd president. Shattering the conventions of political autobiography, George W. Bush offers a strikingly candid journey through the defining decisions of his life.",
      link: "https://www.amazon.com/Decision-Points-George-W-Bush/dp/0307590615"
    }
  ];

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>BOOKS</h1>
      </div>
      
      <div className="container">
        <div className="books-section">
          <div className="row">
            {books.map((book, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="book-card">
                  <div className="book-image">
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className="book-details">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-description">{book.description}</p>
                    <a href={book.link} className="book-link" target="_blank" rel="noopener noreferrer">
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage; 