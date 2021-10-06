import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from "react-hook-form";
import Select from 'react-select';
import axios from "axios";
import { IAgent } from "../../types/Agent";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const options = [
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'San Francisco', label: 'San Francisco' },
    { value: 'Miami', label: 'Miami' }
  ]

const  ModalComponent: React.FC<{ 
    modalIsOpen: boolean, 
     setIsOpen: (args : boolean) => void,
     setAgents: (args: IAgent[]) => void
     setFilteredData: (args: IAgent[]) => void
    }> = ({ modalIsOpen, setIsOpen, setAgents, setFilteredData}) =>  {
 
  const [ PracticeAreaData, setPraticeArea] = useState<string[]>([]);
  let subtitle : HTMLHeadingElement | null;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if(subtitle){
       subtitle.style.color = '#f00';
    }
  }

  const  closeModal = () =>  setIsOpen(false);

  interface IFormInput {
    firstName: string;
    lastName: string;
    agentLicence: string;
    address: string;
    practiceAreas: string;
    aboutMe: string;
    photoUrl: string;
  }
  

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

    const onSubmit : SubmitHandler<IFormInput> = async data => {

    const newData =  PracticeAreaData.length ? {...data, practiceAreas: PracticeAreaData.join(',')} : data;

    try{
    const response = await axios.post("/agents", newData);
    setAgents(response.data);
    setFilteredData(response.data);
    closeModal();
    return reset();

    }catch(err){
    alert("FAILED TO CREATE !");
    }

  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <form onSubmit={handleSubmit(onSubmit)} className="form-cr">
        
        <label>FirstName</label>
          <input 
           {...register("firstName", { required: true })}
          />

        <label>LastName</label>
         <input 
           {...register("lastName", { required: true })}
          />

        <label>Agent Licence</label>
        <input 
           {...register("agentLicence", { required: true })}
          />

        <label>Address</label>
         <input 
           {...register("address", { required: true })}
          />

        <label>About Me</label>
        <br/>
         <textarea 
           {...register("aboutMe", { required: true })}
         />
      
        <div className="mt-3">
        <label>Practice Areas</label>
         <Select 
         isMulti
         onChange={(data) => {
            setPraticeArea(data.map(e => e.value))
         }}
         closeMenuOnSelect={false}
         options={options} 
         />
         </div>

         <div className="mt-3">
         <label>Photo Url</label>
         <input 
           {...register("photoUrl",)}
         />
         </div>

        <input type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default ModalComponent;