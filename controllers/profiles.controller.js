const prisma = require('../libs/prisma');
const { createProfileSchema } = require('../validations/profiles.validation');

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { identity_type, identity_number, address } = req.body;

    const { value, error } = await createProfileSchema.validateAsync({
      identity_type,
      identity_number,
      address,
    });

    if (error) return res.status(400).json({ success: false, message: error.message, data: null });

    const profile = await prisma.profiles.update({
      where: {
        id: Number(id),
      },
      data: {
        identity_type: value.identity_type,
        identity_number: value.identity_number,
        address: value.address,
      },
    });

    return res.status(200).json({ success: true, message: 'Profile updated', data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
};
