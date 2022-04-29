var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallBuilder = require('role.wallbuilder');
var roleTransferer = require('role.transferer')
var roleTower1 = require('role.tower1');

var roleReserver = require('role.reserver');

var roleOutHarvester = require('role.outhavester');
var roleOutHarvester1 = require('role.outhavester1');
var roleOutHarvester2 = require('role.outhavester2');

var roleFighter0 = require('role.fighter0');

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
            /* 外矿任务分配 */
            if(creep.memory.role == 'outharvester') {
                roleOutHarvester.run(creep)
            }
            if(creep.memory.role == 'outharvester1') {
                roleOutHarvester1.run(creep);
            }
            if(creep.memory.role == 'outharvester2') {
                roleOutHarvester2.run(creep);
            }
            /* 预定 */
            if(creep.memory.role == 'reserver') {
                roleReserver.run(creep);
            }
            /* 战斗 */
            if (creep.memory.role == 'fighter0') {
                roleFighter0.run(creep);
            }
    
        }
    }
}
module.exports = WorkDispatch;