import React, { useState } from "react";
import {Form, Input, Select, SelectItem, Checkbox, Button} from "@heroui/react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function Sigin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({terms: "Please accept the terms"});

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };
  
  const handleSigninWithGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log("result=>", result)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user=>", user)
    navigate("/")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("error=>", errorCode, errorMessage)
    // ...
  });
  }

  const handleSignin = async ()=>{
try{
  setLoader(true)
  await signInWithEmailAndPassword(auth, email, password).then(()=> {
    navigate('/')
    setLoader(false)
  })
}
catch{

}
  }
  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full max-w-3xl mt-20 p-5">
        

        <Input
          isRequired
          errorMessage={({validationDetails}) => {
            if (validationDetails.valueMissing) {
              return "Please enter your email";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid email address";
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

     

        <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
        >
          I agree to the terms and conditions
        </Checkbox>

        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

        <div className="flex flex-col gap-4">
             <Button type="reset" variant="bordered" className="w-40">
            Reset
          </Button>
          <Button 
          isLoading = {loader}
          onClick={handleSignin}
          className="w-full" color="primary" type="submit">
            Sign In
          </Button>
         
        </div>
        <p className="text-center">or</p>
        <div className="flex gap-4">
          <Button onClick={handleSigninWithGoogle} className="w-full" color="primary" type="submit">
            Sign In with Google
          </Button>
         
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

