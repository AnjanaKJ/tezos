const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

const RPC_URL = 'https://ghostnet.ecadinfra.com';

const Tezos = new TezosToolkit(RPC_URL);
require('dotenv').config();

const faucetSecretKey = process.env.FAUCETSECRETKEY; // Replace with your Ghostnet faucet secret key

const fundWalletWithTestnetTokens = async (req, res) => {
  try {
    const {  amount } = req.body;
    const walletAddress = req.user.wallet.publicKeyHash;

    if (!walletAddress || !amount) {
      return res.status(400).json({ error: 'Wallet address and amount are required' });
    }

    // Set up the faucet account as the signer
    Tezos.setProvider({
      signer: await InMemorySigner.fromSecretKey(faucetSecretKey),
    });

    // Convert the amount to mutez (smallest unit in Tezos)
    const amountInMutez = Math.floor(amount * 1000000);

    // Perform the transfer
    const operation = await Tezos.contract.transfer({
      to: walletAddress,
      amount: amountInMutez / 1000000, // amount is divided by 1,000,000 to convert to XTZ
    });

    await operation.confirmation();

    res.status(200).json({
      message: `Successfully funded ${amount} XTZ to wallet ${walletAddress}`,
      operationHash: operation.hash,
    });

  } catch (error) {
    console.error('Error in funding:', error);
    res.status(500).json({ error: 'Funding failed.' });
  }
};

module.exports = {
  fundWalletWithTestnetTokens,
};
