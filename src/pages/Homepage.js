import { Button, Fade } from 'react-bootstrap';
import styles from './styles/HomepageStyle.module.css';
import * as ReactIcon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { AutoTextSize } from 'auto-text-size';
import { useEffect, useState } from 'react';
import { checkLogin } from '../../utilities/Auth';
import axios from 'axios';
import ToastAlert from '../ui_components/ToastAlert';
import LogoutButton from '../../ui_components/LogoutButton';

const Homepage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    const[toastText, setToastText] = useState('');
    const[toastTrigger,setToastTrigger] = useState(0);

    const [username, setUsername] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const [showShortcut, setShowShortcut] = useState(false);
    const [pin_activity_id, set_pin_activity_id] = useState('');
    const [pin_activity_name, set_pin_activity_name] = useState('');

    useEffect(() => {
        initialize();
    },[])

    axios.defaults.withCredentials = true;
    async function initialize()
    {
        if (urlParams.has('alert'))
        {
            setToastText(urlParams.get('alert'));
            setToastTrigger(prev => prev+1);
            urlParams.delete('alert');
            navigate('?' + urlParams.toString(), { replace: true });
        }
        await checkLogin(navigate, setUsername, setDepartment, setEmail, ['一般', '管理員', '系統管理員']);

        await axios.post(process.env.REACT_APP_backendHostAddress + '/activity/readispinactivity').then(res => {
            if (res.data.length > 0) {
                set_pin_activity_id(res.data[0]['activity_id']);
                set_pin_activity_name(res.data[0]['activity_name']);
                setShowShortcut(true);
            }
        })
        .catch(err => {
            setToastText('發生錯誤, 請重試');
            setToastTrigger(prev => prev + 1);
        });
    }

    return (
        <div className={styles.body} style={{backgroundImage: `url(${process.env.REACT_APP_frontendHostAddress}/image/background.png)`}}>

            {/* ===== TOAST ===== */}
            <ToastAlert toastText={toastText} toastTrigger={toastTrigger}/>

            <Fade in={true} appear={true} style={{ transitionDuration: '0.8s' }}>
                <div>
                    <div style={{width:'100%', height:'40px', display:'flex', flexDirection:'row', justifyContent:'right', paddingRight:'10px', alignItems:'center'}}>
                        <LogoutButton/>
                    </div>
                    
                    <div className={styles.contentContainer}>

                        <div className={styles.shortcutContainer}>
                            <img src={`${process.env.REACT_APP_frontendHostAddress}/image/homepage_icon.png`} style={{ width: '30%', height: 'auto'}} />
                            <div style={{ color: '#484848', fontSize: '25px', marginBottom: '50px' }}>嗇色園嘉賓管理系統</div>

                            <div style={{display:'flex', flexDirection:'row', width:'95%', justifyContent:'space-between', flexWrap:'wrap'}}>
                                {showShortcut &&
                                    <Button variant="light" size='lg' className={styles.shortcut} onClick={() => navigate(`/activityparticipate?activity_id=${pin_activity_id}`)}>
                                        <div>
                                            <ReactIcon.BookmarkCheck style={{ width: '50px', height: '50px', marginBottom: '10px'}} />
                                            <div>
                                                <AutoTextSize maxFontSizePx='18' style={{width:'100%'}}>{pin_activity_name}</AutoTextSize>
                                            </div>
                                        </div>
                                    </Button>
                                }

                                <Button variant="light" size='lg' className={styles.shortcut} onClick={() => navigate('/campaign/viewcampaign')}>
                                    <div>
                                        <ReactIcon.CalendarCheck style={{ width: '50px', height: '50px', marginBottom: '10px'}} />
                                        <div>
                                            <AutoTextSize maxFontSizePx='18' style={{width:'100%'}}>管理活動</AutoTextSize>
                                        </div>
                                    </div>
                                </Button>

                                <Button variant="light" size='lg' className={styles.shortcut} onClick={() => navigate('/guest/viewguest')}>
                                    <div>
                                        <ReactIcon.People style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
                                        <div >
                                            <AutoTextSize maxFontSizePx='18' style={{width:'100%'}}>管理嘉賓</AutoTextSize>
                                        </div>
                                    </div>
                                </Button>

                                <Button variant="light" size='lg' className={styles.shortcut} onClick={() => navigate('/emailtemplate/viewemailtemplate')}>
                                    <div>
                                        <ReactIcon.Envelope style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
                                        <div>
                                            <AutoTextSize maxFontSizePx='18' style={{width:'100%'}}>管理電郵範本</AutoTextSize>
                                        </div>
                                    </div>
                                </Button>

                                <Button variant="light" size='lg' className={styles.shortcut} onClick={() => navigate('/user/viewuser')}>
                                    <div>
                                        <ReactIcon.PersonFillGear style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
                                        <div>
                                            <AutoTextSize maxFontSizePx='18' style={{width:'100%'}}>管理用戶</AutoTextSize>
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>            
                </div>

            </Fade>
        </div>
    )
}

export default Homepage;