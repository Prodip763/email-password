import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleNameBlur= event =>{
    setName(event.target.value);
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleRegisterChange = e =>{
    setRegistered(e.target.checked);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should content at least one special character')
      return;
    }
    setValidated(true);
    setError('');

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error =>{
        console.error(error);
        setError(error.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }
    
    event.preventDefault();
  }
  const handlePasswordReset = () =>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log('email sent');
    })
  }
  const setUserName = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() =>{
      console.log('updating name');
    })
    .catch(error =>{
      setError(error.message);
    })
  }

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email verification sent')
    })
  }
  return (
    <div >
      {/* <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type='email' name='' id=''></input><br></br>
        <input onBlur={handlePasswordBlur} type='password' name='' id=''></input><br></br>
        <input type='submit' value='Login'></input>
      </form> */}

      <div className='w-50 mx-auto mt-2'>
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name .
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label >Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className='text-success'>{'Success'}</p>
          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant='link'>Forget Password?</Button>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
