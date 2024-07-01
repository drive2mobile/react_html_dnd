import { Fade, Spinner } from "react-bootstrap";
import styles from './SpinnerFullscreen.module.css';

const SpinnerFullscreenTest = ({showLoading, color}) => {
    return (
        <div className={styles.container} style={{display: showLoading ? 'flex' : 'none'}}>
            <Fade in={showLoading} appear={true} >
                <div className={styles.spinnerGrid}>
                    <Spinner animation="border" size="lg" variant={color} className={styles.spinner}/>
                </div>   
            </Fade>
        </div>
    );
}

export default SpinnerFullscreenTest;