import {config} from 'dotenv';
import {Client, MessageReaction, User, GuildMember} from 'discord.js';
import RoleModule from './modules/roles';

class DiscordBotImpl implements DiscordBot{

    private isDev: boolean;
    private client: Client;

    private modules: RushBotModule[];

    public log(...data: any) {
        console.log(`[${new Date().toISOString()}]`, "[RushBot]", ...data);
    }

    public devLog(...data: any) {
        if(this.isDev)
            this.log(...data);
    }

    constructor(token: string, isDev: boolean = false){
        this.isDev = isDev;
        this.log("Starting...");
        this.client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
        this.client.on('ready', this.ready.bind(this));
        this.modules = [];
        this.addModule(new RoleModule());
        this.client.login(token);
    }

    public ready(){
        this.log("Connected to Discord.");
        this.modules.forEach((m) => m.enable(this));
    }

    public shutdown(){
        this.log("Shutting down...");
        this.modules.forEach((m) => m.disable());
        this.client.destroy();
        process.exit();
    }

    public addEvent(event: string, handler: (...data: any) => void){
        this.client.on(event, handler);
    }

    public addModule(module: RushBotModule){
        this.modules.push(module);
    }

    public getGuild(){
        return this.client.guilds.resolve('535581335960682536');
    }
}

config();
const botInstance = new DiscordBotImpl(process.env.DISCORD_TOKEN, true);
const shutdownProcess = botInstance.shutdown.bind(botInstance);
process.on('SIGINT', shutdownProcess);
process.on('SIGUSR1', shutdownProcess);
process.on('SIGUSR2', shutdownProcess);