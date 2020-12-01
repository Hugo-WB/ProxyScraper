import { HttpProxyAgent } from "http-proxy-agent";
import fetch, { Response } from "node-fetch";
import fs from "fs";
import { getLinkResponse } from "../Request";

const checkProxy = async (
  url: string,
  proxy: string,
  timeout: number = 3000
): Promise<Response | "TIMEOUT"> => {
  try {
    let timeoutPromise: Promise<"TIMEOUT"> = new Promise((resolve, reject) =>
      setTimeout(() => reject("TIMEOUT"), timeout)
    );
    let validResponse: Promise<Response> = getLinkResponse(url,undefined,false)
    // let validResponse: Promise<Response> = new Promise((resolve, reject) => {
    //   fetch(url, {
    //     agent: new HttpProxyAgent("http://" + proxy),
    //     redirect: "follow",
    //     follow: 50,
    //   }).then((re) => {
    //     re.text().then((text) => {
    //       if (text.includes("Tired of being tracked online? We can help.")) {
    //         resolve(re);
    //       }
    //     });
    //   }).catch((e)=>console.log(e));
    // });
    return Promise.race([validResponse, timeoutPromise]);
  } catch (e) {
    throw "ERROR" + e;
  }
};

const checkProxies = async (proxies: string[]): Promise<string[]> => {
  let url = "http://duckduckgo.com/";
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
