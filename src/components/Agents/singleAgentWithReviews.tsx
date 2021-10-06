import type { FC } from "react";
import { useState, useEffect } from "react";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import './CSS/Agents.css'
import { useParams, Link } from "react-router-dom";


interface Props {
    agentID: string
}
interface IReview {
    id: string;
    details: string;
    agentId: string;
}

interface Details {
    details: IAgent;
    reviews: IReview[];
}

const ViewAgentAndReviews: FC = () => {
  const { agentID }  = useParams<Props>();
  const [agent, setAgent] = useState<Details>();


 
  useEffect(() => {
    async function fetchInitialData() {
      const response = await axios.get(`/agents/${agentID}`);
      setAgent(response.data);
    }
    fetchInitialData();
  }, [agentID]);

  return (
    <main
       className="each-agent-page"
       >   
        <div><Link to="/" className="logo">
         Back to Home
        </Link></div>
       {agent && (
        <>
        <div>
        <p> Name: {agent.details.firstName} {agent.details.lastName}</p>
        <p> Agent Licence: {agent.details.agentLicence}</p>
        <p> Address: {agent.details.address}</p>
        <p>Practices Areas: {agent.details.practiceAreas}</p>
        </div>
        <h1>Reviews</h1>
        <div>
          {agent.reviews.map((e, index) => <li key={index}>{e.details}</li>)}
        </div>
        </>
       )}
  
       {

       }

    </main>

  );
};

export default ViewAgentAndReviews;
