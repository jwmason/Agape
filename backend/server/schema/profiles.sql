DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS profiles
(
    id integer NOT NULL DEFAULT PRIMARY KEY,
    name character varying(200),
)
