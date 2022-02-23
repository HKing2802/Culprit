from api.db_utils import *
import random

# Database-Client Interactions

def get_weapon_id(name):
    return exec_get_one("SELECT id FROM weapons WHERE name=%(name)s;", {'name': name})

def get_victim_id(name):
    return exec_get_one("SELECT id FROM victims WHERE name=%(name)s;", {'name': name})

def get_location_id(name):
    return exec_get_one("SELECT id FROM locations WHERE name=%(name)s;", {'name': name})


def createNewCase(name, player_id, session, color, weapon, location, victim, tokens):
    case_id = session + str(player_id)
    exec_commit('INSERT INTO cases (id, player_name, session, color, weapon_id, victim_id, location_id, anon_tokens) VALUES (%(cid)s, %(name)s, %(session)s, %(color)s, %(wid)s, %(vid)s, %(lid)s, %(tokens)s);', 
                {'cid': case_id, 'name': name, 'session': session, 'color': color, 'wid': get_weapon_id(weapon), 'lid': get_location_id(location), 'vid': get_victim_id(victim), 'tokens': tokens})

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

def getPlayerNameFromId(session, id):
    case_id = session + str(id)
    return exec_get_one("SELECT player_name FROM cases WHERE id=%(cid)s;", {'cid': case_id})

def getPlayerTokenCount(session, id):
    case_id = session + str(id)
    return exec_get_one("SELECT anon_tokens FROM cases where id=%(cid)s;", {'cid': case_id})

def removePlayerToken(session, id):
    case_id = session + str(id)
    current_tokens = getPlayerTokenCount(session, id)[0]
    return exec_commit("UPDATE cases SET anon_tokens = %(tokens)s, poll_imm = true WHERE id=%(cid)s;", {'tokens': current_tokens - 1, 'cid': case_id });

def getPollData(session, id, type, tag):
    exc_case_id = session + str(id);
    
    print("looking for " + type + " | " + tag)

    data = None
    if (type == "weapon"):
        data = exec_get_all("SELECT cases.id FROM cases INNER JOIN weapons ON cases.weapon_id=weapons.id WHERE cases.id!=%(cid)s AND cases.session=%(ses)s AND cases.poll_imm=false AND (weapons.tag1=%(tag)s OR weapons.tag2=%(tag)s);",
                            {'cid': exc_case_id, 'tag': tag, 'ses': session});
    elif (type == "location"):
        data = exec_get_all("SELECT cases.id FROM cases INNER JOIN locations ON cases.location_id=locations.id WHERE cases.id!=%(cid)s AND cases.session=%(ses)s AND cases.poll_imm=false AND (locations.tag1=%(tag)s OR locations.tag2=%(tag)s);",
                            {'cid': exc_case_id, 'tag': tag, 'ses': session});
    else:
        data = exec_get_all("SELECT cases.id FROM cases INNER JOIN victims ON cases.victim_id=victims.id WHERE cases.id!=%(cid)s AND cases.session=%(ses)s AND cases.poll_imm=false AND (victims.tag1=%(tag)s OR victims.tag2=%(tag)s);",
                            {'cid': exc_case_id, 'tag': tag, 'ses': session});

    # clear poll immunities
    exec_commit("UPDATE cases SET poll_imm = false WHERE session=%(ses)s;", {'ses': session});
    print(data)
    return len(data)

def setPollExcludes(session, selected):
    for s in selected:
        case_id = session + str(s);
        exec_commit("UPDATE cases SET poll_imm = true WHERE id=%(cid)s;", {'cid': case_id});