import axios, { AxiosRequestConfig } from "axios";
import cheerio from "cheerio";
import randomUseragent from "random-useragent";
import {getLinkCheerio} from "../Request"

let getLinksFromGoogleSearch = async (search: string) => {
  let links: string[] = [];
  let morePages: string[] = [];

  let $ = await getGoogleSearchCheerio(search);

  let aTags = $(".yuRUbf").children("a");

  aTags.map((i, e) => {
    let href = $(e).attr("href");
    if (href != undefined) {
      links.push(href);
    }
  });
  return links;
};
let getGoogleSearchCheerio = async (search: string,page:number = 1) => {
  let reg = new RegExp(/\s/,"g")
  return getLinkCheerio("https://www.google.com/search?q=" + search.replace(reg, "+")+"&start="+(( page-1 )*10).toString());
};

class Google {}

export { getLinksFromGoogleSearch };
export default Google;
