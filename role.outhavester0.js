var roleOutHarvester0 = {

    
    /** @param {Creep} creep **/
    run: function(creep) {

        var roomname ='W52N8' ;
        var Homename = 'W53N8';
        const room = Game.rooms[roomname];
        const Home = Game.rooms[Homename];

	    if(creep.store.getFreeCapacity() > 0) {
            if (creep.room.name!=roomname){
                creep.moveTo(new RoomPosition(25, 25, roomname),{reusePath:10})
            }
            else{
                let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var sources = creep.room.find(FIND_SOURCES);
                if (!closestHostile) {
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else {
                    creep.moveTo(new RoomPosition(25, 25, Homename),{reusePath:10})
                }
            }  
        }
        else {
            // console.log(creep.name+'in '+creep.room.name);creep.room.name!=Homename
            if(creep.room.name!=Homename){
                creep.moveTo(new RoomPosition(25, 25, Homename),{visualizePathStyle: {stroke: '#ffaa00'}})
            }
            else{
                var targets = Home.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_CONTAINER ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets.length>0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{

                }
            }   
        }
	}
};

module.exports = roleOutHarvester0;