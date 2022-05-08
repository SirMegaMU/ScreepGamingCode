var carrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            let ruins = creep.pos.findClosestByPath(FIND_RUINS,{
                filter: s => (s.store[RESOURCE_ENERGY] > 0)
            })
            let tombstones = creep.pos.findClosestByPath(FIND_TOMBSTONES,{
                filter: s => (s.store.getUsedCapacity() > 0)
            })
            if (ruins != undefined){
                if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(ruins, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(tombstones != undefined){
                for (var resource in tombstones.store){
                    if (creep.withdraw(tombstones, resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstones, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else{
                var resources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(resources!= undefined)
                {
                    if(creep.pickup(resources)==ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(resources, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else
                {   
                    // find closest container
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER )&& s.store[RESOURCE_ENERGY] > 800
                    });

                    if (container) {
                    // try to withdraw energy, if the container is not in range
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE      }
        });
            if(targets) {
                for(const resourceType in creep.carry) {
                    if(creep.transfer(targets, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = carrier;