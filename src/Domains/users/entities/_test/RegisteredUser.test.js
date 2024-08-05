const RegisteredUser = require('../RegisteredUser');

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // action and assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // arrange
    const payload = {
      id: 123,
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // action and assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registeredUser object correctly', () => {
    // arrange
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // action
    const registeredUser = new RegisteredUser(payload);

    // assert
    expect(registeredUser.id).toStrictEqual(payload.id);
    expect(registeredUser.username).toStrictEqual(payload.username);
    expect(registeredUser.fullname).toStrictEqual(payload.fullname);
  });
});
