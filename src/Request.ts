import randomUseragent from "random-useragent";
import cheerio from "cheerio";
import fetch, { RequestInit, Response } from "node-fetch";
import { HttpProxyAgent } from "http-proxy-agent";

let sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
let getLinkCheerio = async (
  url: string,
  proxy?: string
): Promise<cheerio.Root> => {
  let response = await getLinkRaw(url, proxy);
  const cheeriod = cheerio.load(response);
  return cheeriod;
};

let getLinkRaw = async (url: string, proxy?: string): Promise<string> => {
  let stringResponse: string = await (await getLinkResponse(url, proxy)).text();
  return stringResponse;
};

let getLinkResponse = async (
  url: string,
  proxy?: string,
  log: boolean = false
): Promise<Response> => {
  try {
    let userAgent = randomUseragent.getRandom((ua) => {
      return ua.browserName === "Chrome";
    });
    if (userAgent == null) {
      userAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36";
    }
    let myHeaders: { [key: string]: string } = {
      "User-Agent": userAgent,
    };
    let options: RequestInit = {};
    if (proxy == undefined) {
      options = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        follow: 100,
        agent: new HttpProxyAgent("http://" + "172.67.181.36:80"),
      };
    } else {
      options = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        follow: 100,
      };
    }
    if (log) {
      console.log("Requesting:" + url + "    options:");
      console.log(options);
    }
    let response = await fetch(url, options);
    return response;
  } catch (error) {
    console.log(error);
    return new Response("<html></html>");
  }
};

export { getLinkCheerio, getLinkRaw, getLinkResponse };
