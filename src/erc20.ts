import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";

import { Approval, ERC20, Transfer } from "../generated/ERC20/ERC20";
import {
  Account,
  Token,
  TokenBalance,
} from "../generated/schema";

const zeroAddress = '0x0000000000000000000000000000000000000000';

function loadOrCreateAccount(address: string): Account | null {
  let account = Account.load(address);
  if (!account) {
    account = new Account(address);
    account.save();
  }
  return account;
}

function loadOrCreateToken(event: ethereum.Event): Token | null {
  let token = Token.load(event.address.toHex());
  if (!token) {
    let erc20 = ERC20.bind(event.address);

    let nameResult = erc20.try_name();
    if (nameResult.reverted) {
      return null;
    }

    let symbolResult = erc20.try_symbol();
    if (symbolResult.reverted) {
      return null;
    }

    let decimalsResult = erc20.try_decimals();
    if (decimalsResult.reverted) {
      return null;
    }

    // Ignore any weird tokens to avoid overflowing the `decimals` field (which is an i32)
    // On mainnet for example there is at least one token which has a huge value for `decimals`
    // and that would overflow the Token entity's i32 field for the decimals
    if (new BigDecimal(BigInt.fromI32(decimalsResult.value)).gt(BigDecimal.fromString("255"))) {
      return null;
    }

    token = new Token(event.address.toHex());
    token.name = nameResult.value;
    token.symbol = symbolResult.value;
    token.decimals = new BigDecimal(BigInt.fromI32(decimalsResult.value));
    token.save();
  }
  return token;
}

export function handleApproval(event: Approval): void {
  return
}

export function handleTransfer(event: Transfer): void {
  let token = loadOrCreateToken(event);
  if (!token) {
    return;
  }

  let from = event.params.from.toHex();
  let to = event.params.to.toHex();
  let value = event.params.value.toBigDecimal();

  let fromAccount = loadOrCreateAccount(from);
  let toAccount = loadOrCreateAccount(to);

  if (!fromAccount || !toAccount) {
    return;
  }

  if (fromAccount.id != zeroAddress) {
    let fromTokenBalance = TokenBalance.load(token.id + "-" + fromAccount.id);
    if (!fromTokenBalance) {
      fromTokenBalance = new TokenBalance(token.id + "-" + fromAccount.id);
      fromTokenBalance.token = token.id;
      fromTokenBalance.account = fromAccount.id;
    }
    fromTokenBalance.save();
  }

  let toTokenBalance = TokenBalance.load(token.id + "-" + toAccount.id);
  if (!toTokenBalance) {
    toTokenBalance = new TokenBalance(token.id + "-" + toAccount.id);
    toTokenBalance.token = token.id;
    toTokenBalance.account = toAccount.id;
  }
  toTokenBalance.save();
}