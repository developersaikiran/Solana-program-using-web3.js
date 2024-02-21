import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction
} from '@solana/web3.js';

import fs from 'mz/fs';
import path from 'path';

const My_Program_Keypair = path.join(
    path.resolve(__dirname, '../../contract/program'), 'program-keypair.json'
);

async function main() {
    console.log("Hey, We are launching our Dapp...");
    
    const local_RPC = new Connection('http://localhost:8899', 'confirmed');

    const secretKeyString = await fs.readFile(My_Program_Keypair, {encoding: 'utf-8'});
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const programKeyPair = Keypair.fromSecretKey(secretKey);
    let ProgramID: PublicKey = programKeyPair.publicKey;

    const accountKeypair = Keypair.generate();
    const airdropRequest = await local_RPC.requestAirdrop(
        accountKeypair.publicKey,
        LAMPORTS_PER_SOL
    );
    await local_RPC.confirmTransaction(airdropRequest);

    console.log("---------------- Calling Program ---------------");
    const instruction = new TransactionInstruction({
        keys: [{pubkey: accountKeypair.publicKey, isSigner: false, isWritable:true}],
        programId: ProgramID,
        data: Buffer.alloc(0)
    });
    await sendAndConfirmTransaction(
        local_RPC,
        new Transaction().add(instruction),
        [accountKeypair],
    );
}

main().then(
    () =>process.exit(),
    (err:any) =>{
        console.error("Error message", err.message);
        process.exit(-1);
    }
)