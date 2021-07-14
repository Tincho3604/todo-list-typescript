import swal from 'sweetalert';

export const validationTask = (text:string) => {
    if(text === ""){
        swal("Field empty!", "You need to complete the field name!", "warning");
        return false
    }else{
        return true
    }
}
