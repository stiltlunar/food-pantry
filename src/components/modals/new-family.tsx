import { useState } from "react";
import { boolean } from "zod";

type Member = {
  id: number;
  name: string;
  family_rep: boolean;
}

const NewFamily = ({ onSubmit }) => {
  const [familyName, setFamilyName] = useState('')
  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({id: 0, name: '', family_rep: false});


  function handleChangeFamilyName(e) {
    setFamilyName(e.target.value)
  }

  function handleChangeNewMember(event) {
    setNewMember(prev => {
      return {
        ...prev,
        name: event.target.value
      }
    })
  }

  function handleAddMember(event) {
    event.preventDefault();
    setMembers((prev) => [...prev, newMember]);
    setNewMember({id: newMember.id + 1, name: '', family_rep: false})   
  }

  function handleChangeMember(e, id) {
    console.log(e.target.value);
    setMembers(prev => prev.map(member => member.id === id ? {...member, name: e.target.value} : member))
  }

  function handleDeleteMember(id: number) {
    setMembers(prev => prev.filter(member => member.id !== id))
  }

  function handleSubmit() {
    onSubmit({familyName: familyName, members: members})
    setNewMember({id: 0, name: '', family_rep: false})
    setMembers([])
    setFamilyName('')

  }

  return (
    <div id="print" className="rounded-xl border border-black p-3 m-3 col-span-4 flex flex-col">
      <input type="text" onChange={handleChangeFamilyName} value={familyName} placeholder='Family Name' />
      <ul>
        {members.map(member => {
          return <li className="flex" key={member.id}><input type="text" onChange={(e) => {handleChangeMember(e, member.id)}} value={member.name} /><span className="cursor-pointer" onClick={() => handleDeleteMember(member.id)}>X</span></li>
        })}
      </ul>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          placeholder="New Member"
          value={newMember.name}
          onChange={handleChangeNewMember}
        />
        <button className="cursor-pointer" disabled={!newMember.name} onClick={handleAddMember}>ADD MEMBER</button>
      </form>
      <button onClick={handleSubmit} >SUBMIT</button>
    </div>
  );
};

export default NewFamily;
