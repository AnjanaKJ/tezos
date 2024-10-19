const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createWallet } = require('../services/walletService');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const { publicKey, secret, mnemonic } = await createWallet();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            wallet: {
                publicKeyHash: publicKey,
                mnemonic,
                secretKey: secret,
            },
        });


        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                walletAddress: newUser.wallet.publicKeyHash,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

async function loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
  registerUser, loginUser
};
