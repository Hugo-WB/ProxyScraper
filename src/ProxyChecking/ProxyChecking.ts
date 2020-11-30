import axios, { AxiosRequestConfig } from "axios";
import { HttpProxyAgent } from "http-proxy-agent";
import fetch,{Response} from "node-fetch";
import fs from "fs";

const checkProxy = async (url: string, proxy: string):Promise<Response| "TIMEOUT" > => {
  try {
    let timeout:Promise<"TIMEOUT"> = new Promise((resolve, reject) =>
      setTimeout(() => reject("TIMEOUT"), 5000)
    );
    let response = fetch(url, {
      agent: new HttpProxyAgent("http://" + proxy),
      redirect: "follow",
      follow: 10,
    });
    return Promise.race([ response, timeout ]);
  } catch (e) {
    throw "ERROR"+e
  }
};

const checkProxies = async (proxies: string[]): Promise<string[]> => {
  let url = "http://duckduckgo.com/";
  let proxyPromises:Promise<Response | string>[] = [];
  proxies.forEach((proxy) => {
    proxyPromises.push(checkProxy(url, proxy));
  });
  console.log("Sent requests, awaiting");

  let resolvedPromises = await Promise.allSettled(proxyPromises);
  let validProxies: string[] = [];
  resolvedPromises.forEach(async (promise) => {
    if (promise.status == "fulfilled"){
      if (promise.value ){
        console.log(promise.value)
      }
    }
  });
  console.log(validProxies);
  return validProxies;
};

const checkProxiesInFile = (fileLocation: string): string[] => {
  let proxies = fs
    .readFileSync(fileLocation, { encoding: "utf-8" })
    .replace(/\r\n/g, "\n")
    .split("\n");
  console.log(proxies);
  let output: string[] = [];
  checkProxies(proxies).then((result) => {
    output = result;
  });
  return output;
};

export { checkProxies, checkProxy, checkProxiesInFile };
