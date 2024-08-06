const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepostioryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username not available', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding' });
      const userRepositoryPostgres = new UserRepostioryPostgres(pool, {});

      // action & assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      // arrange
      const userRepositoryPostgres = new UserRepostioryPostgres(pool, {});

      // action & assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user', async () => {
      const createdAt = new Date().toISOString();

      // arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
        created_at: createdAt,
        updated_at: createdAt,
      });
      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepostioryPostgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);

      // assert
      const user = await UsersTableTestHelper.findUserById('user-123');
      expect(user).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      const createdAt = new Date().toISOString();

      // arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
        created_at: createdAt,
        updated_at: createdAt,
      });
      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepostioryPostgres(pool, fakeIdGenerator);

      // action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
      }));
    });
  });
});
