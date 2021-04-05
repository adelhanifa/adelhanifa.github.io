import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import ToastMessage from '../components/ToastMessage'
import ProgressSpinner from '../components/Spinner/Spinner'
import HomePage from '../pages/HomePage/HomePage'
import PasswordsDisplay from '../pages/PasswordsDisplay/PasswordsDisplay'


function App() {
  return (
    <div className="App p-d-flex p-flex-column p-p-5">
      <ToastMessage />
      <ProgressSpinner />
      <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/get-start" component={PasswordsDisplay} />
        <Redirect to="/" />
      </Switch>
      </main>
      <footer className="p-ai-end p-mt-auto">
        <h3 className="p-text-center">thank you for useing this password generator</h3>
        <h4 className="p-text-center aboutme" 
            onClick={()=> window.open('https://adelhanifa.github.io/portfolio/Adel%20Hanifa%20__%20Lebenslaauf.pdf', '_blank')}>about me</h4>
      </footer>
    </div>
  );
}

export default App;
