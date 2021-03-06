import request from 'supertest';
import app, { server } from '../src/app';
import { accountify } from '../src/controllers/user.controller';
import { Routes as Account } from '../src/data/routes'


const timeout = 20000

describe('Account routes', () => {

  afterAll((done) => {
    server.close()
    done()
  });

  test('home route return a 2000', async (done) => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200);
    done()
  }, timeout);

  test('login route returns a 2000', async (done) => {
    const res = await request(app).get(accountify(Account.login))
    expect(res.status).toBe(200);
    done()
  }, timeout);

  test('register route returns a 2000', async (done) => {
    const res = await request(app).get(accountify(Account.register))
    expect(res.status).toBe(200);
    done()
  }, timeout);

  test('contact route returns a 2000', async (done) => {
    const res = await request(app).get('/contact')
    expect(res.status).toBe(200);
    done()
  }, timeout);

  test('about page returns a 2000', async (done) => {
    const res = await request(app).get('/about')
    expect(res.status).toBe(200);
    done()
  }, timeout)

  test('pricing page returns a 2000', async (done) => {
    const res = await request(app).get('/pricing')
    expect(res.status).toBe(200);
    done()
  }, timeout);

  test('incorrect route', async (done) => {
    const res = await request(app).get('/4084084ng')
    expect(res.status).toBe(404);
    done()
  }, timeout);


  test('redirect user after login', async (done) => {
    const res = await request(app)
      .post(accountify(Account.login))
      .send({ email: 'test@test.com', password: 'test1' })
      .set('Accept', 'application/json')

    expect(res.redirect).toBe(true);
    done()
  }, timeout);

  test('go to user profile after login', async (done) => {
    const res = await request(app)
      .post(accountify(Account.login))
      .send({ email: 'test@test.com', password: 'test' })
      .set('Accept', 'application/json')

    expect(res.redirect).toBe(true);
    expect(res.status).toBe(302);
    done()
  }, timeout);

  test('does not to user profile after login', async (done) => {
    const res = await request(app)
      .post(accountify(Account.login))
      .send({ email: 'test@test.com', password: 'test' })
      .set('Accept', 'application/json')

    expect(res.redirect).toBe(true);
    expect(res.status).toBe(302);
    done()
  }, timeout);


  test('logs user out sucessfully', async (done) => {
    const res = await request(app).get(accountify(Account.logout))
    expect(res.redirect).toBe(true);
    done()
  }, timeout);
})