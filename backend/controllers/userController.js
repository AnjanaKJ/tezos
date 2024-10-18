const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createWallet } = require('../services/walletService');

async function registerUser(req, res) {
    const { email, country, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const { publicKey, secret, mnemonic } = await createWallet();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            country,
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

module.exports = {
  registerUser,
};
