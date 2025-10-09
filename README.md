# DevTinder

- Create a Vite + React application
- Remove unecessary code and create a Hello app
- Install daisy UI
- Add Navbar componet to App.jsx
- Create a Navbar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route
- Create an Outlet in your Body Componets
- Create a footer
-  Create s Login Page 
- Install axios
- CORS - install cors in backend => add middleware to with configuration : orgin, credential:true
- Whenever you's making API call pass {withCredentials:true}  
- install redux toolkit
- configurestore => Provider => createslice => add reducer to store
- Add redux devtool in chrome
- login and see if your data to coming properly in the store
- Navbar should upadate as soon as user logs in
- Navbar should update as soon as user logs in
- Rafactor our code to add constants file + create a comonents folder
- you should not be access other router without login
- If token is not persent ,redirect to login page
- logout
- profile feature
- get the feed and add the feed in store
- bulid the user card on feed
- Edit profile feature
- Show Tost Message on save of profle
- New page -See all my connections
- New page -See all my connection Requests
- Feature - Accept/Reject Connection Request
- Send /Igonre the user card from the feed
- Signup New user
- E2E testing




# Deployment

  - Signup on Aws
  - Launch instance
  - chmod 400 <secret>.pen
  - ssh -i "Devtinder_secret.pem" ubuntu@ec2-3-131-94-196.us-east-2.compute.amazonaws.com
  - Install Node version v22.12.0
  - git colne
  - Frontend
    - npm install ->dependencies install
    - npm run bulid 
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - sudo code form dist(bulid files) to /var/www/html
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance

   - Backend
    - allowed ec2 instance publice Ip on mongoDB server
    - npm install pn2 -g
    - pm2 start npm --name "Devtinder" -- start
    - pm2 logs
    - pm2 list,pm2 flush<name>,pm2 stop <name>,pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx -sudo systemctl request nginx
    - modify the BASEURL in frontend project to "/api"