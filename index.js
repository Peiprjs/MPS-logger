const Discord = require('discord.js');
const { save, loadAll, remove } = require('./data');
const bot = new Discord.Client();
const data = new require('./data');
const PREFIX = "!";

var notes = loadAll('notes');
var notifications = loadAll('notifications');

bot.on('ready', () =>{
    console.log('This bot is online')
})

bot.on('message', msg=>{    
    if(msg.content.startsWith(PREFIX)){

        var args = msg.content.substring(PREFIX.length).split(" ");

        switch(args[0]){
            case 'n':
            case 'note':
                switch(args[1]){

                    default:
                        msg.reply("Possible subcommands:\nnote add <some text>\nnote show\nnote remove <number>");
                        break;

                    case 'a':
                    case 'add':
                        if(args[2]){
                            var raw = save(msg.author.tag, args, 'notes');
                            if(notes[msg.author.tag] == undefined){                
                        
                                notes[msg.author.tag] = [];
                                notes[msg.author.tag] = [raw[0]];
                                notes[msg.author.tag].push(raw[1]);    
                                
                            }else{
                                notes[msg.author.tag].push(raw[0]);
                                notes[msg.author.tag].push(raw[1]);
                            }
                            
                            msg.reply("Added your new note!");
                            break;
                        }else{
                            msg.reply("Correct use: note add <a text>");
                        }   
                        break;   
                    case 's':
                    case 'show':                    
                        msg.reply("Searching for notes...");
                        if(notes[msg.author.tag]){
                            let temp = "";
                            for(var i = 0; i < notes[msg.author.tag].length / 2; i++){
                                temp += i + ":  " + notes[msg.author.tag][i*2] + "\n";                            
                            }
                            msg.reply(temp);
                            
                        }else{
                            msg.reply("You do not have any notes open.");
                        }

                        break;

                    case 'r':
                    case 'remove':
                        if(args[2]){
                            let n = notes[msg.author.tag];
                            remove(n[args[2] * 2 + 1], 'notes');                  
                            notes[msg.author.tag].splice(args[2] * 2, 1);
                            notes[msg.author.tag].splice(args[2] * 2, 1);                    
                            msg.reply("Removed note NR." + args[2]);  
                        }else{
                            msg.reply("Correct use: note remove <number>");
                        }
                    
                        break;
                                                        
                } 
                break;
                
            case 'not':
            case 'notification':
                
                
                switch(args[1]){
                    case 'send':
                    case 's':
                        if(args[2] && args[3]){
                            msg.reply("Sending the notification to " + args[2]);
                            args.shift()
                            var raw = save(args[1], args, 'notifications');

                            if(notifications[msg.author.tag] == undefined){                
                        
                                notifications[msg.author.tag] = [];
                                notifications[msg.author.tag] = [raw[0]];
                                notifications[msg.author.tag].push(raw[1]);    
                                
                            }else{
                                notifications[msg.author.tag].push(raw[0]);
                                notifications[msg.author.tag].push(raw[1]);
                            }
                        }else{
                            msg.reply("Correct use: notification send <tartget> <message>");
                        }
                        break;
                    case 'get':
                    case 'g':
                        var temp = notifications[msg.author.tag];
                        if(temp == undefined){
                            msg.reply("You do not have any notifications!");
                        }else{
                            var msg_string = "Here are your notifications:\n";                            
                            
                            for(var i = 0; i < temp.length/2; i ++){
                                msg_string += temp[i*2] + "\n\n";
                                remove(temp[i*2+1] ,'notifications');
                            }                           

                            msg.reply(msg_string);
                        }

                        notifications[msg.author.tag] = undefined;
                        
                        break;
                    default:
                        msg.reply("Possible subcommands:\nnotification send <user> <some text>\nnotification get");
                        break;
                }
                break;
                    
        }

        
    }
})

bot.login(process.env.token);

