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

export default Statistics