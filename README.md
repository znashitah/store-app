Commands found for project web programming:

# A complete log of this run can be found in: /Users/nashitahzainab/.npm/_logs/2026-01-02T12_58_16_469Z-debug-0.log

#after running command npm install folllowing appear:
48 packages are looking for funding
  run `npm fund` for details

ROLLDOWN-VITE v7.2.5  ready in 456 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help


#  nvm install 20.19.0
#Final Confirmation Checklist
Before you continue coding:
•	node -v → 20.19.0 or higher
•	npm run dev → works
•	Browser loads React app
## Backend server 
it is running on localhost: 5002.
## API Documentation:

   Auth: POST   /api/auth/register
   Auth: POST   /api/auth/login
   Auth: GET    /api/auth/profile (requires token)
   Products: GET    /api/products
   Products: GET    /api/products/:id
   Orders: POST   /api/orders/checkout (requires token)
   Orders: GET    /api/orders (requires token)
   Orders: GET    /api/orders/:id (requires token) 
   # to run backend
   go to folder pwd or cd : /Users/nashitahzainab/Desktop/6Semester/WebProgramming/store-app/backend 

   run command npm run dev 
   # main file 

  # env file frontend
  # it contain localhost 5002 declaration for backend but running on 5002
  # Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_app
DB_USER=postgres
DB_PASSWORD=root

# Server
PORT=5002
NODE_ENV=development

# JWT
JWT_SECRET=thisismykey
JWT_EXPIRE=7d

# to run frontend
   go to folder pwd or cd : /Users/nashitahzainab/Desktop/6Semester/WebProgramming/store-app/frontend

   run command npm run dev 
# CORS
FRONTEND_URL=http://localhost:5173 
# Token for testing api of backend using post man. 
#For login : 
first use following:POST
URL:
http://localhost:5002/api/auth/login
Body → raw → JSON
{
  "email": "test@example.com",
  "password": "password123"
} 
than after sending request you will get token as answer as given below:
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc2NzYyNDI3NSwiZXhwIjoxNzY4MjI5MDc1fQ.EtB_BCgN_NThWZbcZ8uw3-i2-AJzOzd5g7lE1PwXbbg"