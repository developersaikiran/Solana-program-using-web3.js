use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,

};

entrypoint!(my_defi_app);
fn my_defi_app(
    _program_id: &Pubkey,
    _account: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Welcome on our Dapp");
    msg!("Swap your tokens");
    Ok(())
}