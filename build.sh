#!/bin/bash
### http://78.102.17.162:337/#/
npm run build
#rsync -ave ssh dist/* jarda@2:/var/www/db3000_dist
#rsync -ave ssh dist/* jarda@2:/var/www/db3000_dist
rsync -ave ssh dist/* jarda@2:/var/www/html
npm run dev

