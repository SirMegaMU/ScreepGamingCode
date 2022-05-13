var roleHarvester = require('role.harvester');
var roleCarrier = require('role.carrier');
var roleRepairer = require("role.repairer");
var roleTower = require('role.tower');

var WorkDispatch = {

    run:function(MyBase){

        roleTower.run();
        
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'carrier') {
                roleCarrier.run(creep);
            }
            if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep,MyBase[creep.room.name][2]);
            }
        }
    }
};
module.export = WorkDispatch;