var fs = require("fs");
const { stringify } = require('querystring');
const { writeFile } = require('fs');
const { Console } = require("console");
const Discord = require('discord.js');
const client = new Discord.Client();
//const classes = require('./classes.json')


/*
requires a second command call to set all the properties
*/

function create(receivedMessage, argument)
{  

 let arguments = argument.toString()

 let createClass = (receivedMessage, arguments) =>  {return new Promise((resolve,reject) =>
 {

    if(true)
    {
        receivedMessage.guild.channels.create(arguments.toUpperCase(),{type: 'category'}).then().catch();
    
        receivedMessage.guild.channels.create(arguments.toLowerCase() + "-general", {type: 'text'})
            .then(channel => { 
                    let category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase() && c.type == "category");
                    if (!category) throw new Error("Category channel does not exist");
                    channel.setParent(category.id);
            }).catch(console.error);

        receivedMessage.guild.channels.create(arguments.toLowerCase() + "-resources", {type: 'text'})
            .then(channel => { 
                    let category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase() && c.type == "category");
                    if (!category) throw new Error("Category channel does not exist");
                    channel.setParent(category.id);
            }).catch(console.error);

        receivedMessage.guild.channels.create(arguments.toLowerCase()+ "-remote-meetings", {type: 'voice'})
            .then(channel => {
                    let category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase() && c.type == "category");
                    if (!category) throw new Error("Category channel does not exist");
                    channel.setParent(category.id);
            }).catch(console.error);
    
    resolve('')
    }
    else
    {
        reject('')
    }
    })}

    let createRole = (receivedMessage, arguments) =>{return new Promise((resolve,reject)=>{
        if(false)
        {reject("Category doesn't exist")}
        else
        {
        receivedMessage.guild.roles.create({ data: { name: arguments.toUpperCase()} });
        resolve('The role '+ arguments.toUpperCase() +' was created');
        }
    })}

    createClass(receivedMessage, arguments)
    .then(console.log())
    .then(
        createRole(receivedMessage, arguments)
            .then(console.log())
        .catch(console.error))
    .catch(console.error)
} 

function setRole(receivedMessage,argument)
{
    const arguments = argument.toString()
    const category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase() && c.type == "category");
    const role = receivedMessage.guild.roles.cache.find(c => c.name == arguments.toUpperCase());
    category.updateOverwrite( role, {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: true,
    EMBED_LINKS :  true,
    READ_MESSAGE_HISTORY: true,
    ATTACH_FILES: true,
    CONNECT: true,
    SPEAK: true,
    STREAM: true,
    USE_VAD: true,
    })

}

