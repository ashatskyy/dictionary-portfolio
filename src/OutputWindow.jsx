export function OutputWindow({ stringForSearch, fetchedData }) {
  console.log(fetchedData);
  return (
    <div>
      <h1>Search Request: {stringForSearch}</h1>

      {/* {Array.isArray(fetchedData) ? <p>{fetchedData.title}</p>:<p>{fetchedData.phonetic}</p> } */}
      <p>Search Result: <b>{fetchedData.word||fetchedData.title}</b></p>
    </div>
  );
}
