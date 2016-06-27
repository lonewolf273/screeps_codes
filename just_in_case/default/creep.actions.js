/*
    OK: 0,
    ERR_NOT_OWNER: -1,
    ERR_NO_PATH: -2,
    ERR_NAME_EXISTS: -3,
    ERR_BUSY: -4,
    ERR_NOT_FOUND: -5,
    ERR_NOT_ENOUGH_ENERGY: -6,
    ERR_NOT_ENOUGH_RESOURCES: -6,
    ERR_INVALID_TARGET: -7,
    ERR_FULL: -8,
    ERR_NOT_IN_RANGE: -9,
    ERR_INVALID_ARGS: -10,
    ERR_TIRED: -11,
    ERR_NO_BODYPART: -12,
    ERR_NOT_ENOUGH_EXTENSIONS: -6,
    ERR_RCL_NOT_ENOUGH: -14,
    ERR_GCL_NOT_ENOUGH: -15,
*/
var repair_priority = function(obj)
{
    if (obj.hits/obj.hitsMax < 0.5)
    {
        if (obj.structureType == STRUCTURE_RAMPART) return (obj.hits/RAMPART_DECAY_AMOUNT) * RAMPART_DECAY_TIME + obj.ticksToDecay();
        else if (obj.structureType == STRUCTURE_ROAD) return (obj.hits/ROAD_DECAY_AMOUNT) * ROAD_DECAY_TIME + obj.ticksToDecay();
        else if (obj.hits / obj.hitsMax < 0.25) return -1;
    }
    return -obj.hits;
}
var actions = {
    repair: function(creep, index = 0, distance = false)
    {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        });
        if (targets.length > 0)
        {
            if (distance) targets.sort((a, b) => (creep.pos.getRangeTo(a.pos) - creep.pos.getRangeTo(b.pos)));
            else targets.sort((a, b) => repair_priority(a) - repair_priority(b));
            for (var i in targets)
            {
                //creep.say(repair_priority[i]);
                creep.moveTo(targets[i]);
                var result = creep.repair(targets[i]);
                if(result == ERR_NOT_IN_RANGE || result == OK) return OK;
            }
        }
        return ERR_NOT_FOUND;
    },
    take_storage: function(creep, structureType = STRUCTURE_CONTAINER, index = 0, resource = RESOURCE_ENERGY)
    {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == structureType) &&
                        _.sum(structure.store) >= creep.carryCapacity);
                }
        });
        if (targets[index] == undefined) return ERR_NOT_FOUND;
        var message = targets[index].transfer(creep, resource);
        if(message == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(targets[index]);
            return OK;
        }
        else return message;
    },
    store_energy_close: function(creep, structureT = STRUCTURE_CONTAINER, resource = RESOURCE_ENERGY)
    {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == structureT && _.sum(structure.store) < structure.storeCapacity);
                }
        });

        var message = creep.transfer(target, resource) 
        if(message == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(target);
            return OK;
        }
        else return message;
    },
    store_energy: function(creep, structureType = STRUCTURE_CONTAINER, index = 0, resource = RESOURCE_ENERGY)
    {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == structureType) &&
                        _.sum(structure.store) < creep.carryCapacity);
                }
        });
        var message = creep.transfer(targets[index], resource) 
        if(message == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(targets[index]);
            return OK;
        }
        else return message;
    },
    give_energy: function(creep, structureT = STRUCTURE_SPAWN, index = 0, close = false, resource = RESOURCE_ENERGY)
    {
        var message;
        if (close)
        {
            message = creep.transfer(creep.pos.findClosestByRange(FIND_STRUCTURES, {filter:(structure) =>{return (((structure.structureType == structureT) &&
                structure.energy < structure.energyCapacity));}}))
        }
        else
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == structureT) &&
                            structure.energy < structure.energyCapacity);
                    }
            });
            message = creep.transfer(targets[index], resource)
        }
        if(message == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(targets[index]);
            return OK;
        }
        else return message;
    },
    upgrade: function(creep)
    {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller);
    },
    harvest_source: function(creep, index = 0)
    {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[index]);
        }
    },
    harvest_source_close: function(creep)
    {
        var sources = creep.room.find(FIND_SOURCES);
        sources.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos))
        for(var i in sources)
        {
            var message = creep.harvest(sources[i]);
            switch(message)
            {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(sources[i]);
                    return OK;
                case ERR_NOT_ENOUGH_RESOURCES:
                case ERR_INVALID_TARGET:
                    break;
                default:
                    return message;
            }
        }
        return message;
    }

};
module.exports = actions;