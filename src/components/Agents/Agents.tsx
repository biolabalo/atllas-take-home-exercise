import type { FC } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import './CSS/Agents.css'
import ModalComponent  from "./createAgent";


const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(agents);
  

  const openModal = () =>  setIsOpen(true);

  const filterAgent = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputedValue = e.target.value.toLowerCase();

  let result = [];

  result = agents.filter((data) => {

    //@ts-ignore
    return data.hasOwnProperty("practiceAreas") && data.practiceAreas.toLowerCase().includes(inputedValue)
    });
 
    setFilteredData(result);
  }

  useEffect(() => {
    async function fetchInitialData() {
      const response = await axios.get("/agents");
      setFilteredData(response.data);
      return setAgents(response.data);
    }
    fetchInitialData();
  }, []);

  return (
    <main>   
    <ModalComponent 
    setAgents={setAgents}
    modalIsOpen={modalIsOpen} 
    setIsOpen={setIsOpen} 
    setFilteredData={setFilteredData}
    />
    <div className="d-flex-button">
      <button
      onClick={openModal}
      className="button2"
      >Join the team!</button>

      <input 
      type="search" 
      placeholder="Search agents by practice areas"
      onChange={filterAgent}
      />
    </div> 
    <div className="agents rap">
      {filteredData.map((agent) => (
        <Agent key={agent.id} agent={agent} />
      ))}
    </div>
    </main>

  );
};

export default Agents;

