CREATE TABLE roles
(
    role_id serial PRIMARY key NOT NULL,
    name VARCHAR(50) NOT NULL,
    role_des VARCHAR(100)
);

-- CREATE TABLE gender
CREATE TABLE gender
(
    gender_id serial PRIMARY key NOT NULL,
    gender_name VARCHAR(50) NOT NULL
);

-- CREATE TABLE users
CREATE TABLE "users" (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    intro VARCHAR(500),
    birthday DATE,
    day_create DATE,
    gender_id INT,
    user_provinces_id VARCHAR(20), -- Tỉnh/Thành phố
    user_districts_id VARCHAR(20), -- Quận/Huyện
    user_wards_id VARCHAR(20), -- Xã/Phường
    avatar VARCHAR(1000),
    thumb VARCHAR(1000),
    online_last_date TIMESTAMP,
    mark INT,
    user_status BOOLEAN, -- Trạng thái tài khoản do người dùng tự khóa
    ban BOOLEAN, -- Tài khoản bị khóa do vi phạm
    gg_id VARCHAR(100),
    fb_id VARCHAR(100),
    FOREIGN KEY (gender_id) REFERENCES gender(gender_id)
);

-- CREATE TABLE chats
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    name_chats VARCHAR(255),
    day_create TIMESTAMP,
    isFriend boolean
);
-- CREATE TABLE messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    send_time TIMESTAMP,
    sender_id INT,
    chat_id INT,
    send_status BOOLEAN,
    type VARCHAR(50),
    recall BOOLEAN,
    FOREIGN KEY (sender_id) REFERENCES users (user_id),
    FOREIGN KEY (chat_id) REFERENCES chats (id)
);
-- CREATE TABLE chat_participants
CREATE TABLE chat_participants (
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    chat_participants_status BOOLEAN,
    FOREIGN KEY (chat_id) REFERENCES chats (id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- CREATE TABLE messages_images
CREATE TABLE messages_images (
    message_image_id SERIAL PRIMARY KEY,
    messages_id INT NOT NULL,
    link_image VARCHAR(1000),
    FOREIGN KEY (messages_id) REFERENCES messages(id)
);


-- CREATE TABLE user_role
CREATE TABLE user_role
(
    id serial PRIMARY key NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- CREATE TABLE post
CREATE TABLE post
(
    post_id serial PRIMARY key NOT NULL,
    user_id integer NOT NULL,
    parent_post_id integer,
    content VARCHAR(500),
    date_post TIMESTAMP NOT NULL,
    hash_tag VARCHAR(50),
    post_provinces_id VARCHAR(20),
    post_districts_id VARCHAR(20),
    post_wards_id VARCHAR(20),
    send_status BOOLEAN NOT NULL,
    post_status BOOLEAN NOT NULL,
    product VARCHAR(100),
    ban BOOLEAN,
    provinces_code VARCHAR(20),
    districts_code VARCHAR(20),
    wards_code VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
--    FOREIGN KEY (parent_post_id) REFERENCES post(post_id)
);

--drop table "share" 
-- CREATE TABLE share
CREATE TABLE share
(
    share_id serial PRIMARY key ,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    date_share TIMESTAMP NOT NULL,
    share_status BOOLEAN,
--    content_share text,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- CREATE TABLE SEND_RECIEVER
CREATE TABLE send_reciever
(
    send_reciever_id serial PRIMARY key NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    date_send_reciever TIMESTAMP NOT null,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- CREATE TABLE post_images
CREATE TABLE post_images
(
    post_images_id serial PRIMARY key NOT NULL,
    post_id integer NOT NULL,
    link_image VARCHAR(500) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);
-- CREATE TABLE emojis
create table emojis(
emoji_id serial primary key  NOT NULL,
"type" text
)

-- CREATE TABLE interested
CREATE TABLE interested
(
    interested_id serial PRIMARY key NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    emoji_id integer NOT null,
    date_interested TIMESTAMP NOT null,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (emoji_id) REFERENCES emojis(emoji_id)
);

-- CREATE TABLE comment
CREATE TABLE comment
(
    comment_id serial PRIMARY key NOT NULL,
    user_id integer NOT NULL,
    parent_comment_id integer,
    post_id integer NOT NULL,
    date_comment TIMESTAMP NOT NULL,
    content VARCHAR(500) NOT NULL,
    comment_status BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (parent_comment_id) REFERENCES comment(comment_id)
);

CREATE TABLE comment_user_mention
(
    comment_id integer REFERENCES comment(comment_id),
    mentioned_user_id integer REFERENCES users(user_id),
    PRIMARY KEY (comment_id, mentioned_user_id)
);



-- CREATE TABLE follower
CREATE TABLE follower
(
    follower_id integer NOT null NOT NULL,
    user_id integer NOT NULL,
    date_follow TIMESTAMP,
    PRIMARY KEY (follower_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 20-10
CREATE TABLE user_reported (
	id  serial PRIMARY key ,
    user_reported_id INT NOT NULL,
    user_send_report_id INT NOT NULL,
    content_report VARCHAR(500) NOT NULL,
    date_report DATE NOT NULL,
    FOREIGN KEY (user_reported_id) REFERENCES users(user_id),
	FOREIGN KEY (user_send_report_id) REFERENCES users(user_id)
);

create table post_reported (
	id serial primary key ,
    post_reported_id INT not null,
    user_send_report_id INT not null,
    content_report VARCHAR(500) not null,
    date_report DATE not null,
	foreign key (post_reported_id) references post(post_id)
);
alter table user_role alter role_id set default 4 

go 
INSERT INTO roles (role_id, name, role_des)
VALUES
	(1, 'ROLE_OWNER', 'Người sở hữu web'),
    (2, 'ROLE_ADMIN', 'Quản trị web'),
    (3, 'ROLE_MODERATOR', 'Kiểm duyệt viên web'),
    (4, 'ROLE_USER', 'Người dùng');
   
INSERT INTO gender (gender_id,gender_name)
VALUES
    (1, 'Nam'),
    (2, 'Nữ'),
    (3, 'Khác');

INSERT INTO users (username, password, fullname, email, intro, birthday, day_create, gender_id, user_provinces_id, user_districts_id, user_wards_id, avatar, thumb, online_last_date, mark, user_status, ban, gg_id, fb_id)
VALUES
-- Không có user nào bị ban, chỉ user nguyentt là có 1 điểm
    ('nhuomtv', '$2a$10$zfsw1PTh473LaxsZPkgqiO0IwR5f41.WKpuEita0ee7/OCrX63Tlm', 'Trần Văn Nhuộm', 'nhuomtv@fpt.edu.vn', 'CEO Diễn đàn Destiny, Một nơi giúp mọi người có thể trao và nhận đồ từ nhau một cách miễn phí.', '1980-1-1', '2023-1-1', 1, '93', '932', '31342', 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/378337086_2599125736912213_6387019575026043116_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=W6Sg8yHyncQAX8rcNan&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDWkI2bXDfjxhk9-trozoF0aS7fxa4Vbb39GVA8gEG7oA&oe=65237043', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),
	('dangth', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Trần Hữu Đang', 'dangthpc04349@fpt.edu.vn', 'Người đồng sáng lập và sáng tạo nên diễn đàng Destiny', '2003-9-7', '2023-1-1', 1, '93', '932', '31342', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/dang.jpg?alt=media&token=451f4ba3-5819-4899-9f86-d24069f5ab4c&_gl=1*q1ce3e*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTcwMC42MC4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),  
	('vinhpq', '$2a$10$aF6y9hGg06.We5mXYua13eM/N4o2wq0UZSD2JgC0PVja.1x1chXjS', 'Phùng Quốc Vinh', 'vinhpqpc04338@fpt.edu.vn', 'Người đồng sáng lập và sáng tạo nên diễn đàng Destiny', '2003-11-15', '2023-1-1', 1, '92', '926', '31299', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/vinh.jpg?alt=media&token=69e637bf-f12d-49d8-8263-dbe0e68a274b&_gl=1*1wnrv62*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTczNy4yMy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false,'Chưa có', 'Chưa có'), 
	('dannk', '$2a$10$CRFxFV1oJiYT0rTa3STe.ubKEz1V59HrdOSCl1OA6uVG2xYretjQ6', 'Nguyễn Khánh Đan', 'dannkpc04351@fpt.edu.vn', 'Người đồng sáng lập và sáng tạo nên diễn đàng Destiny', '2023-11-7', '2023-1-1', 2, '92', '926', '31299', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/dan.jpg?alt=media&token=9ed189c6-a1b6-4c3a-9033-4524daf3946c&_gl=1*epq3mn*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTc2Mi42MC4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),  
	('sydh', '$2a$10$DYKf7ahE.Feac9JEy8exP.hMYXtaI5aayfeYua0ZCGVV0RXvu5.Gy', 'Đoàn Hiệp Sỹ', 'sydhpc04388@fpt.edu.vn', 'Người đồng sáng lập và sáng tạo nên diễn đàng Destiny', '2003-4-7', '2023-1-1', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/sy.jpg?alt=media&token=82146c8d-beb1-4b40-8c84-399e4f7ae6ac&_gl=1*1puquxq*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTc3MC41Mi4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('vilb', '$2a$10$SvchmABRVVZjeLgOW4Dez.q7T1kcybCdiQF70DHKNs.nX30vmYLVi', 'Lê Bích Vi', 'vilbpc04354@fpt.edu.vn', 'Người đồng sáng lập và sáng tạo nên diễn đàng Destiny', '2003-6-2', '2023-1-1', 2, '96', '964', '31999', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/vi.jpg?alt=media&token=2eb89381-0019-4eab-b32b-d1231825cd2c&_gl=1*1e6wlj9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTc4MC40Mi4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('teonv', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Văn Tèo', 'teonv@fpt.edu.vn', 'Hi', '2003-4-7', '2023-5-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, true, 'Chưa có', 'Chưa có'), 
	('cnt', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Thị Châu', 'cnt@fpt.edu.vn', 'Hi', '2003-4-7', '2023-5-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('datndq', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Đoàn Quốc Đạt', 'datndq@fpt.edu.vn', 'Hi', '2003-1-8', '2023-5-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('nhunq', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Quỳnh Như', 'nhunq@fpt.edu.vn', 'Hi', '2003-4-17', '2023-2-11', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('nhantt', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Thị Thanh Nhã', 'nhantt@fpt.edu.vn', 'Hi', '2003-9-3', '2023-2-19', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('tientt', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Trần Thủy Tiên', 'tientt@fpt.edu.vn', 'Hi', '2003-12-9', '2023-3-20', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('tientm', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Trần Minh Tiến', 'tientm@fpt.edu.vn', 'Hi', '2003-7-27', '2023-1-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('vanht', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Hoàng Thúy Vân', 'vanht@fpt.edu.vn', 'Hi', '2003-2-15', '2023-5-19', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('yenvhk', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Võ Hoàng Kim Yến', 'yenvhk@fpt.edu.vn', 'Hi', '2003-11-9', '2023-4-22', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('quannq', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Quốc Quân', 'quannq@fpt.edu.vn', 'Hi', '2003-4-6', '2023-4-30', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('dungnv', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Việt Dũng', 'dungnv@fpt.edu.vn', 'Hi', '2003-3-9', '2023-1-9', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('duclq', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Lê Quang Đức', 'duclq@fpt.edu.vn', 'Hi', '2003-4-7', '2023-6-6', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('anhlhm', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Lê Hà Minh Anh', 'anhlhm@fpt.edu.vn', 'Hi', '2003-5-8', '2023-7-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('minhvn', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Vũ Nhật Minh', 'minhvn@fpt.edu.vn', 'Hi', '2003-10-7', '2023-5-25', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('hiendt', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Đặng Thúy Hiền', 'hiendt@fpt.edu.vn', 'Hi', '2003-9-7', '2023-1-22', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('khains', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Ngô Sỹ Khải', 'khains@fpt.edu.vn', 'Hi', '2003-11-15', '2023-1-7', 1, '92', '926', '31299', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),
	('ngannth', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Thị Hoài Ngân', 'ngannth@fpt.edu.vn', 'Hi', '2003-11-7', '2023-4-5', 2, '92', '926', '31299', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),
	('nhipy', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Phạm Yến Nhi', 'nhipy@fpt.edu.vn', 'Hi', '2003-4-7', '2003-5-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'), 
	('linhnh', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Nguyễn Hải Linh', 'linhnh@fpt.edu.vn', 'Hi', '2003-6-9', '2023-3-14', 2, '96', '964', '31999', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 0, true, false, 'Chưa có', 'Chưa có'),
	('nguyentt', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', 'Trương Tú Nguyên', 'nguyentt@fpt.edu.vn', 'Hi', '2003-8-30', '2023-5-10', 3, '89', '883', '30280', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.', 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.', '2023-9-30', 1, true, false, 'Chưa có', 'Chưa có'); 

INSERT INTO user_role (user_id, role_id)
VALUES
    (1, 1),
	(2 ,2),
	(3 ,2),
	(4 ,2),
	(5 ,3),
    (6 ,3),
    (7 ,4),
    (8 ,4),
    (9 ,4),
    (10 ,4),
    (11 ,4),
    (12 ,4),
    (13 ,4),
    (14 ,4),
    (15 ,4),
    (16 ,4),
    (17 ,4),
    (18 ,4),
    (19 ,4),
    (20 ,4),
    (21 ,4),
    (22 ,4),
    (23 ,4),
    (24 ,4),
    (25 ,4),
    (26 ,4);
    INSERT INTO post (user_id,parent_post_id, content, date_post, hash_tag, post_provinces_id, post_districts_id, post_wards_id, send_status, post_status, product, ban)
VALUES
-- Bài viết ngày 25-9 có trạng thái là riêng tư, bài viết ngày 30-9 có trạng thái gửi là đã gửi -> người đăng bài là nguyentt được cộng 1đ
    (13,NULL, 'Hello mọi người tớ có vài cái ghế kh sử dụng nên tớ muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-1-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
    (21,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-1-20', 'Cốc', '92', '926', '31299', false, true, 'Cốc', false),
	(22,NULL, 'Hello mọi người tôi có một vài chiếc áo kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-1-13', 'Áo thun', '92', '926', '31299', false, true, 'Áo thun', false),
        
	(10,NULL, 'Chào mọi người tui có mấy chiếc áo khoác kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-2-10', 'Áo khoác', '92', '926', '31299', false, true, 'Áo khoác', false),
	(11,NULL, 'Hi mọi người mình có vài cuốn sách kh sử dụng nên muốn tặng lại cho mọi người, ai muốn nhận ib mình nha',
		'2023-2-19', 'Sách', '92', '926', '31299', false, true, 'Sách', false),

	(12,NULL, 'Xin chào mọi người tôi có vài cây bút kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-3-20', 'Bút', '92', '926', '31299', false, true, 'Bút', false),
	(25,NULL, 'Xin chào mọi người tớ có vài cái quần kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-3-14', 'Quần', '92', '926', '31299', false, true, 'Quần', false),
   
   	(15,NULL, 'Hello mọi người tôi có một vài chiếc áo kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-4-30', 'Áo thun', '89', '883', '30280', false, true, 'Áo thun', false),
	(16,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-4-30', 'Cốc', '89', '883', '30280', false, true, 'Cốc', false),
	(23,NULL, 'Xin chào mọi người tôi có một vài chiếc đồng hồ kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-4-20', 'Đồng hồ', '89', '883', '30280', false, true, 'Đồng hồ', false),
        
	(7,NULL, 'Xin chào mọi người tôi có vài đôi giày lâu ngày kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-5-10', 'Giày', '92', '926', '31299', false, true, 'Giày', false),
	(8,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-5-10', 'Cốc', '92', '926', '31299', false, true, 'Cốc', false),
	(9,NULL, 'Chào mọi người tui có mấy chiếc áo khoác kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-5-10', 'Áo khoác', '92', '926', '31299', false, true, 'Áo khoác', false),
	(14,NULL, 'Xin chào mọi người tớ có vài cái quần kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-5-10', 'Quần', '92', '926', '31299', false, true, 'Quần', false),
	(23,NULL, 'Hi mọi người mình có vài cuốn sách kh sử dụng nên muốn tặng lại cho mọi người, ai muốn nhận ib mình nha',
		'2023-5-10', 'Sách', '92', '926', '31299', false, true, 'Sách', false),
	(26,NULL, 'Hello mọi người tớ có vài cái ghế kh sử dụng nên tớ muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-5-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
        
	(18,NULL, 'Xin chào mọi người tôi có vài cây bút kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-6-6', 'Bút', '92', '926', '31299', false, true, 'Bút', false),
	(9,NULL, 'Xin chào mọi người tôi có một vài chiếc đồng hồ kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-6-6', 'Đồng hồ', '92', '926', '31299', false, true, 'Đồng hồ', false),
	(14,NULL, 'Xin chào mọi người tớ có vài chiếc máy hút bụi kh sử dụng nên tôi muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-6-6', 'Máy hút bụi', '92', '926', '31299', false, true, 'Máy hút bụi', false),
        
	(8,NULL, 'Hi mọi người mình có vài cuốn sách kh sử dụng nên muốn tặng lại cho mọi người, ai muốn nhận ib mình nha',
		'2023-7-10', 'Sách', '92', '926', '31299', false, true, 'Sách', false),
	(7,NULL, 'Hello mọi người tớ có vài cái ghế kh sử dụng nên tớ muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-7-13', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
    (11,NULL, 'Xin chào mọi người tôi có vài đôi giày lâu ngày kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-7-15', 'Bút', '92', '926', '31299', false, true, 'Giày', false),
	(12,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-7-18', 'Cốc', '92', '926', '31299', false, true, 'Cốc', false),
	(15,NULL, 'Chào mọi người tui có mấy chiếc áo khoác kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-7-19', 'Áo khoác', '96', '964', '31999', false, true, 'Áo khoác', false),
	(16,NULL, 'Xin chào mọi người tớ có vài chiếc máy hút bụi kh sử dụng nên tôi muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-7-20', 'Máy hút bụi', '92', '926', '31299', false, true, 'Máy hút bụi', false),
	(19,NULL, 'Xin chào mọi người tớ có vài cái quần kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-7-20', 'Quần', '89', '883', '30280', false, true, 'Quần', false),
	(21,NULL, 'Xin chào mọi người tôi có vài cây bút kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-7-21', 'Bút', '92', '926', '31299', false, true, 'Bút', false),
	(24,NULL, 'Hello mọi người tôi có một vài chiếc áo kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-7-24', 'Áo thun', '89', '883', '30280', false, true, 'Áo thun', false),
    (26,NULL, 'Xin chào mọi người tôi có một vài chiếc đồng hồ kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-7-28', 'Đồng hồ', '96', '964', '31999', false, true, 'Đồng hồ', false),
        
	(8,NULL, 'Hi mọi người mình có vài cuốn sách kh sử dụng nên muốn tặng lại cho mọi người, ai muốn nhận ib mình nha',
		'2023-8-1', 'Sách', '92', '926', '31299', false, true, 'Sách', false),
	(7,NULL, 'Hello mọi người tớ có vài cái ghế kh sử dụng nên tớ muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-8-2', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
    (11,NULL, 'Xin chào mọi người tôi có vài đôi giày lâu ngày kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-8-5', 'Bút', '92', '926', '31299', false, true, 'Giày', false),
	(12,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-8-10', 'Cốc', '92', '926', '31299', false, true, 'Cốc', false),
	(15,NULL, 'Chào mọi người tui có mấy chiếc áo khoác kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-8-12', 'Áo khoác', '96', '964', '31999', false, true, 'Áo khoác', false),
	(16,NULL, 'Xin chào mọi người tớ có vài chiếc máy hút bụi kh sử dụng nên tôi muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-8-14', 'Máy hút bụi', '92', '926', '31299', false, true, 'Máy hút bụi', false),
	(19,NULL, 'Xin chào mọi người tớ có vài cái quần kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-8-18', 'Quần', '89', '883', '30280', false, true, 'Quần', false),
	(21,NULL, 'Xin chào mọi người tôi có vài cây bút kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-8-20', 'Bút', '92', '926', '31299', false, true, 'Bút', false),
	(24,NULL, 'Hello mọi người tôi có một vài chiếc áo kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-8-25', 'Áo thun', '89', '883', '30280', false, true, 'Áo thun', false),
    (26,NULL, 'Xin chào mọi người tôi có một vài chiếc đồng hồ kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-8-30', 'Đồng hồ', '96', '964', '31999', false, true, 'Đồng hồ', false),
        
	(8,NULL, 'Hi mọi người mình có vài cuốn sách kh sử dụng nên muốn tặng lại cho mọi người, ai muốn nhận ib mình nha',
		'2023-9-1', 'Sách', '92', '926', '31299', false, true, 'Sách', false),
	(7,NULL, 'Hello mọi người tớ có vài cái ghế kh sử dụng nên tớ muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-9-2', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
    (11,NULL, 'Xin chào mọi người tôi có vài đôi giày lâu ngày kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-9-5', 'Bút', '92', '926', '31299', false, true, 'Giày', false),
	(12,NULL, 'Xin chào mọi người mình có mấy chiếc cốc kh sử dụng nên muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-9-10', 'Cốc', '92', '926', '31299', false, true, 'Cốc', false),
	(15,NULL, 'Chào mọi người tui có mấy chiếc áo khoác kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-9-12', 'Áo khoác', '96', '964', '31999', false, true, 'Áo khoác', false),
	(16,NULL, 'Xin chào mọi người tớ có vài chiếc máy hút bụi kh sử dụng nên tôi muốn tặng lại, ai muốn nhận vui lòng ib mình',
		'2023-9-14', 'Máy hút bụi', '92', '926', '31299', false, true, 'Máy hút bụi', false),
	(19,NULL, 'Xin chào mọi người tớ có vài cái quần kh sử dụng nên muốn tặng lại, ai muốn nhận xin vui lòng ib mình',
		'2023-9-18', 'Quần', '89', '883', '30280', false, true, 'Quần', false),
	(21,NULL, 'Xin chào mọi người tôi có vài cây bút kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-9-20', 'Bút', '92', '926', '31299', false, true, 'Bút', false),
	(24,NULL, 'Hello mọi người tôi có một vài chiếc áo kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-9-25', 'Áo thun', '89', '883', '30280', false, false, 'Áo thun', false),
    (26,NULL, 'Xin chào mọi người tôi có một vài chiếc đồng hồ kh sử dụng nên tôi muốn tặng lại cho mọi người, ai muốn nhận vui lòng ib mình',
		'2023-9-30', 'Đồng hồ', '96', '964', '31999', true, true, 'Đồng hồ', false);
   
	
 INSERT INTO post (user_id,parent_post_id, content, date_post, hash_tag, post_provinces_id, post_districts_id, post_wards_id, send_status, post_status, product, ban)
VALUES
-- Bài viết ngày 25-9 có trạng thái là riêng tư, bài viết ngày 30-9 có trạng thái gửi là đã gửi -> người đăng bài là nguyentt được cộng 1đ
    (11,49, 'Tôi đã share',
		'2023-1-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
		(12,49, 'Tôi đã share',
		'2023-1-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
		(14,49, 'Tôi đã share',
		'2023-1-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false),
		(15,49, 'Tôi đã share',
		'2023-1-10', 'Ghế', '92', '926', '31299', false, true, 'Ghế', false);
	
INSERT INTO send_reciever(user_id, post_id, date_send_reciever) VALUES
    (10, 49, '2023-10-02');
	
INSERT INTO post_images (post_id, link_image) VALUES
    (1, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair.png?alt=media&token=fbd96d02-e7b5-433f-a244-e3c8b23c250d&_gl=1*l8xy0x*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY3OS42MC4wLjA.'), 
	(1, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair2.jpg?alt=media&token=b5654f29-a4a4-4097-b67f-0c5147330d41&_gl=1*2c2i3g*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY4OS41MC4wLjA.'),
	(1, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair3.jpg?alt=media&token=861e65e7-2adc-40a6-acb0-8138c0f253d7&_gl=1*10ddoq6*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcwMS4zOC4wLjA.'), 
	(1, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair4.jpg?alt=media&token=373714ea-daf8-49d0-b801-40f9f8d74806&_gl=1*nijzx7*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcxMC4yOS4wLjA.'), 
    (2, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (2, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (2, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(2, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (2, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
    (3, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt.png?alt=media&token=6e34b7a8-a925-45d8-9e06-e618fae990ca&_gl=1*143gpw0*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg0NS4yNS4wLjA.'),
    (3, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (3, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (3, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (3, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt5.jpg?alt=media&token=80d62406-6cf4-4112-997c-f34e67bdf4ae&_gl=1*oieugt*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTkxMi4zMy4wLjA.'),
    (4, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket.png?alt=media&token=73b09beb-539a-4314-a1a4-f61cb37bb25c&_gl=1*lxlxxw*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk3OC42MC4wLjA.'),
    (4, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (4, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
	(5, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book.png?alt=media&token=a3465f42-f91f-47b9-a75d-0a9cced75cac&_gl=1*1swu0lv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE1My42MC4wLjA.'),
    (5, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book2.jpg?alt=media&token=7181d9dc-a264-4edf-9de5-f80b01c44976&_gl=1*2g6cqb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2Mi41MS4wLjA.'),
    (5, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book3.jpg?alt=media&token=021b1c53-2518-4395-b286-03f48e7d3fd9&_gl=1*6zkm1r*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2OC40NS4wLjA.'),
    (5, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book4.jpg?alt=media&token=facad10e-7b15-4b32-a980-863fab3f5a91&_gl=1*4r5xfb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE3NS4zOC4wLjA.'),
    (5, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book5.jpg?alt=media&token=a3a3b603-a168-4e3b-b16c-6b397e21494f&_gl=1*1vyobuc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE4Mi4zMS4wLjA.'),
	(6, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen.png?alt=media&token=393c6307-62bd-43aa-9eb0-a370430a5a60&_gl=1*cbfxzl*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDgzMS4zLjAuMA..'),
    (6, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen2.jpg?alt=media&token=5d3d89bd-1335-48ad-abcc-a8e232bf6234&_gl=1*1bdtof8*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg0Ni42MC4wLjA.'),
    (6, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen3.jpg?alt=media&token=28ac19f9-346c-478b-b06a-cbf1ac80ac3a&_gl=1*1r75z3m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg1NS41MS4wLjA.'),
	(7, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant.png?alt=media&token=08259ef6-81a4-42b0-a96e-8e6a6e8da8a3&_gl=1*1i5rsim*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDkyNS41OC4wLjA.'),
    (7, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant2.jpg?alt=media&token=bda15573-dba3-4908-af03-d0e0c07c46fd&_gl=1*1a1em4n*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk0NS4zOC4wLjA.'),
    (7, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant3.jpg?alt=media&token=000f3717-280c-4a5d-9603-85218ab815fa&_gl=1*1qe0oux*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1Mi4zMS4wLjA.'),
    (7, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant4.jpg?alt=media&token=44d66b60-de7f-4c18-b792-8b4339a2e537&_gl=1*6dh1yu*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1OS4yNC4wLjA.'),
    (7, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant5.jpg?alt=media&token=f6f83391-c776-47ab-870e-97804a7affb1&_gl=1*wkfe7y*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk2OC4xNS4wLjA.'),
    (8, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt.png?alt=media&token=6e34b7a8-a925-45d8-9e06-e618fae990ca&_gl=1*143gpw0*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg0NS4yNS4wLjA.'),
    (8, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (8, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (8, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (8, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt5.jpg?alt=media&token=80d62406-6cf4-4112-997c-f34e67bdf4ae&_gl=1*oieugt*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTkxMi4zMy4wLjA.'),
	(9, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (9, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (9, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(9, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (9, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
	(10, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch.png?alt=media&token=59db192a-87fe-4bc8-9806-2a2c178fa7cc&_gl=1*1vrbdvx*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc3NC42MC4wLjA.'),
    (10, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch2.jpg?alt=media&token=9e733f9e-543b-48df-a4c9-e78ef161de0b&_gl=1*1d1xztc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc4NC41MC4wLjA.'),
    (10, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch3.jpg?alt=media&token=ff385f5d-dedb-41df-9bd6-e8d81d7fa269&_gl=1*mqc6f*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc5Mi40Mi4wLjA.'),
	(11, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen.png?alt=media&token=393c6307-62bd-43aa-9eb0-a370430a5a60&_gl=1*cbfxzl*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDgzMS4zLjAuMA..'),
    (11, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen2.jpg?alt=media&token=5d3d89bd-1335-48ad-abcc-a8e232bf6234&_gl=1*1bdtof8*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg0Ni42MC4wLjA.'),
    (11, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen3.jpg?alt=media&token=28ac19f9-346c-478b-b06a-cbf1ac80ac3a&_gl=1*1r75z3m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg1NS41MS4wLjA.'),
	(12, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch.png?alt=media&token=59db192a-87fe-4bc8-9806-2a2c178fa7cc&_gl=1*1vrbdvx*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc3NC42MC4wLjA.'),
    (12, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch2.jpg?alt=media&token=9e733f9e-543b-48df-a4c9-e78ef161de0b&_gl=1*1d1xztc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc4NC41MC4wLjA.'),
    (12, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch3.jpg?alt=media&token=ff385f5d-dedb-41df-9bd6-e8d81d7fa269&_gl=1*mqc6f*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc5Mi40Mi4wLjA.'),
    (13, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop.png?alt=media&token=12175c6f-abfd-47de-8ea8-4d03a36ef5b8&_gl=1*kfth06*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAxMy42MC4wLjA.'),
    (13, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop2.jpg?alt=media&token=ebd8b05d-0ce9-4c05-a40c-8af920d8ed7a&_gl=1*1c6zlsm*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyMy41MC4wLjA.'),
    (13, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop3.jpg?alt=media&token=6feeea25-73ef-41ca-b42e-96813b5bf35e&_gl=1*1g8wk1m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyOS40NC4wLjA.'),
    (14, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/converse.png?alt=media&token=466bacfa-e96e-4ea5-95f3-e2d664582b38&_gl=1*10o9jwv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA1Ni4xNy4wLjA.'),
    (14, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe2.jpg?alt=media&token=b56259c0-801e-446b-b571-90d82a64f19f&_gl=1*11jn5pf*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA2Ny42LjAuMA..'),
    (14, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe3.jpg?alt=media&token=98b687ec-07a2-40f5-87ea-4fa6a00f6454&_gl=1*1vrfrx5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA3My42MC4wLjA.'),
    (14, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe4.jpg?alt=media&token=100227c4-8cfd-4dc1-bbce-42fd0930310b&_gl=1*wrbvuo*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4MC41My4wLjA.'),
    (14, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe5.jpg?alt=media&token=d0db6384-e9c6-49ba-8e07-3c441de1aa94&_gl=1*et7s3q*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4Ny40Ni4wLjA.'),
    (15, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (15, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (15, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(15, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (15, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
	(16, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket.png?alt=media&token=73b09beb-539a-4314-a1a4-f61cb37bb25c&_gl=1*lxlxxw*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk3OC42MC4wLjA.'),
    (16, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (16, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
	(17, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant.png?alt=media&token=08259ef6-81a4-42b0-a96e-8e6a6e8da8a3&_gl=1*1i5rsim*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDkyNS41OC4wLjA.'),
    (17, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant2.jpg?alt=media&token=bda15573-dba3-4908-af03-d0e0c07c46fd&_gl=1*1a1em4n*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk0NS4zOC4wLjA.'),
    (17, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant3.jpg?alt=media&token=000f3717-280c-4a5d-9603-85218ab815fa&_gl=1*1qe0oux*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1Mi4zMS4wLjA.'),
    (17, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant4.jpg?alt=media&token=44d66b60-de7f-4c18-b792-8b4339a2e537&_gl=1*6dh1yu*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1OS4yNC4wLjA.'),
    (17, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant5.jpg?alt=media&token=f6f83391-c776-47ab-870e-97804a7affb1&_gl=1*wkfe7y*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk2OC4xNS4wLjA.'),
	(18, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book.png?alt=media&token=a3465f42-f91f-47b9-a75d-0a9cced75cac&_gl=1*1swu0lv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE1My42MC4wLjA.'),
    (18, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book2.jpg?alt=media&token=7181d9dc-a264-4edf-9de5-f80b01c44976&_gl=1*2g6cqb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2Mi41MS4wLjA.'),
    (18, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book3.jpg?alt=media&token=021b1c53-2518-4395-b286-03f48e7d3fd9&_gl=1*6zkm1r*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2OC40NS4wLjA.'),
    (18, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book4.jpg?alt=media&token=facad10e-7b15-4b32-a980-863fab3f5a91&_gl=1*4r5xfb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE3NS4zOC4wLjA.'),
    (18, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book5.jpg?alt=media&token=a3a3b603-a168-4e3b-b16c-6b397e21494f&_gl=1*1vyobuc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE4Mi4zMS4wLjA.'),
    (19, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair.png?alt=media&token=fbd96d02-e7b5-433f-a244-e3c8b23c250d&_gl=1*l8xy0x*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY3OS42MC4wLjA.'), 
	(19, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair2.jpg?alt=media&token=b5654f29-a4a4-4097-b67f-0c5147330d41&_gl=1*2c2i3g*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY4OS41MC4wLjA.'),
	(19, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair3.jpg?alt=media&token=861e65e7-2adc-40a6-acb0-8138c0f253d7&_gl=1*10ddoq6*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcwMS4zOC4wLjA.'), 
	(19, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair4.jpg?alt=media&token=373714ea-daf8-49d0-b801-40f9f8d74806&_gl=1*nijzx7*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcxMC4yOS4wLjA.'), 
	(20, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book.png?alt=media&token=a3465f42-f91f-47b9-a75d-0a9cced75cac&_gl=1*1swu0lv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE1My42MC4wLjA.'),
    (20, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book2.jpg?alt=media&token=7181d9dc-a264-4edf-9de5-f80b01c44976&_gl=1*2g6cqb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2Mi41MS4wLjA.'),
    (20, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book3.jpg?alt=media&token=021b1c53-2518-4395-b286-03f48e7d3fd9&_gl=1*6zkm1r*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2OC40NS4wLjA.'),
    (20, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book4.jpg?alt=media&token=facad10e-7b15-4b32-a980-863fab3f5a91&_gl=1*4r5xfb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE3NS4zOC4wLjA.'),
    (20, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book5.jpg?alt=media&token=a3a3b603-a168-4e3b-b16c-6b397e21494f&_gl=1*1vyobuc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE4Mi4zMS4wLjA.'),
    (21, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair.png?alt=media&token=fbd96d02-e7b5-433f-a244-e3c8b23c250d&_gl=1*l8xy0x*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY3OS42MC4wLjA.'), 
	(21, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair2.jpg?alt=media&token=b5654f29-a4a4-4097-b67f-0c5147330d41&_gl=1*2c2i3g*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY4OS41MC4wLjA.'),
	(21, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair3.jpg?alt=media&token=861e65e7-2adc-40a6-acb0-8138c0f253d7&_gl=1*10ddoq6*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcwMS4zOC4wLjA.'), 
	(21, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair4.jpg?alt=media&token=373714ea-daf8-49d0-b801-40f9f8d74806&_gl=1*nijzx7*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcxMC4yOS4wLjA.'), 
    (22, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/converse.png?alt=media&token=466bacfa-e96e-4ea5-95f3-e2d664582b38&_gl=1*10o9jwv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA1Ni4xNy4wLjA.'),
    (22, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe2.jpg?alt=media&token=b56259c0-801e-446b-b571-90d82a64f19f&_gl=1*11jn5pf*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA2Ny42LjAuMA..'),
    (22, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe3.jpg?alt=media&token=98b687ec-07a2-40f5-87ea-4fa6a00f6454&_gl=1*1vrfrx5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA3My42MC4wLjA.'),
    (22, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe4.jpg?alt=media&token=100227c4-8cfd-4dc1-bbce-42fd0930310b&_gl=1*wrbvuo*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4MC41My4wLjA.'),
    (22, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe5.jpg?alt=media&token=d0db6384-e9c6-49ba-8e07-3c441de1aa94&_gl=1*et7s3q*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4Ny40Ni4wLjA.'),
    (23, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (23, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (23, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(23, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (23, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
	(24, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket.png?alt=media&token=73b09beb-539a-4314-a1a4-f61cb37bb25c&_gl=1*lxlxxw*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk3OC42MC4wLjA.'),
    (24, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (24, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (25, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop.png?alt=media&token=12175c6f-abfd-47de-8ea8-4d03a36ef5b8&_gl=1*kfth06*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAxMy42MC4wLjA.'),
    (25, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop2.jpg?alt=media&token=ebd8b05d-0ce9-4c05-a40c-8af920d8ed7a&_gl=1*1c6zlsm*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyMy41MC4wLjA.'),
    (25, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop3.jpg?alt=media&token=6feeea25-73ef-41ca-b42e-96813b5bf35e&_gl=1*1g8wk1m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyOS40NC4wLjA.'),
	(26, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant.png?alt=media&token=08259ef6-81a4-42b0-a96e-8e6a6e8da8a3&_gl=1*1i5rsim*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDkyNS41OC4wLjA.'),
    (26, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant2.jpg?alt=media&token=bda15573-dba3-4908-af03-d0e0c07c46fd&_gl=1*1a1em4n*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk0NS4zOC4wLjA.'),
    (26, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant3.jpg?alt=media&token=000f3717-280c-4a5d-9603-85218ab815fa&_gl=1*1qe0oux*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1Mi4zMS4wLjA.'),
    (26, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant4.jpg?alt=media&token=44d66b60-de7f-4c18-b792-8b4339a2e537&_gl=1*6dh1yu*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1OS4yNC4wLjA.'),
    (26, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant5.jpg?alt=media&token=f6f83391-c776-47ab-870e-97804a7affb1&_gl=1*wkfe7y*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk2OC4xNS4wLjA.'),
	(27, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen.png?alt=media&token=393c6307-62bd-43aa-9eb0-a370430a5a60&_gl=1*cbfxzl*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDgzMS4zLjAuMA..'),
    (27, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen2.jpg?alt=media&token=5d3d89bd-1335-48ad-abcc-a8e232bf6234&_gl=1*1bdtof8*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg0Ni42MC4wLjA.'),
    (27, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen3.jpg?alt=media&token=28ac19f9-346c-478b-b06a-cbf1ac80ac3a&_gl=1*1r75z3m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg1NS41MS4wLjA.'),
    (28, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (28, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (28, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (28, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (28, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt5.jpg?alt=media&token=80d62406-6cf4-4112-997c-f34e67bdf4ae&_gl=1*oieugt*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTkxMi4zMy4wLjA.'),
	(29, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch.png?alt=media&token=59db192a-87fe-4bc8-9806-2a2c178fa7cc&_gl=1*1vrbdvx*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc3NC42MC4wLjA.'),
    (29, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch2.jpg?alt=media&token=9e733f9e-543b-48df-a4c9-e78ef161de0b&_gl=1*1d1xztc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc4NC41MC4wLjA.'),
    (29, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch3.jpg?alt=media&token=ff385f5d-dedb-41df-9bd6-e8d81d7fa269&_gl=1*mqc6f*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc5Mi40Mi4wLjA.'),
    
    (30, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book.png?alt=media&token=a3465f42-f91f-47b9-a75d-0a9cced75cac&_gl=1*1swu0lv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE1My42MC4wLjA.'),
    (30, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book2.jpg?alt=media&token=7181d9dc-a264-4edf-9de5-f80b01c44976&_gl=1*2g6cqb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2Mi41MS4wLjA.'),
    (30, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book3.jpg?alt=media&token=021b1c53-2518-4395-b286-03f48e7d3fd9&_gl=1*6zkm1r*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2OC40NS4wLjA.'),
    (30, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book4.jpg?alt=media&token=facad10e-7b15-4b32-a980-863fab3f5a91&_gl=1*4r5xfb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE3NS4zOC4wLjA.'),
    (30, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book5.jpg?alt=media&token=a3a3b603-a168-4e3b-b16c-6b397e21494f&_gl=1*1vyobuc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE4Mi4zMS4wLjA.'),
    (31, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair.png?alt=media&token=fbd96d02-e7b5-433f-a244-e3c8b23c250d&_gl=1*l8xy0x*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY3OS42MC4wLjA.'), 
	(31, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair2.jpg?alt=media&token=b5654f29-a4a4-4097-b67f-0c5147330d41&_gl=1*2c2i3g*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY4OS41MC4wLjA.'),
	(31, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair3.jpg?alt=media&token=861e65e7-2adc-40a6-acb0-8138c0f253d7&_gl=1*10ddoq6*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcwMS4zOC4wLjA.'), 
	(31, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair4.jpg?alt=media&token=373714ea-daf8-49d0-b801-40f9f8d74806&_gl=1*nijzx7*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcxMC4yOS4wLjA.'), 
    (32, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/converse.png?alt=media&token=466bacfa-e96e-4ea5-95f3-e2d664582b38&_gl=1*10o9jwv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA1Ni4xNy4wLjA.'),
    (32, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe2.jpg?alt=media&token=b56259c0-801e-446b-b571-90d82a64f19f&_gl=1*11jn5pf*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA2Ny42LjAuMA..'),
    (32, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe3.jpg?alt=media&token=98b687ec-07a2-40f5-87ea-4fa6a00f6454&_gl=1*1vrfrx5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA3My42MC4wLjA.'),
    (32, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe4.jpg?alt=media&token=100227c4-8cfd-4dc1-bbce-42fd0930310b&_gl=1*wrbvuo*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4MC41My4wLjA.'),
    (32, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe5.jpg?alt=media&token=d0db6384-e9c6-49ba-8e07-3c441de1aa94&_gl=1*et7s3q*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4Ny40Ni4wLjA.'),
    (33, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (33, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (33, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(33, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (33, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
	(34, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket.png?alt=media&token=73b09beb-539a-4314-a1a4-f61cb37bb25c&_gl=1*lxlxxw*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk3OC42MC4wLjA.'),
    (34, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (34, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (35, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop.png?alt=media&token=12175c6f-abfd-47de-8ea8-4d03a36ef5b8&_gl=1*kfth06*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAxMy42MC4wLjA.'),
    (35, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop2.jpg?alt=media&token=ebd8b05d-0ce9-4c05-a40c-8af920d8ed7a&_gl=1*1c6zlsm*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyMy41MC4wLjA.'),
    (35, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop3.jpg?alt=media&token=6feeea25-73ef-41ca-b42e-96813b5bf35e&_gl=1*1g8wk1m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyOS40NC4wLjA.'),
	(36, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant.png?alt=media&token=08259ef6-81a4-42b0-a96e-8e6a6e8da8a3&_gl=1*1i5rsim*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDkyNS41OC4wLjA.'),
    (36, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant2.jpg?alt=media&token=bda15573-dba3-4908-af03-d0e0c07c46fd&_gl=1*1a1em4n*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk0NS4zOC4wLjA.'),
    (36, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant3.jpg?alt=media&token=000f3717-280c-4a5d-9603-85218ab815fa&_gl=1*1qe0oux*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1Mi4zMS4wLjA.'),
    (36, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant4.jpg?alt=media&token=44d66b60-de7f-4c18-b792-8b4339a2e537&_gl=1*6dh1yu*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1OS4yNC4wLjA.'),
    (36, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant5.jpg?alt=media&token=f6f83391-c776-47ab-870e-97804a7affb1&_gl=1*wkfe7y*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk2OC4xNS4wLjA.'),
	(37, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen.png?alt=media&token=393c6307-62bd-43aa-9eb0-a370430a5a60&_gl=1*cbfxzl*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDgzMS4zLjAuMA..'),
    (37, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen2.jpg?alt=media&token=5d3d89bd-1335-48ad-abcc-a8e232bf6234&_gl=1*1bdtof8*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg0Ni42MC4wLjA.'),
    (37, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen3.jpg?alt=media&token=28ac19f9-346c-478b-b06a-cbf1ac80ac3a&_gl=1*1r75z3m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg1NS41MS4wLjA.'),
    (38, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (38, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (38, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (38, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (38, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt5.jpg?alt=media&token=80d62406-6cf4-4112-997c-f34e67bdf4ae&_gl=1*oieugt*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTkxMi4zMy4wLjA.'),
	(39, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch.png?alt=media&token=59db192a-87fe-4bc8-9806-2a2c178fa7cc&_gl=1*1vrbdvx*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc3NC42MC4wLjA.'),
    (39, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch2.jpg?alt=media&token=9e733f9e-543b-48df-a4c9-e78ef161de0b&_gl=1*1d1xztc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc4NC41MC4wLjA.'),
    (39, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch3.jpg?alt=media&token=ff385f5d-dedb-41df-9bd6-e8d81d7fa269&_gl=1*mqc6f*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc5Mi40Mi4wLjA.'),
    
    (40, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book.png?alt=media&token=a3465f42-f91f-47b9-a75d-0a9cced75cac&_gl=1*1swu0lv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE1My42MC4wLjA.'),
    (40, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book2.jpg?alt=media&token=7181d9dc-a264-4edf-9de5-f80b01c44976&_gl=1*2g6cqb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2Mi41MS4wLjA.'),
    (40, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book3.jpg?alt=media&token=021b1c53-2518-4395-b286-03f48e7d3fd9&_gl=1*6zkm1r*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE2OC40NS4wLjA.'),
    (40, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book4.jpg?alt=media&token=facad10e-7b15-4b32-a980-863fab3f5a91&_gl=1*4r5xfb*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE3NS4zOC4wLjA.'),
    (40, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/book5.jpg?alt=media&token=a3a3b603-a168-4e3b-b16c-6b397e21494f&_gl=1*1vyobuc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTE4Mi4zMS4wLjA.'),
    (41, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair.png?alt=media&token=fbd96d02-e7b5-433f-a244-e3c8b23c250d&_gl=1*l8xy0x*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY3OS42MC4wLjA.'), 
	(41, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair2.jpg?alt=media&token=b5654f29-a4a4-4097-b67f-0c5147330d41&_gl=1*2c2i3g*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTY4OS41MC4wLjA.'),
	(41, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair3.jpg?alt=media&token=861e65e7-2adc-40a6-acb0-8138c0f253d7&_gl=1*10ddoq6*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcwMS4zOC4wLjA.'), 
	(41, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/chair4.jpg?alt=media&token=373714ea-daf8-49d0-b801-40f9f8d74806&_gl=1*nijzx7*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTcxMC4yOS4wLjA.'), 
    (42, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/converse.png?alt=media&token=466bacfa-e96e-4ea5-95f3-e2d664582b38&_gl=1*10o9jwv*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA1Ni4xNy4wLjA.'),
    (42, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe2.jpg?alt=media&token=b56259c0-801e-446b-b571-90d82a64f19f&_gl=1*11jn5pf*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA2Ny42LjAuMA..'),
    (42, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe3.jpg?alt=media&token=98b687ec-07a2-40f5-87ea-4fa6a00f6454&_gl=1*1vrfrx5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA3My42MC4wLjA.'),
    (42, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe4.jpg?alt=media&token=100227c4-8cfd-4dc1-bbce-42fd0930310b&_gl=1*wrbvuo*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4MC41My4wLjA.'),
    (42, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shoe5.jpg?alt=media&token=d0db6384-e9c6-49ba-8e07-3c441de1aa94&_gl=1*et7s3q*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTA4Ny40Ni4wLjA.'),
    (43, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup.png?alt=media&token=7b72b433-af61-41f6-9083-7a503eb4ab75&_gl=1*1bzsxc2*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc0My42MC4wLjA.'),
    (43, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup2.jpg?alt=media&token=760598eb-af62-4306-9274-86456ded09e6&_gl=1*14mk5hs*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc4MC4yMy4wLjA.'),
    (43, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup3.jpg?alt=media&token=1c2c73f6-2100-4520-8768-8629c04b28fc&_gl=1*1co4bsp*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTc2OS4zNC4wLjA.'),
	(43, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup4.jpg?alt=media&token=84e7affd-4341-45f2-8036-5b379a57976a&_gl=1*spt6t4*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgwMC4zLjAuMA..'),
    (43, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/cup5.jpg?alt=media&token=57afdd58-531e-4dc5-bbd9-9b57d3ecbe0d&_gl=1*1xykbq5*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTgxMC42MC4wLjA.'),
	(44, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket.png?alt=media&token=73b09beb-539a-4314-a1a4-f61cb37bb25c&_gl=1*lxlxxw*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk3OC42MC4wLjA.'),
    (44, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (44, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/jacket2.jpg?alt=media&token=a4b5fd2c-f1fb-4da5-8c7e-faf71fb83726&_gl=1*1wpj3au*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTk5Ny40MS4wLjA.'),
    (45, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop.png?alt=media&token=12175c6f-abfd-47de-8ea8-4d03a36ef5b8&_gl=1*kfth06*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAxMy42MC4wLjA.'),
    (45, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop2.jpg?alt=media&token=ebd8b05d-0ce9-4c05-a40c-8af920d8ed7a&_gl=1*1c6zlsm*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyMy41MC4wLjA.'),
    (45, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/mop3.jpg?alt=media&token=6feeea25-73ef-41ca-b42e-96813b5bf35e&_gl=1*1g8wk1m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMTAyOS40NC4wLjA.'),
	(46, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant.png?alt=media&token=08259ef6-81a4-42b0-a96e-8e6a6e8da8a3&_gl=1*1i5rsim*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDkyNS41OC4wLjA.'),
    (46, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant2.jpg?alt=media&token=bda15573-dba3-4908-af03-d0e0c07c46fd&_gl=1*1a1em4n*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk0NS4zOC4wLjA.'),
    (46, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant3.jpg?alt=media&token=000f3717-280c-4a5d-9603-85218ab815fa&_gl=1*1qe0oux*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1Mi4zMS4wLjA.'),
    (46, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant4.jpg?alt=media&token=44d66b60-de7f-4c18-b792-8b4339a2e537&_gl=1*6dh1yu*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk1OS4yNC4wLjA.'),
    (46, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pant5.jpg?alt=media&token=f6f83391-c776-47ab-870e-97804a7affb1&_gl=1*wkfe7y*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDk2OC4xNS4wLjA.'),
	(47, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen.png?alt=media&token=393c6307-62bd-43aa-9eb0-a370430a5a60&_gl=1*cbfxzl*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDgzMS4zLjAuMA..'),
    (47, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen2.jpg?alt=media&token=5d3d89bd-1335-48ad-abcc-a8e232bf6234&_gl=1*1bdtof8*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg0Ni42MC4wLjA.'),
    (47, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/pen3.jpg?alt=media&token=28ac19f9-346c-478b-b06a-cbf1ac80ac3a&_gl=1*1r75z3m*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDg1NS41MS4wLjA.'),
    (48, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (48, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt2.jpg?alt=media&token=8078cb6b-d12a-4c7e-937b-1ac5e9c63bd5&_gl=1*1rq625t*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg4NS42MC4wLjA.'),
    (48, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (48, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt3.jpg?alt=media&token=db6fadf6-6504-406b-af45-eb8c9a447f3e&_gl=1*1xcoxg9*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTg5Ni40OS4wLjA.'),
    (48, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/shirt5.jpg?alt=media&token=80d62406-6cf4-4112-997c-f34e67bdf4ae&_gl=1*oieugt*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwOTkxMi4zMy4wLjA.'),
	(49, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch.png?alt=media&token=59db192a-87fe-4bc8-9806-2a2c178fa7cc&_gl=1*1vrbdvx*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc3NC42MC4wLjA.'),
    (49, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch2.jpg?alt=media&token=9e733f9e-543b-48df-a4c9-e78ef161de0b&_gl=1*1d1xztc*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc4NC41MC4wLjA.'),
    (49, 'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/watch3.jpg?alt=media&token=ff385f5d-dedb-41df-9bd6-e8d81d7fa269&_gl=1*mqc6f*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUxMDc5Mi40Mi4wLjA.');
  
   
   
   
INSERT INTO emojis (emoji_id,type) values
(1,'LIKE'),
(2,'HEART'),
(3,'FUN'),
(4,'SAD')
   
   INSERT INTO interested (user_id, post_id,emoji_id, date_interested) VALUES
    (13, 1,1, '2023-01-10'),
	(21, 2,2, '2023-01-20'),
	(22, 3,3, '2023-01-13'),
    
	(10, 4,4, '2023-02-10'), 
    (11, 5,1, '2023-02-19'),
    
	(12, 6,2, '2023-03-20'), 
    (25, 7,3, '2023-03-14'),
    
    (15, 8,4, '2023-04-30'), 
    (16, 9,1, '2023-04-30'),
    (23, 10,2, '2023-04-20'),
    
    (7, 11,3, '2023-05-10'), 
    (8, 12,4, '2023-05-10'),
    (9, 13,1, '2023-05-10'),
    (14, 14,2, '2023-05-10'), 
    (23, 15,3, '2023-05-10'),
    (26, 16,4, '2023-05-10'),
    
    (18, 17,1, '2023-06-06'), 
    (9, 18,2, '2023-06-06'),
    (14, 19,3, '2023-06-06'),
    
	(8, 20,4, '2023-07-10'),
    (7, 21,1, '2023-07-13'),
    (11, 22,2, '2023-07-15'),
    (12, 23,3, '2023-07-18'), 
    (15, 24,4, '2023-07-19'),
    (16, 25,1, '2023-07-20'),
    (19, 26,2, '2023-07-20'), 
    (21, 27,3, '2023-07-21'),
    (24, 28,4, '2023-07-24'),
    (26, 29,1, '2023-07-28'), 
    
    (8, 30,1, '2023-08-03'),
    (7, 31,2, '2023-08-13'),
    (11, 32,3, '2023-08-15'),
    (12, 33,4, '2023-08-18'), 
    (15, 34,1, '2023-08-19'),
    (16, 35,2, '2023-08-20'),
    (19, 36,3, '2023-08-20'), 
    (21, 37,4, '2023-08-21'),
    (24, 38,1, '2023-08-26'),
    (26, 39,2, '2023-08-30'),
    
    (8, 40,3, '2023-09-01'),
    (7, 40,4, '2023-09-01'),
    (11, 40,1, '2023-09-01'),
    (12, 40,2, '2023-09-01'),
    (15, 40,3, '2023-09-01'),
    (16, 40,4, '2023-09-01'),
    
    (8, 41,1, '2023-09-02'),
    (11, 41,1, '2023-09-02'),
    (12, 41,1, '2023-09-02'),
    (15, 41,1, '2023-09-02'),
    (19, 41,1, '2023-09-02'),
    (24, 41,1, '2023-09-02'),
    (21, 41,1, '2023-09-02'),
    (26, 41,1, '2023-09-02'),
    
    (11, 42,2, '2023-09-05'),
    (26, 42,2, '2023-09-05'),
    (24, 42,2, '2023-09-05'),
    (15, 42,2, '2023-09-05'),
    
    (12, 43,3, '2023-09-10'), 
	(13, 43,3, '2023-09-10'), 
    (24, 43,3, '2023-09-10'), 
    (12, 43,3, '2023-09-10'), 
    (15, 43,3, '2023-09-10'), 
    (22, 43,3, '2023-09-10'), 
    
    (15, 44,1, '2023-09-12'),
    (12, 44,2, '2023-09-12'),
    (11, 44,1, '2023-09-12'),
    
    (16, 45,1, '2023-09-14'),
    (22, 45,1, '2023-09-14'),
    (13, 45,2, '2023-09-14'),
    
    (19, 46,1, '2023-09-18'), 
    (13, 46,1, '2023-09-18'), 
    (12, 46,1, '2023-09-18'), 
    
    (21, 47,2, '2023-09-20'),
    (15, 47,2, '2023-09-20'),
    (24, 47,2, '2023-09-20'),
    
    (24, 48,1, '2023-09-25'),
    (17, 48,1, '2023-09-25'),
    (16, 48,1, '2023-09-25'),
    
    
    (26, 49,1, '2023-09-30'),
    (10, 49,2, '2023-09-30'),
    (11, 49,3, '2023-09-30'),
    (12, 49,4, '2023-09-30'),
    (13, 49,1, '2023-09-30'),
    (14, 49,2, '2023-09-30'),
    (15, 49,3, '2023-09-30'),
    (16, 49,4, '2023-09-30'),
    (17, 49,1, '2023-09-30'),
    (18, 49,2, '2023-09-30');

INSERT INTO comment (user_id, parent_comment_id, post_id, date_comment, content, comment_status)
VALUES
-- Chỉ có bài viết ngày 30-9 là có bình luận
    (10, NULL, 49,'2023-09-30', 'Mình ib bạn ròi á bạn ơi!', true),
		(26, 1, 49,'2023-10-1', 'Rep rồi bạn ơi!', true), -- chính chủ trl
	(13, NULL, 49,'2023-09-30', 'Mình mới ib bạn ròi á bạn ơi!', true),
		(26, 3, 49,'2023-10-1', 'Rep rồi bạn ơi!', true),
    (18, NULL, 49,'2023-09-30', 'Check ib!', true),
		(26, 5, 49,'2023-10-1', 'Rep rồi bạn ơi!', true);
        
INSERT INTO share (user_id, post_id, date_share,share_status) VALUES
-- Chỉ có bài viết ngày 30-9 là có các lượt chia sẻ
    (11, 49, '2023-09-30',true ),
    (12, 49, '2023-09-30',true),
    (14, 49, '2023-09-30',true),
    (15, 49, '2023-09-30',true);

INSERT INTO follower (follower_id, user_id,date_follow)
VALUES
    (7, 8,'2023-09-30'),
    (8, 7,'2023-09-30'), -- Bạn bè
	(7, 9,'2023-09-30'),
	(7, 10,'2023-09-30'),
    (8, 11,'2023-09-30'),
	(8, 13,'2023-09-30'),
	(8, 20,'2023-09-30'),
    (9, 13,'2023-09-30'),
	(9, 11,'2023-09-30'),
	(9, 16,'2023-09-30'),
    (9, 21,'2023-09-30'),
    (10, 13,'2023-09-30'),
	(10, 11,'2023-09-30'),
	(10, 16,'2023-09-30'),
    (10, 21,'2023-09-30'),
    (11, 13,'2023-09-30'),
	(11, 15,'2023-09-30'),
	(11, 16,'2023-09-30'),
    (16, 11,'2023-09-30'), -- bạn bè
    (12, 13,'2023-09-30'),
	(12, 15,'2023-09-30'),
	(12, 16,'2023-09-30'),
    (16, 12,'2023-09-30'), -- bạn bè
    (13, 20,'2023-09-30'),
	(13, 15,'2023-09-30'),
	(13, 16,'2023-09-30'),
    (14, 22,'2023-09-30'),
	(14, 25,'2023-09-30'),
	(14, 19,'2023-09-30'),
    (15, 8,'2023-09-30'),
	(15, 24,'2023-09-30'),
    (24, 15,'2023-09-30'), -- bạn bè
	(15, 26,'2023-09-30'),
	(26, 15,'2023-09-30'), -- bạn bè
    (16, 8,'2023-09-30'),
	(16, 24,'2023-09-30'),
	(16, 26,'2023-09-30'),
    (26, 16,'2023-09-30'), -- bạn bè
    (17, 8,'2023-09-30'),
	(17, 12,'2023-09-30'),
	(17, 11,'2023-09-30'),
    (18, 12,'2023-09-30'),
	(18, 14,'2023-09-30'),
	(18, 13,'2023-09-30'),
	(18, 7,'2023-09-30'),
    (7, 18,'2023-09-30'), -- bạn bè
	(18, 8,'2023-09-30'),
    (19, 7,'2023-09-30'),
	(19, 8,'2023-09-30'),
    (8, 19,'2023-09-30'), -- bạn bè
	(19, 12,'2023-09-30'),
    (20, 7,'2023-09-30'),
	(20, 8,'2023-09-30'),
	(20, 12,'2023-09-30'),
    (21, 7,'2023-09-30'),
	(21, 8,'2023-09-30'),
	(22, 12,'2023-09-30'),
    (23, 17,'2023-09-30'),
	(23, 18,'2023-09-30'),
	(23, 13,'2023-09-30'),
    (24, 9,'2023-09-30'),
    (9, 24,'2023-09-30'), -- bạn bè
	(24, 12,'2023-09-30'),
    (25, 24,'2023-09-30'),
	(25, 23,'2023-09-30'),
	(25, 26,'2023-09-30'),
    (26, 25,'2023-09-30'), -- bạn bè
    (26, 7,'2023-09-30'),
	(26, 9,'2023-09-30'),
	(26, 11,'2023-09-30'),
    (26, 13,'2023-09-30'),
	(26, 18,'2023-09-30'),
    (18, 26,'2023-09-30');
   
   
INSERT INTO chats (name_chats,day_create, isFriend) VALUES
	('nguyenttduclq','2023-09-30', true),
    ('nguyenttquannq','2023-09-30', true),
	('nguyenttyenvhk','2023-09-30', true),
    ('duclqteonv','2023-09-30', true),
    ('nguyenttlinhnh','2023-09-30', true),
    ('nhipydatndq','2023-09-30', true),
	('cntteonv','2023-09-30', true),
	('quannqnhantt','2023-09-30', true),
	('quannqtientt','2023-09-30', true),
	('nhipyyenvhk','2023-09-30', true),
	('cntanhlhm','2023-09-30', true);
    
INSERT INTO chat_participants (chat_id, user_id,chat_participants_status) VALUES
   	(1, 26,true),
    (1, 18,true),
    (2, 26,true),
    (2, 16,true),
    (3, 26,true),
	(3, 15,true),
    (4, 18,true),
	(4, 7,true),
	(5, 26,true),
	(5, 25,true),
    (6, 24,true),
	(6, 9,true),
	(7, 8,true),
	(7, 7,true),
	(8, 16,true),
	(8, 11,true),
	(9, 16,true),
	(9, 12,true),
	(10, 24,true),
	(10, 15,true),
	(11, 8,true),
	(11, 19,true);
    
INSERT INTO post_reported (post_reported_id, user_send_report_id, content_report, date_report) VALUES
	(49, 16, 'Lừa đảo', '2023-10-20'),
    (49, 18, 'Lừa đảo bà con ơn', '2023-10-20');
    
INSERT INTO user_reported (user_reported_id, user_send_report_id, content_report, date_report) VALUES
	(26, 16, 'đăng bài lừa đảo', '2023-10-20'),
    (26, 18, 'nội dung bậy bạ', '2023-10-20');
  ---Tạo chỉ muc ------
   CREATE INDEX index_users_email_pass ON users  (email, password);

    
   
--Tạo function tải dữ liệu bạn bè-----------------------------------------------------------------------------------------------------------
--DROP FUNCTION get_friend_follow
CREATE OR REPLACE FUNCTION get_friend_follow(current_user_id INT)
RETURNS TABLE (
    user_id INT,
    thumb VARCHAR(1000),
    avatar VARCHAR(1000),
    mark INT,
    fullname VARCHAR(255),
    intro VARCHAR(255),
    countPost INT,
    countFollower INT,
    countImg INT,
    username VARCHAR
) AS
$$
DECLARE
    current_user_name VARCHAR;
    user_list1 VARCHAR[];
  	user_list2 VARCHAR[];
  	check_friend BOOLEAN[];
    friends_list INT[];
BEGIN
    SELECT u.username INTO current_user_name FROM users u WHERE u.user_id = current_user_id; 
    
    SELECT ARRAY_AGG(
        substring(c.name_chats  from  current_user_name||'(.+)')::VARCHAR
    ) INTO user_list1
    FROM chats c
    WHERE c.name_chats LIKE '%' || current_user_name || '%' AND c.isfriend =TRUE;
   
    SELECT ARRAY_AGG(
        substring(c.name_chats  from '(.+)'||current_user_name)::VARCHAR
    ) INTO user_list2
    FROM chats c
    WHERE c.name_chats LIKE '%' || current_user_name || '%'AND c.isfriend =TRUE;
   
   SELECT ARRAY_AGG(c.isfriend) INTO check_friend
    FROM chats c
    WHERE c.name_chats LIKE '%' || current_user_name || '%';
   
    SELECT array_cat(user_list1, user_list2) INTO user_list1;
   
    SELECT ARRAY_AGG(u.user_id) INTO friends_list
    FROM users u
    WHERE u.username LIKE ANY(user_list1);
   
    IF array_length(friends_list, 1) > 0 THEN
        RETURN QUERY
    SELECT
        u.user_id,
        u.thumb,
        u.avatar,
        u.mark,
        u.fullname,
        u.intro,
        (SELECT COUNT(p.post_id) FROM post p WHERE p.user_id = u.user_id)::INT AS countPost,
        (SELECT COUNT(f.follower_id) FROM follower f WHERE f.user_id = u.user_id)::INT AS countFollower,
        (SELECT COUNT(pi2.post_images_id) FROM post_images pi2 INNER JOIN post p ON pi2.post_id = p.post_id WHERE p.user_id = u.user_id)::INT AS countImg,
       	u.username
    FROM users u 
    WHERE u.user_id  = ANY(friends_list);
    END IF;
END;
$$
LANGUAGE plpgsql;
   
-- Trả về danh sách bài Post có quan hệ bạn hoặc đang follow----------------------------------------------------------------------------------------------------------------------------------
--DROP FUNCTION  get_friend_posts


CREATE OR REPLACE FUNCTION get_friend_posts(current_user_id INT)
RETURNS TABLE (
    post_id INT,
    user_id INT,
    parent_post_id INT,
    content VARCHAR(500),
    date_post TIMESTAMP,
    hash_tag VARCHAR(50),
    send_status BOOLEAN,
    post_status BOOLEAN,
    product VARCHAR(100),
    ban BOOLEAN,
    countInterested INT,
    countComment INT,
    countShare INT,
    fullname VARCHAR(255),
    avatar VARCHAR(1000),
    user_province VARCHAR,
    isInterested INT,
    typeInterested INT[],
    post_images JSONB,
    post_share JSONB
) AS
$$
DECLARE
    current_user_province VARCHAR;
	friends_list INT[];
    user_post_list INT[];
    post_province_list INT[];
    final_list INT[];
BEGIN
    SELECT u.user_provinces_id 
    INTO current_user_province
    FROM users u WHERE u.user_id =current_user_id;
	
	SELECT ARRAY_AGG(f.user_id)
    INTO friends_list
    FROM get_friend_follow(current_user_id) f;
    
    SELECT ARRAY_AGG(f.follower_id)
    INTO user_post_list
    FROM follower f
    WHERE f.user_id = current_user_id;
    
    SELECT ARRAY_AGG(p.user_id)
    INTO post_province_list
    FROM post p
    WHERE p.post_provinces_id = current_user_province;
    
    -- Kết hợp danh sách bạn bè và danh sách người theo dõi
    final_list := friends_list || user_post_list || post_province_list;

    IF array_length(final_list, 1) > 0 THEN
        RETURN QUERY
        SELECT
            p.post_id,
            p.user_id,
            p.parent_post_id,
            p.content,
            p.date_post,
            p.hash_tag,
            p.send_status,
            p.post_status,
            p.product,
            p.ban,
            (SELECT COUNT(i.interested_id) FROM interested i WHERE i.post_id = p.post_id)::INT AS countInterested,
            (SELECT COUNT(comment_id) FROM "comment" c WHERE c.post_id = p.post_id)::INT AS countComment,
            (SELECT COUNT(share_id) FROM "share" s WHERE s.post_id = p.post_id)::INT AS countShare,
            u.fullname,
            u.avatar,
            u.user_provinces_id,
            (SELECT COALESCE((SELECT i.emoji_id FROM interested i WHERE i.post_id = p.post_id AND i.user_id = current_user_id), 0)) AS isInterested,
            (SELECT ARRAY_AGG(DISTINCT i.emoji_id) AS unique_emoji_ids FROM interested i WHERE i.post_id = p.post_id) as typeInterested,    
            (select JSONB_AGG(JSONB_BUILD_OBJECT('link_images', pi2.link_image)) from post_images pi2 where pi2.post_id =p.post_id) as post_images,
			CASE 
            WHEN p.parent_post_id isnull  THEN  NULL 
            ELSE (select 
            JSONB_AGG(JSONB_BUILD_OBJECT(
            'post_id', gp.post_id, 
            'user_id', gp.user_id, 
            'parent_post_id', gp.parent_post_id, 
            'content', gp.content, 
            'date_post', gp.date_post, 
            'hash_tag', gp.hash_tag, 
            'send_status', gp.send_status, 
            'post_status', gp.post_status, 
            'product', gp.product,
            'ban',gp.ban,
            'countInterested',gp.countInterested,
            'countComment',gp.countComment,
            'countShare',gp.countShare,
            'fullname',gp.fullname,
            'avatar',gp.avatar,
            'post_images',gp.post_images,
            'probinces_code',gp.probinces_code,
            'districts_code',gp.districts_code,
            'wards_code',gp.wards_code
             )) from get_posts_share_id(p.parent_post_id) gp ) 
        end AS post_share
        FROM post p
        INNER JOIN users u ON p.user_id = u.user_id
        WHERE (p.user_id = ANY(final_list) OR p.user_id = current_user_id) AND u.ban=false and p.ban =FALSE 
        ORDER BY p.date_post desc;
    END IF;
END;
$$
LANGUAGE plpgsql;





--CREATE OR REPLACE FUNCTION get_friend_posts(current_user_id INT)
--RETURNS TABLE (
--    post_id INT,
--    user_id INT,
--    parent_post_id INT,
--    content VARCHAR(500),
--    date_post TIMESTAMP,
--    hash_tag VARCHAR(50),
--    send_status BOOLEAN,
--    post_status BOOLEAN,
--    product VARCHAR(100),
--    ban BOOLEAN,
--    countInterested INT,
--    countComment INT,
--    countShare INT,
--    fullname VARCHAR(255),
--    avatar VARCHAR(1000),
--    user_province VARCHAR,
----    post_images VARCHAR[]
--    post_images JSONB
--) AS
--$$
--DECLARE
--    current_user_province VARCHAR;
--	friends_list INT[];
--    user_post_list INT[];
--    post_province_list INT[];
--    final_list INT[];
--BEGIN
--    SELECT u.user_provinces_id 
--    INTO current_user_province
--    FROM users u WHERE u.user_id =current_user_id;
--	
--	SELECT ARRAY_AGG(f.user_id)
--    INTO friends_list
--    FROM get_friend_follow(current_user_id) f;
--    
--    SELECT ARRAY_AGG(f.follower_id)
--    INTO user_post_list
--    FROM follower f
--    WHERE f.user_id = current_user_id;
--    
--    SELECT ARRAY_AGG(p.user_id)
--    INTO post_province_list
--    FROM post p
--    WHERE p.post_provinces_id = current_user_province;
--    
--    -- Kết hợp danh sách bạn bè và danh sách người theo dõi
--    final_list := friends_list || user_post_list || post_province_list;
--
--    IF array_length(final_list, 1) > 0 THEN
--        RETURN QUERY
--        SELECT
--            p.post_id,
--            p.user_id,
--            p.parent_post_id,
--            p.content,
--            p.date_post,
--            p.hash_tag,
--            p.send_status,
--            p.post_status,
--            p.product,
--            p.ban,
--            (SELECT COUNT(i.interested_id) FROM interested i WHERE i.post_id = p.post_id)::INT AS countInterested,
--            (SELECT COUNT(comment_id) FROM "comment" c WHERE c.post_id = p.post_id)::INT AS countComment,
--            (SELECT COUNT(share_id) FROM "share" s WHERE s.post_id = p.post_id)::INT AS countShare,
--            u.fullname,
--            u.avatar,
--            u.user_provinces_id,
----            ARRAY(select pi2.link_image from post_images pi2 where pi2.post_id = p.post_id) AS post_images
--            (select JSONB_AGG(JSONB_BUILD_OBJECT('link_images', pi2.link_image)) from post_images pi2 where pi2.post_id =p.post_id) as post_images
----            (SELECT JSONB_AGG(JSONB_BUILD_OBJECT('link_images', pi2.link_image)) 
----FROM (SELECT pi2.link_image 
----      FROM post_images pi2 
----      WHERE pi2.post_id = p.post_id 
----      LIMIT 1) pi2)as post_images
--        FROM post p
--        INNER JOIN users u ON p.user_id = u.user_id
--        WHERE p.post_status = TRUE AND (p.user_id = ANY(final_list) OR p.user_id = current_user_id) AND u.ban=false and p.ban =FALSE 
--        ORDER BY p.date_post desc;
--    END IF;
--END;
--$$
--LANGUAGE plpgsql;
------Tạo functin tải dữ liệu người theo dõi tài khoản đang đăng nhập--------------------------------------------------------------------------------------------
--DROP FUNCTION  get_follower
CREATE OR REPLACE FUNCTION get_follower(current_user_id INT)
RETURNS TABLE (
    user_id INT,
    fullname VARCHAR(255),
    avatar VARCHAR(1000),
    date_follow text,
    mutual_friends JSONB
) AS
$$
DECLARE
	friends_list INT[];
BEGIN
   	SELECT ARRAY_AGG(f.user_id)
    INTO friends_list
    FROM get_friend_follow(current_user_id) f;
        RETURN QUERY
        select
        	u.user_id,
        	u.fullname,
        	u.avatar,
        	fl.date_follow::text as date_follow,
        	(select JSONB_AGG(JSONB_BUILD_OBJECT('avatar', g.avatar)) from get_friend_follow(u.user_id) g where g.user_id = ANY(friends_list)) as mutual_friends
        from users u , follower fl  where u.user_id = fl.user_id and fl.follower_id =current_user_id ORDER BY fl.date_follow desc;
END;
$$
LANGUAGE plpgsql;
--Tạo function remove element trong mảng------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION remove_elements_from_array(arr1 INT[], arr2 INT[])
RETURNS INT[]
AS
$$
DECLARE
    element INT;
BEGIN
    FOREACH element IN ARRAY arr2
    LOOP
        arr1 := array_remove(arr1, element);
    END LOOP;
    
    RETURN arr1;
END;
$$
LANGUAGE plpgsql;
--Tạo function tải dữ liệu đề xuất bạn bè-----------------------------------------------------------------------------------------------------------------
--DROP FUNCTION get_suggested
--select *from get_suggested(16)
CREATE OR REPLACE FUNCTION get_suggested(current_user_id INT)
RETURNS TABLE (
    id INT,
    avatar VARCHAR(1000),
    fullname VARCHAR(255),
    mutual_friends JSONB
)
AS
$$
DECLARE 
    current_province_id VARCHAR;
    value_friend INT;
    user_list_1 INT[];
    user_list_2 INT[];
    user_list_3 INT[];
   	user_list_4 INT[];
  	friends_list INT[];
BEGIN
	SELECT ARRAY_AGG(frl.user_id)
    INTO friends_list
    FROM get_friend_follow(current_user_id) frl;
   
	SELECT user_provinces_id INTO current_province_id FROM users WHERE user_id = current_user_id;
   	SELECT ARRAY_AGG(fl1.follower_id)
        INTO user_list_4 FROM follower fl1 WHERE fl1.user_id = current_user_id;

    IF (SELECT count(*) FROM get_friend_follow(current_user_id)) = 0 THEN 
        SELECT ARRAY_AGG(f.user_id)
        INTO user_list_1 FROM follower f WHERE f.follower_id = current_user_id;
     END IF;
    IF (SELECT count(*) FROM follower WHERE follower_id = current_user_id) = 0 THEN 
        SELECT ARRAY_AGG(u.user_id)
        INTO user_list_1 FROM users u WHERE u.user_provinces_id = current_province_id;
    END IF;
    IF (SELECT count(*) FROM users u INNER JOIN user_role ur ON u.user_id = ur.user_id 
        WHERE u.user_provinces_id = current_province_id AND ur.role_id=4) = 0 THEN 
        SELECT ARRAY_AGG(u.user_id)
        INTO user_list_1 FROM users u INNER JOIN user_role ur ON u.user_id = ur.user_id 
        WHERE ur.role_id=4 ORDER BY RANDOM() LIMIT 10;
    ELSE 
    	SELECT ARRAY_AGG(u.user_id)
        INTO user_list_3 FROM users u INNER JOIN user_role ur ON u.user_id = ur.user_id 
        WHERE ur.role_id=4 AND u.user_provinces_id = current_province_id;
     END IF;
       
    IF array_length(user_list_1, 1) IS NULL THEN  
         SELECT ARRAY_AGG(user_id)
         INTO user_list_1 FROM get_friend_follow(current_user_id);

         FOREACH value_friend IN ARRAY user_list_1
         LOOP
            SELECT ARRAY_AGG(user_id)
            INTO user_list_2 FROM get_friend_follow(value_friend);
         END LOOP;

        SELECT ARRAY_AGG(u.user_id) INTO user_list_3 FROM users u WHERE u.user_provinces_id = current_province_id;
    
        SELECT ARRAY_CAT((SELECT remove_elements_from_array(user_list_2,user_list_1)),( SELECT remove_elements_from_array(user_list_3,user_list_1))) INTO user_list_3;
    END IF;
    
    IF array_length(user_list_2,1) > 0 THEN
        user_list_3 := array_cat(
            remove_elements_from_array(user_list_2, user_list_1),
            remove_elements_from_array(user_list_3, user_list_1)
        );
    ELSE
        user_list_3 := array_cat(user_list_1, user_list_3);
    END IF;
   
   SELECT ARRAY_AGG(user_id)
        INTO user_list_3
    FROM (
        SELECT unnest(user_list_3) AS user_id
        EXCEPT
        SELECT unnest(user_list_4)
    ) subquery;

    RETURN QUERY
    SELECT
        u.user_id as id,
        u.avatar,
        u.fullname,
        (select JSONB_AGG(JSONB_BUILD_OBJECT('avatar', g.avatar)) from get_friend_follow(u.user_id) g where g.user_id = ANY(friends_list)) as mutual_friends
    FROM users u
    INNER JOIN user_role ur ON u.user_id = ur.user_id
    WHERE u.user_id = ANY(user_list_3)  AND u.user_id <> current_user_id AND ur.role_id = 4 AND (u.ban=false OR u.user_status=true) ;
END;
$$
LANGUAGE plpgsql;
--Tạo function tải dữ liệu comment post và dữ liệu trả lời comment------------------------------------------------------------------
--drop function get_comments
--create or replace  function get_comments(current_post_id INT, current_check INT )
--returns table (
--	comment_id INT,
--	post_id INT,
--	user_id_comment INT,
--    avatar_comment VARCHAR(1000),
--    fullname_comment VARCHAR(255),
--    date_comment TIMESTAMP,
--    content_comment text,
--    count_reply_comment INT
--)as 
--$$
--begin
--	 RETURN QUERY
--	 select 
--	 	c.comment_id::INT,
--	 	c.post_id,
--	 	u.user_id,
--	 	u.avatar,
--	 	u.fullname,
--	 	c.date_comment,
--	 	c.content ::TEXT,
--	 	(select count(c1.comment_id) from "comment" c1 where c1.parent_comment_id =c.comment_id)::INT as count_reply_comment 
--	 from users u inner join "comment" c
--	 on u.user_id = c.user_id where c.post_id =current_post_id  and c.comment_status =true 
--	 AND (
--        CASE 
--            WHEN current_check = 0 THEN c.parent_comment_id IS NULL
--            ELSE c.parent_comment_id=current_check
--        END
--    );
--	 
--end
--$$
--language plpgsql;
create or replace  function get_comments(current_post_id INT, current_check INT )
returns table (
	comment_id INT,
	post_id INT,
	user_id_comment INT,
    avatar_comment VARCHAR(1000),
    fullname_comment VARCHAR(255),
    date_comment TIMESTAMP,
    content_comment text,
    count_reply_comment INT,
    reply_comment JSONB
)as 
$$
begin
	 RETURN QUERY
	 select 
	 	c.comment_id::INT,
	 	c.post_id,
	 	u.user_id,
	 	u.avatar,
	 	u.fullname,
	 	c.date_comment,
	 	c.content ::TEXT,
	 	(select count(c1.comment_id) from "comment" c1 where c1.parent_comment_id =c.comment_id)::INT as count_reply_comment, 
	 	(select JSONB_AGG(JSONB_BUILD_OBJECT('comment_id', gc.comment_id, 'post_id', gc.post_id, 'user_id_comment', gc.user_id_comment, 'avatar_comment', gc.avatar_comment, 'fullname_comment', gc.fullname_comment, 'date_comment', gc.date_comment, 'content_comment', gc.content_comment, 'count_reply_comment', gc.count_reply_comment, 'reply_comment', gc.reply_comment)) from get_comments(c.post_id,c.comment_id) gc limit 1) as reply_comment
	 	from users u inner join "comment" c
	 on u.user_id = c.user_id where c.post_id =current_post_id  and c.comment_status =true 
	 AND (
        CASE 
            WHEN current_check = 0 THEN c.parent_comment_id IS NULL
            ELSE c.parent_comment_id=current_check
        END
    );
	 
end
$$
language plpgsql;


--Tạo function load bài post đã sahre với id chỉ định------------------------------------------------------------------------------------------------------
--drop function get_posts_share_id
CREATE OR REPLACE FUNCTION get_posts_share_id(current_post_id INT)
RETURNS TABLE (
    post_id INT,
    user_id INT,
    parent_post_id INT,
    content VARCHAR(500),
    date_post TIMESTAMP,
    hash_tag VARCHAR(50),
    send_status BOOLEAN,
    post_status BOOLEAN,
    product VARCHAR(100),
    ban BOOLEAN,
    countInterested INT,
    countComment INT,
    countShare INT,
    fullname VARCHAR(255),
    avatar VARCHAR(1000),
    post_images JSONB,
   	probinces_code VARCHAR(20),
   	districts_code VARCHAR(20),
   	wards_code VARCHAR(20)
) AS
$$
BEGIN

        RETURN QUERY
        SELECT
            p.post_id,
            p.user_id,
            p.parent_post_id,
            p.content,
            p.date_post,
            p.hash_tag,
            p.send_status,
            p.post_status,
            p.product,
            p.ban,
            (SELECT COUNT(i.interested_id) FROM interested i WHERE i.post_id = p.post_id)::INT AS countInterested,
            (SELECT COUNT(comment_id) FROM "comment" c WHERE c.post_id = p.post_id)::INT AS countComment,
            (SELECT COUNT(share_id) FROM "share" s WHERE s.post_id = p.post_id)::INT AS countShare,
            u.fullname,
            u.avatar,
			(select JSONB_AGG(JSONB_BUILD_OBJECT('link_images', pi2.link_image)) from post_images pi2 where pi2.post_id =p.post_id) as post_images,
            p.provinces_code,
            p.districts_code,
            p.wards_code
--            u.user_provinces_id
        FROM post p
        INNER JOIN users u ON p.user_id = u.user_id
        WHERE p.post_status = TRUE AND p.post_id  = current_post_id AND u.ban=false and p.ban =FALSE;
END;
$$
LANGUAGE plpgsql;
--tạo function trả về danh sách bạn bè chat----------------------------------------------------------------------
--DROP FUNCTION get_friend
CREATE OR REPLACE FUNCTION get_friend(current_user_id INT)
RETURNS TABLE (
  	"type" VARCHAR(50),
    user_id INT,
    sender_id_messages INT,
    username VARCHAR(50),
    fullname VARCHAR(100),
    avatar VARCHAR(1000),
    messageUnRead INT,
    lastMessage VARCHAR(500),
    online VARCHAR(100),
    time_message VARCHAR(255),
    changeIsFriend BOOLEAN,
    typeMessages VARCHAR(50),
    recall BOOLEAN,
    countImage INT,
    status BOOLEAN
) AS
$$
DECLARE
    current_user_name VARCHAR; 
    user_list1 VARCHAR[];
  	user_list2 VARCHAR[];
    friends_list INT[];
BEGIN
    SELECT u.username INTO current_user_name FROM users u WHERE u.user_id = current_user_id; 
    
    SELECT ARRAY_AGG(
        substring(c.name_chats  from  current_user_name||'(.+)')::VARCHAR
    ) INTO user_list1
    FROM chats c
    WHERE c.name_chats LIKE '%' || current_user_name || '%';
   
    SELECT ARRAY_AGG(
        substring(c.name_chats  from '(.+)'||current_user_name)::VARCHAR
    ) INTO user_list2
    FROM chats c
    WHERE c.name_chats LIKE '%' || current_user_name || '%';
   
    SELECT array_cat(user_list1, user_list2) INTO user_list1;
   
    SELECT ARRAY_AGG(u.user_id) INTO friends_list
    FROM users u
    WHERE u.username LIKE ANY(user_list1);
   
    IF array_length(friends_list, 1) > 0 THEN
        RETURN QUERY
        SELECT
            CASE
                WHEN u.online_last_date IS NULL THEN 'JOIN'::VARCHAR
                ELSE 'LEAVE'::VARCHAR
            END AS "type",
            u.user_id,
            CASE
                WHEN  (SELECT lm.user_id FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm)  IS NULL THEN NULL::INT
                ELSE (SELECT lm.user_id FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm) ::INT
            END AS sender_id_messages,
            u.username,
            u.fullname,
            u.avatar,
            (SELECT COUNT(messages.id) FROM messages WHERE send_status = false AND sender_id = u.user_id AND chat_id =(SELECT get_room_chat(current_user_id, u.user_id)) )::INT AS messageUnRead ,
           CASE
                WHEN (SELECT content FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id)) IS NULL THEN ''::VARCHAR
                ELSE (SELECT content FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id))::VARCHAR
            END AS lastMessage,
            u.online_last_date::VARCHAR AS online,
             CASE
                WHEN (SELECT send_time FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id)) IS NULL then null::VARCHAR
                ELSE (SELECT send_time FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id))::VARCHAR
            END AS time_message,
            CASE
                WHEN (SELECT isfriend FROM get_name_chat(current_user_name, u.username)) IS NULL THEN TRUE::BOOLEAN 
                ELSE (SELECT isfriend FROM get_name_chat(current_user_name, u.username))::BOOLEAN
            END AS changeIsFriend,
            CASE
                WHEN  (SELECT lm."type" FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm)  IS NULL THEN ''::VARCHAR
                ELSE (SELECT lm."type" FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm) ::VARCHAR
            END AS typeMessages,
             CASE
                WHEN (SELECT lm.recall FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm) IS NULL THEN FALSE::BOOLEAN
                ELSE (SELECT lm.recall FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm)::BOOLEAN
            END AS recall,
            (SELECT lm.countImage FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm)::INT as countImage,
            CASE
                WHEN (SELECT lm.status FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm) IS NULL THEN FALSE::BOOLEAN
                ELSE (SELECT lm.status FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id) lm)::BOOLEAN
            END AS status
        FROM users u WHERE u.user_id = ANY(friends_list)
        ORDER BY  CASE
                WHEN (SELECT send_time FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id)) IS NULL THEN (SELECT day_create FROM get_name_chat(current_user_name, u.username))::TIMESTAMP
                ELSE (SELECT send_time FROM get_lastMessage((SELECT name_chats FROM get_name_chat(current_user_name, u.username)), current_user_id))::TIMESTAMP
            END  DESC;
    END IF;
END;
$$
LANGUAGE plpgsql;
--select *from get_friend(16)
--Tạo function tìm phòng chat------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_room_chat(current_user_id1 INT, current_user_id2 INT)
RETURNS INT
AS
$$
DECLARE
    room_chat_id1 INT[];
    room_chat_id2 INT[];
    common_chat_id INT;
BEGIN
    SELECT ARRAY_AGG(cp.chat_id) INTO room_chat_id1 FROM chat_participants cp 
    WHERE cp.user_id = current_user_id1;

    SELECT ARRAY_AGG(cp.chat_id) INTO room_chat_id2 FROM chat_participants cp 
    WHERE cp.user_id = current_user_id2;

    SELECT INTO common_chat_id
      (
        SELECT unnest(room_chat_id1)::INT
        INTERSECT
        SELECT unnest(room_chat_id2)::INT
      );

    RETURN common_chat_id;
END;
$$
LANGUAGE plpgsql;
--tạo function tìm phòng chat----------------------------------------------------------------------
--DROP FUNCTION get_name_chat
CREATE OR REPLACE FUNCTION get_name_chat(username1 TEXT, username2 TEXT)
RETURNS TABLE (
    id INT,
    name_chats VARCHAR(255),
    day_create TIMESTAMP,
    isfriend BOOLEAN
) AS
$$
BEGIN
    RETURN QUERY
    SELECT *
    FROM chats c
    WHERE c.name_chats LIKE concat(username1, '', username2) OR c.name_chats = concat(username2, '', username1);
END;
$$
LANGUAGE plpgsql;
--tạo function tìm tin nhắn cuối cùng----------------------------------------------------------------------
--DROP FUNCTION get_lastMessage
CREATE OR REPLACE FUNCTION get_lastMessage(name_chat text,current_user_id INT)
RETURNS TABLE (
    id INT,
    content TEXT,
    send_time VARCHAR(255),
    user_id INT,
    avatar  VARCHAR(1000),
    "type" VARCHAR(50),
     recall BOOLEAN,
     countImage INT,
     status BOOLEAN
) AS
$$
BEGIN
	
		RETURN QUERY
	    SELECT 
	    	messages.id, 
	    	messages.content::TEXT,
            messages.send_Time::VARCHAR,
            users.user_id,
            users.avatar,
            messages."type",
            messages.recall,
            (select count(mi.message_image_id) from messages_images mi where mi.messages_id  =messages.id)::INT as countImage,
            messages.send_status 
			FROM messages INNER JOIN users ON messages.sender_id = users.user_id
			INNER JOIN chats ON messages.chat_id = chats.id
			WHERE chats.name_chats like name_chat ORDER BY messages.id desc LIMIT 1;
	
END;
$$
LANGUAGE plpgsql;
--Tạo function tải dữ liệu tin nhắn--------------------------------------------------------------------------------------------------------------
--DROP FUNCTION get_messages
CREATE OR REPLACE FUNCTION get_messages(current_from_user_id INT, current_to_user_id INT)
RETURNS TABLE (
   id INT,
   "content" TEXT,
   send_time VARCHAR(500),
   user_id INT,
   avatar VARCHAR(1000),
   chat_participants_status BOOLEAN,
   "day" VARCHAR(500),
   "type" VARCHAR(50),
   recall BOOLEAN,
   status BOOLEAN
) AS
$$
DECLARE
    current_chat_id INT;
BEGIN
    current_chat_id := (SELECT get_room_chat(current_from_user_id, current_to_user_id));
    
    UPDATE messages SET send_status = TRUE
    WHERE send_status = FALSE AND sender_id = current_to_user_id AND chat_id = current_chat_id;

    RETURN QUERY
        WITH MessagesWithRowNum AS (
            SELECT 
                m.*,
                u.user_id AS message_user_id,
                u.avatar AS message_avatar,
                cp.chat_participants_status AS message_chat_participants_status,
                ROW_NUMBER() OVER (ORDER BY m.id) AS row_num
            FROM 
                messages m
            INNER JOIN users u ON m.sender_id = u.user_id
            INNER JOIN chats c ON m.chat_id = c.id
            INNER JOIN chat_participants cp ON c.id = cp.chat_id
            WHERE
                c.id = current_chat_id
                AND u.user_id = cp.user_id
        ),
        LastTrueStatus AS (
            SELECT 
                MAX(row_num) AS last_true_row_num
            FROM 
                MessagesWithRowNum
            WHERE 
                send_status = true 
                 and MessagesWithRowNum.sender_id =current_from_user_id
        ),
        RankedMessages AS (
            SELECT
                m.id AS message_id,
                m."content" AS message_content,
                m.send_time AS message_send_time,
                m.message_user_id,
                m.message_avatar,
                m.message_chat_participants_status,
                LAG(m.send_time) OVER (PARTITION BY 
                    EXTRACT(DAY FROM m.send_time),
                    EXTRACT(MINUTE FROM m.send_time)::int /60  
                    ORDER BY m.id) AS previous_send_time,
                m.type AS message_type,
                m.recall AS message_recall,
                m.send_status as message_send_status,
                CASE
                    WHEN m.send_status = FALSE THEN FALSE
                    WHEN m.row_num = lts.last_true_row_num THEN TRUE
                    WHEN m.send_status = TRUE AND m.row_num < lts.last_true_row_num THEN NULL
                END AS computed_status
            FROM 
                MessagesWithRowNum m
            CROSS JOIN 
                LastTrueStatus lts
        )
        SELECT
            message_id,
            message_content,
            message_send_time::VARCHAR,
            message_user_id,
            message_avatar,
            message_chat_participants_status,
            CASE
                WHEN previous_send_time IS NULL OR message_send_time - previous_send_time >= '1 hour' THEN message_send_time::VARCHAR
                ELSE NULL
            END AS "day",
            message_type,
            message_recall,
            computed_status AS status
        FROM
            RankedMessages
        ORDER BY
            message_id;
END;
$$
LANGUAGE plpgsql;
--Tạo function tải dữ liệu trang profile -------------------------------------------------------------------
--drop function get_profile
USER 
--Tạo function insert và return dữ liệu bảng messages ------------------------------------------------------
--drop function insert_message_and_return
CREATE OR REPLACE FUNCTION insert_message_and_return(
    p_content TEXT,
    p_send_time TIMESTAMP,
    p_sender_id INT,
    p_type VARCHAR(50),
    p_to_user INT
)
RETURNS TABLE (
   id INT,
   "content" TEXT,
   send_time VARCHAR(500),
   user_id INT,
   avatar VARCHAR(1000),
   chat_participants_status BOOLEAN,
   "day" VARCHAR(500),
   "type" VARCHAR(50),
   recall BOOLEAN,
   status BOOLEAN
)
AS $$
DECLARE
    inserted_message messages;
    current_chat_id INT;
BEGIN
     current_chat_id := (SELECT get_room_chat(p_sender_id, p_to_user));
	-- Chèn dữ liệu vào bảng messages và trả về thông tin về bản ghi vừa chèn
    INSERT INTO messages (content, send_time, sender_id, chat_id, send_status, type, recall)
    VALUES (p_content, p_send_time, p_sender_id, current_chat_id, false, p_type, false)
    RETURNING * INTO inserted_message; -- Trả về dữ liệu đã chèn và lưu vào biến

    -- Trả về dữ liệu đã chèn
    RETURN QUERY 
    SELECT  
        g.id,
        g.content,
        g.send_time,
        g.user_id,
        g.avatar,
        g.chat_participants_status,
        g.day,
        g.type,
        g.recall,
        g.status
    FROM get_messages(p_sender_id, p_to_user) g 
    WHERE g.id = inserted_message.id;
END;
$$ LANGUAGE plpgsql;
   
   