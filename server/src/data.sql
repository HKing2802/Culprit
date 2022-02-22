
INSERT INTO weapons (id, name, tag1, tag2) VALUES
	(1, 'pistol', 'One-Handed', 'Ranged'),
	(2, 'sword', 'One-Handed', 'Sharp'),
	(3, 'hammer', 'One-Handed', 'Blunt'),
	(4, 'rifle', 'Two-Handed', 'Ranged'),
	(5, 'battle axe', 'Two-Handed', 'Sharp'),
	(6, 'bat', 'Two-Handed', 'Blunt'),
	(7, 'dart', 'Quick', 'Ranged'),
	(8, 'dagger', 'Quick', 'Sharp'),
	(9, 'rock', 'Quick', 'Blunt');

INSERT INTO locations (id, name, tag1, tag2) VALUES
	(1, 'shed', 'Exterior', 'Core'),
	(2, 'pool', 'Exterior', 'Leisure'),
	(3, 'shooting range', 'Exterior', 'Occupational'),
	(4, 'kitchen', 'Interior', 'Core'),
	(5, 'library', 'Interior', 'Leisure'),
	(6, 'office', 'Interior', 'Occupational'),
	(7, 'storage Room', 'Underground', 'Core'),
	(8, 'theater', 'Underground', 'Leisure'),
	(9, 'workshop', 'Underground', 'Occupational');

INSERT INTO victims (id, name, tag1, tag2) VALUES
	(1, 'Nora Perez', 'Retired', 'Lower-Class'),
	(2, 'Emmett Parker', 'Retired', 'Middle-Class'),
	(3, 'Arturo Elliot', 'Retired', 'Upper-Class'),
	(4, 'Scott Walters', 'Student', 'Lower-Class'),
	(5, 'Estelle Woods', 'Student', 'Middle-Class'),
	(6, 'Warren Fisher', 'Student', 'Upper-Class'),
	(7, 'Earl Daniels', 'Working', 'Lower-Class'),
	(8, 'Stephanie McBride', 'Working', 'Middle-Class'),
	(9, 'Gregg Washington', 'Working', 'Upper-Class');