//deletes the role, channel, and the role referance from the joinable classes
function deleteChannel(receivedMessage, argument)
{ 

    let arguments = argument.toString()

    //deletes the category and its child channels
    try{
    const category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase());
    category.delete()    
    .then(console.log)
    .catch(console.error);

 
    const TextChannel = category.children.find(c => c.name == arguments.toLowerCase() + "-general");
    TextChannel.delete()
    .then(console.log)
    .catch(console.error)
    

    const resourcesChannel = category.children.find(c => c.name == arguments.toLowerCase() + "-resources");
    resourcesChannel.delete()
    .then(console.log)
    .catch(console.error)


    const voiceChannel = category.children.find(c => c.name == arguments.toLowerCase() + "-remote-meetings");
    voiceChannel.delete()
    .then(console.log)
    .catch(console.error)
    }
    catch
    {
        console.log("Couldn't delete the category or channels")
    }

    //deletes the role that has access to this channel
    try
    {
        deleteRole(receivedMessage, argument);
    }
    catch
    {
        console.log("Couldn't delete the role")
    }

    //Removes the role name from the published classes list
    try {
        fs.readFile('./classes.json', 'utf8' , (err, data) => {
            if (err) {
            console.error(err)
            return
            }
            const classes = JSON.parse(data)
            console.log(classes)
        
            if(classes.publishedClasses.includes(arguments.toUpperCase()))
            {
                
                let index = classes.publishedClasses.indexOf(arguments.toUpperCase())
                console.log(index)
                classes.publishedClasses.splice(index, 1)
                console.log(classes.publishedClasses)   
        
                // Saves the altered JSON file
                let jsonData = JSON.stringify(classes);
                fs.writeFile("./classes.json", jsonData, function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })
    }

    catch{
        console.log("something went wrong in unpublish")
    }
}
function deleteRole(receivedMessage, argument)
{
    let arguments = argument.toString()
    const role = receivedMessage.guild.roles.cache.find(c => c.name == arguments.toUpperCase());
    role.delete();
}

//deletes the given amount of messages from the channel it was called.
function clear(receivedMessage, arguments = '5')
{
    try
    {
        receivedMessage.channel.bulkDelete(parseInt(arguments)+1).then(console.log(" deleted " + arguments + " messages in channel: " + receivedMessage.channel.id)).catch(console.error) 
    }
    catch
    {

    }
    
}

function helpEmbed(receivedMessage)
{
    const helpembed = new Discord.MessageEmbed()
        .setColor("#fcbf49")
        .setTitle("Admin Commands")
        .setDescription('<> signifies a required argument for a command, do not enter the <> symbols')
        .addField('Creating a class category', ' *a.create <class-name>* creates the category and role\n *a.publish <class-name>* makes the catogory joinable by users\n'+ 
        "make sure that both <class-name> values are the same for both commands", false)
        .addField('Deleting a class category', '*a.delete <class-name>* deletes the class and role', false)
        .addField('Clearing text chat', '*a.clear <number of messages to remove>*', false)
        .addField('Updating the list of joinable classes', '*a.update*', false)
    receivedMessage.channel.send(helpembed)
}
// Makes the class joinable
function publish(receivedMessage,argument)
{
    const arguments = argument.toString()
    
    //adds role to the published list
    try
    {   
        const classes = require('./classes.json')
        classes.publishedClasses.push(arguments.toUpperCase())
        let jsonData = JSON.stringify(classes);
        fs.writeFile("classes.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    catch
    {
        console.log("Couldn't add the role to the published list")
    }

    try
    
    {   
        const category = receivedMessage.guild.channels.cache.find(c => c.name == arguments.toUpperCase() && c.type == "category");
        const role = receivedMessage.guild.roles.cache.find(c => c.name == arguments.toUpperCase());
        category.updateOverwrite( role, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        EMBED_LINKS :  true,
        READ_MESSAGE_HISTORY: true,
        ATTACH_FILES: true,
        CONNECT: true,
        SPEAK: true,
        STREAM: true,
        USE_VAD: true,
        }).then(console.log).catch(console.error)
    }
    catch
    {
        console.log("couldn't update the permissions")
    }
}
/*
function unPublish(receivedMessage,argument)
{
    const arguments = argument.toString()
    try {
            fs.readFile('./classes.json', 'utf8' , (err, data) => {
                if (err) {
                console.error(err)
                return
                }
                const classes = JSON.parse(data)
                console.log(classes)
            
                if(classes.publishedClasses.includes(arguments.toUpperCase()))
                {
                    
                    let index = classes.publishedClasses.indexOf(arguments.toUpperCase())
                    console.log(index)
                    classes.publishedClasses.splice(index, 1)
                    console.log(classes.publishedClasses)   
            
                    // Saves the altered JSON file
                    let jsonData = JSON.stringify(classes);
                    fs.writeFile("./classes.json", jsonData, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            })
        }
    
        catch{
            console.log("something went wrong in unpublish")
        }
}
*/

// Sends an embed of the classes from the published classes list
function updateList(receivedMessage)
{ 
    try{
        fs.readFile('./classes.json', 'utf8' , (err, data) => {
            if (err) {
            console.error(err)
            return
            }
            //779011790956527636
            const classesChannel = receivedMessage.guild.channels.cache.get('779011790956527636')
            const classes = JSON.parse(data)
            console.log(classes)
            let embed = ''
            classes.publishedClasses.forEach(element => { embed = embed + element +"\n"})
            if(embed == '')
            {
                console.log('no classes in list')
                return
            }
            const classlist = new Discord.MessageEmbed()
            .setColor("#fcbf49")
            .setTitle("List of classes to join")
            .setDescription('Use */join <class-name>* to join a class in this list\n i.e. */join test* \n ' + 
            'Use */drop <class-name>* to leave a class in this list\n i.e. */drop test* ')
            .addField('Classes you can join:', embed, false)
            
            classesChannel.bulkDelete(20)   
            classesChannel.send(classlist)
        })
    }
    catch
    {
        console.log("something went wrong in updateList")
    }
}

exports.create = create;
exports.deleteChannel = deleteChannel;
exports.clear = clear;
exports.deleteRole = deleteRole;
exports.setRole = setRole;
exports.helpEmbed = helpEmbed;
exports.publish = publish;
exports.updateList = updateList;
