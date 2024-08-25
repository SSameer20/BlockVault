import { openDB } from 'idb';

const DB_NAME = 'walletDB';
const DB_VERSION = 1;
const STORE_NAME = 'walletStore';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('mnemonic', 'mnemonic');
      store.createIndex('password', 'password');
      store.createIndex('solanaWalletIndex', 'solanaWalletIndex');
      store.createIndex('ethereumWalletIndex', 'ethereumWalletIndex');
    }
  },
});

export const saveWalletData = async ({ mnemonic, password, solanaWalletIndex, ethereumWalletIndex }) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, { id: 'wallet', mnemonic, password, solanaWalletIndex, ethereumWalletIndex });
};

export const getWalletData = async () => {
  const db = await dbPromise;
  return await db.get(STORE_NAME, 'wallet');
};

export const clearWalletData = async () => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, 'wallet');
};
