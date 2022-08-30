import { useContext, useState } from "react";
import FlechaDropdown from "../../../../global/assets/generico/FlechaDropdown";
import CheckboxNew from "../../../../global/components/genericos/CheckboxNew/CheckboxNew";
import DatePicker from "../../../../global/components/genericos/DatePicker/DatePicker";
import DropdownAdm from "../../../../global/components/genericos/DropdownAdm/DropdowAdm";
import Inputs from "../../../../global/components/genericos/Inputs/Inputs";
import Searcher from "../../../../global/components/genericos/Searcher/Searcher";
import TextArea from "../../../../global/components/genericos/TextArea/TextArea";
import { showToaster } from "../../../../global/context/action/toaster/toaster";
import { GlobalContext } from "../../../../global/context/Provider";
import { Container, HeaderModal, Modal, Title } from "../../../../global/styled/libraries/modalAbm/modalAbm";
import { regexNombre, regexNumero } from "../../../../global/utils/expresionesRegulares";



const AbmDemo = ({
    type,
    setType, // false
    submitFormCreate, /// POST
    submitFomPut, // PUT
    form
}) => {

    const {
        toasterState,
        toasterDispatch
    } = useContext(GlobalContext);

    // cerrar el modal
    const handleClose = () => {
        setType(false)
    }

    const initialState = {
            id: -1,
            idtipotexto: 1,
            idtipotexto_desc: "Beneficios del Portal Web",
            nombre: "",
            descripcion: "",
            idasociado: -1,
            orden: -1,
            table: "",
    }
    // fromulario local
    const [localForm, setLocalForm] = useState(type === "PUT"? form: initialState);


    // formulario de required
    const [stateRequired, setStateRequired] = useState({
        nombre: false,
        descripcion: false,
        orden: false,
        pepe: false,
    })

    // Crear y editar
    const handleCreate = () => {
        if(localForm.nombre !== "" && localForm.descripcion !== "" && localForm.orden !== -1 && (localForm.pepe && localForm.pepe !== "")){

            setStateRequired({
                ...stateRequired,
                nombre: false,
                descripcion: false,
                orden: false,
                pepe: false,
            });
            submitFormCreate(localForm);
        }else {
            setStateRequired({
                ...stateRequired,
                nombre: localForm.nombre !== "" ? false: true,
                descripcion: localForm.descripcion !== ""? false: true,
                orden: localForm.orden !== -1? false: true,
                pepe: true,

            });

            showToaster(
                {
                  texto: "Complete todos los campos requeridos",
                  tipo: "danger",
                },
                "centroArriba"
              )(toasterDispatch);
        }
    };


    const handleUpdate = () => {
        if(localForm.nombre !== "" && localForm.descripcion !== "" && localForm.orden !== -1){
            submitFomPut(localForm);
        }else {
            showToaster(
                {
                  texto: "Complete todos los campos requeridos",
                  tipo: "danger",
                },
                "centroArriba"
              )(toasterDispatch);
        }
    };

    const dataDropDown = [{name:"Chat", id: 1},{name:"Videollamada", id: 2},{name:"Otra Cosa", id: 3}];
    const dataSearcher = [{name:"Chat", id: 1},{name:"Videollamada", id: 2},{name:"Otra Cosa", id: 3},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},{name:"lera", id: 4},];
    const hoy = new Date();
    const idUnique = "ABM_DEMO_1"

    return (
        <Container>
              <div onClick={handleClose} className="fondo-abm"></div>
              <Modal id={idUnique}>
                  <HeaderModal>
                    <Title>{type ==="POST"? "Crear un Beneficio Nuevo": "Editar un Beneficio Nuevo"}</Title>
                    <div className={"ptur-flechitaAbm"}> <FlechaDropdown  color="var(--color-modalAbm-latex10)" height={"35"} width={"35"} /></div>
                    <div onClick={handleClose} className="cruz-modalAbm-x">X</div>
                  </HeaderModal>
                   <DropdownAdm
                     extraProperty={{
                         data: dataDropDown,
                         code: "id",
                         value: "name",
                         errorForced: stateRequired.nombre,
                         setErrorForced: setStateRequired,
                         stateRequired: stateRequired, 
                         idUnique
                        }}
                     headerStr={"Nombre"}
                     placeholder={"Es el placeholder"}
                     property={"nombre"}
                     state={localForm}
                     setState={setLocalForm}
                     value= {type === "PUT"  ? 1: false}
                     isRequired = {true}
                   />
                   <Searcher
                     extraProperty={{
                         data:dataSearcher,
                         searchField:["name"],
                         value:"name",
                         initialValue:"",
                         errorForced: stateRequired.descripcion,
                         setErrorForced: setStateRequired,
                         stateRequired: stateRequired
                        }}
                     headerStr={"Descripción"}
                     placeholder={"Es el placeholder"}
                     property={"descripcion"}
                     state={localForm}
                     setState={setLocalForm}
                     regex={regexNombre}
                     errorStr={"Esta en un error"}
                     value= {type === "PUT"  ?form.descripcion: false }
                     isRequired = {true}
                    />

                    <Inputs
                        property="orden"
                        placeholder="Ingrese la orden"
                        regex={regexNumero}
                        errorStr="Esta equivocado"
                        headerStr="Orden"
                        state= {localForm}
                        setState= {setLocalForm}
                        isRequired = {true}
                        value= {type === "PUT" ?form.orden: false}
                        extraProperty={{
                            initialValue: -1,
                            errorForced: stateRequired.orden,
                            setErrorForced: setStateRequired,
                            stateRequired: stateRequired
                        }}
                        />

                    <TextArea
                         property="pepe"
                         placeholder="Ingrese el texto de pepe"
                         regex={regexNombre}
                         errorStr="Esta equivocado"
                         headerStr="Pepe"
                         state= {localForm}
                         setState= {setLocalForm}
                         isRequired = {true}
                         value= {type === "PUT" ?form.descripcion: false}
                         extraProperty={{
                            cantMaxText: 10,
                            errorForced: stateRequired.pepe,
                            setErrorForced: setStateRequired,
                            stateRequired: stateRequired
                         }}
                        />

                    <CheckboxNew
                            headerStr={"Este es el nuevo check"}
                            property={"check"}
                            state={localForm}
                            setState={setLocalForm}
                            // value= {true} // valor por defecto
                         />
                        <div className="div2">
                            <DatePicker
                                headerStr="Fecha de nacimiento"
                                fechaInicial={"1903 01 01"}
                                fechaFinal={`${hoy.getFullYear()} ${hoy.getMonth() + 1} ${hoy.getDate()}`}
                                onChange={() => {}}
                                // selectedFecha={"20 30 2020"}
                                checkError={"Esta equivocado"}
                                errorStr="La fecha de nacimiento es requerida"
                                isRequired={false}
                            />
                        </div>
                    {
                        type === "POST"?  <button className="button" onClick={handleCreate}>Crear</button>:
                        <button className="button" onClick={handleUpdate}>Editar</button>
                    }

              </Modal>
        </Container>
    )
}

export default AbmDemo;