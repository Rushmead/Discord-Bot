export default class RushBotModuleImpl implements RushBotModule{

    private bot: DiscordBot;

    private name: string;

    constructor(name: string){
        this.name = name;
    }

    public enable(bot: DiscordBot){
        this.bot = bot;
        this.log("Enabled");
    }

    public disable(){
        this.log("Disabled");
    }

    public log(...data: any){
        this.bot.log(`[${this.name}]`, ...data);
    }

    public devLog(...data: any){
        this.bot.devLog(`[${this.name}]`, ...data);
    }

}