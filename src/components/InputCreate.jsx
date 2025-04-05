import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './InputCreate.module.css'

const InputCreate =({ setData })=>{
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const urlApi = 'http://localhost:3000/create'
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!title.trim()) return;
  
      try {
        const response = await fetch(urlApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
  
        if (response.ok) {
          const newTask = await response.json(); // Suponiendo que el backend devuelve la nueva tarea
          setData((prevData) => [...prevData, newTask]); // Actualiza el estado con la nueva
          setTitle(""); // Limpiar el input
          navigate("/"); // Redirigir a la lista de tareas
        } else {
          console.error("Error al añadir la tarea");
        }
      } catch (error) {
        console.error("Error en la petición: ", error);
      }
    };
  //<div className="flex flex-col items-center p-4">
    return (
      <div className={style.container}>
        <h2 className="text-xl font-bold mb-4">Añadir nueva tarea</h2>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe una tarea..."
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className={style.btn}
          >
            Enviar
          </button>
        </form>
      </div>
    );
}

export default InputCreate;