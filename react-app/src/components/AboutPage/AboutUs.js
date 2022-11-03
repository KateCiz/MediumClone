import './index.css';
import { FaReact, FaFlask, FaPython, FaMortarPestle } from 'react-icons/fa';

function AboutUs() {

    const aboutUs = [
        {'name': 'Austin Fenne',
         'pic': 'https://res.cloudinary.com/dymmlu1dw/image/upload/v1667347304/MediumClone/austin-screenshot_v62rmu.png',
         'blurb': 'I love coding and will dive down the rabbit hole whenever I find code that interests me.',
         'github': 'https://github.com/FenneAustin',
         'linkedIn': ''
        },
        {'name': 'Kaitlin Cizewski',
         'pic': 'https://res.cloudinary.com/dymmlu1dw/image/upload/v1667338766/MediumClone/kate-square-pic2_yybmtf.jpg',
         'blurb': "Single mom by day and software engineer by night. I'm a small town girl from Pennsylvania who loves organizing code and writing.",
         'github': 'https://github.com/KateCiz',
         'linkedIn': ''
        },
        {'name': 'Mariel Vaca',
         'pic': 'https://res.cloudinary.com/dymmlu1dw/image/upload/v1667263842/MediumClone/mariel-pic_ddb9yk.jpg',
         'blurb': "Hi! I'm currently residing in New Orleans and not afraid of a coding challenge. Looking to start my developer career and make new friends!",
         'github': 'https://github.com/Marielvacacruz',
         'linkedIn': 'https://www.linkedin.com/in/mariel-vaca-cruz-56604b16b/'
        },
        {'name': 'Peter Monahan',
         'pic': 'https://res.cloudinary.com/dymmlu1dw/image/upload/v1667347397/MediumClone/pete-screenshot_aq9mwg.png',
         'blurb': "Dedicated family man and full stack developer. If I can't fix it immediately, I tackle any problematic code with logic and research.",
         'github': 'https://github.com/peter-monahan',
         'linkedIn': ''
        }
    ]

    const icons = [
        {'tech-icon': <FaReact className='fa-5x'/>, 'name': 'React'},
        {'tech-icon': <FaFlask className='fa-5x'/>, 'name': 'Flask'},
        {'tech-icon': <FaPython className='fa-5x'/>, 'name': 'Python'},
        {'tech-icon': <FaMortarPestle className='fa-5x'/>, 'name': 'SQLAlchemy'},

    ]

    return (
      <>
      <p className="callback-warriors">Callback Warriors!</p>
      <div className="about-us-div">
        <div className='all-people-div'>
        {aboutUs.map(person => {
             return (
                     <div className="about-person-div">
                         <div className="about-person-pic"
                              style={{ backgroundImage: `url('${person.pic}')` }}></div>
                        <div className="about-person-text">
                            <div className="person-name">{person.name}</div>
                            <div className='person-blurb'>{person.blurb}</div>
                            <div className="person-links">
                               <a href={person.github} className="person-github">GitHub</a>
                               <a href={person.linkedIn} className="person-linkedin">LinkedIn</a>
                            </div>
                        </div>
                    </div>
             )
        })}
        </div>
        <div className='technologies-side-bar'>
          {icons.map(icon => {
               return (
                       <div className="one-tech-div">
                          <div className="icon-div">{icon['tech-icon']}</div>
                          <div className="icon-name-div">{icon['name']}</div>
                      </div>
               )
          })}
        </div>
      </div>
      </>
    );
  }
  
  export default AboutUs;