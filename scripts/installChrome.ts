import { exec } from "child_process";

function installChrome(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      "apt-get update && apt-get install -y wget gnupg",
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        exec(
          "wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -",
          (error, stdout, stderr) => {
            if (error) {
              reject(`Error: ${error.message}`);
              return;
            }
            exec(
              'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list',
              (error, stdout, stderr) => {
                if (error) {
                  reject(`Error: ${error.message}`);
                  return;
                }
                exec(
                  "apt-get update && apt-get install -y google-chrome-stable",
                  (error, stdout, stderr) => {
                    if (error) {
                      reject(`Error: ${error.message}`);
                      return;
                    }
                    resolve("Google Chrome installed successfully");
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

installChrome()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
