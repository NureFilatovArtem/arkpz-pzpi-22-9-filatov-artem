const User = require('../models/User');

exports.getAll = async () => {
  return await User.findAll();
};

exports.delete = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found.');
  await user.destroy();
  return { message: 'User deleted successfully.' };
};
