# FoldersModules
Get object with modules in folders

## Install
```
npm i folders-modules
```

## Example

We have folder "myModules":
```
myModules
    action
        index.js
    someFolder
        anotherFolder
            index.js
    auth
        index.js
```
Note: files with module must have name `index.js`


Script:
```
const foldersModules = require('folders-modules');
const modulesObject = foldersModules(__dirname + '/myModules');

console.log(modulesObject);
```

Output:
```
{ 
    action: [Function],
    'someFolder/anotherFolder': [Function],
    auth: [Function] 
}
```