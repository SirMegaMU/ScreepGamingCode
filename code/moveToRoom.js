var MoveToRoom = {

    /**
     * 
     * @param {Creep} creep 
     * @param {String} target 
     */
    run:function(creep,target){
        var pathname = creep.room+"-TO-"+target;
        if (Memory.path[pathname]!=undefined) {
            if (creep.pos.x == Memory.path.pathname[0][x] && creep.pos.y == Memory.path.pathname[0][y]) {
                creep.moveByPath(Memory.path.pathname);
            } else {
                creep.moveTo(Memory.path.pathname[0][x],Memory.path.pathname[0][y]);
            }
        } else {
            var exit = creep.room.find(creep.room.findExitTo(target));
            var end =  Game.rooms[target].find(Game.rooms[target].findExitTo(creep.room));
            Memory.path[pathname]=creep.room.findPath(exit,end);
        }
    }
}
module.export = MoveToRoom;