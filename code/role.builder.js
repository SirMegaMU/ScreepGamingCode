var MoveToRoom = require("moveToRoom");

var roleBuilder= {

    /**
     * 
     * @param {Creep} creep 
     */
    run:function(creep){
        SpawnRoom = creep.memory.SpawnRoom;
        WorkRoom = creep.memory.WorkRoom;
        /* 当前状态 */
        if (creep.memory.work != 'take' &&  creep.store.getUsedCapacity()==0) {
            creep.memory.work = 'take';creep.say('🛑take');
        }
        else if (creep.memory.work != 'GoWorking' && creep.room.name != WorkRoom && creep.store.getFreeCapacity()==0) {
            creep.memory.work = 'GoWorking';creep.say('🏃‍♀️');
        }
        else if (creep.memory.work != 'build' && creep.room.name == WorkRoom &&creep.store.getFreeCapacity ==0) {
            creep.memory.work = 'build';creep.say('🚧build');
        }

        if (creep.memory.work == 'take') {
            if (creep.memory.WorkRoom == creep.memory.SpawnRoom ) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {filter:(structure)=>{return(
                        structure.structureType == STRUCTURE_CONTAINER||
                        structure.structureType == STRUCTURE_STORAGE
                        )&&structure.store.getUsedCapacity()>=0}});
                if (creep.withdraw(target)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {filter:(structure)=>{return(
                        structure.structureType == STRUCTURE_CONTAINER||
                        structure.structureType == STRUCTURE_STORAGE
                        )&&structure.store.getUsedCapacity()>=0}});
                if (target) {
                    if (creep.withdraw(target)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
        if (creep.memory.work == 'GoWorking') {
            MoveToRoom.run(creep,WorkRoom);
        }
        if (creep.memory.work == 'build') {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length>=1) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};
module.export = roleBuilder;