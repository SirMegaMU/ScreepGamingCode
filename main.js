var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallBuilder = require('role.wallbuilder');
var roleTransferer = require('role.transferer')
var roleTower1 = require('role.tower1');
var roleOutHarvester0 = require('role.outhavester0');


/* 各种工作的Screep数 */
var numHarvester0 = 3       ; var numHarvester1 = 3         ; var numUpgrader = 4           ;
var numBuilder = 2          ; var numRepairer = 0           ; var numWallBuilder = 2        ;
var numTransferer = 1       ; 
var numOutHarvester0 = 3    ;

module.exports.loop = function () {

    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    roleTower1.run();

    
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder' ) {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'harvester0') {
            roleHarvester0.run(creep);
        }
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'transferer') {
            roleTransferer.run(creep);
        }
        if(creep.memory.role == 'wallbuilder') {
            roleWallBuilder.run(creep);
        }
        if(creep.memory.role == 'outharvester0') {
            roleOutHarvester0.run(creep);
        }

    }

    var transferer = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferer');
    if(transferer.length < numTransferer) {
        var newName = 'Transferer-' + Game.time;//console.log('Spawning new Transferer: ' + newName);
        //这个不能改，能量系统出问题了就靠它来解决了
        Game.spawns['Home1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'transferer'}});        
    }

    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    if(harvesters1.length < numHarvester1) {
        var newName = 'Harvester1-' + Game.time;//console.log('Spawning new harvester1: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester1'}});        
    }

    var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
    if(harvesters0.length < numHarvester0) {
        var newName = 'Harvester0-' + Game.time;//console.log('Spawning new harvester0: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester0'}});        
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < numBuilder) {
        var newName = 'Builder-' + Game.time;//console.log('Spawning new builder: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < numUpgrader) {
        var newName = 'Upgrader-' + Game.time;//console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});        
    }

    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if(repairer.length < numRepairer) {
        var newName = 'Repairer-' + Game.time;//console.log('Spawning new maintenance: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'repairer'}});        
    }

    var wallbuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallbuilder');
    if(wallbuilder.length < numWallBuilder) {
        var newName = 'WallBuilder-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'wallbuilder'}});        
    }

    var outharvester0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester0');
    if(outharvester0.length < numOutHarvester0) {
        var newName = 'OutHarvester0-' + Game.time;//console.log('Spawning new wallbuilder: ' + newName);
        Game.spawns['Home1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'outharvester0'}});        
    }
}