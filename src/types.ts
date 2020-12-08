
interface Logger {
    log: (...data: any) => void;
    devLog: (...data: any) => void;
}

interface DiscordBot extends Logger {
    addEvent: (name: string, handler: (...event: any) => void) => void;
    getGuild: () => import('discord.js').Guild;
}

interface RushBotModule extends Logger{
    enable: (bot: DiscordBot) => void;
    disable: () => void;
}

interface ReactionRole {
    emoji: string;
    role: string;
}

interface ReactionRoleMap {
    [messageId: string]: string | ReactionRole | ReactionRole[];
}