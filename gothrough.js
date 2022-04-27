Creep.prototype.customMove = function (target, range = 1, ignoreCreep = true) {
	let creep = this;
	if (!creep.memory.path || !creep.memory.path.length) {
		let res = PathFinder.search(creep.pos, {
			pos: target,
			range: range
		}, {
			plainCost: 2,
			swampCost: 10,
			roomCallback: function (roomName) {
				let room = Game.rooms[roomName];
				// 在这个示例中，`room` 始终存在
				// 但是由于 PathFinder 支持跨多房间检索
				// 所以你要更加小心！
				if (!room)
					return;
				let costs = new PathFinder.CostMatrix;
				room.find(FIND_STRUCTURES).forEach(function (struct) {
					if (struct.structureType === STRUCTURE_ROAD) {
						// 相对于平原，寻路时将更倾向于道路
						costs.set(struct.pos.x, struct.pos.y, 1);
					} else if (struct.structureType !== STRUCTURE_CONTAINER &&
						(struct.structureType !== STRUCTURE_RAMPART ||
							!struct.my)) {
						// 不能穿过无法行走的建筑
						costs.set(struct.pos.x, struct.pos.y, 0xff);
					}
				});
				room.find(FIND_MY_CONSTRUCTION_SITES).forEach(function (site) {
					costs.set(site.pos.x, site.pos.y, 0xff);
				});
				// 躲避房间中的 creep
				if (!ignoreCreep) {
					room.find(FIND_CREEPS).forEach(function (creep) {
						costs.set(creep.pos.x, creep.pos.y, 0xff);
					});
				}
				return costs;
			},
			maxOps: 5000,
			maxRooms: 8
		});
		creep.memory.path = res.path;
	} else {
		if (creep.pos.x == creep.memory.path[0].x && creep.pos.y == creep.memory.path[0].y) {
			creep.memory.path.shift();
		}
	}
	let next = creep.memory.path[0];
	let curr = creep.pos;
	if (next) {
		if (Math.abs(curr.x - next.x) <= 1 && Math.abs(curr.y - next.y) <= 1) {
			let obstacle = creep.room.lookForAt(LOOK_CREEPS, next.x, next.y);
			if (!obstacle.length)
				obstacle = creep.room.lookForAt(LOOK_POWER_CREEPS, next.x, next.y);
			if (obstacle.length) {
				if (creep.memory.state == obstacle[0].memory.state ||
					obstacle[0].memory.state == 'Harvest') {
					obstacle[0].memory.path = null;
					obstacle[0].customMove(target, (range - 1) <= 1 ? 1 : (range - 1), false);
				} else {
					let dir = obstacle[0].pos.getDirectionTo(curr.x, curr.y);
					obstacle[0].move(dir);
					if (obstacle[0].memory.path && obstacle[0].memory.path.length)
						obstacle[0].memory.path.shift();
				}
			}
			let dir = creep.pos.getDirectionTo(creep.memory.path[0].x, creep.memory.path[0].y);
			return creep.move(dir);
		} else {
			creep.memory.path = null;
			return -1;
		}
	}
};