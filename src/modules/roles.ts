import { MessageReaction, User, GuildMember } from "discord.js";
import RushBotModuleImpl from './index';

export default class RoleModule extends RushBotModuleImpl {

    private messageToRoleMap: ReactionRoleMap = {};

    constructor(){
        super("Roles");
        this.messageToRoleMap['785721021655023626'] = 
        [
            {
                emoji: 'rushme3Blamerush',
                role: '706887569069310003'
            },
            {
                emoji: 'blamerush',
                role: '706887569069310003'
            },
            {
                emoji: '🏳️‍🌈',
                role: '785717666643443753'
            },
            {
                emoji: '🚜',
                role: '784868652704858183'
            },
            {
                emoji: '💻',
                role: '785719450489323581'
            },
            {
                emoji: '👀',
                role: '781942608167567400'
            }
        ];
    }

    public enable(bot: DiscordBot){
        super.enable(bot);
        bot.addEvent('messageReactionAdd', this.onReactionAdd.bind(this));
        bot.addEvent('messageReactionRemove', this.onReactionRemoved.bind(this));
    }

    public async onReactionAdd(messageReaction: MessageReaction, user: User){
        this.devLog("Reaction added");
        if(messageReaction.partial){
            try {
                await messageReaction.fetch();
            } catch(error){
                console.error(error);
                return;
            }
        }
        this.devLog(messageReaction.emoji.name);
        if(this.messageToRoleMap[messageReaction.message.id] !== undefined){
            let guild = messageReaction.message.guild;
            let member: GuildMember = guild.member(user);
            if(member){
                let roleMapEntry = this.messageToRoleMap[messageReaction.message.id];
                let roleToAssign: string;
                if(typeof roleMapEntry === 'string'){
                    roleToAssign = roleMapEntry;
                } else {
                    if(!Array.isArray(roleMapEntry)){
                        roleMapEntry = [roleMapEntry];
                    }
                    let emoji = messageReaction.emoji.name;
                    let roleForEmoji = roleMapEntry.find((r) => r.emoji === emoji);
                    if(roleForEmoji !== undefined){
                        roleToAssign = roleForEmoji.role;
                    }
                }
                if(roleToAssign !== undefined){
                    await member.fetch(true);
                    let hasRole: boolean = member.roles.cache.find((r) => r.id === roleToAssign) !== undefined;
                    if(!hasRole){
                        let role = guild.roles.resolve(roleToAssign);
                        this.devLog("Assigned", member.displayName, role.name);
                        member.roles.add(role);
                    }
                }
            }
        }
    }

    public async onReactionRemoved(messageReaction: MessageReaction, user: User){
        this.devLog("Removed reaction");
        if(messageReaction.partial){
            try {
                await messageReaction.fetch();
            } catch(error){
                console.error(error);
                return;
            }
        }
        if(this.messageToRoleMap[messageReaction.message.id] !== undefined){
            let guild = messageReaction.message.guild;
            let member: GuildMember = guild.member(user);
            if(member){
                let roleMapEntry = this.messageToRoleMap[messageReaction.message.id];
                let roleToAssign: string;
                if(typeof roleMapEntry === 'string'){
                    roleToAssign = roleMapEntry;
                } else {
                    if(!Array.isArray(roleMapEntry)){
                        roleMapEntry = [roleMapEntry];
                    }
                    let emoji = messageReaction.emoji.name;
                    let roleForEmoji = roleMapEntry.find((r) => r.emoji === emoji);
                    if(roleForEmoji !== undefined){
                        roleToAssign = roleForEmoji.role;
                    }
                }
                if(roleToAssign !== undefined){
                    await member.fetch(true);
                    let hasRole: boolean = member.roles.cache.find((r) => r.id === roleToAssign) !== undefined;
                    if(hasRole){
                        let role = guild.roles.resolve(roleToAssign);
                        this.devLog("Unassigned", member.displayName, role.name);
                        member.roles.remove(role);
                    }
                }
            }
        }
    }

}