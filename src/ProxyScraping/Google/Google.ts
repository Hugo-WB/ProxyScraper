import cheerio from "cheerio";
import { getLinkCheerio } from "../../Request";
import { getProxiesFromPastebinLink } from "../Pastebin/Pastebin";
import { getProxiesFromURL } from "../Scraping";

let getLinksFromGoogleSearch = async (search: string, page: number = 1) => {
  let links: string[] = [];
  let morePages: string[] = [];

  let $ = await getGoogleSearchCheerio(search, page);

  let aTags = $(".yuRUbf").children("a");

  aTags.map((i, e) => {
    let href = $(e).attr("href");
    if (href != undefined) {
      links.push(href);
    }
  });
  return links;
};
let getGoogleSearchCheerio = async (
  search: string,
  page: number = 1
): Promise<cheerio.Root> => {
  let reg = new RegExp(/\s/, "g");
  return getLinkCheerio(
    "https://www.google.com/search?q=" +
      search.replace(reg, "+") +
      "&start=" +
      ((page - 1) * 10).toString(),
      "random"
    // "46.4.96.137:8080"
  );
};

let getProxiesFromGoogleSearch = async (search: string) => {
  let proxies: string[][] = [];
  // Array of promises that contain the array of links on every google page
  // E.g. For 2 pages [[link1,link2],[link1,link2,link3]]
  let googleLinksPromises: Promise<string[]>[] = [];
  for (let i = 1; i < 4; i++) {
    googleLinksPromises.push(getLinksFromGoogleSearch(search, i));
  }
  let googlePagesLinks = await Promise.allSettled(googleLinksPromises);
  // Array of promises that contain all proxies E.g. [proxy,proxy,proxy]
  let linkProxiesPromises: Promise<string[]>[] = [];
  console.log(googlePagesLinks);
  googlePagesLinks.forEach((googleLinks) => {
    if (googleLinks.status == "fulfilled") {
      googleLinks.value.forEach((link) => {
        linkProxiesPromises.push(
          getProxiesFromPastebinLink(link, undefined, true)
        );
      });
    }
  });
  let linkProxies = await Promise.allSettled(linkProxiesPromises);
  console.log(linkProxies);
  linkProxies.forEach((linkProxy) => {
    if (linkProxy.status == "fulfilled") {
      if (linkProxy.value != null) {
        console.log("INK PROXY");
        console.log(linkProxy.value);
        proxies.push(linkProxy.value);
      }
    }
  });
  console.log("PROXIES 0");
  console.log(proxies.flat());
  return proxies.flat();
};

class Google {}

export { getLinksFromGoogleSearch, getProxiesFromGoogleSearch };
export default Google;
