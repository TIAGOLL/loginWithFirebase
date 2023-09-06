//imports lucide
import { ArrowBigLeft, Subtitles } from 'lucide-react'

//imports react/next
import { useState } from 'react'
import { useForm } from 'react-hook-form'

//imports zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//imports context de autenticação
import { PenLine } from 'lucide-react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/connectionDB'


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

const CreateNote = () => {

  const styleLabel = 'cursor-text absolute left-10 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0 peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color'

  const [tittle, setTittle] = useState()
  const [content, setContent] = useState()

  const [isLoading, setLoading] = useState(false)

  //validação de formulário
  const { register, handleSubmit, formState: { errors } } = useForm({
    //register: registra os campos do formulário
    //handleSubmit: acionada quando aperto o botão de login
    //formState: retorna o estado do formulário
    //touched: retorna se o campo foi tocado
    //mode: definição de quando a validação ira ocorrer
    resolver: zodResolver(NotesSchema),
    touched: true,
    mode: 'all',
  })


  async function handleNotes(data) {

    setLoading(true)

    await addDoc(collection(db, 'notes'), {
      created: new Date(),
      tittle: data.tittle,
      content: data.content
    }).then(() => {
      console.log("Post adicionado com sucesso!")
      setTittle('')
      setContent('')
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }




  return (
    <>
      <div className="flex h-screen justify-center items-center bg-zinc-400 bg-cover bg-no-repeat">
        <div className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <a href='/dashboard' className='justify-left text-center w-full pl-12 pb-0'>
            <ArrowBigLeft width={35} height={35} />
          </a>
          <div className="flex flex-row justify-center text-center w-full pl-6 items-start">
            <h1 className='m-0'>Criar nota</h1>
          </div>
          <form onSubmit={handleSubmit(handleNotes)} className="w-full gap-8 flex-col flex">
            <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <Subtitles strokeWidth={2} width={30} height={30} />
                  <input required {...register('tittle')} onChange={e => setTittle(e.target.value)} value={tittle} id='tittle' className={styleInput} type='text' />
                  <label htmlFor='tittle' className={styleLabel}>Título</label>
                </div>
                {errors.tittle && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.tittle.message}</span>}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <PenLine strokeWidth={2} width={30} height={30} />
                  <input required {...register('content')} onChange={e => setContent(e.target.value)} value={content} id='content' className={styleInput} type='content' />
                  <label htmlFor='content' className={styleLabel}>Conteúdo</label>
                </div>
                {errors.content &&
                  <span className='flex pl-10 py-1 font-semibold text-red-600'>
                    {errors.content.message}
                  </span>}
              </div>
            </div>
            <div className='flex w-full flex-col justify-center items-center'>
              <button type='submit' className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
                {isLoading ? 'Carregando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateNote;
