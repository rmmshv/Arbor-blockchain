const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prev_hash = '') {
        this.index = index;
        this.timestamp =timestamp;
        this.data = data;
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
        this.difficulty = 5; // the higher difficulty value is, the longer it takes to generate new block
    }
    // manualy creating genesis block
    generate_genesis(){
        return new Block(0, "01/01/2021", "Genesis Block", "0");
    }

    get_last_block(){
        return this.chain[this.chain.length -1]; // returns last block
    }
    // new block contains hash of the previous block and its own hash
    add_block(new_block){
        new_block.prev_hash = this.get_last_block().hash;
        new_block.mining(this.difficulty)
        this.chain.push(new_block); // push\add this block to the blockchain
    }

    // chach if blockchain is valid
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



// initiate blockchain
let arbor_coin = new Blockchain();

console.log("block 1: ")
arbor_coin.add_block(new Block(1, "09/01/2021", {amount: 4}));

console.log("block 2: ")
arbor_coin.add_block(new Block(2, "09/02/2021", {amount: 10}));
/*
console.log(JSON.stringify(arbor_coin, null, 4) + '\n');

console.log("'\n'is blockchain valid?: " + arbor_coin.is_valid() + '\n');

// test is_valid function
arbor_coin.chain[1].data = {amount:100}; 

console.log("'\n'is blockchain  valid?: " + arbor_coin.is_valid() + '\n');

arbor_coin.chain[1].hash = arbor_coin.chain[1].calculate_hash();
console.log("'\n'is blockchain  valid?: " + arbor_coin.is_valid() + '\n') ;
*/