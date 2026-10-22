class 15 -->

way we open terminal:

1. Navigate tp File explorer
   --> right click, show more options, and open in git bash here
2. 'pwd'
3. 'npm init -y'
4. 'npm install express nunjuncks'

ways in which we ran our sevrer.js file

1. node server.js --> this requires a restart every time we make changes to the file
2. note --watch server.js --> this watches our 'server.js' file for changes and will automatically restart the server
3. 'node --watch --watch-path=views server.js --> this watches both our sever.js file and all of our .njk fies in our views
