import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

//Import UI
import { AiFillGoogleCircle } from "react-icons/ai";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center flex justify-center flex-col">
      <p className=" text-sm">Sign In With Google To Continue</p>
      <button
        className="text-2xl text-zinc-800 bg-green-300 mt-2 px-2 flex items-center rounded-sm"
        onClick={signInWithGoogle}
      >
        <AiFillGoogleCircle className="mr-2" />
        Google Sign In
      </button>
    </div>
  );
};

export default Auth;
