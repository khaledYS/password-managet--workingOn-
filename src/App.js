import './App.css';
import './component/css/Spinner.css'
import './component/css/signedIn.css';
import './component/css/signedOut.css';
import './component/css/Error.css';
import {  useState, useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from './firebaseConfig'
import 'firebase/firestore';
import 'firebase/auth';
import SignIn from './component/singed-In/Signed-in';
import SignOut from './component/Signed-out';

window.ondblclick = e=>{e.preventDefault()}
window.onkeydown = e=>{
  if(e.code === 'KeyS' && e.ctrlKey)e.preventDefault()
}
console.log(firebase.apps.length);


const db = firebase.firestore().collection('Users');
const auth = firebase.auth();

function App() {
  useEffect(() => {
    console.log(isLoding)
  });
  const [user, authIsLoading, authError] = useAuthState(auth);
  const [isLoding, setisLoding] = useState(false);
  useEffect(() => {
    authIsLoading ? setisLoding(true) : setisLoding(false)
  }, [authIsLoading]);
  window.onresize = ()=>{
    var el =  document.querySelector('#root');
    el.style.height = `${window.innerHeight}px `;
  };
  window.onload = ()=>{
    var el =  document.querySelector('#root');
    console.log(el);
    el.style.height = `${window.innerHeight}px `;
  };
  function newUser(email, password){
    auth.createUserWithEmailAndPassword(email, password)
  }
  useEffect(()=>{
    // if(user){
    //   db.doc(user.uid).get().then(e=>{
    //     if(!e.exist){
    //       db.doc(user.uid).set({
    //         email : user.email,
    //         uid : user.uid,
            
    //       })
    //     }
    //   });
    // }else{
    //   console.log("false")
    // }
    user && db.doc(user.uid).set({
      email : user.email,
      uid : user.uid,
      lastTimeSigned:firebase.firestore.FieldValue.serverTimestamp()
    })
  }, [user])
  function signUser(email, password){
    auth.signInWithEmailAndPassword(email, password)
  }
  function signOutUser(){
    auth.signOut();
  }
  useEffect(() => {
    console.log('just wanna remind you that authErorr value has been changed to', authError,user,authIsLoading);
  }, [authError,user,authIsLoading]);

return (
  <>
    <button style={{background: 'yellow', position: 'fixed', bottom: '10%', left: '0%',color:'black',zIndex: '88'}} onClick={()=>{
      console.log(authIsLoading,authError,user);
      auth.signOut();
    }}>hello</button>

    {user ? <SignIn signOutUser={signOutUser} user={user} isLoding={isLoding} setisLoding={setisLoding}/> : <SignOut authIsLoading={authIsLoading} newUser={newUser} signUser={signUser} />}
    {/* <SignIn signOutUser={signOutUser} user={user} isLoding={isLoding} setisLoding={setisLoding}/> */}
  </>
)
}

export default App;
