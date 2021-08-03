const CustomeSearch = (props) => {
    return ( 
        <div className='customSearch'>
            <span onClick={(e)=>{props.customeSearchIsOpened ? props.setcustomeSearchIsOpened(false) : props.setcustomeSearchIsOpened(true)}}>X</span>
            <div>
            Account name based on Type : <select >
                <option>none</option>
                <option>email ex : example@example.com</option>
                <option>user_name</option>
                <option>@user_name</option>
                <option>+phoneNumber</option>
                <option>Other</option>
            </select>
            Account based on app :  <select>
                <option>none</option>
                <option>Other</option>
                <option>Instagram</option>
                <option>Yahoo</option>
                <option>Gmail</option>
                <option>Twitter</option>
                <option>Whatsapp</option>
                <option>Facebook</option>
                <option>Wy Chat</option>
                <option>LinkedIn</option>
            </select>
            </div>
            <button onClick={(e)=>{
                var r = e.target.parentElement.querySelectorAll('div > select');
                r.forEach(element => {
                    element.value  = 'none';
                });
            }}>Reset</button>
    </div>

        );
}

export default CustomeSearch