import axios, { AxiosRequestConfig } from "axios";

const checkProxies = async (proxies: string[]) => {
  let proxyPromises: Promise<any>[] = [];
  for (let i = 0; i < 100; i++) {
    let proxy = proxies[i]
    let[host, port] = proxy.split(":");
    var config: AxiosRequestConfig = {
      method: "get",
      url: "https://pastebin.com/raw/d3C8wzJr",
      timeout:10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
      },
      proxy: {
        host: host,
        port: Number(port),
      },
    };
    proxyPromises.push(axios(config));
  }
  console.log("Sent requests, awaiting")
  let resolvedPromises = await Promise.allSettled(proxyPromises);
  let validProxies:string[] = []
  resolvedPromises.forEach((promise)=>{
    if (promise.status == "fulfilled"){
      validProxies.push(promise.value.config.proxy)
    }
  })
  console.log(validProxies)
  return validProxies
};

export { checkProxies };
