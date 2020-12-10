drop table if exists fruit_fact,
answer,
question,
fruit;
create table fruit(
    fruit_id serial not null primary key,
    fruit_name text not null
);
create table fruit_fact(
    fact_id serial not null primary key,
    fruit_fact text not null,
    fruit_id int not null,
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
insert into fruit(fruit_name)
values('Apple');
insert into fruit(fruit_name)
values('Banana');
insert into fruit(fruit_name)
values('Orange');
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'Did you know that apples clean your teeth when you eat them?',
        1
    );
insert into fruit_fact(fruit_fact, fruit_id)
values (
        ' An apple can also be as small as a golf ball and as large as a grapefruit.',
        1
    );
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'Apples improve your brain health and comes in 4 colors.',
        1
    );
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'Did you know that eating a banana can cheer you up?',
        2
    );
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'Bananas also come in different colors like yellow, green, blue, and red.',
        2
    );
insert into fruit_fact(fruit_fact, fruit_id)
values ('Bananas dont grow on trees,they are plants.', 2);
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'Oranges are very good for your eyes and helps prevents the flu.',
        3
    );
insert into fruit_fact(fruit_fact, fruit_id)
values (
        'There are now over 600 varieties of oranges worldwide.',
        3
    );
insert into fruit_fact(fruit_fact, fruit_id)
values ('Oranges are good for your skin', 3);
insert into question (question)
values ('Do apples clean your teeth?');
insert into question (question)
values ('Can an apple grow as big as a watermelon?');
insert into question (question)
values ('Are bananas blue in color?');
insert into question (question)
values ('Do bananas grow on trees?');
insert into question (question)
values ('Can oranges protect against flu?');
insert into question (question)
values ('Are oranges good for your skin?');
insert into answer (answer, question_id)
values ('Yes', 1);
insert into answer (answer, question_id)
values ('No', 1);
insert into answer (answer, question_id)
values ('Yes', 2);
insert into answer (answer, question_id)
values ('No', 2);
insert into answer (answer, question_id)
values ('Yes', 3);
insert into answer (answer, question_id)
values ('Yes', 3);