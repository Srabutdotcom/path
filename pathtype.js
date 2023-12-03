import { baseUrl, ROOT } from '../../../meta.js';
import { pathInfoSync } from './pathInfo.js';


export function pathType(req) {

   const Url = new URL(req.url);
   const filePath = new URL(ROOT + Url.pathname, baseUrl)
   //console.log('filePath', filePath);
   const fileInfo = pathInfoSync(filePath);
   //console.log(`${filePath.href}`, fileInfo);
   switch (fileInfo) {
      case 'isFile': return fileInfoObject('isFile', filePath)
      case 'isNotFound':
      case 'isDirectory': return urlTypes(req, Url.pathname, filePath);
      case 'isSymlink': return fileInfoObject('isSymlink', filePath)
      default: return fileInfoObject('isNotFound', filePath)
   }
}

function urlTypes(req, pathname, filePath) {
   //! we can set any path to Home (if needed)
   switch (pathname) {
      case '/': return fileInfoObject('isHome', filePath)
      case '/ws':
         if (req.headers.get("upgrade").toLowerCase() === 'websocket') return fileInfoObject('isWebsocket', filePath);
         return fileInfoObject('isNotFound', filePath)
      case '/api': return fileInfoObject('isApi', req)
      default: return fileInfoObject('isNotFound', filePath)
   }
}

function fileInfoObject(s = string, pathname) {
   class isFile {
      constructor() { }
   }
   class isNotFound {
      constructor() { }
   }
   class isDirectory {
      constructor() { }
   }
   class isSymlink {
      constructor() { }
   }
   class isHome {
      constructor() { }
   }
   class isWebsocket {
      constructor() { }
   }
   class isApi {
      constructor() { }
   }

   let c = null

   switch (s) {
      case 'isFile': c = new isFile
         break;
      case 'isNotFound': c = new isNotFound
         break;
      case 'isSymlink': c = new isSymlink
         break;
      case 'isDirectory': c = new isDirectory
         break;
      case 'isHome': c = new isHome
         break;
      case 'isWebsocket': c = new isWebsocket
         break;
      case 'isApi': c = new isApi
         break;
      default: c = new isNotFound
         break;
   }

   Object.defineProperties(Object.getPrototypeOf(c),
      {
         valueOf: { value: () => s, configurable: false },
         pathname: { get() { return pathname }, configurable: false },
      }
   )
   return c
}
