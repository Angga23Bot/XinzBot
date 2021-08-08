"use strict";
const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require("../lib/myfunc");

//let intri = JSON.parse(fs.readFileSync('./message/intro.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let { botName } = setting

module.exports = async(xinz, anj, welcome, left) => {
    const isWelcome = welcome.includes(anj.jid)
    const isLeft = left.includes(anj.jid)
    const mdata = await xinz.groupMetadata(anj.jid)
    const groupName = mdata.subject
    //const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = msg

    if (anj.action === 'add'){
        if (anj.participants[0] === xinz.user.jid){
            await sleep(5000)
            xinz.updatePresence(anj.jid, Presence.composing)
            xinz.sendMessage(anj.jid, `Hai aku ${botName}, silahkan kirim #menu`, MessageType.text)
        } else if (isWelcome){
            try {
                var pic = await xinz.getProfilePicture(anj.participants[0])
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
            //let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelcome ? 'Aktif' : 'Mati'}\n*Left :* ${isLeft ? 'Aktif' : 'Mati'}\n*AntiLink :* ${isAntiLink ? 'Aktif' : 'Mati'}\n*AntiWame :* ${isAntiWame ? 'Aktif' : 'Mati'}\n*AntiBadword :* ${isBadword ? 'Aktif' : 'Mati'}\n*nsfw :* ${isNsfw ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
            xinz.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Hai @${anj.participants[0].split("@")[0]}, selamat datang di ${groupName}.\n\n*INTRO MEMBER BARU:*

- _Nama:_ 
- _Umur:_ 
- _Asal Kota:_
- _Jenis Kelamin:_
- _Kota Sekarang:_ 
- _Anime Favorit:_ 
- _Tujuan Masuk Grup:_ 

*Lost Famz lagi open member nih kak, Tolong bantu share link grup ya kak!.* :)
Link:
https://chat.whatsapp.com/GX6nBkBk9pwFSvx6S2f8up
 
Terima kasih atas bantuan dan kerjasamanya kak.
Semoga betah dan semoga akrab sama semuanya. 
🙏😇
 
*• About LostFamz:*
_Didirikan untuk mencari kawan bukan lawan._ _Dengan 9 pendiri tanpa_ *_KETUA_* .

*• 𝘾𝙖𝙩𝙖𝙩𝙖𝙣:*
_- 𝙹𝚒𝚔𝚊 𝚔𝚊𝚕𝚒𝚊𝚗 𝚒𝚗𝚐𝚒𝚗 𝚖𝚎𝚗𝚢𝚎𝚠𝚊 𝚋𝚘𝚝/𝚒𝚗𝚐𝚒𝚗 𝚖𝚎𝚖𝚋𝚞𝚊𝚝 𝚋𝚘𝚝,_ 
_𝚜𝚒𝚕𝚊𝚑𝚔𝚊𝚗 𝚖𝚊𝚜𝚞𝚔 𝚔𝚎 𝚐𝚛𝚞𝚋 𝚔𝚊𝚖𝚒._ 
_- 𝕆𝕗𝕗𝕚𝕔𝕚𝕒𝕝 𝔹𝕠𝕋:_
_https://chat.whatsapp.com/Ip7WdI5nTc4BwnIPX8PQ1J_ `, contextInfo: {"mentionedJid": [anj.participants[0]]}})
        }
    } else if (anj.action === 'remove' && isLeft){
        try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        xinz.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Sayonara @${anj.participants[0].split("@")[0]}`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    }
}