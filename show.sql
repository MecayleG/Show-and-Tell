drop table if exists fruit_fact,
question,
answer,
fruit;
create table fruit(
    fruit_id serial not null primary key,
    fruit_name text not null
);
create table fruit_fact(
    id serial not null primary key,
    fruit_id int not null,
    fruit_fact text not null,
    foreign key(fruit_id) references fruit(fruit_id)
);
create table question(
    question_id serial not null primary key,
    question text not null

);
create table answer(
    answer_id serial not null primary key,
    answer text not null,
    question_id int not null,
    foreign key (question_id) references question(question_id)
);