var roleOutHarvester1 = {

    
    /** @param {Creep} creep **/
    run: function(creep) {

        var roomname ='W53N9' ;
        var Homename = 'W53N8';
        const room = Game.rooms[roomname];
        const Home = Game.rooms[Homename];

	    if(creep.store.getFreeCapacity() > 0) {
            if (creep.room.name!=roomname){
                creep.moveTo(new RoomPosition(30, 48, roomname),{reusePath:10})
            }
            else{
                //let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,FIND_HOSTILE_TOWER);
                var sources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                //if (!closestHostile) {
                    if(sources){
                        if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                        
                        else{
                            var sources = creep.room.find(FIND_SOURCES);
                            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }}
                            
                //}else {creep.moveTo(new RoomPosition(25, 25, Homename),{reusePath:10})}
                        }
            }  
        }
        else {
            // console.log(creep.name+'in '+creep.room.name);creep.room.name!=Homename
            if(creep.room.name!=Homename){
                creep.moveTo(new RoomPosition(31, 4, Homename),{visualizePathStyle: {stroke: '#ffaa00'}})
            }
            else{
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_TOWER ) && 
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

module.exports = roleOutHarvester1;