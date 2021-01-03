import supertest from 'supertest';
const request = supertest('http://216.10.245.166/Library');

import pkg from 'chai';
const { expect } = pkg;

describe('Library API Test', function() {
  let id;
  const data1 = {
    name: `Library APIs Book`,
    isbn: `${Math.floor(Math.random() * 9999)}`,
    aisle: `${Math.ceil(Math.random() * 9999)}`,
    author: 'John F. Kenneddy',
  };

  it('POST /book', () => {
    return request
      .post('/Addbook.php')
      .send(data1)
      .then((res) => {
        console.log("Post Response:");
        console.log(res.body);
        id=res.body.ID;
        expect(res.body.Msg).to.include("successfully added");
      });
  });

  it('GET /book by Author name', () => {
    let array=[];
    let responseObj={
      book_name: null,
      isbn: null,
      aisle: null,
    };

    return request
      .get(`/GetBook.php?AuthorName=${data1.author}`)
      .then((res) => {
        console.log ("Get method Response:");
        console.log (res.body);
        array= res.body;
        console.log("\nResponse Body:");
        console.log(array);
        console.log("\nFirst Index of response body:");
        console.log(array[0]);
        console.log("\nFirst Book Name:");
        console.log(array[0].book_name);
        responseObj= array[0];
        expect(responseObj.isbn).to.be.eq("1942");
        responseObj= array[1];
        expect(responseObj.isbn).to.be.eq("1409");
      });
  });

  it('DELETE /book', () => {
    const data2={
        ID: `${id}`,
    };

    console.log("BookID: "+data2.ID);
    return request
      .delete(`/DeleteBook.php`)
      .send(data2)
      .then((res) => {
        console.log(res.body);
        console.log(res.status);
        expect(res.body.msg).to.be.eq("book is successfully deleted");
      });
  });
});