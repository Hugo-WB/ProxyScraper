import axios, { AxiosRequestConfig } from "axios";
import randomUseragent from "random-useragent";
import cheerio from "cheerio";

let sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let getLinkCheerio = async (url: string) => {
  console.log("REQUESTING: \n"+url);
  try {
    let config: AxiosRequestConfig = {
      method: "get",
      url: url,
      headers: {
        DNT: "1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": randomUseragent.getRandom((ua) => {
          return ua.browserName === "Firefox";
        }),
        // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
      },
    };
    await sleep(500);

    let response = await axios(config);
    let stringResponse: string = response.data;
    // console.log(stringResponse);
    const cheeriod = cheerio.load(stringResponse);
    return cheeriod;
  } catch (error) {
    console.log(error);
    return cheerio.load("<html></html>");
  }
};



export { getLinkCheerio };
