import React, { useEffect,useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {Home} from "./container";
import { auth ,db} from './config/firebase.config';
import {setDoc,doc, orderBy,collection,query, onSnapshot} from "firebase/firestore"
import { Spinner } from './components';
import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';
import { NewProject } from './container';
import { SET_PROJECTS } from './context/actions/projectActions';

export const App = () => {
  const navigate= useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((userCred)=>{
      if(userCred){
        console.log(userCred?.providerData[0]);
        setDoc(doc(db,"users", userCred?.uid), userCred?.providerData[0]).then(()=>{
          //ddispatch the action to store
          dispatch(SET_USER(userCred?.providerData[0]))
          navigate("/home/projects",{replace:true});
        });
      } else{
        navigate("/home/auth",{replace:true});
      }
      setInterval(()=>{
        setIsLoading(false);
      },2000)
    });

    //cleanup the listener
    return()=>unsubscribe();
  },[]);


  useEffect(()=>{
    const projectQuery=query(
      collection(db,"Projects"),
      orderBy("id","desc")
    )

    const unsubscribe=onSnapshot(projectQuery,(querySnaps=>{
      const projectsList=querySnaps.docs.map(doc=>doc.data())
      dispatch(SET_PROJECTS(projectsList))
    }));
    return unsubscribe;
  },[])
  return (
    <>
      {isLoading ? <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
        <Spinner/>
      </div>: <div className="w-screen h-screen flex items-start justify-start
    overflow-hidden">
      <Routes>
        <Route path="/home/*" element={<Home/>} />
        <Route path="/newProject" element={<NewProject/>} />
        {/*if the route not matching*/}
        <Route path='*' element={<Navigate to={"/home"}/>} />
      </Routes>
    </div>}
    </>
  );
};

export default App;
