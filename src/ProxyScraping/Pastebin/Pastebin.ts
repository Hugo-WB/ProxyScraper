import fs from "fs";
import { getLinkCheerio } from "../../Request";
import { getProxiesInString } from "../Scraping";
import {writeProxiesToTxt} from "../../Files"

const getProxiesFromPastebinLink = async (
  url: string,
  file: string = "pasteBinProxies.txt"
):Promise<string[]> => {
  try {
    let validPastebin = new RegExp(/https:\/\/pastebin\.com\/raw\/[A-z]*/, "g");
    let validInput = new RegExp(/https:\/\/pastebin\.com\/.*/, "g");
    if (!validInput.test(url)) {
      throw new Error("Not A pastebin link");
    }
    if (!validPastebin.test(url)) {
      let splitUrl = url.split("/");
      splitUrl.splice(splitUrl.length - 1, 0, "raw");
      url = splitUrl.join("/");
    }
    let response = await (await fetch(url)).text()
    let proxies: string[] = getProxiesInString(response);
    // await writeProxiesToTxt(proxies,file)
    return proxies;
  } catch (error) {
    console.log(error);
    return []
  }
};

class Pastebin {}

export { getProxiesFromPastebinLink};
