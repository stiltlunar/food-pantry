const VisitForm = ({family, visit, onChange, onAdd, onSubmit, familyList}) => {
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
      </div>
  )
}

export default VisitForm