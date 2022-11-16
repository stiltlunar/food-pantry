import React, { useState } from "react";

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

interface VisitFormProps {
  familyList: Family[],
  onSubmit: any
}

const VisitForm = ({ familyList, onSubmit }: VisitFormProps) => {
  const [visit, setVisit] = useState<Visit>({families: [], grocery: 0, meat: 0});
  const [family, setFamily] = useState<string>('')

  const printContent = `<h1>This is Printable</h1><p>${visit.families.join(', ')}, Groceries: ${visit.grocery}, Meat: ${visit.meat}</p>`
  
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setFamily(e.currentTarget.value);
  }
  
  // TODO: handle same last name for family lookup
  // TODO: handle only one visit per family per distDay
  function handleAdd() {
    const newVisit = visit
    newVisit.families.push(family)
    setFamily('')
    setVisit(newVisit)
  }

  function print() {
    const printable = document.querySelector('iframe')?.contentWindow
    if (printable) {
      printable.print()
    }
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!visit) {
      return;
    }
    onSubmit(visit)
    print()
    setVisit({families: [], grocery: 0, meat: 0});
  }
  
  return (
    <div
        className="col-span-5 row-span-4 m-3 overflow-hidden rounded-lg border border-black p-3"
        id="visit-form"
      >
        <h2 className="mb-6 text-center text-xl font-bold">Add a Visit</h2>
        <form className="m-auto flex w-2/3 flex-col">
          <input
            list="family-list"
            className="m-2 border border-black p-2 rounded-xl focus:shadow-lg transition duration-300"
            type="text"
            placeholder="Add a Family"
            value={family}
            onChange={handleChange}
          />
          <input className="m-2 rounded-xl border bg-green-200 border-black p-2 transition hover:bg-black hover:text-white disabled:border-neutral-400 disabled:text-neutral-400 disabled:bg-white" type="button" value='ADD FAMILY' disabled={!family} onClick={handleAdd} />
          <datalist id="family-list">
            {familyList.map((family, index) => {
              return <option value={family.familyName} key={index} />
            })}
          </datalist>
          <input
            className="m-2 rounded-xl border bg-blue-200 border-black p-2 transition hover:bg-black hover:text-white disabled:border-neutral-400 disabled:text-neutral-400 disabled:bg-white"
            disabled={visit.families.length === 0}
            type="submit"
            value="ADD VISIT"
            onClick={handleSubmit}
          />
        </form>
        <p>{visit.families && visit.families.join(', ')}</p>
        <iframe srcDoc={printContent} className="hidden"></iframe>
      </div>
  )
}

export default VisitForm