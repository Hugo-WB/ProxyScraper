import randomUseragent from "random-useragent";
import cheerio from "cheerio";
import fetch, { RequestInit, Response } from "node-fetch";
import { HttpProxyAgent } from "http-proxy-agent";
import { getRandomProxyFromTxt } from "./Files";

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

let getLinkRaw = async (
  url: string,
  proxy?: string,
  log: boolean = false
): Promise<string> => {
  let stringResponse: string = await (
    await getLinkResponse(url, proxy, log)
  ).text();
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
    let proxyAgent: HttpProxyAgent;
    if (typeof proxy == "string") {
      if (proxy == "random") {
        let randomProxy = getRandomProxyFromTxt()
        console.log("RANDOM PROXY:"+randomProxy)
        proxyAgent = new HttpProxyAgent("http://" + randomProxy);
      } else {
        proxyAgent = new HttpProxyAgent("http://" + proxy);
      }
      options = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        follow: 100,
        agent: proxyAgent,
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
    if (log) {
      console.log(error);
    }
    return new Response("<html></html>");
  }
};

export { getLinkCheerio, getLinkRaw, getLinkResponse, sleep };
