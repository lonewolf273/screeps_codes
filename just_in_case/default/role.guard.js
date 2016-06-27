/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing == 'a thing'; // true
 */
var findFlag = function(name)
{
    for(var n in Game.flags)
    {
       if(Game.flags[n].name == name) return n;
    }
    return -1;
    
}
var roleGuard = {
    run: function(creep)
    {

        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0)
        {
            if (creep.memory.role == 'archer')
            {
                if (creep.rangedAttack(enemies[0]) == ERR_NOT_IN_RANGE) creep.moveTo(enemies[0]);
                else creep.say(creep.rangedAttack(enemies[0]));
            }
            if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) creep.moveTo(enemies[0]);
            else creep.say(creep.attack(enemies[0]));
            
        }
        else
        {
            if (findFlag('patrol') != -1)
                creep.moveTo(Game.flags['patrol'].pos.x, Game.flags['patrol'].pos.y);
        }
    }
}
module.exports = roleGuard;