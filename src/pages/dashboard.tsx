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

type Member = {
  id: number;
  name: string;
  family_rep: boolean;
}

type Family = {
  familyName: string,
  members: Member[]
}

const Dashboard: NextPage = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [familyList, setFamilyList] = useState<Family[]>([])

  function addVisit(visit: Visit) {
    setVisits((prev) => [...prev, visit]);
  }

  function addFamily(newFamily: Family) {
    setFamilyList(prev => [...prev, newFamily])
  }

  return (
    <main className="grid h-screen grid-cols-12 grid-rows-6">
      <Statistics visits={visits} />
      <VisitForm familyList={familyList} onSubmit={addVisit} />
      <VisitTable visits={visits} />
      <NewFamily onSubmit={addFamily} />
    </main>
  );
};

export default Dashboard;
