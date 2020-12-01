import fs from "fs";

const writeProxiesToTxt = async (
  proxies: string[],
  destination: string = "proxies.txt"
) => {
  await fs.writeFile(destination, proxies.join("\n"), (error) => {
    if (error != null) {
      console.log("WRITING PROXIES TO TXT ERROR:\n" + error);
    } else {
      console.log(proxies.length.toString()+" proxies were written to txt:" + destination);
    }
  });
};
const appendProxiesToTxt = async (
  proxies: string[],
  destination: string = "proxiest.txt"
) => {
  await fs.appendFile(destination, proxies.join("\n"), (error) => {
    if (error != null) {
      console.log("APPENDING PROXIES TO TXT ERROR:\n" + error);
    } else {
      console.log("Appended to txt:" + destination);
    }
  });
};

let proxies:string[] = []

const getRandomProxyFromTxt = (file:string= "validProxies.txt"):string =>{
  if (proxies.length<1){
    let fsFile = fs.readFileSync(file,{encoding:"utf-8"})
    proxies = fsFile.split("\n")
    return getRandomProxyFromTxt()
  }else{
    let proxy = proxies[Math.floor(Math.random()*proxies.length)]
    return proxy
  }
}

export { writeProxiesToTxt,getRandomProxyFromTxt };
