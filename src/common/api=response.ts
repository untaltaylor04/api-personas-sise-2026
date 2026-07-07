export class ApiResponse<T> {
    constructor (
        public success: boolean,
        public message: string,
        public data?: T,
        public error?: any
    ) {}

    static success<T>(message: string = 'Operaciion exitosa', data?: T): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }
    static error<T>(message: string = 'Error en la operacion', error?: any): ApiResponse<null> {
        return new ApiResponse<null>(false, message, undefined, error);
    }
} 
