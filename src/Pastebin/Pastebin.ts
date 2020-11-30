import axios from "axios";
import fs from "fs";
import { getLinkCheerio } from "../Request";
// import proxy_check from "proxy-check";

const getProxiesFromLink = async (
  url: string,
  file: string = "proxies.txt"
) => {
  try {
    let validPastebin = new RegExp(/https:\/\/pastebin\.com\/raw\/[A-z]*/,"g")
    let validInput = new RegExp(/https:\/\/pastebin\.com\/.*/,"g")
    if (!validInput.test(url)) {
      throw new Error("Not A pastebin link");
    }
    if (!validPastebin.test(url)) {
      let splitUrl = url.split("/");
      splitUrl.splice(splitUrl.length - 1, 0, "raw");
      url = splitUrl.join("/");
    }
    let re = new RegExp(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b:\d{2,5}/,"g")
    let response = await axios(url);

    let proxies = response.data.match(re)
    return proxies
    // await fs.writeFile(file,proxies.join("\n"),(error)=>{console.log(error)})
  } catch (error) {console.log(error)}
};


class Pastebin {}

export { getProxiesFromLink };
