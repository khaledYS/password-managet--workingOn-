/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import Error from "../Error";
import Spinner from '../Spinner'; 
import Account from '../Account'
import AddAccount from "./AddAccount";
import CustomeSearch from "./CustomeSearch";
import firebase from '../../firebaseConfig'
import 'firebase/firestore';
import 'firebase/auth';
var db = firebase.firestore();
const SignIn = (props) => {
    const [isLoading, setisLoading] = useState(false);
    const [inputValue, setinputValue] = useState({input:null, results:null});
    const [customeSearchIsOpened, setcustomeSearchIsOpened] = useState(false);
    const [isAddAccountOpened, setisAddAccountOpened] = useState(false);
    const [data, dataIsLoading] = useCollectionData(db.collection('Users').doc(props.user.uid).collection('Accounts').orderBy('createdAt'), {idField :'id'});

    function returnResultsFormSearch(value){
        return db.collection('Users').doc(props.user.uid).collection('Accounts').where('firstThing','==',value).orderBy('createdAt').get().then(e=>{
            e.forEach(element => {
                console.log(element)
            });
            return e.docs
        })
    }


    useEffect(() => {
    }, [inputValue.results]);

    function addAccountFormOnSubmit(e){
        var x = e.target.querySelectorAll('input[type="password"]');
        if(x[0].value !== x[1].value){
            setunmatchingPasswords(true)
            props.setisLoding(false)
        }else{
            db.collection('Users').doc(props.user.uid).collection('Accounts').doc(`${e.target.querySelector('input[type="text"]').value} | ${e.target.querySelector('select[data-based-on-type]').value} | ${e.target.querySelector('select[data-based-on-app]').value}`).get().then((doc)=>{
                if(doc.exists){
                    setisExisting(true);
                    props.setisLoding(false)
                }else{
                    var theApp ;
                    if(e.target.querySelector('select[data-based-on-app]').value == 'Other'){
                        theApp = e.target.querySelector('input[data-custome-based-on]').value ;
                        console.log(e.target.querySelector('input[data-custome-based-on]').value)
                    }else{
                        theApp = e.target.querySelector('select[data-based-on-app]').value
                        console.log(e.target.querySelector('select[data-based-on-app]').value)
                    }
                    db.collection('Users').doc(props.user.uid).collection('Accounts').doc(`${e.target.querySelector('input[type="text"]').value} | ${e.target.querySelector('select[data-based-on-type]').value} | ${theApp}`).set({
                        firstThing: e.target.querySelector('input[type="text"]').value,
                        password: e.target.querySelector('input[type="password"]').value,
                        type: e.target.querySelector('select[data-based-on-type]').value,
                        app: theApp,
                        createdAt:firebase.firestore.FieldValue.serverTimestamp()
                    }).finally(setisAddAccountOpened(false));
                }
            })
        }
    }
    return ( 
        <div className='signedin-div'>
            <div className='search-bar'>
                <input type='text' placeholder='Search by Email Or phone' onInput={(e)=>{setinputValue({input:e.target.value, })}}/>
                {(inputValue == '') ? '': <button onClick={(e)=>{e.target.parentElement.querySelector('input[type="text"]').value = ''; setinputValue(e.target.parentElement.querySelector('input[type="text"]').value)}} data-search-deleter>X</button>}
            </div> 
            <div className='Accounts'>
            {inputValue ? returnResultsFormSearch(inputValue).map(e=>{return <Account onClick={e=>{console.log("gsdfgs")}} title={e.id} key={e.id} />}) : dataIsLoading ? <Spinner/> : data && data.map(e=>{return <Account onClick={e=>{console.log("gsdfgs")}} title={e} key={e.id} />})}
            {/* {inputValue ? returnResultsFormSearch(inputValue) : dataIsLoading ? <Spinner/> : data && data.map(e=>{return <Account onClick={e=>{console.log("gsdfgs")}} title={e} key={e.id} />})} */}
                {/* <Account title={{id : 'asdjfalsdf | other | yahoo'}} />
                <Account title={{id :'gsdfgs | other | yahoo'}}/>
                <Account title={{id :'https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard'}}/> */}
            </div>
            <div className='bottom-bar'>
            <button className='open-settings'><i style={{color:'#fad000', textShadow: '#000000 0px 0px 20px'}} className="fas fa-cogs"></i></button>
                <div className='add-data-btn' onClick={
                    ()=>{isAddAccountOpened ? setisAddAccountOpened(false) : setisAddAccountOpened(true)}
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 448 448" width="40px">
                        <path fill='white' stroke='black' strokeWidth='9' d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                    </svg>
                </div>
                <button className='open-custom-search' onClick={()=>{customeSearchIsOpened ? setcustomeSearchIsOpened(false) : setcustomeSearchIsOpened(true)}}><i style={{color:'#fad000', textShadow: '#000000 0px 0px 20px'}} fill='yellow' className="fab fa-searchengin"></i></button>
            </div>
            {isAddAccountOpened ? <AddAccount setisAddAccountOpened={setisAddAccountOpened} addAccountFormOnSubmit={addAccountFormOnSubmit} user={props.user} isLoading={props.isLoading} setisLoding={props.setisLoding}/> : ''}
            {customeSearchIsOpened && <CustomeSearch customeSearchIsOpened={customeSearchIsOpened} setcustomeSearchIsOpened={setcustomeSearchIsOpened}/> }
        </div>
     );
}
 
export default SignIn;