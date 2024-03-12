import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getVerseOfTheDay(version: string = "NLT") {
    const baseURL = "https://www.biblegateway.com/reading-plans/verse-of-the-day/next";
    let URL = `${baseURL}?version=${version}`;
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        $('.versenum').remove();

        let verse = $(".rp-passage-text").text().trim();
        let pass = `${$(".rp-passage-display").text()} ${version}`;

        return {
            citation: pass,
            passage: verse
        }
    } catch (err) {
        console.error(err);
    }
}
