// TODO: handle same last name for family lookup

import type { NextPage } from "next";
import { useState } from "react";
import Statistics from '../components/dashboard/statistics'
import VisitForm from '../components/dashboard/visit-form'
import VisitTable from '../components/dashboard/visit-table'

type Visit = {
  families: string[];
  grocery: number;
  meat: number;
};

const Dashboard: NextPage = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visit, setVisit] = useState<Visit>({families: [], grocery: 0, meat: 0});
  const [family, setFamily] = useState('')

  function handleChangeFamily(e) {
    setFamily(e.target.value);
  }

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
    setVisit({families: [], grocery: 0, meat: 0});
  }

  return (
    <main className="grid h-screen grid-cols-12 grid-rows-6">
      <Statistics visits={visits} />
      <VisitForm family={family} visit={visit} onChange={handleChangeFamily} onAdd={handleAddFamily} onSubmit={handleAddVisit} />
      <VisitTable visits={visits} />
    </main>
  );
};

export default Dashboard;
