from api.db_utils import *

# Database-Client Interactions

def get_weapon_id(name):
    exec_get_one("SELECT id FROM weapons WHERE name=%(name)s;", {'name': name})

def get_victim_id(name):
    exec_get_one("SELECT id FROM victims WHERE name=%(name)s;", {'name': name})

def get_location_id(name):
    exec_get_one("SELECT id FROM locations WHERE name=%(name)s;", {'name': name})


def createNewCase(name, player_id, session, color, weapon, location, victim):
    case_id = session + str(player_id)

    exec_commit('INSERT INTO cases (id, player_name, session, color, weapon_id, victim_id, location_id) VALUES (%(cid)s, %(name)s, %(session)s, %(color)s, %(wid)s, %(lid)s, %(vid)s);', 
                {'cid': case_id, 'name': name, 'session': session, 'color': color, 'wid': get_weapon_id(weapon), 'lid': get_location_id(location), 'vid': get_victim_id(victim)})