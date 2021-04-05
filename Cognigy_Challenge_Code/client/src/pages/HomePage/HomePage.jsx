import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";

function Home() {
  const history = useHistory()

  return (
    <div className="home-page p-d-flex p-flex-column p-ai-between p-jc-between">
      <div
        className="wellcome p-d-flex p-flex-column p-jc-center p-ai-center p-text-center p-shadow-3 p-p-5"
      >
        <h1>Welcome to my password generator</h1>
        <h3>generate secure passwords with some options that you need</h3>
        <Button
          label="Get start!"
          className="p-button-rounded p-button-success"
          onClick={()=> history.push('/get-start')}
        />
      </div>
    </div>
  );
}

export default Home;
