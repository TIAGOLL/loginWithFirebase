import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../services/connectionDB";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PenLine, Subtitles } from "lucide-react";


const NotesSchema = z.object({
  // criação do schema de validação, mapea os campos do formulário
  tittle: z.string()
    .nonempty('Preencha este campo')
    .max(100, 'O título não pode contém mais que 100 caracteres')
    .trim(),

  content: z.string()
    .max(1000, 'A senha não pode contém mais que 1000 caracteres')
    .nonempty('Preencha este campo')
    .trim(),
})


const NoteById = () => {

  const styleLabel = 'cursor-text absolute left-10 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0 peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color'

  const { register, formState: { errors } } = useForm({
    //register: registra os campos do formulário
    //handleSubmit: acionada quando aperto o botão de login
    //formState: retorna o estado do formulário
    //touched: retorna se o campo foi tocado
    //mode: definição de quando a validação ira ocorrer
    resolver: zodResolver(NotesSchema),
    touched: true,
    mode: 'all',
  })

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [tittle, setTittle] = useState('')
  const [content, setContent] = useState('')


  async function loadNotes() {
    setLoading(true)
    const docRef = doc(db, "notes", id);
    const docSnap = await getDoc(docRef)
      .finally(() => {
        setLoading(false)
      })
    if (docSnap.exists()) {
      const note = {
        id: docSnap.id,
        tittle: docSnap.data().tittle,
        content: docSnap.data().content
      }
      setData(note)
      setTittle(note.tittle)
      setContent(note.content)
    } else {
      console.log("Não existe esse documento!");
    }

  }

  async function deleteNote(id, e) {
    setLoading(true)
    e.preventDefault()
    const dados = doc(db, "notes", id)
    await deleteDoc(dados)
      .then(() => {
        console.log("Nota deletada com sucesso!")
        setTittle('')
        setContent('')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        navigate("/dashboard")
      })
  }


  async function updateNote(id, e) {
    setLoading(true)
    e.preventDefault()
    const dados = doc(db, "notes", id)
    await updateDoc(dados, {
      tittle: tittle,
      content: content,
      updateAt: new Date()
    })
      .then(() => {
        console.log("Nota atualizada com sucesso!")
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        navigate("/dashboard")
      })
  }

  useEffect(() => {
    loadNotes()
  }, [])
  return (
    <div className="w-screen h-screen bg-zinc-400 items-center justify-center ">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex w-full min-h-full p-24 flex-wrap items-center justify-center gap-2">
          <form className="flex flex-col gap-8 pt-10 w-8/12 bg-zinc-100 items-center justify-center p-4 border-4 border-white">
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <Subtitles strokeWidth={2} width={30} height={30} />
                <input required {...register('tittle')} onChange={e => setTittle(e.target.value)} value={loading ? 'Carregando...' : tittle} id='tittle' className={styleInput} type='text' />
                <label htmlFor='tittle' className={styleLabel}>Título</label>
              </div>
              {errors.tittle && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.tittle.message}</span>}
            </div>

            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <PenLine strokeWidth={2} width={30} height={30} />
                <input required {...register('content')} onChange={e => setContent(e.target.value)} value={loading ? 'Carregando...' : content} id='content' className={styleInput} type='content' />
                <label htmlFor='content' className={styleLabel}>Conteúdo</label>
              </div>
              {errors.content &&
                <span className='flex pl-10 py-1 font-semibold text-red-600'>
                  {errors.content.message}
                </span>}
            </div>

            <div className="pt-6 flex flex-row gap-2">
              <button onClick={(e) => updateNote(data.id, e)} className="px-4 py-2 rounded bg-green-600" >Salvar</button>
              <button onClick={(e) => deleteNote(data.id, e)} className="px-4 py-2 rounded bg-red-600" >Excluir</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteById;
