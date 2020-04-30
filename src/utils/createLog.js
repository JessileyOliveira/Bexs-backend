const Log = require('../app/models/Log');

async function createLog(user, where, type, returnValue) {
  return new Promise(async (resolve, reject) => {
    try {
      const log = await Log.create({
        user,
        where,
        type,
        return: returnValue,
      });
      resolve(log);
    } catch (e) {
      const log = await Log.create({
        user: 'Log error',
        where: 'Create Log',
        type: 'Error',
        return: JSON.stringify(e.message),
      });
      reject(log);
    }
  });
}

module.exports = {
  createLog,
};
