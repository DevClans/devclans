import { PageProps } from "@/types/page.types";

export default function error({searchParams}:PageProps){
    console.log(searchParams?.error)
    
    return(
        <>
        {
            searchParams?.error ?
            <h1>Access Denied</h1>
            :
            <h1>Fine</h1>
        }
      
        </>
       
    )

}