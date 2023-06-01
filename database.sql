
CREATE DATABASE `btl_nodeJS_t` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
use `btl_nodeJS_t`;


create table account (
  id int primary key auto_increment,
  name varchar(100) not null,
  email varchar(100) not null unique,
  password varchar(100) not null,
  role varchar(100) not null default 'customer',
  created_at date default current_timestamp(),
  last_login_at datetime default current_timestamp()
);

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT primary key AUTO_INCREMENT,
  `name` VARCHAR(100) not null unique,
  status tinyint default '1',
) ENGINE = InnoDB;


create table product(
  id INT primary key AUTO_INCREMENT,
  name varchar(120) not null,
  price float not null,
  sale_price float null default '0',
  image varchar(200) not null,
  category_id int not null,
  foreign key (category_id) references category (id),
  status tinyint default '1',
  descirption text null,
  created_at date default current_timestamp()
  );

create table favourite(
  id int primary key auto_increment,
  account_id int not null,
  foreign key (account_id) references account(id),
  product_id int not null,
  foreign key (product_id) references product(id),
  created_at date default current_timestamp()
);

insert INTO category(name, status) values
('son',1),
('phấn phủ',1),
('serum',1),
('sửa mặt',1);

insert into product(name,price,sale_price,image,category_id, status,descirption,created_at) values
('son dior',100000,90000,'https://lipstick.vn/wp-content/uploads/2021/01/dior-matte-846.png',1,1,null,default),
('son hermes',130000,0,'https://file.hstatic.net/1000025647/file/hermes-33_85c0d3a7f13a4d85ad04f5f966a51c45_1024x1024.jpg',1,0,null,default),
('phấn phủ dior',100000,90000,'https://file.hstatic.net/1000025647/file/020-min_5830ccc05c6d4c739c4bd1c2cf99a3af_1024x1024.png',2,1,null,default),
('phấn phủ 3ce',100000,90000,'https://img.websosanh.vn/v2/users/review/images/0egec1izld09v.jpg?compress=85',2,0,null,default),
('serum garnier',100000,90000,'https://mint07.com/wp-content/uploads/2021/07/serum-garnier-light-complete-0.jpeg',3,1,null,default),
('serum ordinary ',100000,90000,'https://lzd-img-global.slatic.net/g/p/75289ccfdb45fa9feac9180d02f7f10c.jpg_360x360q75.jpg_.webp',3,0,null,default),
('sữa rửa mặt cetaphul',100000,90000,'https://www.cetaphil.com.vn/sites/default/files/styles/skin_health_images/public/cach-su-dung-sua-rua-mat-cetaphil.jpg',4,1,null,default);
('sữa rửa mặt cetaphul123',100000,90000,'https://www.cetaphil.com.vn/sites/default/files/styles/skin_health_images/public/cach-su-dung-sua-rua-mat-cetaphil.jpg',4,1,null,default);
