/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.pickup');
 * mod.thing == 'a thing'; // true
 */
var actions = require('creep.actions');
var roleTaker = function(creep)
{
    var brother = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return false;
                var invalids = ['pick', 'taker', 'upgrader', 'mechanic', 'builder'];
                for (i in invalids)
                {
                    if (invalids[i] == object.memory.role) return false;
                }
                return object.carry.energy > object.carryCapacity / 2;
            }
        }
        );
    if (!creep.memory.storageTaken)
        creep.memory.storageTaken = false;
    if (creep.carry.energy < creep.carryCapacity)
    {
        if (brother == null)
        {
            if (creep.carry.energy == 0)
            {
                actions.take_storage(creep);
                creep.memory.storageTaken = true;
            }
            else
            {
                if (creep.memory.storageTaken || actions.store_energy_close(creep) != OK)
                {
                    if(actions.give_energy(creep, STRUCTURE_EXTENSION, 0, true) != OK)
                        actions.give_energy(creep);
                    creep.memory.storageTaken = false;
                }
            }
        }
        else
        {
            creep.moveTo(brother);
            var takeAmount = Math.min(brother.carry.energy / 2, creep.carry.energyAvailable);
            brother.transfer(creep, RESOURCE_ENERGY, takeAmount);
            creep.memory.storageTaken = false;
        }
    }
    else
    {
        if (creep.memory.storageTaken || actions.store_energy_close(creep) != OK)
            if(actions.give_energy(creep, STRUCTURE_EXTENSION) != OK)
                actions.give_energy(creep);          
    }
}

var rolePicker = {
    run: function(creep)
    {
    if (creep.room.find(FIND_DROPPED_ENERGY).length)
    {
        if(creep.carry.energy == 0)
        {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else
        {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < structure.energyCapacity) ||
                            ((structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity);
                    }
            });
            if(targets != null) {
                target = targets;
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(target);
                }
                else
                {
                    creep.say("transferring");
                }
            }
        }
    }
    else
    {
       roleTaker(creep); 
    }
    }
}
module.exports = rolePicker;