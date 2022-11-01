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
        email='marnie@aa.io',
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667236749/MediumClone/pexels-guillaume-hankenne-1986374_ty4sqa.jpg",
        bio="I love the ocean, sea creatures, and chill vibes!",
        password='password')
    bobbie = User(
        first_name='bobbie',
        last_name='user',
        email='bobbie@aa.io',
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667237112/MediumClone/pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382734_x7uio0.jpg",
        bio="Hello, I'm here to help you be your best you.",
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
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667237208/MediumClone/pexels-italo-melo-2379005_gxze0e.jpg",
        bio="Tolerates my annoying neighbor, loves my dog",
        password='password'
    )

    user7.follows.append(user6)
    user6.follows.append(user7)
    user7.follows.append(marnie)
    user6.follows.append(marnie)
    user5.follows.append(marnie)
    marnie.follows.append(user5)
    bobbie.follows.append(user4)
    user4.follows.append(bobbie)
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
    story5 = Story(
        user_id=2,
        title="Jelly-fish?",
        content="Despite the name, jellyfish are not classified as 'fish'. Instead they are considered 'jellies'. I know right? So original! There are so many different types of jellies though that they have their own class of sea creature. Which is wicked cool! So here's a little self-help tip. Next time you think that you're a tad too weird or unique, remember that even jellyfish have others who are like them. It's a big ocean out there, but you'll find your kind if you keep searching. Until next time, stay chill my readers!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667236781/MediumClone/pexels-guillaume-meurice-1894350_xknbuo.jpg")
    story6 = Story(
        user_id=3,
        title="Stick to what you know...or branch out?",
        content="Git branching can be super scary. Even if you tried playing git related games that are meant to prepare you for it, using it in the wild can leave you feeling like a deer in headlights. Worry not though! There are two cool commands that have helped keep me from some all out panic. Number one, git stash and number two, git stash apply. These two commands can save you a lot of headaches. If there is an issue with pulling code from the remote branch then you can git stash. This 'stashes your current edits' so the pull request can run without error. After pulling the code from github, you can then run git stash apply to add your code edits back into your code editor with the new code. Hope this helps!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667236904/MediumClone/pexels-christina-morillo-1181253_evfm3x.jpg")
    story7 = Story(
        user_id=3,
        title="Holidays, New Year, and Organization",
        content="We're nearing the holidays and that means that new years is right around the corner. This time of year can be an extremely stressful. However, with the right notebook or planner you can master this season and set up your new year's goals like a champion. Here are a few questions to ask yourself... 1. Do you like deadlines or hate them like covid-19? 2. Where are you most likely to see your notes + keep them organized (on your phone, on your fridge, in a notebook, etc.)? 3. Are you more motivated to do things that are on a to-do list or when tasks are broken up day by day? That last one is important. If you can't seem to stick to a monthly or weekly calendar, then to-do lists are probably your best friend as they help you focus in on what's important. Vice versa, if to-lists just overwhelm you to no end, then spacing things out over a week or month could help you keep yourself reminded of the big picture. There is no one size fits all for organization, but every single person has the ability to learn to be organized in one way or another. Happy holidays!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667236944/MediumClone/pexels-pineapple-supply-co-174673_rpjhig.jpg")
    story8 = Story(
        user_id=7,
        title="To Dog Parent Or Not To Dog Parent?",
        content="First let me begin by saying I am a dog person. I love dogs and always will. With that being said, not everyone is, but sometimes people think they don't like dogs because of one or two bad experiences. If you love dogs and are responsible enough to keep it alive...then I'm not sure why you clicked on this article. Go get a puppy dog! For those who are on the fence, think about your experience and why it was negative. Was it the breed, the size, the environment, how clean or dirty the dog was, or how much it shed? Some dogs shed like no tomorrow, but there are hypo-allergenic breeds too. If the dog was mean, consider how it was cared for or who was its owner. Dogs who are mistreated or taught to act badly by a cruel owner behave VERY differently than well cared for dogs, just like humans! I'll throw you one last bone, maybe you secretly really want a dog if you're still on the fence at the end of this story. Or maybe I'm just really biased. Whether you want to get a dog or not, if this story gave you a good scratch behind the ears be sure to give this story a like or a comment!",
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1667237247/MediumClone/pexels-chris-f-1144410_ot7vzl.jpg")


    db.session.add(story1)
    db.session.add(story2)
    db.session.add(story3)
    db.session.add(story4)
    db.session.add(story5)
    db.session.add(story6)
    db.session.add(story7)
    db.session.add(story8)
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
