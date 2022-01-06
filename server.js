require('dotenv').config();

var fs = require("fs");
const { stringify } = require('querystring');
const { writeFile } = require('fs');
const { Console } = require("console");
const Discord = require('discord.js');
const client = new Discord.Client();
const BotSettings = require('./BotSettings.json');
const adminCommand = require('./adminCommands.js');
const userCommand = require('./commands.js');
const token = ""; //add discord bot token here, or use process.env
const userCommandPrefix = BotSettings.commandPrefixs.General;
const adminCommandPrefix = BotSettings.commandPrefixs.Admin;

const botChannelid = '779011790956527636';
const roleID = "779008873561456650";

client.login(token);

var msgCount = 0;

client.on('ready', ()=> {
    console.log("Server Connection established, loged in as " + client.user.tag)
    client.user.setPresence({
        game: { 
            name: 'Neftlix',
            type: 'WATCHING'
            },
            status: 'idle'
    })

    client.guilds.cache.forEach((guild) => {
        console.log(` - "${guild.name}" has ${guild.memberCount} members`);
    
    })
})

client.on('guildMemberAdd', (guildMember) => {
    let fpuStudentRole = guildMember.guild.roles.cache.get(roleID);
    guildMember.roles.add(fpuStudentRole);
 });

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user){
        return
    }
    if(receivedMessage.channel.id == botChannelid)
    {   
        msgCount += 1;
        let deleteCount = 11;
        console.log(msgCount)
        if(msgCount == deleteCount)
        {
            adminCommand.clear(receivedMessage, 20)
            msgCount = 0;
            adminCommand.updateList(receivedMessage)
        }
    }
    if(receivedMessage.content.startsWith("a.shutdown") && receivedMessage.member.hasPermission("ADMINISTRATOR")){
        
        receivedMessage.channel.send("Mr.Stark, I don't feel so good")
        
        setTimeout(()=>{process.kill(0)}, 1000)
    }
    else if(receivedMessage.content.startsWith(adminCommandPrefix))
    {
        if(receivedMessage.member.hasPermission("ADMINISTRATOR"))
            parseAdminCommand(receivedMessage)
        else 
            receivedMessage.channel.send("You don't have the permissions to run this command")
    }
    else if(receivedMessage.content.startsWith(userCommandPrefix)){
        parseCommand(receivedMessage)
    }
    
})

function parseCommand(receivedMessage)
{
 let fullCommand = receivedMessage.content.substr(userCommandPrefix.length)
 let splitCommand = fullCommand.split(" ")
 let primarycommand = splitCommand[0]
 let arguments = splitCommand.slice(1)
    
    switch(primarycommand)
    {
        
        case "help" : 
            break;
        case "github": receivedMessage.channel.send("Visit https://github.com/LevkoNikitin/StudyBot to view the project progress")
            break;
        case "join": userCommand.joinClass(receivedMessage, arguments);
            break;
        case "drop": userCommand.dropClass(receivedMessage, arguments);
            break;
        default: commandError(receivedMessage)
    }

}


//Set of functioning admin commands
function parseAdminCommand(receivedMessage)
{
    
 let fullCommand = receivedMessage.content.substr(adminCommandPrefix.length)
 let splitCommand = fullCommand.split(" ")
 let primarycommand = splitCommand[0]
 let arguments = splitCommand.slice(1)
    
    switch(primarycommand)
    {
        
        case "create" : adminCommand.create(receivedMessage, arguments);
            break;
        case "delete" : adminCommand.deleteChannel(receivedMessage, arguments);
            break;
        case "clear" : adminCommand.clear(receivedMessage, arguments);
            break;
        case "setrole" : adminCommand.setRole(receivedMessage, arguments)
            break;
        case "help" : adminCommand.helpEmbed(receivedMessage,arguments)
            break;
        case "publish": adminCommand.publish(receivedMessage,arguments)
            break; 
        case "update": adminCommand.updateList(receivedMessage);
            break;
        default: adminCommandError(receivedMessage)
    }
}

function commandError(receivedMessage){
    receivedMessage.channel.send("The command you tried to use does not exist")
}

function adminCommandError(receivedMessage){
    receivedMessage.channel.send("The command you tried to use either doesn't exist or you do not have the permissions to use it.")
}

