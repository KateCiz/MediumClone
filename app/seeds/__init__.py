from flask.cli import AppGroup
from .all_new_seeds import seed_users, undo_users, seed_stories, undo_stories, seed_comments, undo_comments, seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_stories()
    seed_comments()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_stories()
    undo_comments()
    undo_likes()
    # Add other undo functions here
