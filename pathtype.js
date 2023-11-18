import { baseUrl } from '../../../meta.js';
import { pathInfoSync } from './pathInfo.js';
import { clientPath } from '../../args.js';
import { stringObject } from '../object/string.js';

export function pathType(req) {
   
   const Url = new URL(req.url);
   const filePath = new URL(clientPath + Url.pathname, baseUrl)
   //console.log('filePath', filePath);
   const fileInfo = pathInfoSync(filePath);
   //console.log(`${filePath.href}`, fileInfo);
   switch (fileInfo) {
      case 'isFile': return stringObject('isFile',filePath)
      case 'isNotFound': 
      case 'isDirectory': return urlTypes(req, Url.pathname, filePath);
      case 'isSymlink': return stringObject('isSymlink',filePath)
      default: return stringObject('isNotFound',filePath)
   }
}

function urlTypes(req, pathname, filePath) {
   //! we can set any path to Home (if needed)
   switch (pathname) {
      case '/': return stringObject('isHome',filePath)
      case '/ws': 
         if (req.headers.get("upgrade").toLowerCase() === 'websocket') return stringObject('isWebsocket',filePath);
         return stringObject('isNotFound',filePath)
      case '/api': return stringObject('isApi',req)
      default: return stringObject('isNotFound',filePath)
   }
}
