
do $$ begin
        create type  channel_medium as enum('email','phone','webhook');
        create type  delivery_status as enum('delivered','pending','failed');
    exception when duplicate_object then null;
 end $$;
 
create table if not exists users(
    id  serial primary key,
    email text unique not null,
    phone text unique not null
);

create table if not exists subscribers(
    id serial primary key,
    user_id int references users(id),
    event_type text not null,
    channel channel_medium not null,
    destination text not null,
    subscribed_at timestamp default now()
);

create table if not exists delivery_logs(
    id serial primary key,
    user_id int references users(id),
    event_type text not null,
    channel channel_medium not null,
    destination text not null,
    status delivery_status not null,
    attempts int default 0,
    logged_at timestamp default now()
);


alter table subscribers add column if not exists condition jsonb not null default '{}'::jsonb;