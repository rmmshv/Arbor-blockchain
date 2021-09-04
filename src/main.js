const {Blockchain, Transaction} = require('./blockchain');


// run the blockchain
let arbor_coin = new Blockchain();

// new transaction
arbor_coin.create_tx(new Transaction('address1', 'address2', 100));
arbor_coin.create_tx(new Transaction('address2', 'address1', 50));


// reward for a new mined block will appear after the block was verified by the chain
console.log('\n start mining...');
arbor_coin.mine_pending_txs('my-address');
console.log('\nmy balance: ', arbor_coin.get_balace('my-address') + ' ARB\n');

console.log('\n start mining...');
arbor_coin.mine_pending_txs('my-address');

// if block was verified, adress balance will display the reward
console.log("\nIf previous block was verified by the blockchain, adress balance will display the reward (42 ARB)\n");
console.log('\nmy balance: ', arbor_coin.get_balace('my-address') + ' ARB\n');

/*
console.log("block 1: ")
arbor_coin.add_block(new Block(1, "09/01/2021", {amount: 4}));

console.log("block 2: ")
arbor_coin.add_block(new Block(2, "09/02/2021", {amount: 10}));

console.log(JSON.stringify(arbor_coin, null, 4) + '\n');

console.log("'\n'is blockchain valid?: " + arbor_coin.is_valid() + '\n');

// test is_valid function
arbor_coin.chain[1].data = {amount:100}; 

console.log("'\n'is blockchain  valid?: " + arbor_coin.is_valid() + '\n');

arbor_coin.chain[1].hash = arbor_coin.chain[1].calculate_hash();
console.log("'\n'is blockchain  valid?: " + arbor_coin.is_valid() + '\n') ;
*/
