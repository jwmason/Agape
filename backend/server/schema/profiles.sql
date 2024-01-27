DROP TABLE IF EXISTS public.profiles;

CREATE TABLE IF NOT EXISTS public.profiles
(
    id integer NOT NULL DEFAULT PRIMARY KEY,
    name character varying(200),
)
