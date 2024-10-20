const { TezosToolkit } = require('@taquito/taquito');
const User = require('../models/User'); // Assuming you have a User model with wallet details

const RPC_URL = 'https://ghostnet.ecadinfra.com'; // Change this to mainnet when deploying live
const Tezos = new TezosToolkit(RPC_URL);

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user._id;

    // Ensure the user ID is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Fetch the user data from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const walletAddress = user.wallet.publicKeyHash;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address not found for this user',
      });
    }

    // Get balance from the Tezos blockchain
    const balanceInMutez = await Tezos.tz.getBalance(walletAddress);

    // Convert balance from mutez to XTZ
    const balanceInXTZ = balanceInMutez / 1000000;

    return res.status(200).json({
      success: true,
      walletAddress: walletAddress,
      balance: balanceInXTZ, // XTZ balance
    });
  } catch (error) {
    console.error('Error retrieving balance:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving balance',
      error: error.message,
    });
  }
};
