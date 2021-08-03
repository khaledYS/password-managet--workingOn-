/* eslint-disable */ 
import { useState } from 'react';
import Spinner from './Spinner';
import Error from './Error';
const SignOut = (props) => {
    const [notMatched, setnotMatched] = useState(false);
    const [currentSignForm, setcurrentSignForm] = useState('signin');
    console.log(props);
    const SignIn = () => {
        return ( 
            <form data-name='SignIn' onSubmit={(e)=>{e.preventDefault() ; props.signUser(e.target.querySelector('input[type="email"]').value, e.target.querySelector('input[type="password"]').value)}}>
                    <span className='animated'>Signin !</span>
                    <input required={true} type='email' spellCheck='false' className='Browser default input' placeholder='example@email.com'></input>
                    <input required={true} type='password' spellCheck='false' min={8} className='Browser default input' placeholder='Password'></input>
                    <div className='privacy'>
                        <input required={true} type='checkbox' className='Browser default input' style={{pointerEvents:'auto', opacity:'1',position:'static',WebkitAppearance:'default', appearance:'default'}}/>
                        <label >By signing up in password-manager.com <br/> you'r accepting to our <a href='https://khaledys.github./password-manager.com/privacy-and-policy'>privacy and policy</a><br/> and tottaly respect the <a href='https://khaledys.github./password-manager.com/privacy-of-others-users-privacy'>privacy of others users privacy</a></label>
                    </div>
                    <button type='submit'  defaultValue={<spinner/>}>{(props.authIsLoading  == true) ? <Spinner/> : 'submit'}</button>

                </form>
         );
    }
     
    const SignUp = () => {
        return ( 
            <form data-name='SignUp' onSubmit={(e)=>{
                e.preventDefault();
                if(e.target.querySelectorAll('input[type="password"]')[0].value == e.target.querySelectorAll('input[type="Password"]')[1].value){
                    props.newUser(e.target.querySelector('input[type="email"]').value, e.target.querySelector('input[type="password"]').value);
                    setnotMatched(false)
                }else{
                    setnotMatched(true)
                }
                                    
                }}>
                <span>SignUp <br/> its totally <strong>Free  </strong> ! <Spinner/></span>
                <input required={true}  type='email' spellCheck='false' placeholder='example@email.com'></input>
                <input required={true}  type='password' spellCheck='false' min={12} placeholder='Password'></input>
                <br/>
                <label >Could You Enter The Password again</label>{(!notMatched) ? '' : <Error title="passwords are not matching eatch other"/>}
                <input required={true}  type='password' spellCheck='false' min={12} placeholder="Password Again"></input>
                <div className='privacy'>
                    <input type='checkbox' required={true} style={{pointerEvents:'auto', opacity:'1',position:'static',WebkitAppearance:'default', appearance:'default'}} />
                    <label>By signing up in password-manager.com <br/> you'r accepting to our <a href='https://khaledys.github./password-manager.com/privacy-and-policy'>privacy and policy</a><br/> and tottaly respect the <a href='https://khaledys.github./password-manager.com/privacy-of-others-users-privacy'>privacy of others users privacy</a></label>
                </div>
                <button type='submit' defaultValue={<spinner/>}>{(props.authIsLoading  == true) ? <Spinner/> : 'submit'}</button>
            </form> 
         );
    }
     
    return ( 
        <div className='signedout-div'>
             <h1 className='Welcomer-text'>Hello to <span>passowrd-manager.com</span></h1>
            <div className='sign-switcher'>
            <button value='signIn' onClick={(e)=>{
                setcurrentSignForm('signin');
            e.target.parentElement.querySelector(".sign-switcher button:not([value])").style.left = '0%';
            }}>signIn</button>
            <button style={{left:'0%', marginLeft: '0px'}} ></button>
            <button value='signUp' onClick={(e)=>{
                setcurrentSignForm('signup');
                e.target.parentElement.querySelector(".sign-switcher button:not([value])").style.left = '50%';
            }}>signUp</button>
            </div>
            <h3 className='signin-welcomer'>Signin if you Already Have an Account</h3>
            <div className='forms-c'>
                 {(currentSignForm == 'signin')?<SignIn/> : <SignUp/>}
             </div>
        </div>

     );
}
 
export default SignOut;