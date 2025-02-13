require('../../src/app');
const Log = require('../../src/app/models/Log');
const { createLog } = require('../../src/utils/createLog');

describe('Question tests', () => {
  afterEach(async () => {
    await Log.destroy({ truncate: { cascade: true } });
  });

  it('should add a new success Log (store)', async () => {
    const log = await createLog('Bexs', 'Test', 'Success', 'Message');
    expect(log.type).toBe('Success');
  });
  it('should add a new error Log when log error registering (store)', async () => {
    try {
      await createLog();
    } catch (err) {
      expect(err.type).toBe('Error');
    }
  });
});
