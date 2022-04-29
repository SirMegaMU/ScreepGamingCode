var roleOutHarvester2 = {

    
    /** @param {Creep} creep     **/

    run: function(creep) {

        roomname = creep.memory.targetroom;
        Homename = creep.memory.targetHome;
	    if(creep.store.getFreeCapacity() > 0) {
            if (creep.room.name!=roomname){
                creep.moveTo(new RoomPosition(1, 31, roomname),{reusePath:10})
            }
            else{
                let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                
                var resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
                if (!closestHostile) {
                    if (!resource) {
                        if (creep.pickup(resource)==ERR_NOT_IN_RANGE) {
                            creep.moveTo(resource);
                        } else {
                            var sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                            if (creep.harvest(sources)==ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources);
                            }
                        }
                    } 
                else {
                    creep.moveTo(new RoomPosition(25, 25, Homename),{reusePath:10});
                }
                }
            }
        }
        else {
            // console.log(creep.name+'in '+creep.room.name);creep.room.name!=Homename
            if(creep.room.name!=Homename){
                creep.moveTo(new RoomPosition(25, 25, Homename),{visualizePathStyle: {stroke: '#ffaa00'}})
            }
            else{
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets) {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }   
        }
	}
};

module.exports = roleOutHarvester2;