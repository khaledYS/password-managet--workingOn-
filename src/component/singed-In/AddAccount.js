import {useState} from 'react'
import Error from '../Error';
import Spinner from '../Spinner';

const AddAccount = (props) => {
    const [unmatchingPasswords, setunmatchingPasswords] = useState(false);
    const [isExisting, setisExisting] = useState(false);
    const [whatsTheType, setwhatsTheType] = useState('none');
    return ( 
        <form className='add-account-form' onSubmit={async(e)=>{
            e.preventDefault();
            props.setisLoding(true)
            props.addAccountFormOnSubmit(e)
        }}>
            <h1 style={{margin: '3% 0'}}>New Account!!</h1>
            <span onClick={(e)=>{props.setisAddAccountOpened(false)}}>X</span>
            <input required type='text' placeholder='Email, phone or userName...' onInput={(e)=>{
                var x = e.target.value;
                x = x.replaceAll(' ', "")
                if(x == ''){
                    e.target.parentElement.querySelectorAll('select')[0].value = '';
                }else if(x.indexOf('@') == 0){
                    e.target.parentElement.querySelectorAll('select')[0].value = '@user_name';
                }else if(x.indexOf('@') > 0){
                    e.target.parentElement.querySelectorAll('select')[0].value = 'Email';
                }else if(x.indexOf('+') == 0){
                    e.target.parentElement.querySelectorAll('select')[0].value = '+phoneNumber';
                }else{
                    e.target.parentElement.querySelectorAll('select')[0].value = 'Other';
                }
            }}/>
            <input required type='password' placeholder='password...'/>
            {unmatchingPasswords ? <Error title='passwords are not matching each other' color='#ff3e3e' margin='5px 0' />  : ''}
            <input required type='password' placeholder='password Again...'/>
            Account name based on Type : <select required data-based-on-type>
                <option value=''>none...</option>
                <option value='Email'>Email</option>
                <option value='@user_name'>@user_name</option>
                <option value='+phoneNumber'>+phoneNumber</option>
                <option value='Other'>Other</option>
            </select>
            Account based on app :  <select required data-based-on-app onChange={e=>{
                setwhatsTheType(e.target.value)
            }}>
                <option value=''>none...</option>
                <option value='Instagram'>Instagram</option>
                <option value='Yahoo'>Yahoo</option>
                <option value='Yahoo'>Gmail</option>
                <option value='Twitter'>Twitter</option>
                <option value='Whatsapp'>Whatsapp</option>
                <option value='Facebook'>Facebook</option>
                <option value='Wy Chat'>Wy Chat</option>
                <option value='LinkedIn'>LinkedIn</option>
                <option value='Other'>Other</option>
            </select>
            {(whatsTheType == 'Other') ? <input data-custome-based-on /> : ''}
            {isExisting ? <Error title='This Account is already existing' color='#ff3e3e' margin='5px 0' /> : ''}
            <div>
            <button type='submit'>{props.isLoading ? <Spinner/> : 'submit'}</button>
            <button type='reset'>reset</button>
            </div>
        </form>
        );
}
export default AddAccount