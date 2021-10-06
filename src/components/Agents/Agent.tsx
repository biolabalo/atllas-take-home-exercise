import type { FC } from "react";
import { IAgent } from "../../types/Agent";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import './CSS/Agent.css'

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const history = useHistory();
  const sumbitReview = async () => {
    const review = prompt(`Please enter your review for ${agent.firstName} ${agent.lastName}`);
    if(!review) return alert("no review was inputed");

    try {
     await axios.post(`http://localhost:3001/agent/${agent.id}`, {review});
     return alert("Review posted")
    }catch(err){
      return alert("Failed to post review")
    }
  }
  return (
    <div style={{
      display: 'inline-grid'
    }}>
         <button className="create-review-btn" onClick={sumbitReview}>ADD REVIEW</button>
    <div 
    className="container pointer"
    onClick={() => history.push(`agent/${agent.id}`)}
    >
      <header>
        <div className="avatar-holder">
          <img src={agent.photoUrl} className="avatar" alt={agent.firstName} />
        </div>
        <h2 className="agent-name">{agent.firstName + " " + agent.lastName}</h2>
      </header>
      <div className="body">{agent.aboutMe}</div>
      <footer>
        <div className="full-width-flex-box">
          <div className="one-third-flex-box">
            <span>{agent.address}</span>
          </div>
          <div className="one-third-flex-box">
            <span>Areas of Practice: {agent.practiceAreas}</span>
          </div>
        </div>
      </footer>

    </div>
  
    </div>
  );
};

export default Agent;
