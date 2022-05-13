var roleCarrier = {

    /**
     * 
     * @param {Creep} creep 
     */
    run:function(creep){
        SpawnRoom = creep.memory.SpawnRoom;
        WorkRoom = creep.memory.WorkRoom;
        index = creep.memory.index;
        /* 当前状态 */
        if (creep.memory.work != 'take' && creep.room.name == WorkRoom && creep.store.getFreeCapacity()>0) {
            creep.memory.work = 'take';creep.say('🛄take');
        }
        else if (creep.memory.work != 'GoWorking' && creep.room.name == SpawnRoom && creep.store.getFreeCapacity()>0) {
            creep.memory.work = 'GoWorking';creep.say('🏃‍♀️');
        }
        else if (creep.memory.work != 'store' && creep.store.getFreeCapacity ==0) {
            creep.memory.work = 'store';creep.say('🔁store');
        }
        /* 状态的行为定义 */
        if (creep.memory.work == 'take') {
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {filter:(structure)=>{return(
                    structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getUsedCapacity()>=200;
                }});   
            if (source) {
                if (creep.withdraw(source)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
        if (creep.memory.work == 'GoWorking') {
                MoveToRoom(creep,WorkRoom);
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
                        structure.structureType == STRUCTURE_SPAWN||
                        structure.structureType == STRUCTURE_EXTENSION
                        )&&structure.store.getFreeCapacity()>0}});
                if (target) {
                    if (creep.transfer(target)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    MoveToRoom.run(creep,WorkRoom);
                }
            }
        }

    }
}
module.export = roleCarrier;