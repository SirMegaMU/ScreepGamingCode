var WorkDispatch = {

    /**
     */
    run:function(MyBase){
        for (var roomname in MyBase)
        {
            list =  MyBase[roomname][1];
            for (var roomname in MyBase) {
                if (MyBase[roomname][0] == 'Home' ) {
                    var Spawn = Game.rooms[roomname].find(FIND_MY_SPAWNS)[0];
                } else {
                    var Spawn = Game.rooms[MyBase[roomname][0][Reserved]].find(FIND_MY_SPAWNS)[0];
                }
                // Harvester的生成
                var sources = Game.rooms[roomname].find(FIND_SOURCES).length;
                for (let index = 0; index < sources; index++) {
                    var harvester = _.filter(Game.creeps,(creep)=>(creep.memory.role == 'harvester' 
                        && creep.memory.WorkRoom == roomname 
                        && creep.memory.index == index));
                    if (harvester.length<list['Harvester']) {
                        var newName = 'Harvester-'+roomname+'-'+index+'-'+Game.time;
                        Spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],newName,
                            {memory:{role:'harvester',WorkRoom:roomname,index:index,SpawnRoom:Spawn.room.name}});
                    }
                }
                
                if (Game.rooms[roomname].energyAvailable>=Game.rooms[roomname].energyCapacityAvailable/2) {
                    // Builder的生成
                    var builder = _.filter(Game.creeps,(creep)=>(creep.memory.role == 'builder' 
                        && creep.memory.WorkRoom == roomname ));
                    if (builder.length<list['builder']) {
                    var newName = 'Builder-'+roomname+'-'+Game.time;
                    Spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],newName,
                        {memory:{role:'builder',WorkRoom:roomname,SpawnRoom:Spawn.room.name}});
                    }
                }
            }
        }
    }
};
module.export = WorkDispatch;