"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpsGet_1 = __importDefault(require("./httpsGet"));
const xml2js_1 = __importDefault(require("xml2js"));
function default_1(channelId) {
    return new Promise((resolve, reject) => {
        (0, httpsGet_1.default)(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
            .then((xml) => {
            xml2js_1.default.parseString(xml, (err, parsedXml) => {
                if (err !== null)
                    reject(err);
                let channel = {
                    title: parsedXml.feed.title[0],
                    url: parsedXml.feed.link[1].$.href,
                    id: parsedXml.feed["yt:channelId"][0],
                    released: new Date(parsedXml.feed.published[0]),
                    videos: []
                };
                if (parsedXml.feed.entry === undefined)
                    return resolve(channel);
                for (let i = 0; i < parsedXml.feed.entry.length; i++) {
                    const entry = parsedXml.feed.entry[i];
                    let vid = {
                        title: entry.title[0],
                        url: entry.link[0].$.href,
                        id: entry["yt:videoId"][0],
                        released: new Date(entry.published[0]),
                        description: entry["media:group"][0]["media:description"][0],
                        width: parseInt(entry["media:group"][0]["media:content"][0].$.width),
                        height: parseInt(entry["media:group"][0]["media:content"][0].$.height),
                        thumb: {
                            width: parseInt(entry["media:group"][0]["media:thumbnail"][0].$.width),
                            height: parseInt(entry["media:group"][0]["media:thumbnail"][0].$.height),
                            url: entry["media:group"][0]["media:thumbnail"][0].$.url
                        },
                        channel: {
                            title: channel.title,
                            url: channel.title,
                            id: channel.id,
                            released: channel.released
                        }
                    };
                    channel.videos.push(vid);
                }
                resolve(channel);
            });
        })
            .catch((err) => {
            reject(err);
        });
    });
}
exports.default = default_1;