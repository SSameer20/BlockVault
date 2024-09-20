import { openDB } from 'idb';


const DB_NAME = 'walletDB';
const DB_VERSION = 1;
const STORE_NAME = 'walletStore';

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('mnemonic', 'mnemonic');
      store.createIndex('password', 'password');
      store.createIndex('email', 'email');
    }
  },
});

/*
  * saveWalletData({firstparameter : mnemonic, secondParameter : email, thirdParameter : password })
  * Easily save the data to the local storage of IndexDB
  * Use this function when you have three parameters at the same time so that you  can pass this and update data to local store
  * 
  * @example
  *   const mnemonic = "hjsbdhbd Random Encrypted Mnemonic"
  *   const email = "user@gmail.com"
  *   const password = "Encrypted User Password"
  *   const createData = await saveWalletData({menmonic, email, password});
  *   
  *   @output
  *    {
  *       id : "wallet",
  *       mnemonic: "hjsbdhbd Random Encrypted Mnemonic",
  *       email: "user@gmail.com",
  *       password: "Encrypted User Password",
  *    }

*/

export const saveWalletData = async ({ mnemonic, email, password }) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, { id: 'wallet', mnemonic, email, password });
};

/*
  * saveMnemonic({mnemonic : string})
  * Use this function when you need to add/update Mnemonic to store
  * 
  * @example
  *   const mnemonic = "hjsbdhbd Random Encrypted Mnemonic"
  *   await saveMnemonic({menmonic});
  *   
  *   @output
  *    {
  *       mnemonic: "hjsbdhbd Random Encrypted Mnemonic"
  *    }

*/

export const saveMnemonic = async ({ mnemonic }) => {
  const db = await dbPromise;
  const existingData = await db.get(STORE_NAME, 'wallet') ||  { id: 'wallet' }; ;
  await db.put(STORE_NAME, { ...existingData, mnemonic });
  // await db.put(STORE_NAME, { id: 'wallet', mnemonic });
}

/*
  * saveCredentials({email: string, password : string})
  * Use this function when you need to add/update the email to store
  * 
  * @example
  *   const email = "user@example.com"
  *   const password ="****"
  *   await saveCredentials({email, password});
  *   
  * @output
  *    {
  *       email: "user@example.com"
  *    }
*/

export const saveCredentials = async ({ email, password }) => {
  const db = await dbPromise;
  const existingData = await db.get(STORE_NAME, 'wallet') || { id: 'wallet' }; ;
  await db.put(STORE_NAME, { ...existingData,  email, password });
}


/*
  * saveEmail({email: string})
  * Use this function when you need to add/update the email to store
  * 
  * @example
  *   const email = "user@example.com"
  *   await saveEmail({email});
  *   
  * @output
  *    {
  *       email: "user@example.com"
  *    }
*/

export const saveEmail = async ({ email }) => {
  const db = await dbPromise;
  const existingData = await db.get(STORE_NAME, 'wallet') || { id: 'wallet' }; ;
  await db.put(STORE_NAME, { ...existingData,  email});
}


/*
  * savePassword({password: string})
  * Use this function when you need to add/update the password to store
  * 
  * @example
  *   const password = "strongpassword123"
  *   await savePassword({password});
  *   
  * @output
  *    {
  *       password: "strongpassword123"
  *    }
*/

export const savePassword = async ({ password }) => {
  const db = await dbPromise;
  const existingData = await db.get(STORE_NAME, 'wallet') || { id: 'wallet' }; ;
  await db.put(STORE_NAME, { ...existingData,  password});
}


/*
  * getWalletData()
  * Use this function to retrieve wallet data from the store
  * 
  * @example
  *   const walletData = await getWalletData();
  *   console.log(walletData);
  *   
  * @output
  *    {
  *       email: "user@example.com",
  *       password: "strongpassword123",
  *       mnemonic: "hjsbdhbd Random Encrypted Mnemonic"
  *    }
*/


export const getWalletData = async () => {
  const db = await dbPromise;
  return await db.get(STORE_NAME, 'wallet');
};

/*
  * clearWalletData()
  * Use this function to remove wallet data from the store
  * 
  * @example
  *   await clearWalletData();
  *   
  * @output
  *    // Wallet data is cleared from the store
*/

export const clearWalletData = async () => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, 'wallet');
};

