import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  GasMultiplierSet,
  GasTipSet,
  Initialized,
  OrderCancelled,
  OrderExecuted,
  OrderPlaced,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Upgraded
} from "../generated/OrderManager/OrderManager"

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

export function createGasMultiplierSetEvent(
  gasMultiplier: BigInt
): GasMultiplierSet {
  let gasMultiplierSetEvent = changetype<GasMultiplierSet>(newMockEvent())

  gasMultiplierSetEvent.parameters = new Array()

  gasMultiplierSetEvent.parameters.push(
    new ethereum.EventParam(
      "gasMultiplier",
      ethereum.Value.fromUnsignedBigInt(gasMultiplier)
    )
  )

  return gasMultiplierSetEvent
}

export function createGasTipSetEvent(gasTip: BigInt): GasTipSet {
  let gasTipSetEvent = changetype<GasTipSet>(newMockEvent())

  gasTipSetEvent.parameters = new Array()

  gasTipSetEvent.parameters.push(
    new ethereum.EventParam("gasTip", ethereum.Value.fromUnsignedBigInt(gasTip))
  )

  return gasTipSetEvent
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

export function createOrderCancelledEvent(orderId: Bytes): OrderCancelled {
  let orderCancelledEvent = changetype<OrderCancelled>(newMockEvent())

  orderCancelledEvent.parameters = new Array()

  orderCancelledEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )

  return orderCancelledEvent
}

export function createOrderExecutedEvent(
  orderId: Bytes,
  positionId: Bytes,
  keeperReward: BigInt
): OrderExecuted {
  let orderExecutedEvent = changetype<OrderExecuted>(newMockEvent())

  orderExecutedEvent.parameters = new Array()

  orderExecutedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromFixedBytes(positionId)
    )
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "keeperReward",
      ethereum.Value.fromUnsignedBigInt(keeperReward)
    )
  )

  return orderExecutedEvent
}

export function createOrderPlacedEvent(
  orderId: Bytes,
  positionId: Bytes,
  owner: Address,
  quantity: BigInt,
  limitPrice: BigInt,
  tolerance: BigInt,
  cashflow: BigInt,
  cashflowCcy: i32,
  deadline: BigInt,
  orderType: i32,
  placedBy: Address
): OrderPlaced {
  let orderPlacedEvent = changetype<OrderPlaced>(newMockEvent())

  orderPlacedEvent.parameters = new Array()

  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "positionId",
      ethereum.Value.fromFixedBytes(positionId)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromSignedBigInt(quantity)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "limitPrice",
      ethereum.Value.fromUnsignedBigInt(limitPrice)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "tolerance",
      ethereum.Value.fromUnsignedBigInt(tolerance)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "cashflow",
      ethereum.Value.fromSignedBigInt(cashflow)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "cashflowCcy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(cashflowCcy))
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "orderType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(orderType))
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("placedBy", ethereum.Value.fromAddress(placedBy))
  )

  return orderPlacedEvent
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
