# 🔑 Openlgen
![GitHub release (with filter)](https://img.shields.io/github/v/release/phukon/openlgen)
![npm](https://img.shields.io/npm/dt/openlgen)


Effortless License Generation for Developers.<br/>
To learn more about licenses, see [choosealicense.com](choosealicense.com).

## Installation
**⚠ This package requires global installation.**
```
$ npm install -g openlgen
```
**or use it by invoking**
```
$ npx openlgen
```

![Code_1VpZym2T1L](https://github.com/phukon/openlgen/assets/60285613/03842a17-b5b1-4439-b038-50440ff73532)


## Features

- **Interactive CLI:** User-friendly command-line interface with clear prompts and options
- **Dual Generation Modes:**
  - **Auto Mode:** Automatically generates licenses using package.json configuration
  - **Custom Mode:** Manual configuration with interactive prompts
- **Package.json Integration:** 
  - Automatic detection of existing configuration
  - Updates license and author fields automatically
- **Extensive License Support:** 13+ popular open source licenses including:
  - MIT, Apache 2.0, GPL v3, and more
- **Data Validation:** Robust error handling and input validation
- **GitHub API Integration:** Fresh license templates directly from GitHub
- **Atomic File Operations:** Safe file writing with rollback capabilities

----------

Usage
--------------


Generate a license using the menu
```bash
$ openlgen
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