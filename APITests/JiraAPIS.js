import supertest from 'supertest';
const request = supertest('http://localhost:8080');

import pkg from 'chai';
const { expect } = pkg;

describe('Jira APIs', function() {
  let sessionId;
  let id;
  let key;
  it('Auth /Login', () => {
    const auth = {
      username: `pmathpal708`,
      password: `Jira12345`,
    };

    return request
      .post('/rest/auth/1/session')
      .send(auth)
      .then((res) => {
        sessionId=res.body.session.value;
        expect(res.status).to.be.eq(200);
      });
  });

  it('Post /Issue', () => {
    const _project={
      key: "RAT"
    }

    const _issuetype={
      name: "Bug"
    }

    const _fields={
      project: _project,
      summary: "Issue#1 Created",
      description: "Creating of an issue using project keys and issue type names using the REST API",
      issuetype: _issuetype,
    }

    const issueBody={
      fields: _fields,
    };

    return request
      .post(`/rest/api/2/issue`)
      .set(`cookie`, `JSESSIONID=${sessionId}`)
      .send(issueBody)
      .then((res) => {
        id= res.body.id;
        key= res.body.key;
        expect(res.status).to.be.eq(201);
      });
  });

  it('GET /issue/:id', () => {
    return request
      .get(`/rest/api/2/issue/${id}/editmeta`)
      .set(`cookie`,`JSESSIONID=${sessionId}`)
      .then((res) => {
        expect(res.status).to.be.eq(200);
      });
  });

  it('DELETE /issue/:id', () => {
    return request
      .delete(`/rest/api/2/issue/${id}`)
      .set(`cookie`,`JSESSIONID=${sessionId}`)
      .then((res) => {
        expect(res.status).to.be.eq(204);
      });
  });

  it('GET /issue/to verify if the issue has been deleted successfully', () => {
    return request
      .get(`/rest/api/2/issue/${id}/editmeta`)
      .set(`cookie`,`JSESSIONID=${sessionId}`)
      .then((res) => {
        expect(res.status).to.be.eq(404);
      });
  });
});
