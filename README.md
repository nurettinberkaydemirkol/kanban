
# KANBAN

Vite, React and Mantine stack Kanban Project 


## Run Locally

Clone the project

```bash
  git clone https://github.com/nurettinberkaydemirkol/kanban
```
Go to the project directory

```bash
  cd kanban
```
Run Docker Compose yml file
```bash
  sudo docker-compose up --build
```

### Frontend

```bash
  cd kanban-front
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


### Backend

```bash
  cd kanban-backend
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## BACKEND API REFERENCE

#### Get all tasks

```http
  GET /
```

#### Create task

```http
  POST /
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of task |
| `description` | `string` | **Required**. Description of task |
| `status`      | `string` | **Required**. Status of task |

#### Update task

```http
  PUT /:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

#### Delete task

```http
  DELETE /:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |


## Running Tests

To run tests, run the following command in backend/frontend

```bash
  npm run test
```


## Deployment

To deploy this project run

```bash
  sudo docker-compose up -d
```



## Tech Stack

**Client:** React, Vite, Mantine, TypeScript, Jest

**Server:** Node, Express, TypeScript, Jest


## Authors

- [@nurettinberkaydemirkol](https://www.github.com/nurettinberkaydemirkol)
