const prisma = require('../libs/prisma');
const { createUserSchema } = require('../validations/users.validation');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, identity_type, identity_number, address } = req.body;
    const { value, error } = await createUserSchema.validate({ name, email, password, identity_type, identity_number, address });

    if (error) return res.status(400).json({ success: false, message: error.message, data: null });

    console.log(value);
    const user = await prisma.users.create({
      data: {
        name: value.name,
        email: value.email,
        password: value.password,
        profile: {
          create: {
            identity_type: value.identity_type,
            identity_number: value.identity_number,
            address: value.address,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false, // karena password bersifat kredensial maka tidak akan ditampilkan
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({ success: true, message: 'Created', data: user });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false, // karena password bersifat kredensial maka tidak akan ditampilkan
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ success: true, message: 'OK', data: users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false, // karena password bersifat kredensial maka tidak akan ditampilkan
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ success: false, message: 'Not Found', data: null });

    res.status(200).json({ success: true, message: 'OK', data: user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const user = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ success: false, message: 'Not Found', data: null });

    res.status(200).json({ success: true, message: 'Deleted', data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
