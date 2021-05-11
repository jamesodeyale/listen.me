create database spotify;

create table account (
    account_id BIGSERIAL NOT NULL,
    email varchar(100) not null ,
    first_name varchar(100) not null ,
    last_name varchar(100) not null,
    password varchar(500) not null,
    constraint account_PK primary key (account_id)
);

alter table account alter column password type varchar(500);

create table admin (
    admin_id BIGSERIAL NOT NULL,
    account_id INT not null ,
    constraint admin_id_PK primary key (admin_id),
    constraint admin_account_FK
        foreign key (account_id)
            references account(account_id)
            on delete cascade
);

create table publisher (
    publisher_id BIGSERIAL NOT NULL,
    account_id INT not null ,
    type_of_publisher varchar(50) not null,
    constraint publisher_PK primary key (publisher_id),
    constraint publisher_account_FK
        foreign key (account_id)
            references account(account_id)
            on delete cascade
);

select * from account;

delete from publisher where publisher_id=1;

create table listener (
    listener_id BIGSERIAL NOT NULL,
    account_id INT NOT NULL ,
    address varchar(100) not null ,
    country varchar(100) not null ,
    constraint listener_PK primary key (listener_id),
    constraint listener_account_FK
        foreign key (account_id)
            references account(account_id)
            on delete cascade
);

create table genre (
    genre_id BIGSERIAL NOT NULL,
    name varchar(300) not null,
    constraint genre_PK primary key (genre_id)
);

select * from genre;


create table album (
    album_id BIGSERIAL NOT NULL,
    genre_id INT not null,
    publisher_id INT not null,
    name varchar(300) not null,
    description text,
    datetime DATE NOT NULL DEFAULT CURRENT_DATE,
    constraint album_PK primary key (album_id),
    constraint album_genre_FK
        foreign key (genre_id)
            references genre(genre_id)
            on delete set null,
    constraint album_publisher_FK
        foreign key (publisher_id)
            references publisher(publisher_id)
            on delete cascade
);

select * from album;

create table song (
    song_id BIGSERIAL NOT NULL,
    album_id INT not null,
    publisher_id INT not null,
    name varchar(300) not null,
    link_to_song text,
    filename varchar(300) not null,
    length_of_song varchar(20) not null,
    constraint song_PK primary key (song_id),
    constraint song_album_FK
        foreign key (album_id)
            references album(album_id)
            on delete cascade,
    constraint song_publisher_FK
        foreign key (publisher_id)
            references publisher(publisher_id)
            on delete cascade
);

select * from song;

drop table song;

create table playlist
(
    playlist_id bigserial    not null,
    name        varchar(250) not null,
    listener_id int          not null,
    constraint playlist_PK primary key (playlist_id),
    constraint album_publisher_FK
        foreign key (listener_id)
            references listener(listener_id)
            on delete cascade
);

create table playlistSong
(
    playlist_song_id bigserial    not null,
    playlist_id int          not null,
    song_id int          not null,
    constraint playlist_song_PK primary key (playlist_song_id),
    constraint playlist_song_playlist_FK
        foreign key (playlist_id)
            references playlist(playlist_id)
            on delete cascade,
    constraint playlist_song_song_FK
        foreign key (song_id)
            references song(song_id)
            on delete cascade
);

create table subscription
(
    subscription_id bigserial    not null,
    publisher_id int          not null,
    listener_id int          not null,
    datetime DATE NOT NULL DEFAULT CURRENT_DATE,
    constraint subscription_PK primary key (subscription_id),
    constraint subscription_publisher_FK
        foreign key (publisher_id)
            references publisher(publisher_id)
            on delete cascade,
    constraint subscription_listener_FK
        foreign key (listener_id)
            references listener(listener_id)
            on delete cascade
);

create table favArtist
(
    favArtist_id bigserial    not null,
    publisher_id int          not null,
    listener_id int          not null,
    constraint favArtist_PK primary key (favArtist_id),
    constraint subscription_publisher_FK
        foreign key (publisher_id)
            references publisher(publisher_id)
            on delete cascade,
    constraint subscription_listener_FK
        foreign key (listener_id)
            references listener(listener_id)
            on delete cascade
);

create table stat (
    stat_id BIGSERIAL NOT NULL,
    listener_id INT NOT NULL ,
    song_id INT not null ,
    type_of_stat varchar(100) not null ,
    constraint stat_id_PK primary key (stat_id),
    constraint stat_listener_FK
        foreign key (listener_id)
            references listener(listener_id)
            on delete cascade,
    constraint stat_song_FK
        foreign key (song_id)
            references song(song_id)
            on delete cascade
);


select * from account;
select * from genre;
delete from account where account_id=4;


