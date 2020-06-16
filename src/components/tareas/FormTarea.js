import React, { Fragment, useContext, useState, useEffect } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada,  errortarea, mostrarformulario, agregarTarea, limpiarErrorTarea, cambiarEstadoFormulario, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [  tareaseleccionada]); 

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto
    const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] =  proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tareaseleccionada del state
            limpiarTarea();
        }
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })

        // ocultar el formulario de crear tarea
        cambiarEstadoFormulario(!mostrarformulario);
    }

    const mostrarFormulario = () => {
        cambiarEstadoFormulario(!mostrarformulario);
        limpiarErrorTarea();
    }

    return ( 
    <Fragment>
        {!mostrarformulario ?
            (
                <div style={{textAlign: "right"}}>
                    <button 
                        className="btn btn-primario"
                        style={{margin: "2rem 4rem"}}
                        onClick={() => mostrarFormulario()}
                    >Crear tarea</button>
                </div>
            )
            :
            (
                <div className="formulario"
                     style={{margin: "4rem",
                             borderRadius: "2rem"}}>

                    <div style={{textAlign: "right"}}>
                        <button style={{borderRadius: "50%", 
                                        margin: "2rem 0rem",
                                        width: "30px",
                                        height: "30px",
                                        border: "1px",
                                        cursor: "pointer"}}
                                onClick={() => mostrarFormulario()}
                        >x</button>
                    </div>
                    
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="contenedor-input">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Tarea..."
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contenedor-input">
                            <input 
                                type="submit"
                                className="btn btn-primario btn-submit btn-block"
                                value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                            />
                        </div>
                    </form>

                    {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
                </div>
            )
        }
    </Fragment>
     );
}
 
export default FormTarea;