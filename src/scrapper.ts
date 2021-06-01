const cheerio = require('cheerio');
const _fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const box = require('./box');
const file = require('./file');

class Scrapper {
    html: string;
    $: any;
    boxes: any[];
    link: string;

    constructor(link: string){
        this.html;
        this.$;
        this.boxes = [];
        this.link = link;
        this.init();
    }

    async init(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.link);
        this.html = await page.content();
        await browser.close();
        this.loadHtml();
    }

    loadHtml() {
        this.$ = cheerio.load(this.html);
        this.$.html();
        this.$(".crayons-story__body").each((i,e)=>{
            const $e = this.$(e);
            this.boxes.push(
                box({
                    author: $e.find('.crayons-story__meta > div:nth-child(2) > p > a').text(),
                    date: $e.find('.crayons-story__meta time').text(),
                    title: $e.find('.crayons-story__title a').text(),
                    link: this.link.substring(0, this.link.length - 1) + $e.find('.crayons-story__title a').attr('href'),
                })
            );
        });
        file.toJson(this.boxes);
        file.toExcel(this.boxes);
        console.log(this.link + ' has been scrapped');
    }
}
const scrapper = new Scrapper("https://dev.to/");

module.exports = scrapper;