const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Password for authentication
    country: { type: String, required: true },  // Country of the user
    wallet: {
        publicKeyHash: { type: String, required: true },  // Public wallet address
        mnemonic: { type: String, required: true },  // Mnemonic phrase (store securely)
        secretKey: { type: String, required: true },  // Private key (store securely)
    },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
