import {
  Contract,
  NewController,
  NewPrimary,
} from "../generated/Contract/Contract"
import { Domain, Stats } from "../generated/schema"

export function handleNewController(event: NewController): void {
  // name, controller

  let domainEntity = loadDomainEntity(event.params.name.toHexString());
  domainEntity.nameBytecode = event.params.name;
  domainEntity.nameUtf8 = event.params.name.toString();
  domainEntity.controller = event.params.controller;
  domainEntity.save();

  // TODO - update totalController
}

export function handleNewPrimary(event: NewPrimary): void {
  // name, primary

  let domainEntity = loadDomainEntity(event.params.name.toHexString());
  domainEntity.nameBytecode = event.params.name;
  domainEntity.nameUtf8 = event.params.name.toString();
  domainEntity.primary = event.params.primary;
  domainEntity.save();

  // TODO - update totalPrimary
  // if name is 0x00 - it is unsetPrimary()?
}

export function loadDomainEntity(name: string): Domain {

  let entity = Domain.load("name-".concat(name))

  if (!entity) {
    entity = new Domain("name-".concat(name))

    {/** ------------ Update the Stats index ------------ **/}
    let stats = loadStatsEntity()
    stats.index = stats.index + 1;
    stats.save();
    {/** ------------ Update the Stats index ------------ **/}

    entity.index = stats.index;
    entity.save();
  }

  return entity
}

export function loadStatsEntity(): Stats {

  let entity = Stats.load('1');

  if (!entity) {
    entity = new Stats('1');
    entity.index = 0;
    entity.totalPrimary = 0;
    entity.totalController = 0;
    entity.save();
  }

  return entity
}
