/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

module Lint.Configuration {
    var fs = require("fs");
    var path = require("path");

    var CONFIG_FILENAME = "tslint.json";

    export function findConfiguration(configFile): any {
        if (!configFile) {
            var currentPath = global.process.cwd();
            var parentPath = currentPath;

            while (true) {
                var filePath = path.join(currentPath, CONFIG_FILENAME);

                if (fs.existsSync(filePath)) {
                    configFile = filePath;
                    break;
                }

                // check if there's nowhere else to go
                parentPath = path.resolve(currentPath, "..");
                if (parentPath === currentPath) {
                    return undefined;
                }

                currentPath = parentPath;
            }
        }

        return JSON.parse(fs.readFileSync(configFile, "utf8"));
    }
}
