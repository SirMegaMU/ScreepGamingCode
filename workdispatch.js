var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallBuilder = require('role.wallbuilder');
var roleTransferer = require('role.transferer')
var roleTower1 = require('role.tower1');
var roleOutHarvester0 = require('role.outhavester0');
var roleOutHarvester1 = require('role.outhavester1');

var WorkDispatch = {
    run:function()
    {
        roleTower1.run();

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
            if(creep.memory.role == 'outharvester1') {
                roleOutHarvester1.run(creep);
            }
    
        }
    }
}
module.exports = WorkDispatch;