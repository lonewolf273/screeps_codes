/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep');
 * mod.thing == 'a thing'; // true
 */

var creepActions = {
    run: function(creep)
    {
        if(creep.room.find(FIND_HOSTILE_CREEPS).length == 0)
        {
            if (!creep.room.find(STRUCTURE_CONTROLLER))
                creep.drop(RESOURCE_ENERGY);
            else
            {
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if(target != null && target.pos.x == creep.pos.x && target.pos.y == creep.pos.y) creep.pickup(target);
            }

            if (creep.memory._move && creep.memory._move.hasOwnProperty('dest'))
                if (creep.memory._move.dest.x < 3 && creep.pos.x == 0)
                {
                    var x = creep.memory._move.dest.x;

                    var y = creep.memory._move.dest.y;
                    if (creep.pos.x < creep.memory._move.dest.x)
                    {
                        if(x != undefined && y != undefined)
                        {
                            var p = creep.room.getPositionAt(x, y);
                            if (!p) creep.say('something');
                            if (!creep.pos.inRangeTo(p.x, p.y, 5))
                                creep.move(RIGHT);
                            else creep.say(creep.pos.getRangeTo(p.x, p.y));
                        }
                        
                    }
                }
        }
    }
}
module.exports = creepActions;