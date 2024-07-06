"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function installChrome() {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)("apt-get update && apt-get install -y wget gnupg", function (error, stdout, stderr) {
            if (error) {
                reject("Error: ".concat(error.message));
                return;
            }
            (0, child_process_1.exec)("wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -", function (error, stdout, stderr) {
                if (error) {
                    reject("Error: ".concat(error.message));
                    return;
                }
                (0, child_process_1.exec)('echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list', function (error, stdout, stderr) {
                    if (error) {
                        reject("Error: ".concat(error.message));
                        return;
                    }
                    (0, child_process_1.exec)("apt-get update && apt-get install -y google-chrome-stable", function (error, stdout, stderr) {
                        if (error) {
                            reject("Error: ".concat(error.message));
                            return;
                        }
                        resolve("Google Chrome installed successfully");
                    });
                });
            });
        });
    });
}
installChrome()
    .then(function (message) { return console.log(message); })
    .catch(function (error) { return console.error(error); });
