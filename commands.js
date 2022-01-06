var fs = require("fs");
const { stringify } = require('querystring');
const { writeFile } = require('fs');
const { Console } = require("console");
const Discord = require('discord.js');
const client = new Discord.Client();

//user side role selection commands

function joinClass(receivedMessage, argument)
{
    const classes = require('./classes.json')
    const arguments = argument.toString()
    if(classes.publishedClasses.includes(arguments.toUpperCase()))
    {
        const role = receivedMessage.guild.roles.cache.find(c => c.name == arguments.toUpperCase());
        receivedMessage.member.roles.add(role).catch(console.error);
        receivedMessage.channel.send("You have joined " + arguments.toUpperCase())
        
    }
    else
    {
        receivedMessage.channel.send("Class doesn't exist")
    }
}
function dropClass(receivedMessage, argument)
{
    const classes = require('./classes.json')
    const arguments = argument.toString()
    if(classes.publishedClasses.includes(arguments.toUpperCase()))
    {
        const role = receivedMessage.guild.roles.cache.find(c => c.name == arguments.toUpperCase());
        receivedMessage.member.roles.remove(role).catch(console.error);
        receivedMessage.channel.send("You have left " + arguments.toUpperCase())
        
    }
    else
    {
        receivedMessage.channel.send("Class doesn't exist")
    }
}
exports.joinClass = joinClass;
exports.dropClass = dropClass;