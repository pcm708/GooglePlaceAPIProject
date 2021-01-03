import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import pkg from 'chai';
const { expect } = pkg;

const TOKEN = process.env.USER_TOKEN;

describe('Users', function() {
  let id;
  const data = {
    status: 'Active',
    name: `Lovely - ${Math.floor(Math.random() * 9999)}`,
  };

  it('POST /users', () => {
    const data1 = {
      email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
      name: 'Test name',
      gender: 'Male',
      status: 'Inactive',
    };

    return request
      .post('users')
      .set('Authorization', `Bearer 3bec2408735ac737bc83d82cf168814351d23ecc3c937adff784ba7cbda5947b`)
      .send(data1)
      .then((res) => {
        console.log(res.body);
        id=res.body.data.id;
        expect(res.body.data).to.deep.include(data1);
      });
  });

  it('PUT /users/:id', () => {
    return request
      .put(`users/${id}`)
      .set('Authorization', `Bearer 3bec2408735ac737bc83d82cf168814351d23ecc3c937adff784ba7cbda5947b`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('GET /users/:id', () => {
    return request
      .get(`users/${id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.code).to.be.eq(200);
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('DELETE /users/:id', () => {
    return request
      .delete(`users/${id}`)
      .set('Authorization', `Bearer 3bec2408735ac737bc83d82cf168814351d23ecc3c937adff784ba7cbda5947b`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.be.eq(null);
        expect(res.body.code).to.be.eq(204);
      });
  });
});
