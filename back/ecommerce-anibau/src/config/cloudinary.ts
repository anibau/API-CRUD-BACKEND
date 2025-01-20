import { v2 } from "cloudinary";
import { config as dotenvConfig} from "dotenv";

//cargar variables de entorno desde .env
dotenvConfig({path:'.env'})


//exporta la constante que encapsula la configuracion de cloudinary
export const configCloudinary={
    //Define el nombre bajo el cual se registrará este servicio en el contenedor de inyección de dependencias de la aplicación.
    provide: 'CLOUDINARY',
    //logica para la configuración de Cloudinary con las datos de acceso en las .env, v2:instancia de cloudinary
    useFactory:()=>{
        return v2.config({
            cloud_name:process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
}