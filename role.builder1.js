var roleBuilder1 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomname ="W53N7";
        if (creep.room.name==roomname) {
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔃 harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }
    
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var broken = creep.pos.findClosestByPath(FIND_STRUCTURES, 
                    {filter: structure => structure.hits <=2000 
                        && (structure.structureType == STRUCTURE_WALL
                        || structure.structureType == STRUCTURE_RAMPART)
                    });
    				if(broken) {
    					if(creep.repair(broken) == ERR_NOT_IN_RANGE) {
    						creep.moveTo(broken);// check if there are broken structures
    					}
    				}
                }
            }
            else {
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
                // find closest container
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s =>  (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
                });
                // if one was found
                if (container != undefined) {
                    // try to withdraw energy, if the container is not in range
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
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
        } else {
            creep.moveTo(new RoomPosition(1, 31, roomname),{reusePath:20})
        }
	    
	}
};

module.exports = roleBuilder1;