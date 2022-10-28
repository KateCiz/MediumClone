from app.models import db, User, Story, Comment, follows, Like

def seed_users():
    demo = User(
        first_name='Demo', 
        last_name='User',
        email='demo@aa.io', 
        password='password')
    marnie = User(
        first_name='marnie',
        last_name='user',
        email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie',
        last_name='user',
        email='bobbie@aa.io', 
        password='password')
    user4 = User(
        first_name="Mr.",
        last_name="Woodhouse",
        email="homebody@user.io",
        bio="My daughter said I need to get out more, does this count?",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666645207/MediumClone/man-gc3d5b7270_1920_okpvbs.jpg",
        password='password'
    )
    user5 = User(
        first_name="Robert",
        last_name="Martin",
        email="farmerdude@user.io",
        bio="I like simple and easy. Currently courting Miss Smith!",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666645156/MediumClone/nature-g65720c0e3_1920_ex62ji.jpg",
        password='password'
    )
    user6 = User(
        first_name="Emma",
        last_name="Woodhouse",
        email="woodhouse@user.io",
        bio="Hi, I'm Emma! I love spending time with friends and playfully antogonzing my neighbor.",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666645065/MediumClone/woman-ge2b1a91df_1920_cbkqcg.jpg",
        password='password'
    )
    user7 = User(
        first_name="George",
        last_name="Knightley",
        email="knight@user.io",
        password='password'
    )
    
    user7.follows.append(user6)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()









def seed_stories():
    story1 = Story(
        user_id=4, 
        title="Chocolate is Amazing", 
        content="Chocolate is the BEST FOOD EVER! It is not only delicious, but also can be molded into beautiful structures and figurines!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666644872/MediumClone/cake-g3c7fc6395_1920_q5jick.jpg")
    story2 = Story(
        user_id=5, 
        title="What is the easist way to decorate your home?", 
        content="There's picture frames, house plants, detailed murals and tile designs. However, those can take time or potentially leave your home looking worse if not done right. Try using peal and stick stickers instead! Super easy and not hassle!"
        )
    story3 = Story(
        user_id=6, 
        title="Christmas, The Best Time Of The Year", 
        content='In the air is a special hint of wonder. Sweets, presents, and spending time with family are the staples of the season, but even without those it is a mighty good time. Are you sugar, gluten, and/or dairy free? Enjoy a fun time Christmas tree shopping! No money for presents? Go around to see the Christmas lights in your area. No family, or none that you want to talk to, there are tons of holiday movies ready to keep you company! Happy Holidays!',
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666644937/MediumClone/cookies-g9f9e3931c_1920_esi3g0.jpg")
    story4 = Story(
        user_id=4, 
        title="Cheese is Incredible", 
        content="The word cheese covers such a variety of the food kingdom. From blue cheese to cheddar to mozerella, you have different flavors, textures, and colors. Wow, cheese really is incredible!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1666644977/MediumClone/cheeses-g1ad55950c_1920_inza9d.jpg")
    
    db.session.add(story1)
    db.session.add(story2)
    db.session.add(story3)
    db.session.add(story4)
    db.session.commit()

def undo_stories():
    db.session.execute('TRUNCATE stories RESTART IDENTITY CASCADE;')
    db.session.commit()






def seed_comments():
    comment1 = Comment(
        user_id=5, content='Love this story!', story_id=1)
    comment2 = Comment(
        user_id=6, content='Lovely writing', story_id=1)
    comment3 = Comment(
        user_id=4, content='Nice', story_id=2)
    comment4 = Comment(
        user_id=7, content='Good insights', story_id=3)
    comment5 = Comment(
        user_id=6, content='Thank you!', story_id=3, parent_id=4)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()






# def seed_follows():
#     follow1 = follows(
#         user_id=4, followed_user_id=5)
#     follow2 = follows(
#         user_id=5, followed_user_id=6)
#     follow3 = follows(
#         user_id=7, followed_user_id=6)
#     follow4 = follows(
#         user_id=7, followed_user_id=4)
#     db.session.add(follow1)
#     db.session.add(follow2)
#     db.session.add(follow3)
#     db.session.add(follow4)
#     db.session.commit()

# def undo_follows():
#     db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
#     db.session.commit()






def seed_likes():
    like1 = Like(
        user_id=7, story_id=3)
    like2 = Like(
        user_id=7, story_id=2)
    like3 = Like(
        user_id=7, story_id=1)
    like4 = Like(
        user_id=6, story_id=1)
    like5 = Like(
        user_id=6, story_id=4)
    like6 = Like(
        user_id=4, story_id=3)
    like7 = Like(
        user_id=4, comment_id=1)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()

