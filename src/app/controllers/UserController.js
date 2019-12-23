import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      or: { email: req.body.email, cpf: req.body.cpf },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, cpf, active } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      cpf,
      active,
    });
  }
}

export default new UserController();
