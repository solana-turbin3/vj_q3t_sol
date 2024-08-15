use anchor_lang::prelude::*;

pub mod instructions;
use instructions::*;

pub mod state;
pub use state::*;

declare_id!("6BLPdL9narQPFQsqS7AXuRBRS4VoyKmHHzdwkgnLaAps");

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(_ctx: Context<Make>, seed: u64, deposit: u64, receive: u64) -> Result<()> {
        _ctx.accounts.deposit(deposit)?;
        _ctx.accounts.save_escrow(seed, receive, &_ctx.bumps)
    }

    pub fn refund(_ctx: Context<Refund>) -> Result<()> {
        _ctx.accounts.refund_and_close_vault()
    }

    pub fn take(_ctx: Context<Take>) -> Result<()> {
        _ctx.accounts.deposit()?;
        _ctx.accounts.withdraw_and_close_vault()
    }
}
