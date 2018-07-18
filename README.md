# food-blog

to see this project visit https://blog.bramaprasetyo.co/

| Route User  | Http | Description  | Parameter               |
|-------------|------|--------------|-------------------------|
| /           | POST | add new user | username,email,password |
| /login      | POST | login user   | email,password          |
| /users      | GET  | get all user |                         |

| Route Article      | Http   | Description      | Parameter     |
|--------------------|--------|------------------|---------------|
| /home              | POST   | add new article  | title,article |
| /home/articles     | GET    | get all articles |               |
| /home/articles/:id | DELETE | delete article   |               |
| /home/articles/:id | GET    | get one article  |               |
| /home/articles/:id | PUT    | edit one article | article       |
