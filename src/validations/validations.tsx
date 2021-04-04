import swal from 'sweetalert';

export const validationTask = (text:string) => {
    if(text === ""){
        swal("Field empty!", "You need to complete the field name!", "warning");
        return false

    }else if(![/^[A-Za-z\s]+$/].every((pattern) => pattern.test(text))){    
        swal("Error!", "Only letters!", "warning");
        return false
    }else{
        return true
    }
}



export const validationDate = (date:string) => {
    if(date === ""){
        swal("Field empty!", "You need to complete the field date!", "warning");
        return false
    }else{
        return true
    }
}
