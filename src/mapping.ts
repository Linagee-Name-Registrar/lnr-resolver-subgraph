import {
    Contract,
    NewController,
    NewPrimary,
} from "../generated/Contract/Contract"
import {User, Stats} from "../generated/schema"
import {Bytes, log} from "@graphprotocol/graph-ts"

export function handleNewController(event: NewController): void {
    // name, controller

    let controller = event.params.controller;
    let userEntity = loadUserEntity(controller);
    let domain = event.params.name.toHexString();

    let statsEntity = loadStatsEntity();

    // TODO - check for duplicates? if already contains the value don't add it again
    let controllers = userEntity.isControllerForDomain;
    controllers.push(domain);
    userEntity.isControllerForDomain = controllers;
    userEntity.save();

    statsEntity.totalController = statsEntity.totalController + 1;
    statsEntity.save();
}

export function handleNewPrimary(event: NewPrimary): void {
    // name, primary

    let userEntity = loadUserEntity(event.params.primary);
    let statsEntity = loadStatsEntity();
    let domain = event.params.name.toHexString();

    if (domain.includes("0x0000000000000000000000000000000000000000000000000000000000000000")) {
        //
        userEntity.isPrimaryForDomain = null;
        userEntity.save();
        statsEntity.totalPrimary = statsEntity.totalPrimary - 1;
        statsEntity.save();
        //log.error("if case for handleNewPrimary: {}", [domain]);

    } else {

        // Some have just set the primary over the old value, without calling unsetPrimary first
        // So if isPrimaryForDomain has a value then don't add + 1 because we already counted it once
        if (userEntity.isPrimaryForDomain === null) {
            statsEntity.totalPrimary = statsEntity.totalPrimary + 1;
            statsEntity.save();
        }

        userEntity.isPrimaryForDomain = domain;
        userEntity.save();
    }
}


export function loadUserEntity(address: Bytes): User {

    let userEntity = User.load(address.toHexString());

    if (userEntity == null) {
        userEntity = new User(address.toHexString());

        {/** ------------ Update Stats.index ------------ **/
        }
        let statsEntity = loadStatsEntity();
        statsEntity.index = statsEntity.index + 1;
        statsEntity.save();
        {/** ------------ Update Stats.index ------------ **/
        }

        userEntity.index = statsEntity.index;
        userEntity.isControllerForDomain = new Array<string>();
        userEntity.save();
    }
    return userEntity;
}


export function loadStatsEntity(): Stats {

    let statsEntity = Stats.load("1");

    if (statsEntity == null) {
        statsEntity = new Stats("1");
        statsEntity.index = 0;
        statsEntity.totalPrimary = 0;
        statsEntity.totalController = 0;
        statsEntity.save();
    }

    return statsEntity;
}
