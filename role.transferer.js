var transferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            let ruins = creep.pos.findClosestByPath(FIND_RUINS,{
                filter: s => s.store[RESOURCE_ENERGY] > 0
            })
            if (ruins != undefined){
                if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(ruins);
                }
            }
            else{
                var resources = creep.room.find(FIND_DROPPED_RESOURCES);
                if(resources.length>0)
                {
                    if(creep.pickup(resources[0])==ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(resources[0]);
                    }
                }else
                {   
                    // find closest container
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE )&& s.store[RESOURCE_ENERGY] > 0
                    });

                    if (container) {
                    // try to withdraw energy, if the container is not in range
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.moveTo(container);
                    }
                    else{
                        var sources = creep.room.find(FIND_SOURCES)[0];
                        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                    }
                }
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)||(
                        structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 200);
                }
        });
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = transferer;