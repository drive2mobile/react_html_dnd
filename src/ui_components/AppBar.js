import { useNavigate } from 'react-router-dom';
import styles from './AppBarStyle.module.css';
import { AutoTextSize } from 'auto-text-size'
import * as ReactIcon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import AlertDialog from './AlertDialog';
import { useState } from 'react';
import axios from "axios";

const AppBar = ({leftIcon, Header, rightIcon}) => {
    const navigate = useNavigate();
    
    return (
        <div className={styles.AppBar}> 
            <div className={styles.AppBarIcon}>{leftIcon}</div>
            <div className={styles.AppBarHeading} >
                <AutoTextSize maxFontSizePx='16' styles={{width:'100%'}}>{Header}</AutoTextSize>
            </div>
            <div className={styles.AppBarIcon}>{rightIcon}</div>
        </div>
    )
}   

export default AppBar;