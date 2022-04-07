import { useState, useEffect } from 'react';
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [dueño, setDueño] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const[error, setError] = useState(false)

  useEffect(()=>{
    if( Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)//Voy a pasar los valores en memoria
      setDueño(paciente.dueño)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }

  }, [paciente]) //Dependencias

  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }


  const handleSubmit = (e) =>{

    e.preventDefault();

    //Validacion del formulario
    if([nombre, dueño, email, fecha, sintomas].includes('')){
      console.log('Hay algun campo vacio');

      setError(true);
      return;
    }

    setError(false)

    //Objeto de Paciente
    const objetoPaciente ={
      nombre, 
      dueño, 
      email, 
      fecha, 
      sintomas
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
      // identifica al que tiene el mismo id y retorna el obj paciente

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else{
     //Nuevo registro

      objetoPaciente.id = generarId(); // Genero el id y luego lo agrego
      setPacientes([...pacientes, objetoPaciente]) //Toma una copia del State y se le agrega un nuevo obj



    }

    // Limpiar el form
    setNombre('')
    setDueño('')
    setEmail('')
    setFecha('')
    setSintomas('')


  }

  return (
      <div className="md:w-1/2 lg:w-2/5 mx-5"> 
          <h2 className="font-black text-3xl text-center">
              Seguimiento Pacientes
          </h2>

          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold text-lg">
                Administralos
              </span>
          </p>

          <form 
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

              {error && <Error> 
                          <p>Todos los campos son obligatorios</p> 
                  </Error> } 
              <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                  Nombre Mascota
                </label>

                <input 
                  id="mascota"
                  type="text" 
                  placeholder="Nombre de la Mascota"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                  value={nombre}
                  onChange={ (e) => setNombre(e.target.value) } //Cada vez q este codigo se registre va a ir escribiendo en el state
                />

              </div>

              <div className="mb-5">
                <label htmlFor="dueño" className="block text-gray-700 uppercase font-bold">
                  Nombre Dueño
                </label>

                <input 
                  id="dueño"
                  type="text" 
                  placeholder="Nombre del Dueño"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                  value={dueño}
                  onChange={ (e) => setDueño(e.target.value) }
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                  E-mail
                </label>

                <input 
                  id="email"
                  type="email" 
                  placeholder="E-mail del Dueño"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </div>

              <div className="mb-5">
                <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">
                  Fecha de Alta
                </label>

                <input 
                  id="fecha"
                  type="date" 
                  className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                  value={fecha}
                  onChange={ (e) => setFecha(e.target.value) }
                />
              </div>

              <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                  Síntomas
                </label>

                <textarea
                  id="sintomas"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-300 rounded-md"
                  placeholder="Describe los Síntomas"
                  value={sintomas}
                  onChange={ (e) => setSintomas(e.target.value) }
                />
              </div>

              <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer
                transition-all rounded-lg" 
                value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
              />



          </form>

      </div>

    )
}

export default Formulario


//md es el media query para pantallas