-- Table: sections
CREATE TABLE IF NOT EXISTS sections (
    id bigint PRIMARY KEY,
    header text NOT NULL,
    type text,
    status text,
    target text,
    limit text,
    reviewer text
);

-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    description text,
    status text,
    start_date date,
    end_date date
);

-- Table: team_members
CREATE TABLE IF NOT EXISTS team_members (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    email text,
    role text,
    avatar_url text
);
