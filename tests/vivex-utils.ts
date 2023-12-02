import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  ClosingOnlySet,
  Initialized,
  InstrumentCreated,
  MoneyMarketRegistered,
  Paused,
  PositionUpserted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused,
  Upgraded
} from "../generated/Contango/Contango"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createClosingOnlySetEvent(
  symbol: Bytes,
  closingOnly: boolean
): ClosingOnlySet {
  let closingOnlySetEvent = changetype<ClosingOnlySet>(newMockEvent())

  closingOnlySetEvent.parameters = new Array()

  closingOnlySetEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromFixedBytes(symbol))
  )
  closingOnlySetEvent.parameters.push(
    new ethereum.EventParam(
      "closingOnly",
      ethereum.Value.fromBoolean(closingOnly)
    )
  )

  return closingOnlySetEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createInstrumentCreatedEvent(
  symbol: Bytes,
  base: Address,
  quote: Address
): InstrumentCreated {
  let instrumentCreatedEvent = changetype<InstrumentCreated>(newMockEvent())

  instrumentCreatedEvent.parameters = new Array()

  instrumentCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromFixedBytes(symbol))
  )
  instrumentCreatedEvent.parameters.push(
    new ethereum.EventParam("base", ethereum.Value.fromAddress(base))
  )
  instrumentCreatedEvent.parameters.push(
    new ethereum.EventParam("quote", ethereum.Value.fromAddress(quote))
  )

  return instrumentCreatedEvent
}

export function createMoneyMarketRegisteredEvent(
  id: i32,
  moneyMarket: Address
): MoneyMarketRegistered {
  let moneyMarketRegisteredEvent = changetype<MoneyMarketRegistered>(
    newMockEvent()
  )

  moneyMarketRegisteredEvent.parameters = new Array()

  moneyMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "id",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id))
    )
  )
  moneyMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "moneyMarket",
      ethereum.Value.fromAddress(moneyMarket)
    )
  )

  return moneyMarketRegisteredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPositionUpsertedEvent(
  positionId: Bytes,
  owner: Address,
  tradedBy: Address,
  cashflowCcy: i32,
  cashflow: BigInt,
  quantityDelta: BigInt,
  price: BigInt,
  fee: BigInt,
  feeCcy: i32
): PositionUpserted {
  let positionUpsertedEvent = changetype<PositionUpserted>(newMockEvent())

  positionUpsertedEvent.parameters = new Array()

  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromFixedBytes(positionId)
    )
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam("tradedBy", ethereum.Value.fromAddress(tradedBy))
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "cashflowCcy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(cashflowCcy))
    )
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "cashflow",
      ethereum.Value.fromSignedBigInt(cashflow)
    )
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "quantityDelta",
      ethereum.Value.fromSignedBigInt(quantityDelta)
    )
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  positionUpsertedEvent.parameters.push(
    new ethereum.EventParam(
      "feeCcy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(feeCcy))
    )
  )

  return positionUpsertedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
