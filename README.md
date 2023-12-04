# Openlgen
![GitHub release (with filter)](https://img.shields.io/github/v/release/phukon/ligen)
![GitHub all releases](https://img.shields.io/github/downloads/phukon/ligen/total)
![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/phukon/ligen)


Blazing fast ⚡, command line license generator in Node.js. for your open source projects.<br/>
To learn more about licenses, see [choosealicense.com](choosealicense.com).

![Code_CxPbFb5ZXF](https://github.com/phukon/ligen/assets/60285613/48a617c9-81fe-4af3-bb50-fc947e89e92b)

## Features

- **Package.json Modification:** Update the `license` and `author` fields in `package.json` automatically.
- **User Interaction:** Interactive prompts for license selection and input fields
- **Automated License Generation:** Auto generates licenses for your projects according to the package.json configuration.
- **Customization:** Choose from various license types or input custom details.
- **Error Handling:** Informative error messages for better troubleshooting.

----------

## Installation and Usage (CLI)

```
$ npm install openlgen --save-dev
```

Usage
--------------

Generate a license automatically from package.json

```bash
openlgen-auto
```
Generate a license using the menu
```bash
openlgen
```

Available licenses
--------------
```
- GNU Affero General Public License v3.0 (AGPL-3.0)
- Apache License 2.0 (Apache-2.0)
- BSD 2-Clause "Simplified" License (BSD-2-Clause)
- BSD 3-Clause "New" or "Revised" License (BSD-3-Clause)
- Boost Software License 1.0 (BSL-1.0)
- Creative Commons Zero v1.0 Universal (CC0-1.0)
- Eclipse Public License 2.0 (EPL-2.0)
- GNU General Public License v2.0 (GPL-2.0)
- GNU General Public License v3.0 (GPL-3.0)
- GNU Lesser General Public License v2.1 (LGPL-2.1)
- MIT License (MIT)
- Mozilla Public License 2.0 (MPL-2.0)
- The Unlicense (Unlicense)
```

License
--------------

The MIT License (MIT)

Copyright (c) 2023 Riki Phukon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
