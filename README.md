# StudyBot Explained:
A discord Bot custom build to increases the organizational efficiency of a University Club. The bot is a pretty crude experiment in learning a new programming language through an extremely big project; wouldn't recommend it. The goal was to solve an efficiency problem while also learning a new language. The bot is built with JS on top of NodeJS and DiscordJS, hosted on personal hardware (Raspberry Pi). The goal of hosting on personal hardware was to avoid using databases and their respectively inefficient APIs and utilize the simple principle of sharing data between system modules via the use of JSON files, simplifying the data flow of the program and reducing total network bandwidth by limiting all API calls to be only Discord Specific. 

### Admin Commands:

- create <name>
    - Creates two text channels and one voice channel with a category set as their parent.
    - Creates respectively named role.
- publish <name>
    - sets view and text permissions to the role and category of specified name (requires that the role and channels be created with the previous command)
    - adds the role to the list of the joinable roles
- delete  <name>
    - Deletes everything that "create" creates
- update
    - updates the JSON list of joinable roles, it also updates the list in the specified user commands channel that the bot exclusively listens to for commands. The commands channel gets cleared of old messages and a newly generated list gets displayed in Discords Embed format.

### User commands:

- join <name>
    - grants a user the role if it is on the joinable list
- drop <name>
    - removes any role from a user

MIT License:

Copyright (c) 2021 Levko Nikitin

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
