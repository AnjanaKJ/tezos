const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

const RPC_URL = 'https://ghostnet.ecadinfra.com';

const Tezos = new TezosToolkit(RPC_URL);
require('dotenv').config();

const faucetSecretKey = process.env.FAUCETSECRETKEY; // Replace with your Ghostnet faucet secret key

const fundWalletWithTestnetTokens = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Set up the faucet account as the signer
    Tezos.setProvider({
      signer: await InMemorySigner.fromSecretKey(faucetSecretKey),
    });

    const amountToSend = 10000;

    const operation = await Tezos.contract.transfer({
      to: walletAddress,
      amount: amountToSend / 1000000,
    });

    await operation.confirmation();

    res.status(200).json({
      message: 'Testnet tokens funded successfully!',
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

