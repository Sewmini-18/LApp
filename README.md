

## Run Spring Boot development server
```
mvn spring-boot:run
```
## Run React application development server
```
npm start
```
## Run FTP server
```
ftpd.bat res\conf\ftpd-typical.xml
```

## React-App

######  Open (http://localhost:8081) to view it in the browser.
######  signin: http://localhost:8081/login
######  signup: http://localhost:8081/register
######  logsfolders: http://localhost:8081/home/folder
######  UserLoginHistory: http://localhost:8081/home/user_history


## Back End

###### User Login: http://localhost:8080/api/auth/signin
###### User Signup: http://localhost:8080/api/auth/signup
###### Get User Profile Details: http://localhost:8080/api/auth/
###### Get User Details: http://localhost:8080/api/auth/users
###### Update User Details: http://localhost:8080/api/auth//{id}
###### Delete User: http://localhost:8080/api/auth/{id}
###### Add Customer Request: http://localhost:8080/api/auth/customer
###### Get Requests Details: http://localhost:8080/api/auth/requests
###### Delete Request: http://localhost:8080/api/auth/request/{id}
###### View user logs: http://localhost:8080/api/auth/userLog
###### View log files: http://localhost:8080api/auth/file


# cmd
###### netstat -ao |find /i "listening"
###### netstat -ano | find "8080"
###### Taskkill /F /IM 18748