const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add subdocument to an existing record', (done) => {
    const joe = new User({
      name: 'joe',
      post: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        user.posts.push({ title: 'NewPost' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'NewPost');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'NewTitle' }]
    });
    joe.save()
    .then(() => User.findOne({ name: 'joe' }))
    .then((user) => {
      user.posts[0].remove();
      return user.save()
    })
    .then(() => User.findOne({ name: 'joe' }))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })

  })
});
