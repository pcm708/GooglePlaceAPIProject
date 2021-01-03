import supertest from 'supertest';
const request = supertest('https://rahulshettyacademy.com/maps/api/place');
import env from 'dotenv';
import faker from 'faker';
import pkg from 'chai';
const { expect } = pkg;
env.config();

describe('Google Place API Test', ()=> {

  let key = process.env.KEY;
  let id;
  const _location={
    lat: faker.random.number(),
    lng: faker.random.number(),
  }
  const _types=[];
    _types.push(faker.name.jobType());
    _types.push(faker.name.jobType());

  const postBody = {
    location: _location,
    accuracy: faker.random.number(),
    name: faker.name.firstName(),
    phone_number: faker.random.number(),
    address: faker.address.secondaryAddress(),
    types: _types,
    website: faker.internet.domainName(),
    language: faker.internet.userAgent(),
  };

  it('POST a new place in map', async () => {
    const res = await request
      .post('/add/json')
      .query("key", key)
      .send(postBody);
    console.log(res.body);
    id = res.body.place_id;
    expect(res.body.status).to.include("OK");
    console.log("Place ID Fetched: " + id);
  });

  it(`GET place from map database`, async () => {
    const res = await request
      .get(`/get/json`)
      .set("key", key)
      .set("place_id", "999a17049c7b2a4511db050ded5a7bca");
    console.log("Get response: ");
    console.log(res.status);
});

  it('DELETE /place', async () => {
    const data2={
      place_id: id,
    };

    const res = await request
      .delete(`/delete/json`)
      .query("key", "qaclick123")
      .send(data2);
    console.log(res.body);
    expect(res.body.status).to.be.eq("OK");
  });

  it(`GET place from map database, (but it already deleted)`, async () => {
      const res = await request
      .get(`/get/json`)
      .query("key", key)
      .query("place_id", `${id}`);
    console.log(res.body);
    expect(res.body.msg).to.include("Get operation failed, looks like place_id  doesn't exists");
  });
});