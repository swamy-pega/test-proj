
create table if not exists questions_table (
    id serial primary key,
    question text not null,
    type text not null,
    difficulty text not null,
    topic text not null,
    created_by text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
)


create table if not exists answers_table (
    id serial primary key,
    question_id integer references questions_table(id) on delete cascade,
    answer text not null,
    is_correct boolean not null default false,
    created_by text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
-- This table stores questions and their corresponding answers.