import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/connectionDB";




const Dashboard = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  async function loadNotes() {
    setLoading(true)

    onSnapshot(collection(db, "notes"), (snapshot) => {
      const listNotes = []
      snapshot.forEach((doc) => {
        listNotes.push({
          id: doc.id,
          tittle: doc.data().tittle,
          content: doc.data().content
        })
      })
      setData(listNotes)
      setLoading(false)
    })
  }

  async function deleteNote(id) {
    const dados = doc(db, "notes", id)
    await deleteDoc(dados)
      .then(() => {
        console.log("Nota deletada com sucesso!")
      })
      .catch((error) => {
        console.log(error)
      })

  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <>
      <div className="w-screen h-screen bg-zinc-400 items-center justify-center ">
        <div className="w-full flex flex-col items-center justify-center">
          <a href="/dashboard/create" className="p-4 mt-10 bg-green-600 font-bold text-lg rounded">Criar Nota</a>
          <div className="flex w-full min-h-full p-24 flex-wrap items-center justify-center gap-2">
            {loading && <h1 className="flex flex-col h-full w-6/12 p-10 bg-zinc-100 items-center justify-center">Carregando...</h1>}
            {
              data.map((item) => (
                <div className="flex flex-col w-3/12 bg-zinc-100 items-center justify-center p-2 border-4 border-white">
                  <div>
                    <p className="font-semibold text-xl">{item.tittle}</p>
                  </div>
                  <div className="pt-4 flex flex-row gap-2">
                    <a href={`dashboard/${item.id}`} className="px-4 py-2 rounded bg-green-600">Vizualizar</a>
                    <button onClick={() => deleteNote(item.id)} className="px-4 py-2 rounded bg-red-600" >Excluir</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
