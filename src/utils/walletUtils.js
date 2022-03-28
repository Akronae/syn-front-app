export default class WalletUtils
{
    static async getAddress ()
    {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        return accounts[0];
    }
}