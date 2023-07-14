#NotTaut

NotTaut is a clone of Slack. Communication is a big part of being in a team, and being able to message via real-time between users is what NotTaut provides.

Check out [NotTaut](https://nottaut.onrender.com/)

##Index

[MVP Feature List](https://github.com/koreanpro22/NotTaut/wiki/feature_list.md) |
[Database Scheme](https://github.com/koreanpro22/NotTaut/wiki/database_schema.md) |
[User Stories](https://github.com/koreanpro22/NotTaut/wiki/user_stories.md) |
[Wire Frames](https://github.com/koreanpro22/NotTaut/wiki/wireframes.md) |

## Technologies Used

<img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

## Landing Page

![notTaut-readme-landing-page](https://github.com/koreanpro22/NotTaut/assets/117982645/15f732c2-c4f9-4ead-b48a-84cc7218610f)

## Workspaces Page

![notTaut-readme-workspaces-page](https://github.com/koreanpro22/NotTaut/assets/117982645/869d293e-7490-4b48-bcff-0f9b0ddbdf35)

## Channels/Messages Page

![notTaut-readme-channel-message-page](https://github.com/koreanpro22/NotTaut/assets/117982645/d143f604-ad1c-421f-a0d4-6c08b7577208)


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Navigate to the react-app directory, install the dependencies and start the react front end

```bash
npm install
```

```bash
npm start
```
8. Open the locally hosted front end at the specified port.

# Features

## Workspaces
* Users can create a workspace
* Users can access workspaces they are in
* Users can edit workspaces they own
* Users can delete Workspaces they own

## Channels
* Users can create a channel
* Users can view all channels they are in
* Users can edit channels in workspaces they own
* Users can delete channels in workspaces they own  

## Messages
* Users can send/recieve messages
* Users can view all messages in a channel
* Users can edit messages they sent
* Users can delete messages they sent or in workspaces they own

## Socket.io
* Users can view new, edit, delete messages via real-time

### Built By

David
- https://github.com/koreanpro22
- https://www.linkedin.com/in/david-kim-a37b59274/
