import type { NextPage } from "next";
import { useState } from "react";
import Statistics from '../components/dashboard/statistics'
import VisitForm from '../components/dashboard/visit-form'
import VisitTable from '../components/dashboard/visit-table'
import NewFamily from "../components/modals/new-family";



type Visit = {
  families: string[];
  grocery: number;
  meat: number;
};

const Dashboard: NextPage = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visit, setVisit] = useState<Visit>({families: [], grocery: 0, meat: 0});
  const [family, setFamily] = useState('')
  const [familyList, setFamilyList] = useState([])

  const printContent = `<h1>This is Printable</h1><p>${visit.families.join(', ')}, Groceries: ${visit.grocery}, Meat: ${visit.meat}</p>`
  
  function handleChangeFamily(e) {
    setFamily(e.target.value);
  }
  
  // TODO: handle same last name for family lookup
  // TODO: handle only one visit per family per distDay
  function handleAddFamily() {
    const newVisit = visit
    newVisit.families.push(family)
    setFamily('')
    setVisit(newVisit)
  }

  function handleAddVisit(e) {
    e.preventDefault();
    if (!visit) {
      return;
    }
    setVisits((prev) => [
      ...prev,
      visit,
    ]);
    const printable = document.querySelector('iframe').contentWindow
    printable.print()
    setVisit({families: [], grocery: 0, meat: 0});
  }

  function handleAddFamilyList(newFamily) {
    setFamilyList(prev => [...prev, newFamily])
  }

  return (
    <main className="grid h-screen grid-cols-12 grid-rows-6">
      <Statistics visits={visits} />
      <VisitForm family={family} visit={visit} familyList={familyList} onChange={handleChangeFamily} onAdd={handleAddFamily} onSubmit={handleAddVisit} />
      <VisitTable visits={visits} />
      <NewFamily onSubmit={handleAddFamilyList} />
      <iframe srcDoc={printContent} className="hidden"></iframe>
    </main>
  );
};

export default Dashboard;
