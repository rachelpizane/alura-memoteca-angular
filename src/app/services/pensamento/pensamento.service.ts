import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private urlApi = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.urlApi);
  }

  save(pensamento : Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.urlApi, pensamento);
  }

  delete(id:number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.urlApi}/${id}`);
  }

  update(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.put<Pensamento>(`${this.urlApi}/${pensamento.id}`, pensamento);
  }

  getById(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(`${this.urlApi}/${id}`);
  }

  getByPage(page: number, limit: number, filter: string = '', favorito: boolean = false): Observable<Pensamento[]> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    if(filter.trim().length > 2) {
      params = params.set('q', filter.trim());
    }

    if(favorito) {
      params = params.set('favorito', true);
    }

    //return this.http.get<Pensamento[]>(`${this.urlApi}?_page=${page}&_limit=${limit}`;
    return this.http.get<Pensamento[]>(this.urlApi, { params });
  }

}
