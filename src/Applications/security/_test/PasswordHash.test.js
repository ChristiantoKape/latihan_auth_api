const PasswordHash = require('../PasswordHash');

describe('Passwordhash interface', () => {
  it('should throw error when invocke abstract behavior', async () => {
    // arrange
    const passwordHash = new PasswordHash();

    // action and assert
    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});