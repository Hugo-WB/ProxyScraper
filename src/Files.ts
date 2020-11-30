import fs from "fs";

const writeProxiesToTxt = async (
  proxies: string[],
  destination: string = "proxies.txt"
) => {
  await fs.writeFile(destination, proxies.join("\n"), (error) => {
    if (error != null) {
      console.log("WRITING PROXIES TO TXT ERROR:\n" + error);
    }else{console.log("Written to txt:"+destination)}
  });
};
const appendProxiesToTxt = async (proxies:string[],destination:string="proxiest.txt")=>{
  await fs.appendFile(destination, proxies.join("\n"), (error) => {
    if (error != null) {
      console.log("APPENDING PROXIES TO TXT ERROR:\n" + error);
    }else{console.log("Appended to txt:"+destination)}
  });

}

export { writeProxiesToTxt };
