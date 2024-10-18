const { InMemorySigner } = require('@taquito/signer');
const { TezosToolkit } = require('@taquito/taquito');
const bip39 = require('bip39');

const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev');


async function createWallet() {
  try {
    const mnemonic = bip39.generateMnemonic();

    const signer = await InMemorySigner.fromMnemonic({
      mnemonic,
      password: '',
    });

    Tezos.setProvider({ signer });

    const publicKey = await signer.publicKeyHash();
    const secret = await signer.secretKey();

    return {
      publicKey,
      secret,
      mnemonic,
    };
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw new Error('Failed to create wallet');
  }
}

module.exports = {
  createWallet,
};