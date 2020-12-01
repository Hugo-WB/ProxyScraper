import { HttpProxyAgent } from "http-proxy-agent";
import fetch, { Response } from "node-fetch";
import fs from "fs";
import { getLinkResponse,sleep } from "../Request";


const getLinkAndCheckValidity = async (
  url: string,
  proxy?: string,
  log?: boolean
) => {
  try {
    let response: Response = await getLinkResponse(url, proxy, log);
    let text:string = await response.text()
    if (text.includes("timezone: Europe/London")){
      // console.log(text)
      return response
    }
    throw "Invalid";
  } catch (error) {
    // await sleep(100000)
    return new Response("<html><p>REQUEST FAILED</p></html>");
  }
};

const checkProxy = async (
  url: string,
  proxy: string,
  timeout: number = 3000,
  log:boolean = false

): Promise<Response | "TIMEOUT"> => {
  try {
    let timeoutPromise: Promise<"TIMEOUT"> = new Promise((resolve, reject) =>
      setTimeout(() => reject("TIMEOUT"), timeout)
    );
    let validResponse: Promise<Response> = getLinkAndCheckValidity(
      url,
      proxy,
      log
    );
    return Promise.race([validResponse, timeoutPromise]);
  } catch (e) {
    throw "ERROR" + e;
  }
};

const checkProxies = async (proxies: string[],url:string="http://worldtimeapi.org/api/timezone/Europe/London.txt"): Promise<string[]> => {
  let proxyPromises: Promise<Response | string>[] = [];
  proxies.forEach((proxy) => {
    proxyPromises.push(checkProxy(url, proxy));
  });
  console.log("Sent requests, awaiting");

  let resolvedPromises = await Promise.allSettled(proxyPromises);
  let validProxies: string[] = [];
  for (let i = 0; i < proxyPromises.length; i++) {
    let promise = resolvedPromises[i];
    let proxy = proxies[i];
    if (promise.status == "fulfilled") {
      if (promise.value instanceof Response) {
        // promise.value.text().then(text=>console.log(text))
        validProxies.push(proxy);
      }
    }
  }
  console.log(
    ((100 * validProxies.length) / proxies.length).toPrecision(3).toString() +
      "% Valid Proxies"
  );
  return validProxies;
};

const checkProxiesInFile = async (fileLocation: string): Promise<string[]> => {
  let proxies = fs
    .readFileSync(fileLocation, { encoding: "utf-8" })
    .replace(/\r\n/g, "\n")
    .split("\n");
  console.log(proxies);
  let output = await checkProxies(proxies);
  return output;
};

export { checkProxies, checkProxy, checkProxiesInFile };
