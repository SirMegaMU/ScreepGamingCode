var roleHavester= {

    /**
     * @param {Creep} creep 
     */
    run: function(creep){
        SpawnRoom = creep.memory.SpawnRoom;
        WorkRoom = creep.memory.WorkRoom;
        index = creep.memory.index;
        /* 当前状态 */
        if (creep.memory.work !='harvest' && creep.room.name == WorkRoom && creep.store.getUsedCapacity()>=0) {
            creep.memory.work ='harvest';creep.say('⚡harvest');
        }
        else if (creep.memory.work != 'GoWorking' && creep.room.name == SpawnRoom && creep.store.getFreeCapacity()>0) {
            creep.memory.work = 'GoWorking';creep.say('🏃‍♀️');
        }
        else if (creep.memory.work != 'store'&& creep.store.getFreeCapacity() ==0) {
            creep.memory.work = 'store';creep.say('🔁store');
        }
        /* 状态的行为定义 */
        if (creep.memory.work == 'harvest') {
            let ruins = creep.pos.findClosestByPath(FIND_RUINS,{
                filter: s => s.store[RESOURCE_ENERGY] > 0
            })
            if (ruins != undefined){
                if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ruins);
                }
            }
            else{
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s =>  (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
                });
                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                else
                {   var resources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    if(resources)
                    {
                        if(creep.pickup(resources)==ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(resources);
                        }
                    }
                    else{
                        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                    }
                }     
            }
        }
        if (creep.memory.work == 'GoWorking') {
            if (!Game.rooms[WorkRoom]) {
                MoveToRoom.run(creep,WorkRoom);
            } else {
                MoveToRoom.run(creep,WorkRoom);
            }
        }
        if (creep.memory.work == 'store') {
            if (creep.memory.WorkRoom == creep.memory.SpawnRoom ) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {filter:(structure)=>{return(
                        structure.structureType == STRUCTURE_SPAWN||
                        structure.structureType == STRUCTURE_EXTENSION
                        )&&structure.store.getFreeCapacity()>0}});
                if (target) {
                    if (creep.transfer(target)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                        {filter:(structure)=>{return(
                            structure.structureType == STRUCTURE_CONTAINER||
                            structure.structureType == STRUCTURE_STORAGE
                            )&&structure.store.getFreeCapacity()>=100}});
                    if (creep.transfer(target)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {filter:(structure)=>{return(
                        structure.structureType == STRUCTURE_STORAGE||
                        structure.structureType == STRUCTURE_CONTAINER
                        )&&structure.store.getFreeCapacity()>=100}});
                if (target) {
                    if (creep.transfer(target)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    MoveToRoom.run(creep,SpawnRoom);
                }
            }
        }
    }
};
module.export = roleHavester;