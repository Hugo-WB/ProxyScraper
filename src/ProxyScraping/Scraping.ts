import fetch from "node-fetch"
import {getLinkCheerio, getLinkRaw} from "../Request"
const getProxiesInString = (input:string):string[] =>{
    let re = new RegExp(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b:\d{2,5}/,"g")
    let proxies = input.match(re)
    console.log(proxies)
    if (proxies == null){
      proxies = []
    }

    return proxies

}

const getProxiesFromURL = async (url:string):Promise<string[]> =>{
  let response = await getLinkRaw(url)
  return getProxiesInString(response)
}

export {getProxiesInString,getProxiesFromURL}