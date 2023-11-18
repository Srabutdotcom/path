//deno run --allow-read ./serv/library/path/testpathtype.js

import { pathType } from "./pathtype.js";
//import { assertEquals, assertNotEquals, assertStrictEquals  } from "https://deno.land/std@0.206.0/assert/mod.ts";

const req = {url:"https://aicone.id/"}
const isHome = pathType({url:"https://aicone.id/"});
const isFile = pathType({url:"https://aicone.id/favicon.ico"});
const isFileNotFound = pathType({url:"https://aicone.id/fav.ico"});
const isDirectory = pathType({url:"https://aicone.id/css"});
const isDirectoryNotFound = pathType({url:"https://aicone.id/api"});
/* console.log('href for css :', isDirectory.href)
console.log('pathname for css :', isDirectory.pathname) */

console.assert('isHome'==isHome,`https://aicone.id/ represents ${isHome}`);
console.assert('isFile'==isFile,`https://aicone.id/favicon.ico represents ${isFile}`)
console.assert('isFileNotFound'==isFileNotFound,`https://aicone.id/fav.ico represents ${isFileNotFound}`)
console.assert('isDirectory'==isDirectory,`https://aicone.id/css/ represents ${isDirectory}`)
console.assert('isDirectoryNotFound'==isDirectoryNotFound,`https://aicone.id/cssa/ represents ${isDirectoryNotFound}`)

console.log('pathname', isFile.data)

const urlWithParams = new URL("https://example.com/api?name=Jonathan%20Smith&age=18")
console.log('api',urlWithParams.pathname)
console.log('searchParam',urlWithParams.searchParams.get('name'));