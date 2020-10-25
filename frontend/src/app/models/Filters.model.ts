import { HttpParams } from '@angular/common/http';

export class Filters {
    page: number = 1;
   // perPage: number = 50;
    query?: string;
   // status?: string;
   // sort?: string =  'created_at,desc';

    constructor(data?: Partial<Filters>) {
        Object.assign(this, data)
    }

    toParams(): HttpParams {
        let params = new HttpParams()

        Object.keys(this).forEach(key => {
            if (this[key]) {
                if (Array.isArray(this[key])) {
                    params = this[key].reduce((params, id) => params.append(`${key}`, String(id)), params);
                } else
                    params = params.append(key, String(this[key]))
            }

        })

        return params;
    }
}