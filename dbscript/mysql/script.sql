create database DigitalLibrary;

use DigitalLibrary;

CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name varchar(100), emailid nvarchar(100), password nvarchar(255) NOT NULL, PRIMARY KEY (ID));

CREATE TABLE Categories (ID INT PRIMARY KEY, Name nvarchar(50), ImagePath nvarchar(255));

CREATE TABLE Products (ID int PRIMARY KEY, Name nvarchar(50), Description nvarchar(1000), categoryid INT, ImagePath nvarchar(255), UnitPrice decimal(10,2));

CREATE TABLE IF NOT EXISTS sessions (
  session_id varchar(128) COLLATE latin1_german2_ci NOT NULL,
 expires int(11) unsigned NOT NULL,
  data text COLLATE latin1_german2_ci,
  PRIMARY KEY (session_id)
) ENGINE=InnoDB;

CREATE TABLE orders (   ID int(11) NOT NULL AUTO_INCREMENT,    userid int(11) DEFAULT NULL,   orderdate datetime DEFAULT NULL,   address varchar(255) DEFAULT NULL,   name varchar(255) DEFAULT NULL,   PRIMARY KEY (ID));
CREATE TABLE order_details ( ID int(11) NOT NULL AUTO_INCREMENT, orderid int(11) DEFAULT NULL, productid int(11) DEFAULT NULL, unitprice decimal(10,2) DEFAULT NULL, qty int(11) DEFAULT NULL, PRIMARY KEY (ID));

insert into Categories VALUES(1, 'Action and Adventure', '1.jpg');
insert into Categories VALUES(2, 'Drama', '2.jpg');
insert into Categories VALUES(3, 'Horror', '3.jpg');
insert into Categories VALUES(4, 'Mystery', '4.jpg');
insert into Categories VALUES(5, 'Romance', '5.jpg');

