type Visit = {
  families: string[];
  grocery: number;
  meat: number;
};

interface VisitTableProps {
  visits: Visit[]
}

const VisitTable = ({ visits }: VisitTableProps) => {
  
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

export default VisitTable