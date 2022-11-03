import './index.css';

function NotFound(){
    return (
        <div className='not-found-page'>
            <div className="not-found-pic" 
            style={{ backgroundImage: `url(https://res.cloudinary.com/dymmlu1dw/image/upload/v1667432505/MediumClone/pexels-pixabay-531844_oubaft.jpg)` }}>
                <p className="not-found-text">404 ERROR - Sorry, story not found</p>
            </div>
        </div>
    );
};
export default NotFound;