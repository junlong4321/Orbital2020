<p align="center">
  <img width="300" height="300" src="images/the_free_market_logo.png">
</p>

# <center>Orbital Project 2020 (Apollo 11)</center>

# Set Up Instructions :
### 1. Clone and pull git repository
### 2. Check package.json file and ensure scripts are notated as below
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
### 3. Run **npm install** to install node modules
<strong><font color='red'>npm install</font></strong>
### 4. (OPTIONAL) Run **npm run build** to install static html, css, and js files (You can skip this step if you don't plan to deploy yet)
<strong><font color='red'>npm run build</font></strong>
### 5. Your directory should look something like this. *If you did not run npm run build, you will not have the build folder so don't worry about that*
![](images/directory_view.png)

# Django API Endpoints
| Resource Description| Endpoint  | Methods  |
| :---| :- | :- |
| When called with a username and password, returns an authentication token. | /auth/ | POST |
| Contains username, password, and email information of registered users. Password is hashed and hidden. | /api/users/ | GET, POST |
| Contains username, password, and email information of registered users. Password is hashed and hidden. | /api/users/{id}/ | GET, PUT, PATCH, DELETE|

<!-- /auth/ - POST -->
### <ins><font color='red'>/auth/ - POST</font></ins>
###### Parameters : Data (Body)
###### Request Example :
```
curl -X POST "http://127.0.0.1:8000/auth/" -H  "accept: application/json" -H  "Content-Type: application/json" -H  "X-CSRFToken: CLk1bFwaJIKXgcaMM4Ypxfkldge51S3CSS6PsXmli7bVsZjkiYvfsyE75uK0XNdZ" -d "{  \"username\": \"YOURUSERNAME\",  \"password\": \"YOURPASSWORD\"}"
```
###### Response Example :
```
{
  "token": "b9c9272fac4a20554c994a666dfff4ce1861e1ee"
}
```
###### Response Item : Token
###### Description : Authentication Token
###### Data Type : String

<!-- /api/users/ - GET -->
### <ins><font color='red'>/api/users/ - GET</font></ins>
###### Parameters : -
###### Request Example :
```
curl -X GET "http://127.0.0.1:8000/api/users/" -H  "accept: application/json" -H  "X-CSRFToken: CLk1bFwaJIKXgcaMM4Ypxfkldge51S3CSS6PsXmli7bVsZjkiYvfsyE75uK0XNdZ"
```
###### Response Example :
```
{
    "id": 1,
    "username": "username",
    "email": "email"
  }
```
###### Response Item : id, username, email
###### Description : Unique id in database, username, email
###### Data Type : Integer, String, String

<!-- /api/users/ - POST -->
### <ins><font color='red'>/api/users/ - POST</font></ins>
###### Parameters : Data (Body)
###### Request Example :
```
curl -X POST "http://127.0.0.1:8000/api/users/" -H  "accept: application/json" -H  "Content-Type: application/json" -H  "X-CSRFToken: CLk1bFwaJIKXgcaMM4Ypxfkldge51S3CSS6PsXmli7bVsZjkiYvfsyE75uK0XNdZ" -d "{  \"username\": \"YOURUSERNAME\",  \"password\": \"YOURPASSWORD\",  \"email\": \"YOUREMAIL\"}"
```
###### Response Example :
```
{
    "id": 1,
    "username": "username",
    "email": "email"
  }
```
###### Response Item : id, username, email
###### Description : Unique id in database, username, email
###### Data Type : Integer, String, String

<!-- /api/users/{id} - GET -->
### <ins><font color='red'>/api/users/{id} - GET</font></ins>
###### Parameters : id (Path)
###### Request Example :
```
curl -X GET "http://127.0.0.1:8000/api/users/1/" -H  "accept: application/json" -H  "X-CSRFToken: UGsgqGr4suNOiLJye1UD269kEm3faLAJaNe4HYhf1TeMuyS6KVrtXpt6wAza6GK6"
```
###### Response Example :
```
{
    "id": 1,
    "username": "username",
    "email": "email"
  }
```
###### Response Item : id, username, email
###### Description : Unique id in database, username, email
###### Data Type : Integer, String, String

<!-- /api/users/{id} - PUT / PATCH -->
### <ins><font color='red'>/api/users/{id} - PUT / PATCH</font></ins>
###### Parameters : id (Path) , Data (Body)
###### Request Example :
```
curl -X PUT "http://127.0.0.1:8000/api/users/6/" -H  "accept: application/json" -H  "Content-Type: application/json" -H  "X-CSRFToken: vub9uZigCMzhwXjLGFtgvSTC2hu0axqILBXXLh8rbb0fIKsjcz06qbdoUv0V6sA5" -d "{  \"username\": \"CHANGEDUSERNAME\",  \"password\": \"CHANGEDPASSWORD\",  \"email\": \"CHANGEDEMAIL\"}"
```
###### Response Example :
```
{
    "id": 1,
    "username": "username",
    "email": "email"
  }
```
###### Response Item : id, username, email
###### Description : Unique id in database, username, email
###### Data Type : Integer, String, String

<!-- /api/users/{id} - DELETE -->
### <ins><font color='red'>/api/users/{id} - DELETE</font></ins>
###### Parameters : id (Path)
###### Request Example :
```
curl -X DELETE "http://127.0.0.1:8000/api/users/6/" -H  "accept: application/json" -H  "X-CSRFToken: vub9uZigCMzhwXjLGFtgvSTC2hu0axqILBXXLh8rbb0fIKsjcz06qbdoUv0V6sA5"
```
