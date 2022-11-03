import "./footer.css"

function Footer (){
    return (
        <footer>
            <div className="footer-container">
                <a href="https://github.com/KateCiz/MediumClone" target="blank">
                    <p>GitHub</p>
                </a>
                <a href="https://github.com/KateCiz/MediumClone/wiki" target="blank">
                    <p className="footer-links">Wiki</p>
                </a>
                <a href="">
                    <p className="footer-links">About</p>
                </a>
            </div>
        </footer>
    )
};

export default Footer;
