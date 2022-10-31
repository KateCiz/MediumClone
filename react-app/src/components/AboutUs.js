function AboutUs() {

    aboutUs = [
        {'name': 'Austin Fenne',
            }
    ]
    return (
      <div className="about-us-div">
        <div className="full-page-story-details-div">
          <OneStory story={story} />
        </div>
        <div className="author-side-div">
            <AuthorSideBar Author={story?.Author}/>
        </div>
      </div>
    );
  }
  
  export default AboutUs;