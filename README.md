# To-Do List

## Requirements

- Docker

or...

- Node
- npm

## Running

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