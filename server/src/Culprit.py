from api.db_utils import *
import random

# Database-Client Interactions

def get_weapon_id(name):
    return exec_get_one("SELECT id FROM weapons WHERE name=%(name)s;", {'name': name})

def get_victim_id(name):
    return exec_get_one("SELECT id FROM victims WHERE name=%(name)s;", {'name': name})

def get_location_id(name):
    return exec_get_one("SELECT id FROM locations WHERE name=%(name)s;", {'name': name})


def createNewCase(name, player_id, session, color, weapon, location, victim):
    case_id = session + str(player_id)
    exec_commit('INSERT INTO cases (id, player_name, session, color, weapon_id, victim_id, location_id) VALUES (%(cid)s, %(name)s, %(session)s, %(color)s, %(wid)s, %(vid)s, %(lid)s);', 
                {'cid': case_id, 'name': name, 'session': session, 'color': color, 'wid': get_weapon_id(weapon), 'lid': get_location_id(location), 'vid': get_victim_id(victim)})

def generateRandCharacter():
    case = random.randint(0, 1)
    char_int = random.randint(0, 25)
    charmod = 0
    if (case == 0):
        charmod = 65
    else:
        charmod = 97
    
    return chr(char_int + charmod)

def generateSessionKey(size=5):
    key = ''

    while(len(key) < size):
        choice = random.randint(0, 61)
        if (choice < 10):
            key = key + str(choice)
        else:
            key = key + generateRandCharacter()

    exec_commit('INSERT INTO sessions (id) VALUES (%(key)s);', {'key': key});

    return key