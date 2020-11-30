import cheerio from "cheerio";
import { getLinkCheerio } from "../../Request";

const FreeProxyCzUrl = async (url: string): Promise<string[]> => {
  try {
    let $ = await getLinkCheerio(url);
    let rows = $("#proxy_list").children("tbody").children("tr");
    let proxies: string[] = [];
    let Base64Regex = RegExp(/Base64\.decode\(".*?\"\)/);
    let EncodedRegex = RegExp(/".*"/);
    let JSCommands = $.html().match(Base64Regex);
    rows.each((i, e) => {
      let JSCommand = $(e).html()?.match(Base64Regex);
      if (JSCommand == null && JSCommand == undefined) {
        return;
      }
      let encoded = JSCommand[0]
        .match(EncodedRegex)
        ?.toString()
        .replace(new RegExp(/"/, "g"), "");
      if (encoded == undefined) {
        return;
      }
      let ip = Buffer.from(encoded, "base64").toString();
      let port = $(e).find(".fport").text();
      proxies.push(ip + ":" + port);
    });
    return proxies;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const FreeProxyCz = async (proxyProtocol: string = "http") => {
  const url =
    "http://free-proxy.cz/en/proxylist/country/all/" +
    proxyProtocol +
    "/ping/all";
  let proxyPromises = [];
  for (let i = 1; i < 6; i++) {
    proxyPromises.push(FreeProxyCzUrl(url +"/"+ i.toString()));
  }
  let resolvedPromises = await Promise.all(proxyPromises);
  return resolvedPromises.flat();
};

export { FreeProxyCz };
