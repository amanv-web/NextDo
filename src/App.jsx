import { Outlet } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';




function App() {
  const navigation = useNavigation();
  if(navigation.state === "submitting") return <H1>dfjhaksdjfhdasfds</H1> 
  return (
    <div>
   
      <Outlet />
    </div>
  );
}

export default App; 
