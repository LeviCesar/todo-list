# To-Do List

Project for to do list with Nest+Angular

## Requirements

- Docker
- Node 20+
- npm

## Running

1. Postgres 
```bash
export $(grep -v '^#' ./backend/example.env | xargs)

docker build -t to-do-list .

docker run --name to-do-list \
  -p 5432:5432 \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWD \
  -e POSTGRES_DB=$DB_NAME \
  -d to-do-list
```

2. Backend 
```bash
cd backend
npm install
npm run start --env example.env
```

3. Frontend
```bash
cd frontend
npm install
npm start
```