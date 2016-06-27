var checkNumber = function(roleName)
{
    return _(Game.creeps).filter({memory: {role: roleName}}).size();
}
var mem_create = function(property)
{
    if(Memory.hasOwnProperty(property)) return true;
    return false;
}
var initialize = function()
{
    if (!Memory.hasOwnProperty(struct)) return true;
    return false;
}
var distance = function(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
var distance = function(obj1, obj2)
{
    return distance(obj1.x, obj1.y, obj2.x, obj2.y);
}
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMechanic = require('role.mechanic');
var roleGuard = require('role.guard');
var roleTransfer = require('role.transfer');
var roleExtend = require('role.extend');

var creepActions = require('creep');

var functions = require("functions");
var actions = require('creep.actions');
var structSpawn = require('structure.spawner');
require('lodash');


var pickAndGo = require('role.pickup');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    for (var name in Game.spawns)
    {
        var spawn = Game.spawns[name]
        structSpawn.run(spawn);
    }   
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        creepActions.run(creep);
        switch(creep.memory.role)
        {

            case 'pick':
                pickAndGo.run(creep);
                break;
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'guard':
            case 'archer':
                roleGuard.run(creep);
                break;
            case 'mechanic':
                roleMechanic.run(creep);
                break;
            case 'transfer':
                roleTransfer.run(creep);
                break;
            case 'extend':
                roleExtend.run(creep);
                break;
            case 'taker':
                creep.memory.role = 'pick';
                break;
        }
    }
    
}