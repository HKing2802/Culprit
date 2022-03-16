
INSERT INTO weapons (id, name, tag1, tag2) VALUES
	(1, 'Pistol', 'one-handed', 'ranged'),
	(2, 'Sword', 'one-handed', 'sharp'),
	(3, 'Hammer', 'one-handed', 'blunt'),
	(4, 'Rifle', 'two-handed', 'ranged'),
	(5, 'Battle Axe', 'two-handed', 'sharp'),
	(6, 'Bat', 'two-handed', 'blunt'),
	(7, 'Dart', 'quick', 'ranged'),
	(8, 'Dagger', 'quick', 'sharp'),
	(9, 'Rock', 'quick', 'blunt');

INSERT INTO locations (id, name, tag1, tag2) VALUES
	(1, 'Shed', 'exterior', 'core'),
	(2, 'Pool', 'exterior', 'leisure'),
	(3, 'Shooting Range', 'exterior', 'occupational'),
	(4, 'Kitchen', 'interior', 'core'),
	(5, 'Library', 'interior', 'leisure'),
	(6, 'Office', 'interior', 'occupational'),
	(7, 'Storage Room', 'underground', 'core'),
	(8, 'Theater', 'underground', 'leisure'),
	(9, 'Workshop', 'underground', 'occupational');

INSERT INTO victims (id, name, tag1, tag2) VALUES
	(1, 'Nora Perez', 'retired', 'lower-class'),
	(2, 'Emmett Parker', 'retired', 'middle-class'),
	(3, 'Arturo Elliot', 'retired', 'upper-class'),
	(4, 'Scott Walters', 'student', 'lower-class'),
	(5, 'Estelle Woods', 'student', 'middle-class'),
	(6, 'Warren Fisher', 'student', 'upper-class'),
	(7, 'Earl Daniels', 'working', 'lower-class'),
	(8, 'Stephanie McBride', 'working', 'middle-class'),
	(9, 'Gregg Washington', 'working', 'upper-class');