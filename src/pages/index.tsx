import type { NextPage } from "next";
import { useState } from "react";

type Visit = {
  families: string[];
  grocery: number;
  meat: number;
};

const Home: NextPage = () => {
  const [visits, setVisits] = useState([
    { families: ["Smith"], grocery: 3, meat: 2 },
    { families: ["Jones", "Highsmith"], grocery: 5, meat: 4 },
  ]);
  const [family, setFamily] = useState('')
  const [newVisit, setNewVisit] = useState<Visit>({families: [], grocery: 0, meat: 0});

  function handleFamilyChange(e) {
    setFamily(e.target.value);
  }

  function handleAddFamily() {
    const prevVisit = newVisit
    prevVisit.families.push(family)
    setFamily('')
    setNewVisit(prevVisit)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newVisit) {
      return;
    }
    setVisits((prev) => [
      ...prev,
      newVisit,
    ]);
    setNewVisit({families: [], grocery: 0, meat: 0});
  }

  return (
    <main className="grid h-screen grid-cols-12 grid-rows-6">
      <Statistics visits={visits} />
      <VisitForm family={family} newVisit={newVisit} onChange={handleFamilyChange} onAdd={handleAddFamily} onSubmit={handleSubmit} />
      <VisitTable visits={visits} />
    </main>
  );
};

export default Home;

type StatisticsProps = {
  visits: Array<Visit>
}

const Statistics = ({ visits }: StatisticsProps) => {
  const groceryCount = getGroceryCount()
  const meatCount = getMeatCount()
  
  function getGroceryCount() {
    let count = 0
    visits.map(visit => count += visit.grocery)
    return count
  }

  function getMeatCount() {
    let count = 0
    visits.map(visit => count += visit.meat)
    return count
  }
  
  return (
    <div
    className="col-span-12 row-span-1 m-3 overflow-hidden rounded-lg border border-black p-3"
    id="stats"
  >
    <h2 className="mb-6 text-center text-xl font-bold">Statistics</h2>
    <div className="m-auto grid w-2/3 grid-cols-3 text-center">
      <div>
        <h3>Visits</h3>
        <p>{visits.length}</p>
      </div>
      <div>
        <h3>Groceries</h3>
        <p>{groceryCount}</p>
      </div>
      <div>
        <h3>Meat</h3>
        <p>{meatCount}</p>
      </div>
    </div>
  </div>
  )
}


const VisitForm = ({family, newVisit, onChange, onAdd, onSubmit}) => {
  function handleChange(e) {
    onChange(e)
  }

  function handleAdd() {
    onAdd()
  }

  function handleSubmit(e) {
    onSubmit(e)
  }
  
  return (
    <div
        className="col-span-5 row-span-4 m-3 overflow-hidden rounded-lg border border-black p-3"
        id="visit-form"
      >
        <h2 className="mb-6 text-center text-xl font-bold">Add a Visit</h2>
        <form className="m-auto flex w-2/3 flex-col">
          <input
            className="m-2 border border-black p-2"
            type="text"
            placeholder="Add a Family"
            value={family}
            onChange={handleChange}
          />
          <input className="m-2 rounded-xl border border-black p-2 transition hover:bg-black hover:text-white disabled:border-neutral-400 disabled:text-neutral-400 disabled:hover:bg-white" type="button" value='ADD FAMILY' disabled={!family} onClick={handleAdd} />
          <input
            className="m-2 rounded-xl border border-black p-2 transition hover:bg-black hover:text-white disabled:border-neutral-400 disabled:text-neutral-400 disabled:hover:bg-white"
            disabled={newVisit.families.length === 0}
            type="submit"
            value="ADD VISIT"
            onClick={handleSubmit}
          />
        </form>
        <p>{newVisit.families && newVisit.families.join(', ')}</p>
        <p>Families: {newVisit.families.length}</p>
      </div>
  )
}

const VisitTable = ({ visits }) => {
  
  return (
    <div
        className="col-span-7 row-span-4 m-3 overflow-hidden rounded-lg border border-black p-3"
        id="visit-table"
      >
        <h2 className="mb-6 text-center text-xl font-bold">Visits Today</h2>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Visit</th>
              <th>Family</th>
              <th>Grocery</th>
              <th>Meat</th>
            </tr>
          </thead>
          <tbody className="">
            {/* TODO: Have a collapse row for multiple families with breakout stats */}
            {visits &&
              visits.map((visit, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{visit.families.join(", ")}</td>
                    <td>{visit.grocery}</td>
                    <td>{visit.meat}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
  )
}