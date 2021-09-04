const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(tx_sender, tx_receiver, amount) {
        this.tx_sender = tx_sender;
        this.tx_receiver = tx_receiver;
        this.amount = amount;
    }

}

class Block {
    constructor(timestamp, transactions, prev_hash = '') {
        this.timestamp =timestamp;
        this.transactions = transactions;
        this.prev_hash = prev_hash;
        this.hash = this.calculate_hash();
        this.nonce = 0;
    }

    // calculate hash of the current block
    calculate_hash() {
    return SHA256(this.index + this.prev_hash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    // adds proof of work
    mining(difficulty) {
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculate_hash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.generate_genesis()]; // array of blocks, starts with the genesis block
        this.difficulty = 2; // the higher difficulty value is, the longer it takes to generate new block
        this.mempool = []; // pending transactions
        this.miner_reward = 42;
    }
    // manualy creating genesis block
    generate_genesis(){
        return new Block("01/01/2021", "Genesis Block", "0");
    }

    get_last_block(){
        return this.chain[this.chain.length -1]; // returns last block
    }
    // new block contains hash of the previous block and its own hash
    mine_pending_txs(miner_reward_address) {
        let block = new Block(Date.now(), this.mempool);
        block.mining(this.difficulty);

        console.log('Block is mined successfully.');
        this.chain.push(block); // add block to the blockchain
        
        // reset mempool
        this.mempool = [new Transaction(null, miner_reward_address, this.miner_reward)];
    }

    // add new transactions to mempool
    create_tx(tx) {
        this.mempool.push(tx);
    }

    // check address balance
    get_balace(address) {
        let balance = 0;

        for(const block of this.chain) {
            for (const tx of block.transactions) {
                // if address belongs to a sender, reduce their balance
                if(tx.tx_sender == address) {
                    balance -= tx.amount;
                }
                // if adress belongs to receiver of the transaction, increase their balance
                if(tx.tx_receiver == address) {
                    balance += tx.amount;
                }
            }
        }

        return balance;
    }

    // chack if blockchain is valid
    is_valid(){
        for (let i = 1; i < this.chain.length; i++) 
        {
            const current_block = this.chain[i];
            const prev_block = this.chain[i-1];

            // if hashes don'e match, block is invalid
            if (current_block.hash != current_block.calculate_hash()){ 
                return false;
            }
            // if hash of the previous block doesn't match, block is invalid
            if (current_block.prev_hash != prev_block.hash){
                return false;
            }
        }
        // if hashes of current and previous blocks match, blockchain is valid
        return true;
    }
}