insert into Products VALUES(1, 'Jurassic Park', 'A billionaire has created a technique to clone dinosaurs. From the DNA that his crack team of scientists extract, he is able to grow the dinosaurs in his laboratories and lock them away on an island behind electric fences, creating a sort of theme park. He asks a group of scientists from several different fields to come and view the park, but something goes terribly wrong', 1 , 'p1.jpg', 100);
insert into Products VALUES(2, 'The Hobbit', 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.', 1 , 'p2.jpg', 120);
insert into Products VALUES(3, 'The Adventures of Sherlock Holmes', 'Complete in nine handsome volumes, each with an introduction by a Doyle scholar, a chronology, a selected bibliography, and explanatory notes, the Oxford Sherlock Holmes series offers a definitive collection of the famous detective''s adventures. No home library is complete without it.', 1 , 'p3.jpg', 76);

insert into Products VALUES(4, 'The Hunger Games', 'The nation of Panem, formed from a post-apocalyptic North America, is a country that consists of a wealthy Capitol region surrounded by 12 poorer districts. Early in its history, a rebellion led by a 13th district against the Capitol resulted in its destruction and the creation of an annual televised event known as the Hunger Games.', 2 , 'p4.jpg', 90);
insert into Products VALUES(5, 'Catching Fire', 'Against all odds, Katniss has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive. Katniss should be relieved, happy even. After all, she has returned to her family and her longtime friend, Gale. Yet nothing is the way Katniss wishes it to be. ', 2 , 'p5.jpg', 87);
insert into Products VALUES(6, 'City of Bones', 'When fifteen-year-old Clary Fray heads out to the Pandemonium Club in New York City, she hardly expects to witness a murder― much less a murder committed by three teenagers covered with strange tattoos and brandishing bizarre weapons. Then the body disappears into thin air. It''s hard to call the police when the murderers are invisible to everyone else and when there is nothing―not even a smear of blood―to show that a boy has died. Or was he a boy?', 2 , 'p6.jpg', 120);

insert into Products VALUES(7, 'Final Girls', 'Ten years ago, college student Quincy Carpenter went on vacation with five friends and came back alone, the only survivor of a horror movie–scale massacre. In an instant, she became a member of a club no one wants to belong to—a group of similar survivors known in the press as the Final Girls. Lisa, who lost nine sorority sisters to a college dropout''s knife; Sam, who went up against the Sack Man during her shift at the Nightlight Inn; and now Quincy, who ran bleeding through the woods to escape Pine Cottage and the man she refers to only as Him. The three girls are all attempting to put their nightmares behind them, and, with that, one another. Despite the media''s attempts, they never meet.', 3 , 'p7.jpg', 175);
insert into Products VALUES(8, 'Meddling Kids', '1990. The teen detectives once known as the Blyton Summer Detective Club (of Blyton Hills, a small mining town in the Zoinx River Valley in Oregon) are all grown up and haven''t seen each other since their fateful, final case in 1977. Andy, the tomboy, is twenty-five and on the run, wanted in at least two states. Kerri, one-time kid genius and budding biologist, is bartending in New York, working on a serious drinking problem.', 3 , 'p8.jpg', 195);
insert into Products VALUES(9, 'Hollow City', 'Miss Peregrine’s Home for Peculiar Children was the surprise best seller of 2011—an unprecedented mix of YA fantasy and vintage photography that enthralled readers and critics alike. Publishers Weekly called it “an enjoyable, eccentric read, distinguished by well-developed characters, a believable Welsh setting, and some very creepy monsters.”', 3 , 'p9.jpg', 210);

insert into Products VALUES(10, 'Little Monsters', 'Kacey is the new girl in Broken Falls. When she moved in with her father, she stepped into a brand-new life. A life with a stepbrother, a stepmother, and strangest of all, an adoring younger half sister. Kacey’s new life is eerily charming compared with the wild highs and lows of the old one she lived with her volatile mother. And everyone is so nice in Broken Falls—she’s even been welcomed into a tight new circle of friends. Bailey and Jade invite her to do everything with them.', 4 , 'p10.jpg', 75);
insert into Products VALUES(11, 'The Wildling Sisters', 'When fifteen-year-old Margot and her three sisters arrive at Applecote Manor in June 1959, they expect a quiet English country summer. Instead, they find their aunt and uncle still reeling from the disappearance of their daughter, Audrey, five years before. As the sisters become divided by new tensions when two handsome neighbors drop by, Margot finds herself drawn into the life Audrey left behind. When the summer takes a deadly turn, the girls must unite behind an unthinkable choice or find themselves torn apart forever.', 4 , 'p11.jpg', 60);
insert into Products VALUES(12, 'Daughter of the Burning City', 'Sixteen-year-old Sorina has spent most of her life within the smoldering borders of the Gomorrah Festival. Yet even among the many unusual members of the traveling circus-city, Sorina stands apart as the only illusion-worker born in hundreds of years. This rare talent allows her to create illusions that others can see, feel and touch, with personalities all their own. Her creations are her family, and together they make up the cast of the Festival’s Freak Show.', 4 , 'p12.jpg', 70);

insert into Products VALUES(13, 'What to Say Next', 'From the New York Times bestselling author of Tell Me Three Things comes a charming and poignant story about two struggling teenagers who find an unexpected connection just when they need it most. For fans of Sophie Kinsella, Jennifer Niven, and Rainbow Rowell. Sometimes a new perspective is all that is needed to make sense of the world.', 5 , 'p13.jpg', 100);
insert into Products VALUES(14, 'Wired', 'A beautiful computer hacker and a bad-boy FBI agent must collaborate—in more ways than one—in the sizzling new novel from #1 New York Times bestselling author Julie Garwood. Allison Trent doesn’t look like a hacker. In fact, when she’s not in college working on her degree, she models on the side. But behind her gorgeous face is a brilliant mind for computers and her real love is writing—and hacking—code. Her dream is to write a new security program that could revolutionize the tech industry.', 5 , 'p14.jpg', 215);
insert into Products VALUES(15, 'The Diplomat''s Daughter', 'During the turbulent months following the 1941 bombing of Pearl Harbor, twenty-one-year-old Emi Kato, the daughter of a Japanese diplomat, is locked behind barbed wire in a Texas internment camp. She feels hopeless until she meets handsome young Christian Lange, whose German-born parents were wrongfully arrested for un-American activities. Together, they live as prisoners with thousands of other German and Japanese families, but discover that love can bloom in even the bleakest circumstances.', 5 , 'p15.jpg', 200);



create view vw_categories
as
select c.id, c.name, c.imagepath, count(p.id) as productcount
from categories c , products p
where c.id = p.categoryid
group by c.id, c.name, c.imagepath


alter view vw_products
as
select p.id, p.name, p.description, p.imagepath, c.id categoryid, c.Name categoryname, p.unitprice
from categories c , products p
where c.id = p.categoryid

select * from vw_products