import psycopg2

DB_USER = "postgres"
DB_PASSWORD = "password"
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "mikan_db"
conn_string = f"host={DB_HOST} port={DB_PORT} dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD}"

def get_attendees():
    with psycopg2.connect(conn_string) as conn:
        with conn.cursor() as cur:
            query = "SELECT username FROM users"
            params = ('value',)

            cur.execute(query, params)
            rows = cur.fetchall()

            attendees = [row[0] for row in rows]

            print(attendees)
            return attendees
