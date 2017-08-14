const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount rerturn number of posts', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'PostTitle' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
