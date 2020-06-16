import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    MOSTRAR_FORMULARIO,
    LIMPIAR_ERRORTAREA
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload )
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea )
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }
        case MOSTRAR_FORMULARIO:
            return {
                ...state,
                mostrarformulario: action.payload
            }
        case LIMPIAR_ERRORTAREA:
            return {
                ...state,
                errortarea: false
            }
        default:
            return state;
    }
}