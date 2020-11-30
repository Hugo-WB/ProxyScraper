import axios from "axios";
import fs from "fs";
import { getLinkCheerio } from "../../Request";
import { getProxiesInString } from "../Scraping";
// import proxy_check from "proxy-check";

const getProxiesFromLink = async (
  url: string,
  file: string = "proxies.txt"
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
    let response = await axios(url);
    let proxies: string[] = getProxiesInString(response.data);
    return proxies;
    // await fs.writeFile(file,proxies.join("\n"),(error)=>{console.log(error)})
  } catch (error) {
    console.log(error);
    return []
  }
};

class Pastebin {}

export { getProxiesFromLink };
