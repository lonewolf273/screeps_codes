/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
 
var distance = function(obj1, obj2)
{
    return Math.sqrt(Math.pow((obj1.pos.x - obj2.pos.x), 2) + Math.pow((obj1.pos.y - obj2.pos.y), 2));
}

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var len = targets.length;
            if(len) {
                var target = targets[0]
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                else if (target.progress == target.progressTotal)
                {
                    Game.notify(creep.name + ' has just finished a structure!' + ' ' + (len - 1).toString() + ' to go!', 60);
                }
            }
        }
        else {
            var what = creep.pos.findClosestByRange(FIND_SOURCES);
            var sources = creep.room.find(FIND_SOURCES);
            what = sources[0];
            if(creep.harvest(what) == ERR_NOT_IN_RANGE) {
                creep.moveTo(what);
            }
        }
    }
};

module.exports = roleBuilder;