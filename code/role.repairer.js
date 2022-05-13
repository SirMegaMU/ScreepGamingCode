var roleRepairer = {

    /**
     * 
     * @param {Creep} creep 
     * @param {int} wallhit 
     */
    run: function(creep,wallhit) {
        SpawnRoom = creep.memory.SpawnRoom;
        WorkRoom = creep.memory.WorkRoom;

	    if (creep.memory.work != 'take' &&  creep.store.getUsedCapacity()==0) {
            creep.memory.work = 'take';creep.say('🛑take');
        }
        else if (creep.memory.work != 'GoWorking' && creep.room.name != WorkRoom && creep.store.getFreeCapacity()==0) {
            creep.memory.work = 'GoWorking';creep.say('🏃‍♀️');
        }
        else if (creep.memory.work != 'repair' && creep.room.name == WorkRoom &&creep.store.getFreeCapacity ==0) {
            creep.memory.work = 'repair';creep.say('🚧repair');
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
        if (creep.memory.work == 'repair') {
            var broken = creep.room.find(FIND_STRUCTURES, 
                {filter: structure => (
                    structure.hits < structure.hitsMax && 
                    structure.structureType != STRUCTURE_WALL &&
                    structure.structureType != STRUCTURE_RAMPART
                    ) || (
                    structure.hits< wallhit &&
                    (structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_RAMPART))
                    });
			if(broken.length>=1) {
				if(creep.repair(broken[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(broken[0]);
				}
			}
        }
	}
};

module.exports = roleRepairer;