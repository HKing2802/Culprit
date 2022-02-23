
INSERT INTO weapons (id, name, tag1, tag2) VALUES
	(1, 'pistol', 'one-handed', 'ranged'),
	(2, 'sword', 'one-handed', 'sharp'),
	(3, 'hammer', 'one-handed', 'blunt'),
	(4, 'rifle', 'two-handed', 'ranged'),
	(5, 'battle axe', 'two-handed', 'sharp'),
	(6, 'bat', 'two-handed', 'blunt'),
	(7, 'dart', 'quick', 'ranged'),
	(8, 'dagger', 'quick', 'sharp'),
	(9, 'rock', 'quick', 'blunt');

INSERT INTO locations (id, name, tag1, tag2) VALUES
	(1, 'shed', 'exterior', 'core'),
	(2, 'pool', 'exterior', 'leisure'),
	(3, 'shooting range', 'exterior', 'occupational'),
	(4, 'kitchen', 'interior', 'core'),
	(5, 'library', 'interior', 'leisure'),
	(6, 'office', 'interior', 'occupational'),
	(7, 'storage room', 'underground', 'core'),
	(8, 'theater', 'underground', 'leisure'),
	(9, 'workshop', 'underground', 'occupational');

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