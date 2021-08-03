// import {AiTwotoneEdit,AiTwotoneDelete} from 'react-icons/ai'
import { useState, useEffect, useRef } from 'react';
import { Portal } from 'react-portal';
import {v4 as uuidv4} from 'uuid'
const Account = ({title}) => {
    const [accountDetailISOpen, setaccountDetailISOpen] = useState(false);
    function returnAccountName(e){
        var x = e.split('|')
        x = x.map(e=>e.replaceAll(' ',""))
        return x;
    };
    const AccountDetail = (props) => {
        const [showPassword, setshowPassowrd] = useState(false);
        const eye = useRef('');
        useEffect(() => {
            if(showPassword){
                eye.current.classList.remove('fa-eye-slash')
                eye.current.classList.add('fa-eye')
                eye.current.parentElement.parentElement.querySelector('input').setAttribute('type', 'text')
            }else{
                eye.current.classList.remove('fa-eye')
                eye.current.classList.add('fa-eye-slash')
                eye.current.parentElement.parentElement.querySelector('input').setAttribute('type', 'password')
            }
        }, [showPassword]);
        function copyToClipboard(input) {
            setshowPassowrd(true)
            try{
                input.select();
                input.setSelectionRange(0, 99999)
                document.execCommand("copy");
                window.alert('opied!!')
            }catch(err){
                window.alert('we catched an error ', err)
            }
        }
        return ( 
            <div className="account-detail">
                <span onClick={()=>{setaccountDetailISOpen(false)}}>X</span>
                    <div>
                        <div email='true'>
                            <div>
                                <input
                                 onDoubleClick={e=>{
                                    copyToClipboard(e.target)
                                    console.log('heloo')}}
                                 value={props.info.firstThing}
                                 type="text"
                                 readOnly={true}
                                />
                            </div>
                            <label><i className="fas fa-user-edit" style={{fontSize:'20px', fontStyle:'normal'}} ></i></label>
                        </div>
                        <div password='true'>
                            <div>
                                <input
                                 onDoubleClick={e=>{
                                    try{
                                        e.target.setAttribute('type', 'text')
                                        copyToClipboard(e.target)
                                    }finally{
                                        setshowPassowrd(false)
                                        e.target.setAttribute('type', 'password')
                                    }
                                }
                                }
                                 type="password"
                                  value={props.info.password}
                                 readOnly={true} />
                                <label><i
                                ref={eye} 
                                  onClick={()=>{
                                    showPassword ? setshowPassowrd(false) : setshowPassowrd(true)
                                  }
                                 }
                                 className="fas fa-eye-slash shadow-5-strong  me-2" 
                                 style={{fontSize:'20px', fontStyle:'normal', color:'#495057'}} 
                                 ></i>
                                 </label>
                            </div>
                            <label className=""><i className="fas fa-key" style={{fontSize:'20px', fontStyle:'normal'}} ></i></label>
                        </div>
                    </div>
            </div>
         );
    }
    return ( 
    <>
        <Portal node={document && document.getElementById('root')}>
        {accountDetailISOpen ? <AccountDetail info={title}/> : ''}
        </Portal>
        <div className='Account-div' data-createdat={title.createdAt} onClick={()=>accountDetailISOpen ? setaccountDetailISOpen(false) : setaccountDetailISOpen(true)}>
            <span style={{fontWeight:'600', width:'90%', color:'#fff'}}>{returnAccountName(title.id).map(e=>{return<span key={e}>{e}</span>})}</span>
        </div>
    </>
     );
}
 
export default Account;