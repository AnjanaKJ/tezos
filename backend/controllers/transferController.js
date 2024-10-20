const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');
const User = require('../models/User'); // Assuming User model is where user data is stored

const RPC_URL = 'https://ghostnet.ecadinfra.com';
const Tezos = new TezosToolkit(RPC_URL);
require('dotenv').config();

const transferToken= async (req, res) => {
  try {
    const { recipientId, amount } = req.body; // recipientId is the ID of the recipient user
    const senderId = req.user._id; // senderId is the ID of the current logged-in user

    if (!senderId || !recipientId || !amount) {
      return res.status(400).json({ error: 'Sender ID, recipient ID, and amount are required' });
    }

    // Fetch sender user data
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    const senderSecretKey = sender.wallet.secretKey;
    const senderWalletAddress = sender.wallet.publicKeyHash;

    if (!senderSecretKey) {
      return res.status(400).json({ error: 'Sender wallet secret key not found' });
    }

    // Fetch recipient user data
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const recipientWalletAddress = recipient.wallet.publicKeyHash;

    if (!recipientWalletAddress) {
      return res.status(400).json({ error: 'Recipient wallet address not found' });
    }

    // Set up the sender's account as the signer
    Tezos.setSignerProvider(await InMemorySigner.fromSecretKey(senderSecretKey));

    // Convert the amount to mutez (smallest unit in Tezos)
    const amountInMutez = Math.floor(amount * 1000000);

    // Perform the transfer
    const operation = await Tezos.contract.transfer({
      to: recipientWalletAddress,
      amount: amountInMutez / 1000000, // Amount in XTZ
    });

    // Wait for confirmation
    await operation.confirmation(1);

    res.status(200).json({
      message: `Successfully transferred ${amount} XTZ to wallet ${recipientWalletAddress}`,
      operationHash: operation.hash,
    });

  } catch (error) {
    console.error('Error during transfer:', error);
    res.status(500).json({ error: 'Token transfer failed.' });
  }
};

module.exports = {
  transferToken,
};
