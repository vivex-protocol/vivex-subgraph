import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  ClosingOnlySet as ClosingOnlySetEvent,
  Initialized as InitializedEvent,
  InstrumentCreated as InstrumentCreatedEvent,
  MoneyMarketRegistered as MoneyMarketRegisteredEvent,
  Paused as PausedEvent,
  PositionUpserted as PositionUpsertedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Unpaused as UnpausedEvent,
  Upgraded as UpgradedEvent,
  Vivex,
} from "../generated/Vivex/Vivex"
import {ERC20} from "../generated/Vivex/ERC20"
import {
  AdminChanged,
  BeaconUpgraded,
  ClosingOnlySet,
  Initialized,
  InstrumentCreated,
  Paused,
  PositionUpserted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused,
  Upgraded,
  Position,
  Owner,
  History,
  Instrument,
  InstrumentStore,
  VToken,
  OrderPlaced,
  UnderlyingPositionCreated
} from "../generated/schema"
import { Bytes, ByteArray, BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClosingOnlySet(event: ClosingOnlySetEvent): void {
  let entity = new ClosingOnlySet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.symbol = event.params.symbol
  entity.closingOnly = event.params.closingOnly

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInstrumentCreated(event: InstrumentCreatedEvent): void {
  let entity = new InstrumentCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.symbol = event.params.symbol
  entity.base = event.params.base
  entity.quote = event.params.quote

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleMoneyMarketRegistered(
//   event: MoneyMarketRegisteredEvent
// ): void {
//   let entity = new MoneyMarketRegistered(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.Vivex_id = event.params.id
//   entity.moneyMarket = event.params.moneyMarket

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function extractSymbol(positionId: Bytes): Bytes {
  let symbolRange  = positionId.subarray(0, 16);
  return Bytes.fromUint8Array(symbolRange as Uint8Array);
}

function bytesToString(bytes: Bytes): string {
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
      let charCode = bytes[i];
      if (charCode === 0) {
          break;  // Assuming string is null-terminated
      }
      result += String.fromCharCode(charCode);
  }
  return result;
}

function getNumber(positionId: Bytes): u64 {
  if (positionId.length != 32) {
    throw new Error("positionId must be 32 byt");
  }

  let numberBytes = positionId.subarray(26, 32);

  let number: u64 = 0;
  for (let i = 0; i < 6; i++) {
    number += (1 << (4 * i)) * numberBytes[5 - i];
  }

  return number;
}
export function handlePositionUpserted(event: PositionUpsertedEvent): void {
  let createdPosition = UnderlyingPositionCreated.load(event.params.positionId)

  let vivex = Vivex.bind (event.address)

  let entity = new PositionUpserted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.positionId = event.params.positionId
  entity.owner = event.params.owner
  entity.tradedBy = event.params.tradedBy
  entity.cashflowCcy = event.params.cashflowCcy
  entity.cashflow = event.params.cashflow
  entity.quantityDelta = event.params.quantityDelta
  entity.price = event.params.price
  entity.fee = event.params.fee
  entity.feeCcy = event.params.feeCcy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save();
  
  let symbol = extractSymbol(event.params.positionId);
  let number = getNumber(event.params.positionId);
  
  let instrumentStorage = vivex.instrument (symbol)
  
  let priceDecimal = new BigDecimal(event.params.price);
  let quantityDeltaDecimal = new BigDecimal(event.params.quantityDelta);
  let baseUnitDecimal = new BigDecimal(instrumentStorage.baseUnit);
  let quoteUnitDecimal = new BigDecimal(instrumentStorage.quoteUnit);
  let baseToken = ERC20.bind(instrumentStorage.base)
  let quoteToken = ERC20.bind(instrumentStorage.quote)

  let instrument = new Instrument(symbol)
  instrument.symbol = bytesToString (symbol)
  let base = new VToken(instrumentStorage.base)
  base.decimals = baseToken.decimals()
  base.symbol = baseToken.symbol()
  base.name = baseToken.name()
  base.save()

  instrument.base = base.id
  let quote = new VToken(instrumentStorage.quote)
  quote.decimals = quoteToken.decimals()
  quote.symbol = quoteToken.symbol()
  quote.name = quoteToken.name()
  quote.save()

  instrument.quote = quote.id
  instrument.save ()

  let owner = new Owner(event.params.owner)
  owner.save()

  let history = new History (event.params.positionId.toHexString() + " - " + event.transaction.hash.toHexString())
  history.openQuantity = BigDecimal.zero()
  if (instrumentStorage.baseUnit && instrumentStorage.baseUnit > BigInt.fromI32(0)) history.openQuantity = quantityDeltaDecimal.div (baseUnitDecimal)
  history.previousOpenQuantity = BigDecimal.zero()
  history.openCost = new BigDecimal(BigInt.fromI32(1))
  if (instrumentStorage.baseUnit && instrumentStorage.baseUnit > BigInt.fromI32(0)) history.openCost = priceDecimal.times(quantityDeltaDecimal).div(baseUnitDecimal).div(quoteUnitDecimal)
  if (event.params.cashflowCcy === 2) history.openCost = history.openCost.times(new BigDecimal(BigInt.fromI32(-1)))
  history.previousOpenCost = BigDecimal.zero()
  history.realisedPnLBase = BigDecimal.zero()
  history.realisedPnLQuote = BigDecimal.zero()
  history.cashflowQuote = new BigDecimal(event.params.cashflow).div(quoteUnitDecimal)
  if (event.params.price && event.params.price.gt(BigInt.fromI32(0)))
    history.cashflowBase = new BigDecimal(event.params.cashflow).times(new BigDecimal(BigInt.fromI32(1000000))).div(priceDecimal).div(quoteUnitDecimal)
  history.equityQuote = new BigDecimal(event.params.cashflow).div(quoteUnitDecimal)
  history.equityBase = BigDecimal.zero()
  if (event.params.price && event.params.price.gt(BigInt.fromI32(0))) history.equityBase = new BigDecimal(event.params.cashflow).div(priceDecimal)
  history.fillCost = history.openCost
  if (instrumentStorage.baseUnit && instrumentStorage.baseUnit > BigInt.fromI32(0)) history.fillSize = quantityDeltaDecimal.div (baseUnitDecimal)
  history.feeBase = new BigDecimal(new BigInt(0))
  history.feeQuote = new BigDecimal(new BigInt(0))
  history.blockTimestamp = event.block.timestamp
  // history.limitPrice = orderPlaced == null ? BigInt.fromI32(0) : orderPlaced.limitPrice
  // history.type = "Long"
  // // history.nquantity = position.quantity
  // // history.cashflowBase = position.cashflowBase
  // // history.cashflowQuote = position.cashflowQuote
  // // history.number = position.number
  // // history.owner = position.owner
  // // history.creationBlockTimestamp = position.creationBlockTimestamp
  // // history.blockNumber = event.block.number

  let position = Position.load (event.params.positionId)
  if (position === null) {
    position = new Position(event.params.positionId)
    position.history = []
    let histories = position.history
    position.feesBase = event.params.fee
    position.feesQuote = event.params.fee
    position.instrument = instrument.id
    position.orders = []
    position.cashflowBase = new BigDecimal(event.params.cashflow)
    position.cashflowQuote = new BigDecimal(event.params.cashflow)
    history.save ()
    histories.push (history.id)
    position.history = histories
  }
  else {
    let histories = position.history
    let firstId = histories[0]
    let firstHistory = History.load(firstId)
    if (firstHistory) {
      history.previousOpenCost = firstHistory.openCost
      history.previousOpenQuantity = firstHistory.openQuantity
    }
    if (history.openCost !== null && history.openCost.equals(BigDecimal.zero())) {
      history.openCost = history.previousOpenCost
    }
    if (history.openQuantity !== null && history.openQuantity.equals(BigDecimal.zero())) {
      history.openQuantity = history.previousOpenQuantity
    }
    let rpnlq = BigDecimal.zero()
    if (instrumentStorage.baseUnit && instrumentStorage.baseUnit > BigInt.fromI32(0) && event.params.price)
      rpnlq = history.previousOpenCost.minus(priceDecimal.times(quantityDeltaDecimal).div(baseUnitDecimal).div(quoteUnitDecimal))
    history.realisedPnLQuote = rpnlq
    if (event.params.price && event.params.price.gt(BigInt.fromI32(0))) 
      history.realisedPnLBase = rpnlq.div (priceDecimal)
    if (instrumentStorage.baseUnit && instrumentStorage.baseUnit > BigInt.fromI32(0) && event.params.price) {
      history.fillCost = priceDecimal.times(quantityDeltaDecimal).div(baseUnitDecimal).div(quoteUnitDecimal)
    }else{
      history.fillCost = BigDecimal.zero()
    }
    history.fillSize = history.previousOpenQuantity
    if (event.params.quantityDelta.lt(BigInt.zero())) {
      history.openCost = BigDecimal.zero()
      history.openQuantity = BigDecimal.zero()
    }
    position.feesBase = event.params.fee
    position.feesQuote = event.params.fee

    let heq = BigDecimal.zero()
    let rpnl = history && history.realisedPnLQuote ? history.realisedPnLQuote : BigDecimal.zero()

    if (rpnl) heq = heq.plus(rpnl)
    if (event.params.price && event.params.price.gt(BigInt.fromI32(0))) history.equityBase = heq.div(priceDecimal).times(quoteUnitDecimal)
    history.equityQuote = heq

    history.save ()

    if (histories) histories.unshift (history.id)
    else histories = [history.id]
    position.history = histories
  }
  let histories = position.history
  let eb = BigDecimal.zero()
  let eq = BigDecimal.zero()
  let cb = BigDecimal.zero()
  let cq = BigDecimal.zero()
  for (let i = 0; i < histories.length ; i ++) {
    let history_item = History.load(histories[i])
    let heq = history_item && history_item.equityQuote ? history_item.equityQuote : BigDecimal.zero()
    let heb = history_item && history_item.equityBase ? history_item.equityBase : BigDecimal.zero()
    let cfq = history_item && history_item.cashflowQuote ? history_item.cashflowQuote : BigDecimal.zero()
    let cfb = history_item && history_item.cashflowBase ? history_item.cashflowBase : BigDecimal.zero()
    if (heq) eq = eq.plus(heq)
    if (heb) eb = eb.plus(heb)
    if (cfq) cq = cq.plus(cfq)
    if (cfb) cq = cb.plus(cfb)
  }
  position.equityBase = eb
  position.equityQuote = eq
  position.instrument = instrument.id
  position.quantity = history.openQuantity
  position.cashflowBase = cb
  position.cashflowQuote = cq
  position.orders = []
  position.openCost = history.openCost
  position.realisedPnLBase = history.realisedPnLBase
  position.realisedPnLQuote = history.realisedPnLQuote
  position.owner = owner.id
  position.number = BigInt.fromU64(number)
  position.creationBlockTimestamp = createdPosition !== null ? createdPosition.blockTimestamp : BigInt.fromI32(0)

  position.save ()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
