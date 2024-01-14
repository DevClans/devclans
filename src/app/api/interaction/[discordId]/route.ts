import { NextResponse } from 'next/server';
const { Client } = require('discord.js');
const client = new Client();
const targetUserId = "kshetezvinayak";


function handler(req:Request,res:NextResponse){
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
      });
      
      client.on('message', (message: { author: { bot: any; id: string; }; channel: { send: (arg0: string) => void; }; }) => {
        // Check if the message author is the bot or the target user
        if (message.author.bot || message.author.id !== targetUserId) return;
      
        // Replace 'Hello!' with your desired message
        message.channel.send('Hello!');

      });
      
      client.login(process.env.DISCORD_CLIENT_ID); // Replace with your bot token
}
export { handler as GET, handler as POST }