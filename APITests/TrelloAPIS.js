const request = supertest('https://api.trello.com/1/boards');
import supertest from 'supertest';
import env from 'dotenv';
import faker from 'faker';
import pkg from 'chai';
const { expect } = pkg;
env.config();

describe('Trello APIs', function() {
  let token = process.env.USER_TOKEN;
  let apiKey = process.env.API_KEY;
  let id;

  it('POST /Board', async () => {
    const res = await request
      .post(`/?key=${apiKey}&token=${token}&name=${faker.company.companyName()}`);
    id = res.body.id;
    console.log(res.body);
    expect(res.status).to.be.eq(200);
  });

  it('GET /board',async () => {
    const res= await request
      .get(`/${id}?key=${apiKey}&token=${token}`)
      .then((res) => {
        console.log(`Background Color: ${res.body.prefs.backgroundColor}`);
        expect(res.status).to.be.eq(200);
      });
  });

  it('DELETE /board', async() => {
    const res= await request
      .delete(`/${id}?key=${apiKey}&token=${token}`)
      .then((res) => {
        expect(res.status).to.be.eq(200);
      });
  });

});
