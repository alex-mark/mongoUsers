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
      })
  });
});
