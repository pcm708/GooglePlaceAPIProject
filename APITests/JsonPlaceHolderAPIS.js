import supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

import pkg from 'chai';
const { expect } = pkg;

describe('JSon Place Holder APIs', function() {

  it('GET list of ToDos', () => {
    return request
      .get(`/todos`)
      .then((res) => {
        let array=[];
        array=res.body;
        console.log(res.body[0].userId);
        console.log(`Total number of ToDos: ${array.length}`);
        expect(res.status).to.be.eq(200);
      });
  });
});
