var roleFighter0 = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var roomname ='W53N7' ;
        var Homename = 'W53N8';
        // const room = Game.rooms[roomname];
        // const Home = Game.rooms[Homename];
        if (creep.room.name!=roomname) {
            creep.moveTo(new RoomPosition(7, 1, roomname),{reusePath:10})
        }
        else{
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestHostileConstructionSite = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
            var closestHostileSturcture = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION);
                    }
            });

            if(closestHostile) {
                if(creep.attack(closestHostile)==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(closestHostile);
                }
                else
                {
                    creep.attack(closestHostile);
                }
            } else if(closestHostileSturcture){
                if (creep.attack(closestHostileSturcture)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileSturcture);
                }
                else
                {
                    creep.attack(closestHostileSturcture)
                }
            }else if (closestHostileConstructionSite) {
                
            }
        }
	}
};
module.exports = roleFighter0;